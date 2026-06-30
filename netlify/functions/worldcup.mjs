// Netlify Function (Functions 2.0) - serves a live FIFA World Cup 2026 .ics feed.
// Subscribe in Apple Calendar to:  webcal://<your-site>.netlify.app/worldcup.ics
// Times are emitted in UTC, so every calendar app shows them in the viewer's local zone.
// Team names auto-fill from football-data.org once knockout fixtures are decided.
// Works with NO key (knockout entries show placeholders until then).

const SCHEDULE = [
{
"n": 1,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Mexico vs South Africa (Group A)",
"date": "2026-06-11",
"h": 15,
"m": 0,
"venue": "Estadio Azteca, Mexico City",
"dur": 120
},
{
"n": 2,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "South Korea vs Czechia (Group A)",
"date": "2026-06-11",
"h": 22,
"m": 0,
"venue": "Estadio Akron, Zapopan",
"dur": 120
},
{
"n": 3,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Canada vs Bosnia & Herzegovina (Group B)",
"date": "2026-06-12",
"h": 15,
"m": 0,
"venue": "BMO Field, Toronto",
"dur": 120
},
{
"n": 4,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "USA vs Paraguay (Group D)",
"date": "2026-06-12",
"h": 21,
"m": 0,
"venue": "SoFi Stadium, Inglewood",
"dur": 120
},
{
"n": 5,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Qatar vs Switzerland (Group B)",
"date": "2026-06-13",
"h": 15,
"m": 0,
"venue": "Levi's Stadium, Santa Clara",
"dur": 120
},
{
"n": 6,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Brazil vs Morocco (Group C)",
"date": "2026-06-13",
"h": 18,
"m": 0,
"venue": "MetLife Stadium, East Rutherford",
"dur": 120
},
{
"n": 7,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Haiti vs Scotland (Group C)",
"date": "2026-06-13",
"h": 21,
"m": 0,
"venue": "Gillette Stadium, Foxborough",
"dur": 120
},
{
"n": 8,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Australia vs Turkiye (Group D)",
"date": "2026-06-14",
"h": 0,
"m": 0,
"venue": "BC Place, Vancouver",
"dur": 120
},
{
"n": 9,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Germany vs Curacao (Group E)",
"date": "2026-06-14",
"h": 13,
"m": 0,
"venue": "NRG Stadium, Houston",
"dur": 120
},
{
"n": 10,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Netherlands vs Japan (Group F)",
"date": "2026-06-14",
"h": 16,
"m": 0,
"venue": "AT&T Stadium, Arlington",
"dur": 120
},
{
"n": 11,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Ivory Coast vs Ecuador (Group E)",
"date": "2026-06-14",
"h": 19,
"m": 0,
"venue": "Lincoln Financial Field, Philadelphia",
"dur": 120
},
{
"n": 12,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Sweden vs Tunisia (Group F)",
"date": "2026-06-14",
"h": 22,
"m": 0,
"venue": "Estadio BBVA, Monterrey",
"dur": 120
},
{
"n": 13,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Spain vs Cape Verde (Group H)",
"date": "2026-06-15",
"h": 12,
"m": 0,
"venue": "Mercedes-Benz Stadium, Atlanta",
"dur": 120
},
{
"n": 14,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Belgium vs Egypt (Group G)",
"date": "2026-06-15",
"h": 15,
"m": 0,
"venue": "Lumen Field, Seattle",
"dur": 120
},
{
"n": 15,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Saudi Arabia vs Uruguay (Group H)",
"date": "2026-06-15",
"h": 18,
"m": 0,
"venue": "Hard Rock Stadium, Miami Gardens",
"dur": 120
},
{
"n": 16,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Iran vs New Zealand (Group G)",
"date": "2026-06-15",
"h": 21,
"m": 0,
"venue": "SoFi Stadium, Inglewood",
"dur": 120
},
{
"n": 17,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "France vs Senegal (Group I)",
"date": "2026-06-16",
"h": 15,
"m": 0,
"venue": "MetLife Stadium, East Rutherford",
"dur": 120
},
{
"n": 18,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Iraq vs Norway (Group I)",
"date": "2026-06-16",
"h": 18,
"m": 0,
"venue": "Gillette Stadium, Foxborough",
"dur": 120
},
{
"n": 19,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Argentina vs Algeria (Group J)",
"date": "2026-06-16",
"h": 21,
"m": 0,
"venue": "Arrowhead Stadium, Kansas City",
"dur": 120
},
{
"n": 20,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Austria vs Jordan (Group J)",
"date": "2026-06-17",
"h": 0,
"m": 0,
"venue": "Levi's Stadium, Santa Clara",
"dur": 120
},
{
"n": 21,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Portugal vs DR Congo (Group K)",
"date": "2026-06-17",
"h": 13,
"m": 0,
"venue": "NRG Stadium, Houston",
"dur": 120
},
{
"n": 22,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "England vs Croatia (Group L)",
"date": "2026-06-17",
"h": 16,
"m": 0,
"venue": "AT&T Stadium, Arlington",
"dur": 120
},
{
"n": 23,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Ghana vs Panama (Group L)",
"date": "2026-06-17",
"h": 19,
"m": 0,
"venue": "BMO Field, Toronto",
"dur": 120
},
{
"n": 24,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Uzbekistan vs Colombia (Group K)",
"date": "2026-06-17",
"h": 22,
"m": 0,
"venue": "Estadio Azteca, Mexico City",
"dur": 120
},
{
"n": 25,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Czechia vs South Africa (Group A)",
"date": "2026-06-18",
"h": 12,
"m": 0,
"venue": "Mercedes-Benz Stadium, Atlanta",
"dur": 120
},
{
"n": 26,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Switzerland vs Bosnia & Herzegovina (Group B)",
"date": "2026-06-18",
"h": 15,
"m": 0,
"venue": "SoFi Stadium, Inglewood",
"dur": 120
},
{
"n": 27,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Canada vs Qatar (Group B)",
"date": "2026-06-18",
"h": 18,
"m": 0,
"venue": "BC Place, Vancouver",
"dur": 120
},
{
"n": 28,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Mexico vs South Korea (Group A)",
"date": "2026-06-18",
"h": 21,
"m": 0,
"venue": "Estadio Akron, Zapopan",
"dur": 120
},
{
"n": 29,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "USA vs Australia (Group D)",
"date": "2026-06-19",
"h": 15,
"m": 0,
"venue": "Lumen Field, Seattle",
"dur": 120
},
{
"n": 30,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Scotland vs Morocco (Group C)",
"date": "2026-06-19",
"h": 18,
"m": 0,
"venue": "Gillette Stadium, Foxborough",
"dur": 120
},
{
"n": 31,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Brazil vs Haiti (Group C)",
"date": "2026-06-19",
"h": 20,
"m": 30,
"venue": "Lincoln Financial Field, Philadelphia",
"dur": 120
},
{
"n": 32,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Turkiye vs Paraguay (Group D)",
"date": "2026-06-19",
"h": 23,
"m": 0,
"venue": "Levi's Stadium, Santa Clara",
"dur": 120
},
{
"n": 33,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Netherlands vs Sweden (Group F)",
"date": "2026-06-20",
"h": 13,
"m": 0,
"venue": "NRG Stadium, Houston",
"dur": 120
},
{
"n": 34,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Germany vs Ivory Coast (Group E)",
"date": "2026-06-20",
"h": 16,
"m": 0,
"venue": "BMO Field, Toronto",
"dur": 120
},
{
"n": 35,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Ecuador vs Curacao (Group E)",
"date": "2026-06-20",
"h": 20,
"m": 0,
"venue": "Arrowhead Stadium, Kansas City",
"dur": 120
},
{
"n": 36,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Tunisia vs Japan (Group F)",
"date": "2026-06-21",
"h": 0,
"m": 0,
"venue": "Estadio BBVA, Monterrey",
"dur": 120
},
{
"n": 37,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Spain vs Saudi Arabia (Group H)",
"date": "2026-06-21",
"h": 12,
"m": 0,
"venue": "Mercedes-Benz Stadium, Atlanta",
"dur": 120
},
{
"n": 38,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Belgium vs Iran (Group G)",
"date": "2026-06-21",
"h": 15,
"m": 0,
"venue": "SoFi Stadium, Inglewood",
"dur": 120
},
{
"n": 39,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Uruguay vs Cape Verde (Group H)",
"date": "2026-06-21",
"h": 18,
"m": 0,
"venue": "Hard Rock Stadium, Miami Gardens",
"dur": 120
},
{
"n": 40,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "New Zealand vs Egypt (Group G)",
"date": "2026-06-21",
"h": 21,
"m": 0,
"venue": "BC Place, Vancouver",
"dur": 120
},
{
"n": 41,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Argentina vs Austria (Group J)",
"date": "2026-06-22",
"h": 13,
"m": 0,
"venue": "AT&T Stadium, Arlington",
"dur": 120
},
{
"n": 42,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "France vs Iraq (Group I)",
"date": "2026-06-22",
"h": 17,
"m": 0,
"venue": "Lincoln Financial Field, Philadelphia",
"dur": 120
},
{
"n": 43,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Norway vs Senegal (Group I)",
"date": "2026-06-22",
"h": 20,
"m": 0,
"venue": "MetLife Stadium, East Rutherford",
"dur": 120
},
{
"n": 44,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Jordan vs Algeria (Group J)",
"date": "2026-06-22",
"h": 23,
"m": 0,
"venue": "Levi's Stadium, Santa Clara",
"dur": 120
},
{
"n": 45,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Portugal vs Uzbekistan (Group K)",
"date": "2026-06-23",
"h": 13,
"m": 0,
"venue": "NRG Stadium, Houston",
"dur": 120
},
{
"n": 46,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "England vs Ghana (Group L)",
"date": "2026-06-23",
"h": 16,
"m": 0,
"venue": "Gillette Stadium, Foxborough",
"dur": 120
},
{
"n": 47,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Panama vs Croatia (Group L)",
"date": "2026-06-23",
"h": 19,
"m": 0,
"venue": "BMO Field, Toronto",
"dur": 120
},
{
"n": 48,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Colombia vs DR Congo (Group K)",
"date": "2026-06-23",
"h": 22,
"m": 0,
"venue": "Estadio Akron, Zapopan",
"dur": 120
},
{
"n": 49,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Switzerland vs Canada (Group B)",
"date": "2026-06-24",
"h": 15,
"m": 0,
"venue": "BC Place, Vancouver",
"dur": 120
},
{
"n": 50,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Bosnia & Herzegovina vs Qatar (Group B)",
"date": "2026-06-24",
"h": 15,
"m": 0,
"venue": "Lumen Field, Seattle",
"dur": 120
},
{
"n": 51,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Scotland vs Brazil (Group C)",
"date": "2026-06-24",
"h": 18,
"m": 0,
"venue": "Hard Rock Stadium, Miami Gardens",
"dur": 120
},
{
"n": 52,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Morocco vs Haiti (Group C)",
"date": "2026-06-24",
"h": 18,
"m": 0,
"venue": "Mercedes-Benz Stadium, Atlanta",
"dur": 120
},
{
"n": 53,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Czechia vs Mexico (Group A)",
"date": "2026-06-24",
"h": 21,
"m": 0,
"venue": "Estadio Azteca, Mexico City",
"dur": 120
},
{
"n": 54,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "South Africa vs South Korea (Group A)",
"date": "2026-06-24",
"h": 21,
"m": 0,
"venue": "Estadio BBVA, Monterrey",
"dur": 120
},
{
"n": 55,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Curacao vs Ivory Coast (Group E)",
"date": "2026-06-25",
"h": 16,
"m": 0,
"venue": "Lincoln Financial Field, Philadelphia",
"dur": 120
},
{
"n": 56,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Ecuador vs Germany (Group E)",
"date": "2026-06-25",
"h": 16,
"m": 0,
"venue": "MetLife Stadium, East Rutherford",
"dur": 120
},
{
"n": 57,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Japan vs Sweden (Group F)",
"date": "2026-06-25",
"h": 19,
"m": 0,
"venue": "AT&T Stadium, Arlington",
"dur": 120
},
{
"n": 58,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Tunisia vs Netherlands (Group F)",
"date": "2026-06-25",
"h": 19,
"m": 0,
"venue": "Arrowhead Stadium, Kansas City",
"dur": 120
},
{
"n": 59,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Turkiye vs USA (Group D)",
"date": "2026-06-25",
"h": 22,
"m": 0,
"venue": "SoFi Stadium, Inglewood",
"dur": 120
},
{
"n": 60,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Paraguay vs Australia (Group D)",
"date": "2026-06-25",
"h": 22,
"m": 0,
"venue": "Levi's Stadium, Santa Clara",
"dur": 120
},
{
"n": 61,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Norway vs France (Group I)",
"date": "2026-06-26",
"h": 15,
"m": 0,
"venue": "Gillette Stadium, Foxborough",
"dur": 120
},
{
"n": 62,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Senegal vs Iraq (Group I)",
"date": "2026-06-26",
"h": 15,
"m": 0,
"venue": "BMO Field, Toronto",
"dur": 120
},
{
"n": 63,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Cape Verde vs Saudi Arabia (Group H)",
"date": "2026-06-26",
"h": 20,
"m": 0,
"venue": "NRG Stadium, Houston",
"dur": 120
},
{
"n": 64,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Uruguay vs Spain (Group H)",
"date": "2026-06-26",
"h": 20,
"m": 0,
"venue": "Estadio Akron, Zapopan",
"dur": 120
},
{
"n": 65,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Egypt vs Iran (Group G)",
"date": "2026-06-26",
"h": 23,
"m": 0,
"venue": "Lumen Field, Seattle",
"dur": 120
},
{
"n": 66,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "New Zealand vs Belgium (Group G)",
"date": "2026-06-26",
"h": 23,
"m": 0,
"venue": "BC Place, Vancouver",
"dur": 120
},
{
"n": 67,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Panama vs England (Group L)",
"date": "2026-06-27",
"h": 17,
"m": 0,
"venue": "MetLife Stadium, East Rutherford",
"dur": 120
},
{
"n": 68,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Croatia vs Ghana (Group L)",
"date": "2026-06-27",
"h": 17,
"m": 0,
"venue": "Lincoln Financial Field, Philadelphia",
"dur": 120
},
{
"n": 69,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Colombia vs Portugal (Group K)",
"date": "2026-06-27",
"h": 19,
"m": 30,
"venue": "Hard Rock Stadium, Miami Gardens",
"dur": 120
},
{
"n": 70,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "DR Congo vs Uzbekistan (Group K)",
"date": "2026-06-27",
"h": 19,
"m": 30,
"venue": "Mercedes-Benz Stadium, Atlanta",
"dur": 120
},
{
"n": 71,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Algeria vs Austria (Group J)",
"date": "2026-06-27",
"h": 22,
"m": 0,
"venue": "Arrowhead Stadium, Kansas City",
"dur": 120
},
{
"n": 72,
"kind": "group",
"stage": "GROUP_STAGE",
"summary": "Jordan vs Argentina (Group J)",
"date": "2026-06-27",
"h": 22,
"m": 0,
"venue": "AT&T Stadium, Arlington",
"dur": 120
},
{
"n": 73,
"kind": "ko",
"stage": "LAST_32",
"prefix": "R32",
"label": "Runner-up A vs Runner-up B",
"home": null,
"away": null,
"result": null,
"date": "2026-06-28",
"h": 15,
"m": 0,
"venue": "SoFi Stadium, Inglewood",
"dur": 150
},
{
"n": 76,
"kind": "ko",
"stage": "LAST_32",
"prefix": "R32",
"label": "Winner C vs Runner-up F",
"home": null,
"away": null,
"result": null,
"date": "2026-06-29",
"h": 13,
"m": 0,
"venue": "NRG Stadium, Houston",
"dur": 150
},
{
"n": 74,
"kind": "ko",
"stage": "LAST_32",
"prefix": "R32",
"label": "Winner E vs Best 3rd (A/B/C/D/F)",
"home": null,
"away": null,
"result": null,
"date": "2026-06-29",
"h": 16,
"m": 30,
"venue": "Gillette Stadium, Foxborough",
"dur": 150
},
{
"n": 75,
"kind": "ko",
"stage": "LAST_32",
"prefix": "R32",
"label": "Winner F vs Runner-up C",
"home": null,
"away": null,
"result": null,
"date": "2026-06-29",
"h": 21,
"m": 0,
"venue": "Estadio BBVA, Monterrey",
"dur": 150
},
{
"n": 78,
"kind": "ko",
"stage": "LAST_32",
"prefix": "R32",
"label": "Runner-up E vs Runner-up I",
"home": null,
"away": null,
"result": null,
"date": "2026-06-30",
"h": 13,
"m": 0,
"venue": "AT&T Stadium, Arlington",
"dur": 150
},
{
"n": 77,
"kind": "ko",
"stage": "LAST_32",
"prefix": "R32",
"label": "Winner I vs Best 3rd (C/D/F/G/H)",
"home": null,
"away": null,
"result": null,
"date": "2026-06-30",
"h": 17,
"m": 0,
"venue": "MetLife Stadium, East Rutherford",
"dur": 150
},
{
"n": 79,
"kind": "ko",
"stage": "LAST_32",
"prefix": "R32",
"label": "Winner A vs Best 3rd (C/E/F/H/I)",
"home": null,
"away": null,
"result": null,
"date": "2026-06-30",
"h": 21,
"m": 0,
"venue": "Estadio Azteca, Mexico City",
"dur": 150
},
{
"n": 80,
"kind": "ko",
"stage": "LAST_32",
"prefix": "R32",
"label": "Winner L vs Best 3rd (E/H/I/J/K)",
"home": null,
"away": null,
"result": null,
"date": "2026-07-01",
"h": 12,
"m": 0,
"venue": "Mercedes-Benz Stadium, Atlanta",
"dur": 150
},
{
"n": 82,
"kind": "ko",
"stage": "LAST_32",
"prefix": "R32",
"label": "Winner G vs Best 3rd (A/E/H/I/J)",
"home": null,
"away": null,
"result": null,
"date": "2026-07-01",
"h": 16,
"m": 0,
"venue": "Lumen Field, Seattle",
"dur": 150
},
{
"n": 81,
"kind": "ko",
"stage": "LAST_32",
"prefix": "R32",
"label": "Winner D vs Best 3rd (B/E/F/I/J)",
"home": null,
"away": null,
"result": null,
"date": "2026-07-01",
"h": 20,
"m": 0,
"venue": "Levi's Stadium, Santa Clara",
"dur": 150
},
{
"n": 84,
"kind": "ko",
"stage": "LAST_32",
"prefix": "R32",
"label": "Winner H vs Runner-up J",
"home": null,
"away": null,
"result": null,
"date": "2026-07-02",
"h": 15,
"m": 0,
"venue": "SoFi Stadium, Inglewood",
"dur": 150
},
{
"n": 83,
"kind": "ko",
"stage": "LAST_32",
"prefix": "R32",
"label": "Runner-up K vs Runner-up L",
"home": null,
"away": null,
"result": null,
"date": "2026-07-02",
"h": 19,
"m": 0,
"venue": "BMO Field, Toronto",
"dur": 150
},
{
"n": 85,
"kind": "ko",
"stage": "LAST_32",
"prefix": "R32",
"label": "Winner B vs Best 3rd (E/F/G/I/J)",
"home": null,
"away": null,
"result": null,
"date": "2026-07-02",
"h": 23,
"m": 0,
"venue": "BC Place, Vancouver",
"dur": 150
},
{
"n": 88,
"kind": "ko",
"stage": "LAST_32",
"prefix": "R32",
"label": "Runner-up D vs Runner-up G",
"home": null,
"away": null,
"result": null,
"date": "2026-07-03",
"h": 14,
"m": 0,
"venue": "AT&T Stadium, Arlington",
"dur": 150
},
{
"n": 86,
"kind": "ko",
"stage": "LAST_32",
"prefix": "R32",
"label": "Winner J vs Runner-up H",
"home": null,
"away": null,
"result": null,
"date": "2026-07-03",
"h": 18,
"m": 0,
"venue": "Hard Rock Stadium, Miami Gardens",
"dur": 150
},
{
"n": 87,
"kind": "ko",
"stage": "LAST_32",
"prefix": "R32",
"label": "Winner K vs Best 3rd (D/E/I/J/L)",
"home": null,
"away": null,
"result": null,
"date": "2026-07-03",
"h": 21,
"m": 30,
"venue": "Arrowhead Stadium, Kansas City",
"dur": 150
},
{
"n": 90,
"kind": "ko",
"stage": "LAST_16",
"prefix": "R16",
"label": "Winner M73 vs Winner M75",
"home": null,
"away": null,
"result": null,
"date": "2026-07-04",
"h": 13,
"m": 0,
"venue": "NRG Stadium, Houston",
"dur": 150
},
{
"n": 89,
"kind": "ko",
"stage": "LAST_16",
"prefix": "R16",
"label": "Winner M74 vs Winner M77",
"home": null,
"away": null,
"result": null,
"date": "2026-07-04",
"h": 17,
"m": 0,
"venue": "Lincoln Financial Field, Philadelphia",
"dur": 150
},
{
"n": 91,
"kind": "ko",
"stage": "LAST_16",
"prefix": "R16",
"label": "Winner M76 vs Winner M78",
"home": null,
"away": null,
"result": null,
"date": "2026-07-05",
"h": 16,
"m": 0,
"venue": "MetLife Stadium, East Rutherford",
"dur": 150
},
{
"n": 92,
"kind": "ko",
"stage": "LAST_16",
"prefix": "R16",
"label": "Winner M79 vs Winner M80",
"home": null,
"away": null,
"result": null,
"date": "2026-07-05",
"h": 20,
"m": 0,
"venue": "Estadio Azteca, Mexico City",
"dur": 150
},
{
"n": 93,
"kind": "ko",
"stage": "LAST_16",
"prefix": "R16",
"label": "Winner M83 vs Winner M84",
"home": null,
"away": null,
"result": null,
"date": "2026-07-06",
"h": 15,
"m": 0,
"venue": "AT&T Stadium, Arlington",
"dur": 150
},
{
"n": 94,
"kind": "ko",
"stage": "LAST_16",
"prefix": "R16",
"label": "Winner M81 vs Winner M82",
"home": null,
"away": null,
"result": null,
"date": "2026-07-06",
"h": 20,
"m": 0,
"venue": "Lumen Field, Seattle",
"dur": 150
},
{
"n": 95,
"kind": "ko",
"stage": "LAST_16",
"prefix": "R16",
"label": "Winner M86 vs Winner M88",
"home": null,
"away": null,
"result": null,
"date": "2026-07-07",
"h": 12,
"m": 0,
"venue": "Mercedes-Benz Stadium, Atlanta",
"dur": 150
},
{
"n": 96,
"kind": "ko",
"stage": "LAST_16",
"prefix": "R16",
"label": "Winner M85 vs Winner M87",
"home": null,
"away": null,
"result": null,
"date": "2026-07-07",
"h": 16,
"m": 0,
"venue": "BC Place, Vancouver",
"dur": 150
},
{
"n": 97,
"kind": "ko",
"stage": "QUARTER_FINALS",
"prefix": "QF",
"label": "Winner M89 vs Winner M90",
"home": null,
"away": null,
"result": null,
"date": "2026-07-09",
"h": 16,
"m": 0,
"venue": "Gillette Stadium, Foxborough",
"dur": 150
},
{
"n": 98,
"kind": "ko",
"stage": "QUARTER_FINALS",
"prefix": "QF",
"label": "Winner M93 vs Winner M94",
"home": null,
"away": null,
"result": null,
"date": "2026-07-10",
"h": 15,
"m": 0,
"venue": "SoFi Stadium, Inglewood",
"dur": 150
},
{
"n": 99,
"kind": "ko",
"stage": "QUARTER_FINALS",
"prefix": "QF",
"label": "Winner M91 vs Winner M92",
"home": null,
"away": null,
"result": null,
"date": "2026-07-11",
"h": 17,
"m": 0,
"venue": "Hard Rock Stadium, Miami Gardens",
"dur": 150
},
{
"n": 100,
"kind": "ko",
"stage": "QUARTER_FINALS",
"prefix": "QF",
"label": "Winner M95 vs Winner M96",
"home": null,
"away": null,
"result": null,
"date": "2026-07-11",
"h": 21,
"m": 0,
"venue": "Arrowhead Stadium, Kansas City",
"dur": 150
},
{
"n": 101,
"kind": "ko",
"stage": "SEMI_FINALS",
"prefix": "SF",
"label": "Winner M97 vs Winner M98",
"home": null,
"away": null,
"result": null,
"date": "2026-07-14",
"h": 15,
"m": 0,
"venue": "AT&T Stadium, Arlington",
"dur": 150
},
{
"n": 102,
"kind": "ko",
"stage": "SEMI_FINALS",
"prefix": "SF",
"label": "Winner M99 vs Winner M100",
"home": null,
"away": null,
"result": null,
"date": "2026-07-15",
"h": 15,
"m": 0,
"venue": "Mercedes-Benz Stadium, Atlanta",
"dur": 150
},
{
"n": 103,
"kind": "ko",
"stage": "THIRD_PLACE",
"prefix": "3rd place",
"label": "Loser M101 vs Loser M102",
"home": null,
"away": null,
"result": null,
"date": "2026-07-18",
"h": 17,
"m": 0,
"venue": "Hard Rock Stadium, Miami Gardens",
"dur": 150
},
{
"n": 104,
"kind": "ko",
"stage": "FINAL",
"prefix": "WORLD CUP FINAL",
"label": "Winner M101 vs Winner M102",
"home": null,
"away": null,
"result": null,
"date": "2026-07-19",
"h": 15,
"m": 0,
"venue": "MetLife Stadium, East Rutherford",
"dur": 150
}
];
const STAGE_NAME = {"LAST_32": "Round of 32", "LAST_16": "Round of 16", "QUARTER_FINALS": "Quarter-final", "SEMI_FINALS": "Semi-final", "THIRD_PLACE": "Third-place play-off", "FINAL": "Final"};
const ET_TO_UTC_HRS = 4; // entire tournament (Jun 11 - Jul 19 2026) is EDT = UTC-4

