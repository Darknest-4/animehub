/* ==========================================================================
   AnimeHub – images.js
   Valódi képek betöltése a Jikan API-ból (MyAnimeList) futásidőben.

   Működés:
   - A lenti IMAGE_SOURCES összerendeli a placeholder fájlneveket egy-egy
     Jikan kereséssel (anime poszter / trailer háttérkép / karakter avatár).
   - Betöltéskor lekérjük a valódi kép URL-jét, kicseréljük a DOM-ban és a
     DATA objektumban is (így az újrarenderelt listák is a valódit használják).
   - Az eredmények localStorage-ba kerülnek 7 napra, így a következő
     betöltés azonnali és nem terheli az API-t.
   - Ha nincs internet vagy hibázik az API, a placeholder SVG-k maradnak.
   ========================================================================== */

const JIKAN = "https://api.jikan.moe/v4";
const CACHE_KEY = "animehub-images-v1";
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 nap
const REQUEST_DELAY = 450; // ms – Jikan limit: max ~3 kérés/mp

/* Placeholder fájlnév (kiterjesztés nélkül) → honnan jöjjön a valódi kép */
const IMAGE_SOURCES = {
  /* ----- Poszterek (anime keresés → nagy poszter) ----- */
  "poster-solo-leveling":    { type: "poster", q: "Solo Leveling" },
  "poster-demon-slayer":     { type: "poster", q: "Kimetsu no Yaiba Hashira Training" },
  "poster-jujutsu-kaisen":   { type: "poster", q: "Jujutsu Kaisen 2nd Season" },
  "poster-one-piece":        { type: "poster", q: "One Piece" },
  "poster-attack-on-titan":  { type: "poster", q: "Shingeki no Kyojin Final Season" },
  "poster-chainsaw-man":     { type: "poster", q: "Chainsaw Man" },
  "poster-bleach":           { type: "poster", q: "Bleach Sennen Kessen" },
  "poster-tokyo-revengers":  { type: "poster", q: "Tokyo Revengers" },
  "poster-hells-paradise":   { type: "poster", q: "Jigokuraku" },
  "poster-naruto-shippuden": { type: "poster", q: "Naruto Shippuuden" },
  "poster-naruto":           { type: "poster", q: "Naruto" },
  "poster-boruto":           { type: "poster", q: "Boruto Naruto Next Generations" },
  "poster-naruto-movie":     { type: "poster", q: "Naruto Movie 1" },
  "poster-wind-breaker":     { type: "poster", q: "Wind Breaker" },
  "poster-kaiju-8":          { type: "poster", q: "Kaijuu 8-gou" },
  "poster-my-hero-academia": { type: "poster", q: "Boku no Hero Academia 7th Season" },
  "poster-irregular-magic":  { type: "poster", q: "Mahouka Koukou no Rettousei" },
  "poster-black-clover":     { type: "poster", q: "Black Clover" },
  "poster-tokyo-ghoul":      { type: "poster", q: "Tokyo Ghoul" },
  "poster-frieren":          { type: "poster", q: "Sousou no Frieren" },
  "poster-spy-family":       { type: "poster", q: "Spy x Family" },
  "poster-blue-lock":        { type: "poster", q: "Blue Lock" },
  "poster-dandadan":         { type: "poster", q: "Dandadan" },
  "poster-vinland-saga":     { type: "poster", q: "Vinland Saga" },

  /* ----- Hátterek (trailer borítókép 16:9, ha nincs: poszter) ----- */
  "backdrop-solo-leveling":  { type: "backdrop", q: "Solo Leveling" },
  "backdrop-naruto":         { type: "backdrop", q: "Naruto Shippuuden" },
  "backdrop-sasuke":         { type: "backdrop", q: "Naruto Road to Ninja" },
  "backdrop-profile":        { type: "backdrop", q: "Naruto" },

  /* ----- Avatarok (karakter keresés) ----- */
  "avatar-akatsuki":  { type: "character", q: "Itachi Uchiha" },
  "avatar-itachi":    { type: "character", q: "Itachi Uchiha" },
  "avatar-sasuke":    { type: "character", q: "Sasuke Uchiha" },
  "avatar-sakura":    { type: "character", q: "Sakura Haruno" },
  "avatar-kakashi":   { type: "character", q: "Kakashi Hatake" },
  "avatar-shikamaru": { type: "character", q: "Shikamaru Nara" },
  "avatar-hinata":    { type: "character", q: "Hinata Hyuuga" },
  "avatar-gaara":     { type: "character", q: "Gaara" },
  "avatar-neji":      { type: "character", q: "Neji Hyuuga" },
  "avatar-rocklee":   { type: "character", q: "Rock Lee" },
  "avatar-tenten":    { type: "character", q: "Tenten" },
  "avatar-ino":       { type: "character", q: "Ino Yamanaka" },
  "avatar-choji":     { type: "character", q: "Chouji Akimichi" },
  "avatar-temari":    { type: "character", q: "Temari" },
  "avatar-kankuro":   { type: "character", q: "Kankurou" },
  "avatar-kiba":      { type: "character", q: "Kiba Inuzuka" },
  "avatar-shino":     { type: "character", q: "Shino Aburame" },

  /* ----- Epizód thumbnailek (Naruto Shippuden epizód videók) ----- */
  "thumb-ep454": { type: "episode", index: 0 },
  "thumb-ep455": { type: "episode", index: 1 },
  "thumb-ep456": { type: "episode", index: 2 },
  "thumb-ep457": { type: "episode", index: 3 },
  "thumb-ep458": { type: "episode", index: 4 },
  "thumb-ep459": { type: "episode", index: 5 },
  "thumb-ep460": { type: "episode", index: 6 },
};

