// Zero-dependency tests using Node's built-in runner: `node --test`
// These exercise the static fallback path (no FOOTBALL_DATA_API_KEY set),
// validating the iCalendar output against the risks named by the prior audit.
import { test, before } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const HANDLER_PATH = join(__dirname, "..", "netlify", "functions", "worldcup.mjs");

// Ensure the live-overlay path is NOT taken, so we test the static schedule.
delete process.env.FOOTBALL_DATA_API_KEY;

let handler;
let res;
let body;
let lines; // body split on CRLF (no trailing empty element handling needed for assertions)

before(async () => {
  const mod = await import(HANDLER_PATH);
  handler = mod.default;
  assert.equal(typeof handler, "function", "default export should be the request handler");

  const req = new Request("https://example.test/worldcup.ics");
  res = await handler(req);
  body = await res.text();
  lines = body.split("\r\n");
});

// Risk 1: HTTP 200 + text/calendar Content-Type.
test("responds 200 with a text/calendar Content-Type", () => {
  assert.equal(res.status, 200);
  const ct = res.headers.get("content-type") || "";
  assert.match(ct, /text\/calendar/i, `Content-Type was: ${ct}`);
});

// Risk 2: VCALENDAR envelope + balanced, non-zero VEVENT blocks.
test("body is a well-formed VCALENDAR with balanced VEVENT blocks", () => {
  assert.ok(body.startsWith("BEGIN:VCALENDAR"), "body must start with BEGIN:VCALENDAR");
  // Body ends with a trailing CRLF; the last content line must be END:VCALENDAR.
  assert.ok(/END:VCALENDAR\r\n$/.test(body), "body must end with END:VCALENDAR + CRLF");

  const begins = lines.filter((l) => l === "BEGIN:VEVENT").length;
  const ends = lines.filter((l) => l === "END:VEVENT").length;
  assert.ok(begins > 0, "expected at least one VEVENT");
  assert.equal(begins, ends, "BEGIN:VEVENT and END:VEVENT counts must match");
});

// Risk 3: every date-time property is UTC basic format (YYYYMMDDTHHMMSSZ).
test("all DTSTART/DTEND/DTSTAMP values are UTC basic format", () => {
  const dt = /^(?:DTSTART|DTEND|DTSTAMP):(.+)$/;
  const utc = /^\d{8}T\d{6}Z$/;
  const found = lines.filter((l) => dt.test(l));
  assert.ok(found.length > 0, "expected DTSTART/DTEND/DTSTAMP lines");
  for (const l of found) {
    const value = l.match(dt)[1];
    assert.match(value, utc, `non-UTC-basic value: ${l}`);
  }
});

// Risk 4: all UIDs are unique and non-empty.
test("all UIDs are unique and non-empty", () => {
  const uids = lines
    .filter((l) => l.startsWith("UID:"))
    .map((l) => l.slice("UID:".length));
  assert.ok(uids.length > 0, "expected UID lines");
  for (const uid of uids) {
    assert.ok(uid.length > 0, "UID must be non-empty");
  }
  assert.equal(new Set(uids).size, uids.length, "UIDs must be unique");
});

// Risk 5: CRLF line endings, no bare \n.
test("uses CRLF line endings with no bare LF", () => {
  // Strip every CRLF; any remaining \n is a bare LF.
  const bareLf = body.replace(/\r\n/g, "");
  assert.ok(!bareLf.includes("\n"), "found a bare \\n not preceded by \\r");
  assert.ok(body.includes("\r\n"), "expected CRLF separators");
});

// Risk 6: RFC 5545 folding — no content line > 75 octets; continuations start with a space.
test("no content line exceeds 75 octets and continuations are folded with a leading space", () => {
  // lines has a trailing "" from the final CRLF; drop empties for length checks.
  const content = lines.filter((l) => l.length > 0);
  let sawContinuation = false;
  for (const l of content) {
    assert.ok(
      Buffer.byteLength(l, "utf8") <= 75,
      `line exceeds 75 octets (${Buffer.byteLength(l, "utf8")}): ${l}`
    );
    if (l.startsWith(" ")) sawContinuation = true;
  }
  // The schedule contains long venue/description values, so folding must occur.
  assert.ok(sawContinuation, "expected at least one folded continuation line (leading space)");
});

// Risk 7: TEXT values escape commas/semicolons with a backslash.
test("TEXT values backslash-escape commas (at least one escaped example exists)", () => {
  // Venues like "Estadio Azteca, Mexico City" must appear escaped as "\,".
  // We assert on the unfolded body so a comma split across a fold still counts:
  // reconstruct logical lines by removing CRLF+space continuations first.
  const unfolded = body.replace(/\r\n /g, "");
  assert.ok(
    /\\,/.test(unfolded),
    "expected at least one backslash-escaped comma in a TEXT value"
  );
  // And confirm a raw, unescaped comma never appears in a known comma-bearing venue.
  assert.ok(
    !/LOCATION:[^\r\n]*Estadio Azteca,/.test(unfolded),
    "found an unescaped comma in a LOCATION value"
  );
});

// The overlay-matching helper `overlay()` is NOT exported by worldcup.mjs
// (only `default` and `config` are). It is therefore not unit-testable
// without modifying source, which is out of scope. No focused unit test added.