const pad = (x) => String(x).padStart(2, "0");

function utcDateOf(e) {
  const [Y, Mo, D] = e.date.split("-").map(Number);
  return new Date(Date.UTC(Y, Mo - 1, D, e.h + ET_TO_UTC_HRS, e.m, 0));
}
function icsStamp(dt) {
  return dt.getUTCFullYear() + pad(dt.getUTCMonth() + 1) + pad(dt.getUTCDate())
       + "T" + pad(dt.getUTCHours()) + pad(dt.getUTCMinutes()) + "00Z";
}
function etDisp(h, m) {
  const ap = h < 12 ? "AM" : "PM";
  const h12 = (h % 12) || 12;
  return `${h12}:${pad(m)} ${ap} ET`;
}
function esc(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;")
    .replace(/,/g, "\\,").replace(/\n/g, "\\n");
}
function fold(line) {
  const bytes = Buffer.from(line, "utf8");
  if (bytes.length <= 75) return line;
  const out = [];
  let buf = bytes;
  while (buf.length > 75) {
    let cut = 75;
    while ((buf[cut] & 0xc0) === 0x80) cut--; // don't split a multibyte char
    out.push(buf.slice(0, cut).toString("utf8"));
    buf = Buffer.concat([Buffer.from(" "), buf.slice(cut)]);
  }
  out.push(buf.toString("utf8"));
  return out.join("\r\n");
}