const NARUTO_SHIPPUDEN_ID = 1735; // MAL azonosító az epizód thumbnailekhez

/* ----- Cache ----- */
function loadCache() {
  try {
    const raw = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
    if (raw && Date.now() - raw.savedAt < CACHE_TTL) return raw.urls || {};
  } catch (e) { /* sérült cache – kezdjük újra */ }
  return {};
}

function saveCache(urls) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), urls }));
  } catch (e) { /* pl. betelt a localStorage – nem gond */ }
}

/* ----- Kép alkalmazása: DOM + DATA ----- */
function applyImage(key, url) {
  const placeholder = `assets/img/${key}.svg`;

  // Minden <img>, ami ezt a placeholdert használja
  document.querySelectorAll(`img[src$="${key}.svg"]`).forEach((img) => {
    img.src = url;
    // skeleton shimmer, amíg az új kép betölt (main.js)
    if (typeof watchImage === "function") watchImage(img);
  });

  // A DATA objektumban is átírjuk, hogy az újrarenderelés (pl. csapat
  // szűrés) már a valódi képet használja
  if (typeof DATA !== "undefined") replaceInObject(DATA, placeholder, url);
}

function replaceInObject(obj, from, to) {
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if (typeof v === "string") {
      if (v === from) obj[k] = to;
    } else if (v && typeof v === "object") {
      replaceInObject(v, from, to);
    }
  }
}

/* ----- Jikan lekérések ----- */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function jikan(path) {
  const res = await fetch(`${JIKAN}${path}`);
  if (!res.ok) throw new Error(`Jikan ${res.status}`);
  return res.json();
}

async function fetchPoster(q) {
  const d = await jikan(`/anime?q=${encodeURIComponent(q)}&limit=1`);
  return d.data?.[0]?.images?.jpg?.large_image_url || null;
}

async function fetchBackdrop(q) {
  const d = await jikan(`/anime?q=${encodeURIComponent(q)}&limit=1`);
  const a = d.data?.[0];
  return a?.trailer?.images?.maximum_image_url
      || a?.trailer?.images?.large_image_url
      || a?.images?.jpg?.large_image_url
      || null;
}

async function fetchCharacter(q) {
  const d = await jikan(`/characters?q=${encodeURIComponent(q)}&limit=1`);
  return d.data?.[0]?.images?.jpg?.image_url || null;
}

let episodeThumbs = null; // egyszer kérjük le, minden thumb ebből kap képet
async function fetchEpisodeThumb(index) {
  if (!episodeThumbs) {
    const d = await jikan(`/anime/${NARUTO_SHIPPUDEN_ID}/videos`);
    episodeThumbs = (d.data?.episodes || [])
      .map((e) => e.images?.jpg?.image_url)
      .filter(Boolean);
  }
  return episodeThumbs[index] || episodeThumbs[0] || null;
}

/* ----- Fő folyamat ----- */
async function loadRealImages() {
  const cache = loadCache();
  const resolved = { ...cache };

  // Ami már cache-ben van, azonnal alkalmazzuk
  for (const [key, url] of Object.entries(cache)) applyImage(key, url);

  // A többit sorban, késleltetve kérjük le (API limit miatt)
  const dedupe = {}; // ugyanaz a keresés csak egyszer fusson
  for (const [key, src] of Object.entries(IMAGE_SOURCES)) {
    if (resolved[key]) continue;

    try {
      let url = null;
      const dedupeKey = `${src.type}:${src.q ?? src.index}`;

      if (dedupe[dedupeKey]) {
        url = dedupe[dedupeKey];
      } else {
        if (src.type === "poster") url = await fetchPoster(src.q);
        else if (src.type === "backdrop") url = await fetchBackdrop(src.q);
        else if (src.type === "character") url = await fetchCharacter(src.q);
        else if (src.type === "episode") url = await fetchEpisodeThumb(src.index);
        await sleep(REQUEST_DELAY);
        if (url) dedupe[dedupeKey] = url;
      }

      if (url) {
        resolved[key] = url;
        applyImage(key, url);
        saveCache(resolved);
      }
    } catch (e) {
      // Nincs net / API hiba → marad a placeholder, nem állunk le
      console.warn(`Képbetöltés kihagyva (${key}):`, e.message);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadRealImages();
});
