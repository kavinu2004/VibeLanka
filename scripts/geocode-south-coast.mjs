// One-shot geocoder for the 35 south coast areas seeded in baad024 (D-011).
// Writes a CSV to scripts/output/south_coast_coordinates.csv for founder
// review. Output is gitignored. A follow-up commit converts the reviewed
// CSV into an UPDATE migration that writes coordinates to areas.center +
// radius_m.
//
// Runs sequentially with a 100ms gap between requests. Sri Lanka country
// filter applied. Never logs the API key.
//
// Usage (from repo root):
//   node scripts/geocode-south-coast.mjs

import { readFileSync, mkdirSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";

// --- env loading (no dotenv dep; this is a one-shot script) ---------------

const envPath = resolve(process.cwd(), ".env.local");
let envText;
try {
  envText = readFileSync(envPath, "utf8");
} catch {
  console.error("Could not read .env.local at repo root. Run from repo root and ensure .env.local exists.");
  process.exit(1);
}
for (const line of envText.split("\n")) {
  const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (match) process.env[match[1]] = match[2].trim();
}
if (!process.env.GOOGLE_MAPS_API_KEY) {
  console.error("GOOGLE_MAPS_API_KEY not found in .env.local");
  process.exit(1);
}

// --- areas (mirror of supabase/seed/south_coast_areas.sql, west to east) --

const AREAS = [
  { slug: "south-coast", name: "South Coast", isParent: true, queryHint: "South Coast Sri Lanka" },
  { slug: "beruwala", name: "Beruwala", queryHint: "Beruwala, Sri Lanka" },
  { slug: "kosgoda", name: "Kosgoda", queryHint: "Kosgoda, Sri Lanka" },
  { slug: "ahungalla", name: "Ahungalla", queryHint: "Ahungalla, Sri Lanka" },
  { slug: "balapitiya", name: "Balapitiya", queryHint: "Balapitiya, Sri Lanka" },
  { slug: "bentota", name: "Bentota", queryHint: "Bentota, Sri Lanka" },
  { slug: "ambalangoda", name: "Ambalangoda", queryHint: "Ambalangoda, Sri Lanka" },
  { slug: "hikkaduwa", name: "Hikkaduwa", queryHint: "Hikkaduwa, Sri Lanka" },
  { slug: "rumassala", name: "Rumassala", queryHint: "Rumassala, Sri Lanka" },
  { slug: "galle", name: "Galle", queryHint: "Galle, Sri Lanka" },
  { slug: "unawatuna", name: "Unawatuna", queryHint: "Unawatuna, Sri Lanka" },
  { slug: "dalawella", name: "Dalawella", queryHint: "Dalawella, Sri Lanka" },
  { slug: "thalpe-habaraduwa", name: "Thalpe & Habaraduwa", queryHint: "Thalpe Habaraduwa, Sri Lanka" },
  { slug: "koggala", name: "Koggala", queryHint: "Koggala, Sri Lanka" },
  { slug: "ahangama", name: "Ahangama", queryHint: "Ahangama, Sri Lanka" },
  { slug: "midigama", name: "Midigama", queryHint: "Midigama, Sri Lanka" },
  { slug: "weligama", name: "Weligama", queryHint: "Weligama, Sri Lanka" },
  { slug: "mirissa", name: "Mirissa", queryHint: "Mirissa, Sri Lanka" },
  { slug: "madiha", name: "Madiha", queryHint: "Madiha, Sri Lanka" },
  { slug: "polhena", name: "Polhena", queryHint: "Polhena, Sri Lanka" },
  { slug: "matara", name: "Matara", queryHint: "Matara, Sri Lanka" },
  { slug: "devundara", name: "Devundara", queryHint: "Devundara, Sri Lanka" },
  { slug: "talalla", name: "Talalla", queryHint: "Talalla, Sri Lanka" },
  { slug: "dickwella", name: "Dickwella", queryHint: "Dickwella, Sri Lanka" },
  { slug: "hiriketiya", name: "Hiriketiya", queryHint: "Hiriketiya, Sri Lanka" },
  { slug: "goyambokka", name: "Goyambokka", queryHint: "Goyambokka, Sri Lanka" },
  { slug: "tangalle", name: "Tangalle", queryHint: "Tangalle, Sri Lanka" },
  { slug: "rekawa", name: "Rekawa", queryHint: "Rekawa, Sri Lanka" },
  { slug: "kalametiya", name: "Kalametiya", queryHint: "Kalametiya, Sri Lanka" },
  { slug: "hambantota", name: "Hambantota", queryHint: "Hambantota, Sri Lanka" },
  { slug: "bundala", name: "Bundala", queryHint: "Bundala, Sri Lanka" },
  { slug: "weerawila", name: "Weerawila", queryHint: "Weerawila, Sri Lanka" },
  { slug: "tissamaharama", name: "Tissamaharama", queryHint: "Tissamaharama, Sri Lanka" },
  { slug: "yala", name: "Yala", queryHint: "Yala National Park, Sri Lanka" },
  { slug: "mattala", name: "Mattala", queryHint: "Mattala, Sri Lanka" },
];

// --- helpers --------------------------------------------------------------

// South-coast bounding box: rough rectangle covering Beruwala (west) to
// Mattala (east). Anything outside is flagged for founder review.
const COAST_BBOX = { latMin: 5.8, latMax: 6.3, lngMin: 79.9, lngMax: 81.5 };

const RADIUS_BY_TYPE = {
  locality: 2500,
  sublocality: 1500,
  sublocality_level_1: 1500,
  neighborhood: 1200,
  natural_feature: 800,
  tourist_attraction: 1000,
  establishment: 800,
  point_of_interest: 800,
};
const DEFAULT_RADIUS_M = 1500;
const PARENT_RADIUS_M = 60000;

const LOW_PRECISION_TYPES = new Set([
  "country",
  "administrative_area_level_1",
  "administrative_area_level_2",
]);

function suggestRadius(geocoderType, isParent) {
  if (isParent) return PARENT_RADIUS_M;
  return RADIUS_BY_TYPE[geocoderType] ?? DEFAULT_RADIUS_M;
}

function confidenceNote(lat, lng, geocoderType) {
  const notes = [];
  if (lat < COAST_BBOX.latMin || lat > COAST_BBOX.latMax || lng < COAST_BBOX.lngMin || lng > COAST_BBOX.lngMax) {
    notes.push("off_coast");
  }
  if (LOW_PRECISION_TYPES.has(geocoderType)) {
    notes.push("low_precision");
  }
  if (geocoderType && !(geocoderType in RADIUS_BY_TYPE) && !LOW_PRECISION_TYPES.has(geocoderType)) {
    notes.push("review_radius");
  }
  return notes.join(";");
}

function csvEscape(value) {
  if (value === null || value === undefined) return "";
  const s = String(value);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function buildUrl(queryHint) {
  const params = new URLSearchParams({
    address: queryHint,
    region: "lk",
    components: "country:LK",
    key: process.env.GOOGLE_MAPS_API_KEY,
  });
  return `https://maps.googleapis.com/maps/api/geocode/json?${params.toString()}`;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// --- main loop ------------------------------------------------------------

const rows = [];
let okCount = 0;
let failCount = 0;
const suspicious = [];

for (const area of AREAS) {
  let row;
  try {
    const res = await fetch(buildUrl(area.queryHint));
    const json = await res.json();

    if (json.status === "OVER_QUERY_LIMIT") {
      console.error(`STOP: OVER_QUERY_LIMIT on ${area.slug}. Halting to avoid further quota burn.`);
      process.exit(2);
    }
    if (json.status === "REQUEST_DENIED") {
      console.error(`STOP: REQUEST_DENIED on ${area.slug}. Likely API restriction misconfig.`);
      console.error(`error_message: ${json.error_message ?? "(none)"}`);
      process.exit(3);
    }

    if (json.status === "OK" && Array.isArray(json.results) && json.results.length > 0) {
      const r = json.results[0];
      const lat = r.geometry?.location?.lat ?? null;
      const lng = r.geometry?.location?.lng ?? null;
      const geocoderType = Array.isArray(r.types) ? r.types[0] : "";
      const formatted = r.formatted_address ?? "";
      const radius = suggestRadius(geocoderType, area.isParent);
      const note = area.isParent ? "" : confidenceNote(lat, lng, geocoderType);
      row = {
        slug: area.slug,
        name: area.name,
        lat,
        lng,
        suggested_radius_m: radius,
        geocoder_type: geocoderType,
        formatted_address: formatted,
        confidence_note: note,
      };
      okCount += 1;
      if (note) suspicious.push(area.slug);
      console.log(`  ok    ${area.slug.padEnd(22)} ${geocoderType.padEnd(20)} r=${radius}m${note ? ` [${note}]` : ""}`);
    } else if (json.status === "ZERO_RESULTS") {
      row = blankRow(area, "no_geocoder_match");
      failCount += 1;
      console.log(`  miss  ${area.slug.padEnd(22)} ZERO_RESULTS`);
    } else if (json.status === "INVALID_REQUEST") {
      row = blankRow(area, "invalid_request");
      failCount += 1;
      console.log(`  miss  ${area.slug.padEnd(22)} INVALID_REQUEST`);
    } else {
      row = blankRow(area, `status:${json.status ?? "unknown"}`);
      failCount += 1;
      console.log(`  miss  ${area.slug.padEnd(22)} ${json.status ?? "unknown"}`);
    }
  } catch (err) {
    row = blankRow(area, "fetch_error");
    failCount += 1;
    console.log(`  err   ${area.slug.padEnd(22)} ${err.message}`);
  }

  rows.push(row);
  await sleep(100);
}

function blankRow(area, note) {
  return {
    slug: area.slug,
    name: area.name,
    lat: null,
    lng: null,
    suggested_radius_m: area.isParent ? PARENT_RADIUS_M : null,
    geocoder_type: "",
    formatted_address: "",
    confidence_note: note,
  };
}

// --- write CSV ------------------------------------------------------------

const outPath = resolve(process.cwd(), "scripts/output/south_coast_coordinates.csv");
mkdirSync(dirname(outPath), { recursive: true });

const HEADER = "slug,name,lat,lng,suggested_radius_m,geocoder_type,formatted_address,confidence_note";
const body = rows.map((r) =>
  [r.slug, r.name, r.lat, r.lng, r.suggested_radius_m, r.geocoder_type, r.formatted_address, r.confidence_note]
    .map(csvEscape)
    .join(","),
).join("\n");
writeFileSync(outPath, HEADER + "\n" + body + "\n", "utf8");

// --- summary --------------------------------------------------------------

console.log("");
console.log(`Total areas processed:  ${AREAS.length}`);
console.log(`Successful geocodes:    ${okCount}`);
console.log(`Failed / no-match:      ${failCount}`);
console.log(`Suspicious (review):    ${suspicious.length}${suspicious.length ? ` — ${suspicious.join(", ")}` : ""}`);
console.log(`CSV written to:         ${outPath}`);
console.log("");
console.log("Next: review the CSV, edit anything wrong, hand back for the populate migration.");