function normStage(s) {
  s = String(s || "").toUpperCase();
  if (s.includes("GROUP")) return "GROUP_STAGE";
  if (s.includes("32")) return "LAST_32";
  if (s.includes("16")) return "LAST_16";
  if (s.includes("QUARTER")) return "QUARTER_FINALS";
  if (s.includes("SEMI")) return "SEMI_FINALS";
  if (s.includes("THIRD") || s.includes("3RD")) return "THIRD_PLACE";
  if (s.includes("FINAL")) return "FINAL";
  return s;
}

async function fetchLive() {
  const key = process.env.FOOTBALL_DATA_API_KEY;
  if (!key) {
    console.warn("[wc-feed] FOOTBALL_DATA_API_KEY not set; serving bracket placeholders.");
    return null;
  }
  try {
    const r = await fetch("https://api.football-data.org/v4/competitions/WC/matches", {
      headers: { "X-Auth-Token": key },
    });
    if (!r.ok) {
      // Surface the reason instead of silently falling back to placeholders.
      // 403 = key/plan lacks access to this competition, 429 = rate limited, etc.
      console.warn(`[wc-feed] football-data.org returned ${r.status} ${r.statusText}; serving placeholders.`);
      return null;
    }
    const data = await r.json();
    const matches = Array.isArray(data.matches) ? data.matches : null;
    // Log the distinct stage labels so a mismatch (e.g. the new Round of 32)
    // is visible in the function logs and can be mapped in normStage().
    const stages = matches ? [...new Set(matches.map((m) => m.stage))].join(", ") : "(none)";
    console.log(`[wc-feed] fetched ${matches ? matches.length : 0} matches; stages: ${stages}`);
    return matches;
  } catch (e) {
    console.warn(`[wc-feed] football-data.org fetch failed: ${e && e.message}; serving placeholders.`);
    return null;
  }
}

