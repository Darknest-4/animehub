/* ==========================================================================
   AnimeHub – jikan.js
   Közös Jikan API (MyAnimeList) réteg ÉLŐ ADATOKHOZ.

   - Minden lekérés sorba áll (rate limit: ~3 kérés/mp), és localStorage-ba
     cache-elődik, így az ismételt betöltés azonnali.
   - Ha nincs internet / hibázik az API, a hívó a demó adatoknál marad.
   - A képeket továbbra is az images.js kezeli; ez a modul az ADATOKAT adja.
   ========================================================================== */

const JIKAN_API = "https://api.jikan.moe/v4";
const JIKAN_CACHE_KEY = "animehub-data-v1";
const JIKAN_CACHE_TTL = 60 * 60 * 1000; // 1 óra
const JIKAN_DELAY = 420;                // ms két kérés között

/* ----- Cache ----- */
function jikanCacheLoad() {
  try {
    const raw = JSON.parse(localStorage.getItem(JIKAN_CACHE_KEY) || "{}");
    return raw && typeof raw === "object" ? raw : {};
  } catch (e) { return {}; }
}

function jikanCacheSave(cache) {
  try { localStorage.setItem(JIKAN_CACHE_KEY, JSON.stringify(cache)); }
  catch (e) { /* betelt a tároló – nem gond */ }
}

/* ----- Sorba állított lekérés cache-sel ----- */
let jikanQueue = Promise.resolve();

function jikanGet(path) {
  const cache = jikanCacheLoad();
  const hit = cache[path];
  if (hit && Date.now() - hit.t < JIKAN_CACHE_TTL) {
    return Promise.resolve(hit.d);
  }

  const run = jikanQueue.then(async () => {
    const res = await fetch(`${JIKAN_API}${path}`);
    if (!res.ok) throw new Error(`Jikan ${res.status}`);
    const json = await res.json();

    const c = jikanCacheLoad();
    c[path] = { t: Date.now(), d: json.data };
    jikanCacheSave(c);

    await new Promise((r) => setTimeout(r, JIKAN_DELAY));
    return json.data;
  });

  // A sor akkor is menjen tovább, ha ez a kérés hibázik
  jikanQueue = run.catch(() => {});
  return run;
}

/* ==========================================================================
   Leképezés a saját formátumunkra
   ========================================================================== */
function mapAnime(a) {
  return {
    id: a.mal_id,
    title: a.title_english || a.title,
    jpTitle: a.title_japanese || "",
    image: a.images?.jpg?.large_image_url || a.images?.jpg?.image_url || "",
    backdrop: a.trailer?.images?.maximum_image_url || a.trailer?.images?.large_image_url || "",
    rating: a.score || null,
    votes: a.scored_by || 0,
    rank: a.rank || null,
    year: a.year || a.aired?.prop?.from?.year || "",
    type: a.type || "TV",
    eps: a.episodes || null,
    duration: (a.duration || "").replace(" per ep", "").replace("min", "perc"),
    ageRating: (a.rating || "").split(" ")[0] || "",
    status: jikanStatusHu(a.status),
    airing: a.status === "Currently Airing",
    genres: (a.genres || []).map((g) => g.name),
    synopsis: a.synopsis || "",
    studio: a.studios?.[0]?.name || "—",
    source: a.source || "—",
    aired: a.aired?.string || "",
    season: a.season || "",
  };
}

function jikanStatusHu(status) {
  return {
    "Finished Airing": "Befejezett",
    "Currently Airing": "Jelenleg fut",
    "Not yet aired": "Hamarosan",
  }[status] || status || "—";
}

/* ==========================================================================
   Kényelmi lekérések (mindegyik mapAnime-olt listát/objektumot ad)
   ========================================================================== */
const Jikan = {
  /** Legnépszerűbb animék */
  top: (limit = 10, filter = "") =>
    jikanGet(`/top/anime?limit=${limit}${filter ? `&filter=${filter}` : ""}`)
      .then((d) => d.map(mapAnime)),

  /** Aktuális szezon újdonságai */
  seasonNow: (limit = 8) =>
    jikanGet(`/seasons/now?limit=${limit}&sfw`)
      .then((d) => d.map(mapAnime)),

  /** Keresés */
  search: (q, limit = 10) =>
    jikanGet(`/anime?q=${encodeURIComponent(q)}&limit=${limit}&sfw&order_by=members&sort=desc`)
      .then((d) => d.map(mapAnime)),

  /** Egy anime teljes adatlapja */
  full: (id) => jikanGet(`/anime/${id}/full`),

  /** Epizódlista (első oldal) */
  episodes: (id) => jikanGet(`/anime/${id}/episodes`),

  /** Értékelés eloszlás */
  statistics: (id) => jikanGet(`/anime/${id}/statistics`),

  /** Napi sugárzási menetrend (monday..sunday) */
  schedule: (day) =>
    jikanGet(`/schedules?filter=${day}&sfw&limit=12`)
      .then((d) => d.map(mapAnime)),
};

/* ==========================================================================
   Link segéd: anime adatlap URL (id-vel, vagy cím alapján)
   ========================================================================== */
function animeLink(item) {
  if (item && item.id) return `anime.html?id=${item.id}`;
  if (item && item.title) return `anime.html?q=${encodeURIComponent(item.title)}`;
  return "anime.html";
}
