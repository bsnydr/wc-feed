# wc-feed

A serverless iCalendar feed for the FIFA World Cup 2026. One Netlify Function generates an `.ics` at `/worldcup.ics`. Subscribe once in Apple Calendar (or any iCal client) and all 104 matches appear with dates, venues, and kickoff times. Knockout-round team names and final scores fill in on their own as the bracket resolves.

The problem: the full 104-match schedule is known well in advance, but the knockout bracket is not. Static calendar exports go stale the moment a group finishes, and a re-downloaded `.ics` doesn't update an existing subscription. This feed is a live URL, so a subscribed calendar re-fetches it on its own refresh interval and the entries update in place. No app, no account, no push infrastructure.

## Live demo

```
webcal://wc2026matches.netlify.app/worldcup.ics    # subscribe in Apple Calendar
https://wc2026matches.netlify.app/worldcup.ics      # raw feed
```

## Quickstart

### Prerequisites
- Node.js 18 or newer (the function uses the built-in `fetch`).
- A free [Netlify](https://netlify.com) account.
- The [Netlify CLI](https://docs.netlify.com/cli/get-started/): `npm install -g netlify-cli`.

### Run it locally
From the repo root:

```
netlify dev
```

Then request the feed:

```
curl http://localhost:8888/worldcup.ics
```

Expected output is a valid iCalendar document. The first lines:

```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//bsnydr//worldcup-2026-feed//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:FIFA World Cup 2026
X-WR-TIMEZONE:UTC
REFRESH-INTERVAL;VALUE=DURATION:PT6H
X-PUBLISHED-TTL:PT6H
BEGIN:VEVENT
...
```

followed by 104 `VEVENT` blocks and a closing `END:VCALENDAR`. With no API key set (see below), knockout slots read bracket placeholders like `R32: Runner-up A vs Runner-up B` and `R16: Winner M73 vs Winner M75`. The feed is always valid even with zero configuration.

### Deploy
```
netlify deploy --prod
```

If the site isn't linked yet, the CLI offers to create one. Accept, pick a name, and it deploys. There is no build step. The feed is then live at:

```
https://<your-site>.netlify.app/worldcup.ics
```

Subscribe in Apple Calendar with the `webcal` form of that URL:

```
webcal://<your-site>.netlify.app/worldcup.ics
```

### Optional: fill in real knockout teams and scores
Without a key, the feed serves the static schedule with placeholder knockout matchups. To auto-fill real team names (and final scores once matches are played):

1. Get a free key from [football-data.org](https://www.football-data.org/client/register). The free tier covers the World Cup at 10 requests/minute.
2. Set it on the site:
   ```
   netlify env:set FOOTBALL_DATA_API_KEY your_key_here
   ```
3. Redeploy: `netlify deploy --prod`

## How it works

The entire application is one file: `netlify/functions/worldcup.mjs` (Netlify Functions 2.0). A static `public/index.html` is the only other moving part, a landing page with the subscribe links.

On each request:

1. **Static schedule is the source of truth.** A verified 104-match `SCHEDULE` constant holds every fixture: date, ET kickoff time, duration, and venue. This is the canonical structure and it never depends on the network.
2. **Optional live overlay.** If `FOOTBALL_DATA_API_KEY` is set, the function calls the football-data.org matches endpoint and overlays real knockout team names and final scores onto the static slots.
3. **Build and return.** It serializes the (possibly enriched) schedule to RFC 5545 iCalendar and returns it with cache headers.

The overlay matches an API match to a static slot by **stage plus kickoff time**, accepting up to 90 minutes of scheduling drift. A `used` set prevents one API match from being assigned to two slots. Group-stage matches are never overlaid; their teams are already known.

All times are computed in UTC and emitted as UTC `DTSTART`/`DTEND`. Each match's kickoff is stored as its **US-Eastern wall-clock** time, not the venue-local time — so even though the venues span four zones (Pacific, Mountain, Central, Eastern), a single `ET_TO_UTC_HRS = 4` offset is exact for every fixture, because the whole tournament's June 11 – July 19 window is EDT (UTC-4). The client renders the resulting UTC stamps in the viewer's local zone, so a subscriber in any timezone sees correct local kickoff times.

## Key technical decisions and tradeoffs

**Static schedule first, API second.** The known 104-match structure is hardcoded rather than fetched. The API only enriches what's already there. If the API key is missing, the request is rate-limited, the endpoint is down, the response is malformed, or anything else fails, `fetchLive()` returns `null` and the feed serves the static schedule unchanged. A calendar feed that breaks is worse than one that's slightly behind, so every failure mode degrades to "still valid, just not yet enriched." Tradeoff: the static schedule has to be maintained by hand if FIFA changes a fixture.

**Fuzzy matching by stage and time, not by ID.** The football-data.org match IDs don't map to the local schedule's match numbers, so the overlay matches on `(stage, kickoff time)` with a 90-minute tolerance. This survives small kickoff-time adjustments between the published schedule and the API. Tradeoff: if two same-stage matches were ever scheduled within 90 minutes of each other, the nearest-time heuristic could mis-assign. The `used` set caps the blast radius to at most one wrong pairing, and in this tournament's actual schedule the same-stage matches are spaced far enough apart that it doesn't occur.

**CDN caching sized to the rate limit.** Responses set two cache headers:

```
Cache-Control: public, max-age=1800
Netlify-CDN-Cache-Control: public, max-age=1800, stale-while-revalidate=86400
```

The CDN serves the cached feed for 30 minutes and, for up to 24 hours after that, serves the stale copy instantly while it revalidates in the background. The function (and therefore the football-data.org call) runs at most about twice an hour regardless of how many devices subscribe. Ten thousand subscribers cost the same upstream traffic as one. This keeps origin and API calls comfortably under the 10 requests/minute free tier. Tradeoff: a just-finished score can take up to 30 minutes to appear. For a calendar feed that's an acceptable lag, and clients re-poll on a multi-hour interval anyway.

**Correct RFC 5545 serialization.** Content lines are folded at 75 bytes and field values are escaped (`\`, `;`, `,`, newline) per the spec. The folder measures bytes, not characters, and backs off the cut point so it never splits a multibyte UTF-8 character mid-sequence (team and venue names can contain accented characters). Event `UID`s are stable, and the feed advertises `REFRESH-INTERVAL` / `X-PUBLISHED-TTL` of 6 hours so clients know how often to re-poll. Stable UIDs are what let an existing calendar entry update in place instead of duplicating when teams resolve.

**No build step, no framework, no dependencies.** A single ES module and a static HTML page. `esbuild` (Netlify's default bundler) handles packaging. Less to deploy, less to break, faster cold starts.

### What I'd improve
- **Per-request `JSON.parse(JSON.stringify(...))` of the schedule.** A fresh deep copy is cloned on every request to avoid mutating the module-level constant during overlay. It's correct and cheap at this size, but a structured clone or a build-an-output-array approach would be cleaner.
- **A test fixture for the overlay.** The matching logic deserves a small unit test with a recorded API payload, including the edge cases (no key, malformed response, near-tie kickoff times). Right now correctness rests on reading the code.
- **Configurable tolerances.** The 90-minute match window and the ET-to-UTC offset are constants. Pulling them into config would make the function reusable for other tournaments without editing logic.

## Limitations / scope

- **Single tournament.** The schedule is specific to World Cup 2026. The offset constant assumes the entire event sits in US Eastern Daylight Time; this is not a generic multi-timezone scheduler.
- **Apple Calendar is the primary target.** It works with any iCal client, but the subscribe instructions and `webcal` handoff are written for Apple Calendar. Other clients vary in how aggressively they re-fetch.
- **Score and team freshness is bounded by the cache.** With CDN caching at 30 minutes and client refresh intervals measured in hours, results are not real-time and are not meant to be.
- **Static schedule needs manual upkeep.** A fixture change at the source requires editing the `SCHEDULE` constant. The API overlay corrects team names and scores, not dates or venues.
- **Group-stage placeholders, then live names.** Without an API key, knockout slots stay as bracket placeholders for the life of the deployment.

## Project structure

```
.
├── netlify.toml                  # publish dir, functions dir, esbuild bundler
├── netlify/
│   └── functions/
│       └── worldcup.mjs          # the entire application
└── public/
    └── index.html                # static landing page with subscribe links
```

## License

MIT.