function overlay(schedule, apiMatches) {
  if (!apiMatches) return;
  const used = new Set();
  let koTotal = 0, filled = 0;
  for (const e of schedule) {
    if (e.kind !== "ko") continue;
    koTotal++;
    const target = utcDateOf(e).getTime();
    let best = null, bestDiff = Infinity, bestIdx = -1;
    apiMatches.forEach((m, idx) => {
      if (used.has(idx)) return;
      if (normStage(m.stage) !== e.stage) return;
      const home = m.homeTeam && m.homeTeam.name;
      const away = m.awayTeam && m.awayTeam.name;
      if (!home || !away) return;
      const diff = Math.abs(new Date(m.utcDate).getTime() - target);
      if (diff < bestDiff) { bestDiff = diff; best = m; bestIdx = idx; }
    });
    if (best && bestDiff <= 90 * 60 * 1000) { // tolerate <=90min scheduling drift
      used.add(bestIdx);
      e.home = best.homeTeam.name;
      e.away = best.awayTeam.name;
      const ft = best.status === "FINISHED" && best.score && best.score.fullTime;
      if (ft && best.score.fullTime.home != null) {
        e.result = `FT ${best.score.fullTime.home}-${best.score.fullTime.away}`;
      }
      filled++;
    }
  }
  // filled === 0 while matches were fetched points at a stage-label or
  // kickoff-time mismatch rather than a connectivity/auth problem.
  console.log(`[wc-feed] overlay matched ${filled}/${koTotal} knockout fixtures.`);
}

function buildICS(schedule) {
  const now = icsStamp(new Date());
  const lines = [
    "BEGIN:VCALENDAR", "VERSION:2.0",
    "PRODID:-//bsnydr//worldcup-2026-feed//EN", "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    fold("X-WR-CALNAME:FIFA World Cup 2026"),
    "X-WR-TIMEZONE:UTC",
    "REFRESH-INTERVAL;VALUE=DURATION:PT6H",
    "X-PUBLISHED-TTL:PT6H",
  ];
  for (const e of schedule) {
    const start = utcDateOf(e);
    const end = new Date(start.getTime() + e.dur * 60000);
    let summary, desc;
    if (e.kind === "group") {
      summary = e.summary;
      desc = `Group stage - Match ${e.n}. Kickoff ${etDisp(e.h, e.m)} (US Eastern). ${e.venue}.`;
    } else {
      const core = (e.home && e.away) ? `${e.home} vs ${e.away}` : e.label;
      summary = `${e.prefix}: ${core}`;
      if (e.result) summary += ` (${e.result})`;
      const status = e.result ? `Result: ${e.result}. `
                              : (e.home && e.away) ? "" : "Teams TBD on results. ";
      desc = `${STAGE_NAME[e.stage]} - Match ${e.n}. ${status}`
           + `Kickoff ${etDisp(e.h, e.m)} (US Eastern). ${e.venue}. `
           + `Teams update automatically as the bracket resolves.`;
    }
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:wc2026-m${e.n}@bsnydr`);
    lines.push(`DTSTAMP:${now}`);
    lines.push(`DTSTART:${icsStamp(start)}`);
    lines.push(`DTEND:${icsStamp(end)}`);
    lines.push(fold("SUMMARY:" + esc(summary)));
    lines.push(fold("LOCATION:" + esc(e.venue)));
    lines.push(fold("DESCRIPTION:" + esc(desc)));
    lines.push("END:VEVENT");
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n") + "\r\n";
}

export default async (req) => {
  const schedule = JSON.parse(JSON.stringify(SCHEDULE)); // fresh copy per request
  const apiMatches = await fetchLive();
  overlay(schedule, apiMatches);
  const body = buildICS(schedule);
  return new Response(body, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="worldcup.ics"',
      "Cache-Control": "public, max-age=1800",
      // Keep the stale window short so resolved team names/scores propagate in
      // ~1h at worst, not up to a day. The feed's whole value is freshness.
      "Netlify-CDN-Cache-Control": "public, max-age=1800, stale-while-revalidate=3600",
    },
  });
};

export const config = { path: "/worldcup.ics" };
