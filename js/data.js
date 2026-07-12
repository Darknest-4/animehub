/* ==========================================================================
   AnimeHub – data.js
   Központi adatforrás: minden oldal ebből dolgozik.
   A képek az assets/img mappában lévő placeholderek – cseréld őket
   valódi képekre, csak az útvonalakat kell átírni.
   ========================================================================== */

/* ----- Globális beállítások ----- */
const CONFIG = {
  /* A lejátszóban futó videó – tedd a saját fájlod az elejére, pl.
     "assets/video/ep456.mp4". A lejátszó sorban próbálja a forrásokat,
     amíg az egyik el nem indul (alapból nyílt forrású demóvideók). */
  videoSources: [
    "assets/video/ep456.webm",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://ia800300.us.archive.org/17/items/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
  ],
};

const DATA = {

  /* ----- Kezdőlap: hero carousel ----- */
  heroSlides: [
    {
      title: "Solo Leveling",
      rating: 9.3,
      genres: ["Akció", "Kaland", "Fantasy"],
      year: 2024,
      desc: "A világ leggyengébb vadásza egy nap olyan képességre tesz szert, amellyel minden határon túl fejlődhet.",
      image: "assets/img/backdrop-solo-leveling.svg",
    },
    {
      title: "Naruto Shippuden",
      rating: 9.1,
      genres: ["Akció", "Kaland", "Dráma"],
      year: 2007,
      desc: "Naruto visszatér Konoha falujába, és új kihívások elé néz, miközben az Akatsuki fenyegetése egyre nagyobbá válik.",
      image: "assets/img/backdrop-naruto.svg",
    },
    {
      title: "Itachi története",
      rating: 9.5,
      genres: ["Dráma", "Akció"],
      year: 2016,
      desc: "Egy zseni shinobi tragikus útja, aki mindent feláldozott a falujáért és a testvéréért.",
      image: "assets/img/backdrop-sasuke.svg",
    },
  ],

  /* ----- Kezdőlap: folytasd, ahol abbahagytad ----- */
  continueWatching: [
    { title: "Jujutsu Kaisen",              ep: "2. évad 18. epizód", progress: 82, image: "assets/img/poster-jujutsu-kaisen.svg" },
    { title: "Chainsaw Man",                ep: "1. évad 7. epizód",  progress: 45, image: "assets/img/poster-chainsaw-man.svg" },
    { title: "Bleach: Thousand-Year Blood War", ep: "2. évad 5. epizód", progress: 64, image: "assets/img/poster-bleach.svg" },
    { title: "Tokyo Revengers",             ep: "3. évad 4. epizód",  progress: 30, image: "assets/img/poster-tokyo-revengers.svg" },
    { title: "Hell's Paradise",             ep: "1. évad 9. epizód",  progress: 71, image: "assets/img/poster-hells-paradise.svg" },
    { title: "Naruto Shippuden",            ep: "456. epizód",        progress: 96, image: "assets/img/poster-naruto-shippuden.svg" },
  ],

  /* ----- Kezdőlap: népszerű animék ----- */
  popular: [
    { title: "Solo Leveling",                  rating: 9.3, isNew: true,  image: "assets/img/poster-solo-leveling.svg" },
    { title: "Demon Slayer: Hashira Training Arc", rating: 9.1, isNew: false, image: "assets/img/poster-demon-slayer.svg" },
    { title: "Jujutsu Kaisen Season 2",        rating: 9.0, isNew: false, image: "assets/img/poster-jujutsu-kaisen.svg" },
    { title: "One Piece",                      rating: 9.0, isNew: true,  image: "assets/img/poster-one-piece.svg" },
    { title: "Attack on Titan Final Season",   rating: 9.0, isNew: false, image: "assets/img/poster-attack-on-titan.svg" },
    { title: "Chainsaw Man",                   rating: 8.8, isNew: false, image: "assets/img/poster-chainsaw-man.svg" },
    { title: "Frieren",                        rating: 9.2, isNew: false, image: "assets/img/poster-frieren.svg" },
    { title: "Vinland Saga",                   rating: 8.9, isNew: false, image: "assets/img/poster-vinland-saga.svg" },
  ],

  /* ----- Kezdőlap: frissen hozzáadva ----- */
  fresh: [
    { title: "Dandadan",        rating: 8.9, isNew: true, image: "assets/img/poster-dandadan.svg" },
    { title: "Blue Lock",       rating: 8.6, isNew: true, image: "assets/img/poster-blue-lock.svg" },
    { title: "Spy x Family",    rating: 8.8, isNew: true, image: "assets/img/poster-spy-family.svg" },
    { title: "Kaiju No. 8",     rating: 8.5, isNew: true, image: "assets/img/poster-kaiju-8.svg" },
    { title: "Wind Breaker",    rating: 8.4, isNew: true, image: "assets/img/poster-wind-breaker.svg" },
    { title: "Black Clover",    rating: 8.6, isNew: true, image: "assets/img/poster-black-clover.svg" },
    { title: "My Hero Academia",rating: 8.7, isNew: true, image: "assets/img/poster-my-hero-academia.svg" },
  ],

  /* ----- Kezdőlap: népszerű most (top 5) ----- */
  topNow: [
    { title: "Solo Leveling",                  rating: 9.3, image: "assets/img/poster-solo-leveling.svg" },
    { title: "Demon Slayer: Hashira Training Arc", rating: 9.1, image: "assets/img/poster-demon-slayer.svg" },
    { title: "Jujutsu Kaisen Season 2",        rating: 9.0, image: "assets/img/poster-jujutsu-kaisen.svg" },
    { title: "One Piece",                      rating: 9.0, image: "assets/img/poster-one-piece.svg" },
    { title: "Attack on Titan Final Season",   rating: 9.0, image: "assets/img/poster-attack-on-titan.svg" },
  ],

  /* ----- Kezdőlap: mai ütemezés ----- */
  schedule: [
    { time: "16:30", title: "Wind Breaker",              ep: "2. évad 6. epizód",   image: "assets/img/poster-wind-breaker.svg" },
    { time: "17:00", title: "Kaiju No. 8",               ep: "1. évad 7. epizód",   image: "assets/img/poster-kaiju-8.svg" },
    { time: "18:30", title: "My Hero Academia",          ep: "7. évad 10. epizód",  image: "assets/img/poster-my-hero-academia.svg" },
    { time: "19:00", title: "The Irregular at Magic High School", ep: "3. évad 5. epizód", image: "assets/img/poster-irregular-magic.svg" },
    { time: "23:30", title: "Black Clover",              ep: "1. évad 170. epizód", image: "assets/img/poster-black-clover.svg" },
  ],

  /* ----- Lejátszó: epizódlista ----- */
  episodes: [
    { num: 454, title: "A sötétség kezdete",  image: "assets/img/thumb-ep454.svg" },
    { num: 455, title: "Az árnyék mélyén",    image: "assets/img/thumb-ep455.svg" },
    { num: 456, title: "Itachi története",    image: "assets/img/thumb-ep456.svg", current: true },
    { num: 457, title: "Testvéri kötelék",    image: "assets/img/thumb-ep457.svg" },
    { num: 458, title: "Az igazság",          image: "assets/img/thumb-ep458.svg" },
    { num: 459, title: "A döntés",            image: "assets/img/thumb-ep459.svg" },
    { num: 460, title: "Madara megjelenése",  image: "assets/img/thumb-ep460.svg" },
  ],

  /* ----- Lejátszó: feliratsorok (CC) – másodperc alapú időzítés ----- */
  subtitles: [
    { start: 0,   end: 6,   text: "Az igazi erő nem a testben rejlik,\nhanem a szívben." },
    { start: 6,   end: 12,  text: "Aki a társaiért harcol,\nsosem veszíthet igazán." },
    { start: 12,  end: 18,  text: "A fájdalom tesz minket erősebbé." },
    { start: 18,  end: 25,  text: "Egy shinobi útja sosem egyenes." },
    { start: 25,  end: 32,  text: "A béke áldozatok nélkül csak illúzió." },
  ],

  /* ----- Anime adatlap: évadok és epizódjaik ----- */
  seasons: {
    "1. évad": [
      { num: 1, title: "Hazatérés",              duration: "23:55" },
      { num: 2, title: "Az Akatsuki mozgolódik", duration: "23:55" },
      { num: 3, title: "Az edzés gyümölcse",     duration: "23:55" },
      { num: 4, title: "Az új Kakashi-csapat",   duration: "23:55" },
    ],
    "2. évad": [
      { num: 33, title: "Az új célpont",          duration: "23:55" },
      { num: 34, title: "A formula titka",        duration: "23:55" },
      { num: 35, title: "Egy nyugtalanító sejtés",duration: "23:55" },
      { num: 36, title: "A hamis mosoly",         duration: "23:55" },
    ],
    "21. évad": [
      { num: 430, title: "Naruto halála?!",       duration: "23:55" },
      { num: 431, title: "A végtelen Tsukuyomi",  duration: "23:55" },
      { num: 432, title: "A rivális",             duration: "23:55" },
      { num: 433, title: "Az álomvilág",          duration: "23:55" },
    ],
    "22. évad": [
      { num: 454, title: "A sötétség kezdete",   duration: "23:55" },
      { num: 455, title: "Az árnyék mélyén",     duration: "23:55" },
      { num: 456, title: "Itachi története",     duration: "23:55", watching: true },
      { num: 457, title: "Testvéri kötelék",     duration: "23:55" },
      { num: 458, title: "Az igazság",           duration: "23:55" },
    ],
  },
  defaultSeason: "22. évad",

  /* ----- Profil: kedvenc animék ----- */
  favorites: [
    { rank: 1, title: "Naruto Shippuden", rating: 9.3, image: "assets/img/poster-naruto-shippuden.svg" },
    { rank: 2, title: "Attack on Titan",  rating: 9.2, image: "assets/img/poster-attack-on-titan.svg" },
    { rank: 3, title: "Demon Slayer",     rating: 9.1, image: "assets/img/poster-demon-slayer.svg" },
    { rank: 4, title: "Jujutsu Kaisen",   rating: 9.0, image: "assets/img/poster-jujutsu-kaisen.svg" },
    { rank: 5, title: "Tokyo Ghoul",      rating: 8.8, image: "assets/img/poster-tokyo-ghoul.svg" },
  ],

  /* ----- Profil: folytatás alatt ----- */
  continuing: [
    { title: "Wind Breaker",   ep: "2. évad 6. epizód",  progress: 75, image: "assets/img/poster-wind-breaker.svg" },
    { title: "Kaiju No. 8",    ep: "1. évad 7. epizód",  progress: 40, image: "assets/img/poster-kaiju-8.svg" },
    { title: "My Hero Academia", ep: "7. évad 10. epizód", progress: 60, image: "assets/img/poster-my-hero-academia.svg" },
    { title: "Jujutsu Kaisen", ep: "2. évad 18. epizód", progress: 90, image: "assets/img/poster-jujutsu-kaisen.svg" },
  ],

  /* ----- Profil: legutóbbi aktivitás ----- */
  activity: [
    { type: "play", text: "Megnézted a(z) <strong>Wind Breaker</strong> 2. évad 6. epizódját",           when: "2 órája" },
    { type: "star", text: "Értékelted a(z) <strong>Demon Slayer: Hashira Training Arc</strong> animét – 9/10", when: "1 napja" },
    { type: "save", text: "Hozzáadtad a(z) <strong>Chainsaw Man</strong> animét a műsorlistádhoz",       when: "2 napja" },
    { type: "play", text: "Megnézted a(z) <strong>Jujutsu Kaisen</strong> 2. évad 17. epizódját",        when: "3 napja" },
  ],

  /* ----- Profil: nézési statisztika (perc / hónap, évenként) ----- */
  watchMinutes: {
    months: ["Jan", "Feb", "Márc", "Ápr", "Máj", "Jún", "Júl", "Aug", "Szep", "Okt", "Nov", "Dec"],
    years: {
      2023: { values: [120, 210, 260, 180, 300, 240, 190, 320, 280, 330, 250, 90], trend: "+9% az előző évhez képest" },
      2024: { values: [180, 320, 470, 210, 392, 392, 290, 460, 300, 410, 305, 110], trend: "+18% az előző évhez képest" },
    },
    defaultYear: 2024,
    highlight: 5, // Június
  },

  /* ----- Profil: saját értékelések ----- */
  myRatings: [
    { title: "Naruto Shippuden", score: 10, when: "2024. 05. 12.", image: "assets/img/poster-naruto-shippuden.svg" },
    { title: "Demon Slayer: Hashira Training Arc", score: 9, when: "2024. 05. 03.", image: "assets/img/poster-demon-slayer.svg" },
    { title: "Attack on Titan Final Season", score: 9, when: "2024. 04. 27.", image: "assets/img/poster-attack-on-titan.svg" },
    { title: "Jujutsu Kaisen Season 2", score: 9, when: "2024. 04. 15.", image: "assets/img/poster-jujutsu-kaisen.svg" },
    { title: "Chainsaw Man", score: 8, when: "2024. 03. 30.", image: "assets/img/poster-chainsaw-man.svg" },
    { title: "Tokyo Ghoul", score: 8, when: "2024. 03. 11.", image: "assets/img/poster-tokyo-ghoul.svg" },
  ],

  /* ----- Fejléc: értesítések ----- */
  notifications: [
    { type: "play", text: "Új epizód érhető el: <strong>Solo Leveling</strong> 2. évad 8. epizód", when: "5 perce" },
    { type: "star", text: "A(z) <strong>Frieren</strong> bekerült a Top 10-be", when: "1 órája" },
    { type: "save", text: "A műsorlistádon lévő <strong>Kaiju No. 8</strong> ma 17:00-kor folytatódik", when: "3 órája" },
    { type: "play", text: "Megjelent a(z) <strong>Wind Breaker</strong> 2. évad 7. epizód előzetese", when: "1 napja" },
  ],

  /* ----- Csapat tagok ----- */
  members: [
    {
      name: "Akatsuki", role: "Alapító", roleClass: "role-founder", group: "admin",
      desc: "A csapat vezetője és az oldal fejlesztője.",
      comments: 134, contribs: 56, avatar: "assets/img/avatar-sasuke.svg",
    },
    {
      name: "Itachi", role: "Társalapító", roleClass: "role-cofounder", group: "admin",
      desc: "Fordítások ellenőrzése és minőségbiztosítás.",
      comments: 98, contribs: 42, avatar: "assets/img/avatar-itachi.svg",
    },
    {
      name: "Sakura", role: "Adminisztrátor", roleClass: "role-admin", group: "admin",
      desc: "Csapat koordináció és felhasználói támogatás.",
      comments: 76, contribs: 31, avatar: "assets/img/avatar-sakura.svg",
    },
    {
      name: "Kakashi", role: "Főfordító", roleClass: "role-translator", group: "translator",
      desc: "Fordítások készítése és nyelvtani ellenőrzés.",
      comments: 156, contribs: 89, avatar: "assets/img/avatar-kakashi.svg",
    },
    {
      name: "Shikamaru", role: "Szerkesztő", roleClass: "role-editor", group: "editor",
      desc: "Feliratok időzítése és szerkesztése.",
      comments: 64, contribs: 27, avatar: "assets/img/avatar-shikamaru.svg",
    },
    {
      name: "Hinata", role: "Lektor", roleClass: "role-lector", group: "translator",
      desc: "Fordítások lektorálása és helyesírás ellenőrzése.",
      comments: 38, contribs: 19, avatar: "assets/img/avatar-hinata.svg",
    },
    {
      name: "Gaara", role: "Kódoló", roleClass: "role-coder", group: "other",
      desc: "Az oldal technikai hátterének karbantartása.",
      comments: 71, contribs: 33, avatar: "assets/img/avatar-gaara.svg",
    },
    {
      name: "Neji", role: "Moderátor", roleClass: "role-moderator", group: "other",
      desc: "Közösségi tartalmak felügyelete.",
      comments: 55, contribs: 24, avatar: "assets/img/avatar-neji.svg",
    },
    {
      name: "Rock Lee", role: "Szerkesztő", roleClass: "role-editor", group: "editor",
      desc: "Feliratok formázása és minőség-ellenőrzése.",
      comments: 47, contribs: 21, avatar: "assets/img/avatar-rocklee.svg",
    },
    {
      name: "Tenten", role: "Fordító", roleClass: "role-translator", group: "translator",
      desc: "Heti megjelenésű sorozatok fordítása.",
      comments: 29, contribs: 16, avatar: "assets/img/avatar-tenten.svg",
    },
    {
      name: "Ino", role: "Adminisztrátor", roleClass: "role-admin", group: "admin",
      desc: "Közösségi események szervezése.",
      comments: 61, contribs: 18, avatar: "assets/img/avatar-ino.svg",
    },
    {
      name: "Choji", role: "Szerkesztő", roleClass: "role-editor", group: "editor",
      desc: "Epizódok vágása és technikai előkészítése.",
      comments: 22, contribs: 14, avatar: "assets/img/avatar-choji.svg",
    },
    {
      name: "Temari", role: "Fordító", roleClass: "role-translator", group: "translator",
      desc: "Filmek és OVA-k fordítása.",
      comments: 44, contribs: 25, avatar: "assets/img/avatar-temari.svg",
    },
    {
      name: "Kankuro", role: "Lektor", roleClass: "role-lector", group: "translator",
      desc: "Fordítások nyelvi ellenőrzése.",
      comments: 18, contribs: 9, avatar: "assets/img/avatar-kankuro.svg",
    },
    {
      name: "Kiba", role: "Moderátor", roleClass: "role-moderator", group: "other",
      desc: "Fórum és kommentszekció moderálása.",
      comments: 83, contribs: 12, avatar: "assets/img/avatar-kiba.svg",
    },
    {
      name: "Shino", role: "Kódoló", roleClass: "role-coder", group: "other",
      desc: "Automatizálás és bot fejlesztés.",
      comments: 15, contribs: 28, avatar: "assets/img/avatar-shino.svg",
    },
  ],

  /* ======================================================================
     Keresés oldal
     ====================================================================== */
  searchAnime: [
    { title: "Naruto",                        type: "TV",   year: 2002, rating: 9.1, image: "assets/img/poster-naruto.svg" },
    { title: "Naruto Shippuden",              type: "TV",   year: 2007, rating: 9.1, image: "assets/img/poster-naruto-shippuden.svg" },
    { title: "Boruto: Naruto Next Generations", type: "TV", year: 2017, rating: 8.2, image: "assets/img/poster-boruto.svg" },
    { title: "The Last: Naruto the Movie",    type: "Film", year: 2014, rating: 7.8, image: "assets/img/poster-naruto-movie.svg" },
    { title: "Naruto Shippuden the Movie",    type: "Film", year: 2007, rating: 7.6, image: "assets/img/poster-naruto-movie.svg" },
  ],

  searchEpisodes: [
    { ep: "1. évad 1. epizód", title: "Uzumaki Naruto!",                    date: "2002. okt. 3.",  image: "assets/img/thumb-ep454.svg" },
    { ep: "1. évad 2. epizód", title: "My Name is Konohamaru!",             date: "2002. okt. 10.", image: "assets/img/thumb-ep455.svg" },
    { ep: "1. évad 3. epizód", title: "Sasuke and Sakura: Friends or Foes?", date: "2002. okt. 17.", image: "assets/img/thumb-ep456.svg" },
    { ep: "1. évad 4. epizód", title: "Pass or Fail: Survival Test!",       date: "2002. okt. 24.", image: "assets/img/thumb-ep457.svg" },
  ],

  popularSearches: [
    "demon slayer", "attack on titan", "jujutsu kaisen", "one piece",
    "my hero academia", "solo leveling", "tokyo revengers", "chainsaw man",
    "naruto shippuden", "black clover",
  ],

  /* ======================================================================
     Ütemező oldal – heti rács (nap: 0=Hétfő ... 6=Vasárnap)
     ====================================================================== */
  weekLabel: "2024. május 20. – május 26.",
  weekDays: [
    { name: "Hétfő", date: "05.20." }, { name: "Kedd", date: "05.21." },
    { name: "Szerda", date: "05.22.", today: true }, { name: "Csütörtök", date: "05.23." },
    { name: "Péntek", date: "05.24." }, { name: "Szombat", date: "05.25." },
    { name: "Vasárnap", date: "05.26." },
  ],
  weekSchedule: {
    "12:00": [
      { day: 1, title: "Boruto: Two Blue Vortex", ep: "Ep. 12",   time: "12:00", image: "assets/img/poster-boruto.svg" },
      { day: 2, title: "One Piece",               ep: "Ep. 1103", time: "12:00", image: "assets/img/poster-one-piece.svg" },
      { day: 4, title: "Jujutsu Kaisen Season 2", ep: "Ep. 18",   time: "12:00", image: "assets/img/poster-jujutsu-kaisen.svg" },
      { day: 6, title: "My Hero Academia",        ep: "Ep. 135",  time: "12:00", image: "assets/img/poster-my-hero-academia.svg" },
    ],
    "15:00": [
      { day: 0, title: "Wind Breaker",  ep: "Ep. 7",   time: "15:30", image: "assets/img/poster-wind-breaker.svg" },
      { day: 3, title: "Kaiju No. 8",   ep: "Ep. 8",   time: "15:00", image: "assets/img/poster-kaiju-8.svg" },
      { day: 5, title: "Black Clover",  ep: "Ep. 171", time: "15:30", image: "assets/img/poster-black-clover.svg" },
    ],
    "18:00": [
      { day: 0, title: "Demon Slayer: Hashira Training Arc", ep: "Ep. 6", time: "18:00", image: "assets/img/poster-demon-slayer.svg" },
      { day: 1, title: "The Irregular at Magic High School", ep: "Ep. 6", time: "18:30", image: "assets/img/poster-irregular-magic.svg" },
      { day: 3, title: "Tokyo Revengers Season 3", ep: "Ep. 6", time: "18:00", image: "assets/img/poster-tokyo-revengers.svg" },
      { day: 4, title: "Chainsaw Man",             ep: "Ep. 7", time: "18:00", image: "assets/img/poster-chainsaw-man.svg" },
      { day: 6, title: "Attack on Titan Final Season", ep: "Ep. 88", time: "18:05", image: "assets/img/poster-attack-on-titan.svg", highlight: true },
    ],
    "21:00": [
      { day: 0, title: "Solo Leveling",     ep: "Ep. 8", time: "21:00", image: "assets/img/poster-solo-leveling.svg" },
      { day: 2, title: "Re:Zero Season 3",  ep: "Ep. 7", time: "21:30", image: "assets/img/poster-tokyo-revengers.svg" },
      { day: 4, title: "Frieren: Beyond Journey's End", ep: "Ep. 7", time: "21:00", image: "assets/img/poster-frieren.svg" },
      { day: 5, title: "Bleach: Thousand-Year Blood War", ep: "Ep. 7", time: "21:30", image: "assets/img/poster-bleach.svg" },
    ],
    "00:00": [
      { day: 1, title: "The Misfit of Demon King Academy", ep: "Ep. 7", time: "00:00", image: "assets/img/poster-dandadan.svg" },
      { day: 4, title: "Date A Live V",  ep: "Ep. 7", time: "00:30", image: "assets/img/poster-spy-family.svg" },
    ],
    "03:00": [
      { day: 5, title: "Overlord IV", ep: "Ep. 7", time: "03:00", image: "assets/img/poster-vinland-saga.svg" },
    ],
  },

  upcomingEpisodes: [
    { title: "Jujutsu Kaisen Season 2", ep: "Ep. 18", when: "Ma",     time: "12:00", image: "assets/img/poster-jujutsu-kaisen.svg" },
    { title: "One Piece",               ep: "Ep. 1103", when: "Ma",   time: "12:00", image: "assets/img/poster-one-piece.svg" },
    { title: "Kaiju No. 8",             ep: "Ep. 8",  when: "Holnap", time: "15:00", image: "assets/img/poster-kaiju-8.svg" },
    { title: "Tokyo Revengers Season 3", ep: "Ep. 6", when: "Holnap", time: "18:00", image: "assets/img/poster-tokyo-revengers.svg" },
    { title: "Re:Zero Season 3",        ep: "Ep. 7",  when: "Holnap", time: "21:30", image: "assets/img/poster-vinland-saga.svg" },
  ],

  calendar: {
    label: "2024. május",
    firstDayOffset: 2,   // május 1. = szerda (H=0)
    daysInMonth: 31,
    prevMonthDays: [29, 30],
    today: 22,
    hasEpisode: [1, 3, 6, 8, 10, 13, 15, 17, 20, 21, 22, 23, 24, 25, 26, 29, 31],
  },

  /* ======================================================================
     Közösség oldal
     ====================================================================== */
  communityPosts: [
    {
      author: "ItachiUchiha", avatar: "assets/img/avatar-itachi.svg", when: "2 órája",
      category: "Megbeszélés", title: "Mit gondoltok a Jujutsu Kaisen Season 2-ről?",
      body: "Szerintem elképesztő volt a Shibuya Incident arc animációja! 🔥 A MAPPA most is odatette magát.",
      votes: 256, comments: 89, followers: 12, hot: true,
    },
    {
      author: "Luffy98", avatar: "assets/img/avatar-kiba.svg", when: "5 órája",
      category: "Fanart", title: "Gum-Gum Red Hawk! 🔥",
      body: "Kicsit megkésve, de itt van a kedvenc jelenetem One Piece-ből! Remélem tetszik nektek!",
      votes: 412, comments: 37, followers: 8, image: "assets/img/poster-one-piece.svg",
    },
    {
      author: "SasukeFan", avatar: "assets/img/avatar-sasuke.svg", when: "1 napja",
      category: "Kérdés", title: "Melyik a legjobb Naruto filler epizód?",
      body: "Szerintetek melyik filler epizód érte meg a legjobban? Én a Kakashi Anbu arcot nagyon szerettem.",
      votes: 128, comments: 64, followers: 6,
    },
    {
      author: "MikasaAckerman", avatar: "assets/img/avatar-hinata.svg", when: "2 napja",
      category: "Megbeszélés", title: "Attack on Titan befejezés – megérte a várakozást?",
      body: "Most néztem végig újra az egész sorozatot. A finálé szerintem méltó lezárás volt, de kíváncsi vagyok a ti véleményetekre!",
      votes: 198, comments: 112, followers: 15,
    },
  ],

  popularTopics: [
    { tag: "Megbeszélés", title: "Demon Slayer: Hashira Training Arc", comments: 124, image: "assets/img/poster-demon-slayer.svg" },
    { tag: "Fanart",      title: "One Piece fanart gyűjtemény",        comments: 98,  image: "assets/img/poster-one-piece.svg" },
    { tag: "Megbeszélés", title: "Attack on Titan befejezése",         comments: 87,  image: "assets/img/poster-attack-on-titan.svg" },
    { tag: "Elmélet",     title: "Jujutsu Kaisen elméletek",           comments: 76,  image: "assets/img/poster-jujutsu-kaisen.svg" },
    { tag: "Fanart",      title: "Saját anime karaktereitek",          comments: 63,  image: "assets/img/poster-dandadan.svg" },
  ],

  recommendedCommunities: [
    { name: "AnimeHub Hivatalos",   members: "12.4K tag", link: "team.html" },
    { name: "One Piece Magyarország", members: "8.7K tag", link: "#" },
    { name: "Naruto Fanok",         members: "6.1K tag", link: "#" },
    { name: "Anime Zenék",          members: "4.3K tag", link: "#" },
    { name: "Manga Magyarul",       members: "3.8K tag", link: "#" },
  ],

  /* ======================================================================
     Hírek oldal
     ====================================================================== */
  news: [
    {
      category: "Anime hírek", badge: "ANIME HÍREK", when: "2 órája",
      title: "Demon Slayer: Hashira Training Arc – Új kulcskép érkezett!",
      body: "Megérkezett a Hashira Training Arc vadonatúj kulcsképe! A premier dátuma 2024. június 12-én lesz Japánban.",
      likes: "1.2K", comments: 342, image: "assets/img/poster-demon-slayer.svg",
    },
    {
      category: "Bejelentések", badge: "BEJELENTÉS", when: "5 órája",
      title: "One Piece – Új film érkezik 2025 elején!",
      body: "A Toei Animation bejelentette, hogy egy teljesen új One Piece film készül, melynek címe: One Piece: Dawn of the New Era.",
      likes: "2.3K", comments: 567, image: "assets/img/poster-one-piece.svg",
    },
    {
      category: "Anime hírek", badge: "ANIME HÍREK", when: "1 napja",
      title: "Chainsaw Man Movie – Reze Arc hivatalosan bejelentve!",
      body: "A Chainsaw Man következő mozifilmje a Reze Arc történetét dolgozza fel. További részletek hamarosan!",
      likes: "3.1K", comments: 721, image: "assets/img/poster-chainsaw-man.svg",
    },
    {
      category: "Iparági hírek", badge: "IPARÁGI HÍREK", when: "2 napja",
      title: "Új Jujutsu Kaisen videojáték készül!",
      body: "A Bandai Namco bejelentette a Jujutsu Kaisen Cursed Clash 2 érkezését, mely 2025-ben jelenik meg PC-re és konzolokra.",
      likes: "1.6K", comments: 310, image: "assets/img/poster-jujutsu-kaisen.svg",
    },
    {
      category: "Események", badge: "ESEMÉNYEK", when: "3 napja",
      title: "AnimeJapan 2024 – Összefoglaló",
      body: "Véget ért az idei AnimeJapan! Összegyűjtöttük a legfontosabb bejelentéseket és trailereket egy helyen.",
      likes: "892", comments: 156, image: "assets/img/poster-frieren.svg",
    },
    {
      category: "Bejelentések", badge: "BEJELENTÉS", when: "4 napja",
      title: "Solo Leveling 2. évad – Hivatalos premier dátum!",
      body: "Az A-1 Pictures megerősítette: a Solo Leveling második évada 2025 januárjában érkezik.",
      likes: "2.8K", comments: 634, image: "assets/img/poster-solo-leveling.svg",
    },
  ],

  newsCategories: [
    { name: "Összes hír",    count: 124 },
    { name: "Bejelentések",  count: 28 },
    { name: "Anime hírek",   count: 54 },
    { name: "Iparági hírek", count: 26 },
    { name: "Események",     count: 16 },
  ],

  /* ======================================================================
     Animék böngésző oldal
     ====================================================================== */
  browsePopular: [
    { title: "Solo Leveling",                  genre: "Akció",   year: 2024, rating: 9.3, image: "assets/img/poster-solo-leveling.svg" },
    { title: "Demon Slayer: Hashira Training Arc", genre: "Akció", year: 2019, rating: 9.1, image: "assets/img/poster-demon-slayer.svg" },
    { title: "Jujutsu Kaisen Season 2",        genre: "Akció",   year: 2023, rating: 9.0, image: "assets/img/poster-jujutsu-kaisen.svg" },
    { title: "One Piece",                      genre: "Kaland",  year: 1999, rating: 9.0, image: "assets/img/poster-one-piece.svg" },
    { title: "Attack on Titan Final Season",   genre: "Akció",   year: 2013, rating: 9.0, image: "assets/img/poster-attack-on-titan.svg" },
    { title: "Chainsaw Man",                   genre: "Akció",   year: 2022, rating: 8.8, image: "assets/img/poster-chainsaw-man.svg" },
    { title: "Frieren: Beyond Journey's End",  genre: "Fantasy", year: 2023, rating: 9.2, image: "assets/img/poster-frieren.svg" },
    { title: "Vinland Saga",                   genre: "Dráma",   year: 2019, rating: 8.9, image: "assets/img/poster-vinland-saga.svg" },
    { title: "Fullmetal Alchemist: Brotherhood", genre: "Kaland", year: 2009, rating: 9.1, image: "assets/img/poster-fma.svg" },
    { title: "Bleach: Thousand-Year Blood War", genre: "Akció",  year: 2022, rating: 9.0, image: "assets/img/poster-bleach.svg" },
    { title: "Spy x Family",                   genre: "Slice of Life", year: 2022, rating: 8.8, image: "assets/img/poster-spy-family.svg" },
    { title: "Naruto Shippuden",               genre: "Shounen", year: 2007, rating: 9.1, image: "assets/img/poster-naruto-shippuden.svg" },
  ],

  browseFresh: [
    { title: "Re:Zero Season 3",   genre: "Fantasy", year: 2024, eps: "12 epizód", image: "assets/img/poster-rezero.svg" },
    { title: "Wind Breaker Season 2", genre: "Akció", year: 2024, eps: "8 epizód", image: "assets/img/poster-wind-breaker.svg" },
    { title: "Kaiju No. 8 Season 2", genre: "Akció", year: 2024, eps: "6 epizód", image: "assets/img/poster-kaiju-8.svg" },
    { title: "KonoSuba! 3. évad",  genre: "Slice of Life", year: 2024, eps: "8 epizód", image: "assets/img/poster-konosuba.svg" },
    { title: "Naruto: Remake",     genre: "Shounen", year: 2024, eps: "4 epizód", image: "assets/img/poster-naruto.svg" },
    { title: "The Irregular at Magic High School 3", genre: "Akció", year: 2024, eps: "5 epizód", image: "assets/img/poster-irregular-magic.svg" },
    { title: "Dandadan",           genre: "Akció",   year: 2024, eps: "12 epizód", image: "assets/img/poster-dandadan.svg" },
    { title: "Blue Lock 2",        genre: "Shounen", year: 2024, eps: "10 epizód", image: "assets/img/poster-blue-lock.svg" },
  ],

  browseGenres: ["Összes", "Akció", "Kaland", "Fantasy", "Dráma", "Shounen", "Slice of Life", "Romantikus"],

  /* ======================================================================
     Műsorlista oldal
     ====================================================================== */
  watchlist: [
    {
      title: "Attack on Titan", rating: 9.2, genres: ["Akció", "Dráma", "Fantasy"],
      years: "2013 – 2023", extra: "4 évad", status: "Jelenleg nézem",
      watched: 78, total: 94, image: "assets/img/poster-attack-on-titan.svg",
    },
    {
      title: "Jujutsu Kaisen", rating: 9.0, genres: ["Akció", "Fantasy", "Iskola"],
      years: "2020 –", extra: "2 évad", status: "Jelenleg nézem",
      watched: 15, total: 47, image: "assets/img/poster-jujutsu-kaisen.svg",
    },
    {
      title: "Demon Slayer: Kimetsu no Yaiba", rating: 8.9, genres: ["Akció", "Történelmi", "Fantasy"],
      years: "2019 –", extra: "4 évad", status: "Várólistán",
      watched: 0, total: 55, image: "assets/img/poster-demon-slayer.svg",
    },
    {
      title: "One Piece", rating: 9.0, genres: ["Akció", "Kaland", "Fantasy"],
      years: "1999 –", extra: "1,100+ epizód", status: "Szüneteltetett",
      watched: 112, total: 1100, image: "assets/img/poster-one-piece.svg",
    },
    {
      title: "Fullmetal Alchemist: Brotherhood", rating: 9.1, genres: ["Akció", "Dráma", "Fantasy"],
      years: "2009 – 2010", extra: "64 epizód", status: "Befejezve",
      watched: 64, total: 64, image: "assets/img/poster-fma.svg",
    },
    {
      title: "Chainsaw Man", rating: 8.7, genres: ["Akció", "Horror", "Dráma"],
      years: "2022", extra: "1 évad", status: "Várólistán",
      watched: 0, total: 12, image: "assets/img/poster-chainsaw-man.svg",
    },
  ],

  watchlistStatuses: ["Összes", "Jelenleg nézem", "Várólistán", "Szüneteltetett", "Befejezettek", "Eldobott"],

  /* ======================================================================
     Kedvencek oldal
     ====================================================================== */
  favoritesPage: [
    { title: "Attack on Titan",     years: "2013 – 2023", rating: 9.2, status: "Befejezett",   image: "assets/img/poster-attack-on-titan.svg" },
    { title: "Jujutsu Kaisen",      years: "2020 – 2023", rating: 9.0, status: "Aktuális",     image: "assets/img/poster-jujutsu-kaisen.svg" },
    { title: "Demon Slayer: Kimetsu no Yaiba", years: "2019 – 2023", rating: 8.9, status: "Aktuális", image: "assets/img/poster-demon-slayer.svg" },
    { title: "One Piece",           years: "1999 –",      rating: 9.0, status: "Aktuális",     image: "assets/img/poster-one-piece.svg" },
    { title: "Fullmetal Alchemist: Brotherhood", years: "2009 – 2010", rating: 9.1, status: "Befejezett", image: "assets/img/poster-fma.svg" },
    { title: "Naruto: Shippuden",   years: "2007 – 2017", rating: 9.1, status: "Befejezett",   image: "assets/img/poster-naruto-shippuden.svg" },
    { title: "Tokyo Ghoul",         years: "2014",        rating: 8.8, status: "Felfüggesztett", image: "assets/img/poster-tokyo-ghoul.svg" },
    { title: "Chainsaw Man",        years: "2022",        rating: 8.7, status: "Terveim között", image: "assets/img/poster-chainsaw-man.svg" },
    { title: "Bleach: Thousand-Year Blood War", years: "2022 – 2023", rating: 9.0, status: "Aktuális", image: "assets/img/poster-bleach.svg" },
    { title: "Solo Leveling",       years: "2024 –",      rating: 9.3, status: "Aktuális",     image: "assets/img/poster-solo-leveling.svg" },
  ],

  /* ======================================================================
     Visszajelzés oldal
     ====================================================================== */
  feedback: [
    {
      type: "Ötlet", title: "Sötét mód időzítő",
      body: "Jó lenne, ha be lehetne állítani, hogy a sötét mód automatikusan bekapcsoljon napnyugtakor.",
      votes: 128, comments: 15, likes: 32, author: "Akane93", when: "2 napja", status: "Megvalósítás alatt",
    },
    {
      type: "Hiba", title: "Lejátszó nem jegyzi meg a felirat beállításait",
      body: "Ha bezárom és újranyitom az epizódot, a felirat mérete és pozíciója visszaáll az alapértelmezettre.",
      votes: 96, comments: 23, likes: 18, author: "NightOwl", when: "3 napja", status: "Javítva",
    },
    {
      type: "Vélemény", title: "Imádom az új ütemezőt! 🎉",
      body: "Nagyon átlátható és hasznos lett, köszi a fejlesztőknek!",
      votes: 75, comments: 8, likes: 46, author: "LuffyFan001", when: "5 napja", status: "Megoldva",
    },
    {
      type: "Ötlet", title: "Mobil app",
      body: "Nagyon jó lenne egy hivatalos mobilalkalmazás is!",
      votes: 61, comments: 34, likes: 21, author: "ZeroTwo", when: "1 hete", status: "Tervezve",
    },
    {
      type: "Hiba", title: "Értesítések néha nem jelennek meg",
      body: "Van, hogy nem kapok értesítést az új epizódról, pedig be van kapcsolva.",
      votes: 43, comments: 12, likes: 9, author: "ShinobiX", when: "1 hete", status: "Nyitott",
    },
    {
      type: "Vélemény", title: "A kereső szuper gyors lett",
      body: "Észrevettem, hogy sokkal gyorsabban jönnek a találatok. Szép munka!",
      votes: 38, comments: 5, likes: 27, author: "SakuraChan", when: "2 hete", status: "Megoldva",
    },
  ],

  feedbackStats: [
    { label: "Összes visszajelzés", value: 842 },
    { label: "Megvalósítás alatt", value: 12 },
    { label: "Megoldva", value: 243 },
    { label: "Nyitott", value: 58 },
    { label: "Elutasítva", value: 31 },
  ],

  feedbackTags: [
    { name: "Lejátszó", count: 142 }, { name: "Mobil", count: 98 },
    { name: "Ütemező", count: 76 },  { name: "Értesítések", count: 63 },
    { name: "Felirat", count: 58 },  { name: "Közösség", count: 47 },
    { name: "Design", count: 35 },   { name: "Egyéb", count: 23 },
  ],

  /* ======================================================================
     Beállítások oldal – fülek és beállítás sorok
     type: "link" (nyíl), "select" (legördülő), "toggle" (kapcsoló)
     ====================================================================== */
  settingsTabs: {
    "Fiók beállítások": [
      {
        group: "Fiók beállítások",
        rows: [
          { type: "link", icon: "lock",  title: "Jelszó módosítása",   desc: "Erős jelszóval védd a fiókodat." },
          { type: "link", icon: "mail",  title: "E-mail cím módosítása", desc: "Változtasd meg az e-mail címedet." },
          { type: "link", icon: "trash", title: "Fiók törlése",        desc: "A fiók és az összes adatod véglegesen törlésre kerül.", danger: true },
        ],
      },
      {
        group: "Nyelv és időzóna",
        rows: [
          { type: "select", icon: "globe", title: "Nyelv",   desc: "Válaszd ki a felület nyelvét.",  options: ["Magyar", "English", "日本語"], key: "lang" },
          { type: "select", icon: "clock", title: "Időzóna", desc: "Válaszd ki az időzónádat.", options: ["(UTC+02:00) Budapest", "(UTC+00:00) London", "(UTC+09:00) Tokyo"], key: "tz" },
        ],
      },
    ],
    "Megjelenítés": [
      {
        group: "Téma és kinézet",
        rows: [
          { type: "select", icon: "moon",  title: "Téma",        desc: "A felület színvilága.", options: ["Sötét (alapértelmezett)", "AMOLED fekete", "Világos"], key: "theme" },
          { type: "select", icon: "globe", title: "Betűméret",   desc: "A szövegek mérete.", options: ["Normál", "Nagy", "Kicsi"], key: "fontsize" },
          { type: "toggle", icon: "zap",   title: "Animációk",   desc: "Felület animációk be/ki.", key: "animations", default: true },
          { type: "toggle", icon: "image", title: "Borítóképek automatikus betöltése", desc: "Adatforgalom spórolásához kapcsold ki.", key: "autoimg", default: true },
        ],
      },
    ],
    "Lejátszás": [
      {
        group: "Lejátszó",
        rows: [
          { type: "select", icon: "play",  title: "Alapértelmezett minőség", desc: "Új epizódok indításakor.", options: ["1080p", "720p", "480p", "Automatikus"], key: "quality" },
          { type: "select", icon: "zap",   title: "Alapértelmezett sebesség", desc: "Lejátszási sebesség.", options: ["1x", "1.25x", "1.5x"], key: "speed" },
          { type: "toggle", icon: "play",  title: "Automatikus lejátszás", desc: "Következő epizód automatikus indítása.", key: "autoplay", default: false },
          { type: "toggle", icon: "cc",    title: "Feliratok alapból bekapcsolva", desc: "Magyar felirat megjelenítése.", key: "subs", default: true },
          { type: "toggle", icon: "clock", title: "Intró átugrása", desc: "Az openingek automatikus átugrása.", key: "skipintro", default: true },
        ],
      },
    ],
    "Értesítések": [
      {
        group: "Értesítések",
        rows: [
          { type: "toggle", icon: "bell",  title: "Új epizód értesítések", desc: "A műsorlistádon lévő animékhez.", key: "notif-ep", default: true },
          { type: "toggle", icon: "users", title: "Közösségi értesítések", desc: "Válaszok és említések.", key: "notif-comm", default: true },
          { type: "toggle", icon: "news",  title: "Hírlevél", desc: "Heti összefoglaló e-mailben.", key: "notif-news", default: false },
          { type: "toggle", icon: "zap",   title: "Push értesítések", desc: "Böngésző értesítések.", key: "notif-push", default: true },
        ],
      },
    ],
    "Adatvédelem": [
      {
        group: "Adatvédelem",
        rows: [
          { type: "toggle", icon: "eye",    title: "Privát profil", desc: "Csak a követőid láthatják a profilod.", key: "priv-profile", default: false },
          { type: "toggle", icon: "eye",    title: "Nézési előzmények elrejtése", desc: "Mások nem látják, mit néztél.", key: "priv-history", default: false },
          { type: "toggle", icon: "shield", title: "Kétlépcsős azonosítás", desc: "Extra biztonság a fiókodnak.", key: "priv-2fa", default: true },
          { type: "link",   icon: "trash",  title: "Adatok letöltése", desc: "Kérj másolatot a tárolt adataidról." },
        ],
      },
    ],
    "Kapcsolt fiókok": [
      {
        group: "Kapcsolt fiókok",
        rows: [
          { type: "connect", icon: "discord", title: "Discord", desc: "Oszd meg az aktivitásod a szervereden.", key: "conn-discord", default: true },
          { type: "connect", icon: "google",  title: "Google",  desc: "Gyors bejelentkezés Google fiókkal.", key: "conn-google", default: true },
          { type: "connect", icon: "x",       title: "X (Twitter)", desc: "Oszd meg kedvenc animéidet.", key: "conn-x", default: false },
          { type: "connect", icon: "mal",     title: "MyAnimeList", desc: "Szinkronizáld a listáidat.", key: "conn-mal", default: false },
        ],
      },
    ],
  },

  /* ======================================================================
     Támogatás oldal
     ====================================================================== */
  faq: [
    {
      q: "Hogyan hozhatok létre fiókot?",
      a: "Kattints a jobb felső sarokban a profil ikonra, majd válaszd a Regisztráció lehetőséget. Add meg az e-mail címed, válassz felhasználónevet és jelszót – kész is!",
    },
    {
      q: "Miért nem tölt be egy anime / epizód?",
      a: "Először frissítsd az oldalt (Ctrl+F5). Ha továbbra sem működik, ellenőrizd az internetkapcsolatod, vagy próbáld ki másik böngészőben. Ha a hiba nem szűnik meg, jelezd nekünk a Visszajelzés menüponton keresztül.",
    },
    {
      q: "Hogyan tudok listát készíteni?",
      a: "Minden anime adatlapján találsz egy „Kedvencekhez\" gombot, illetve a Műsorlista menüpontban rendezheted a megnézendő és a már látott sorozataidat.",
    },
    {
      q: "Hogyan érhetem el a prémium előfizetés előnyeit?",
      a: "A fejlécben lévő Prémium előfizetés gombra kattintva választhatsz csomagot. A prémium hirdetésmentes élményt, exkluzív tartalmakat és korai hozzáférést ad.",
    },
    {
      q: "Biztonságos az AnimeHub használata?",
      a: "Igen! Az adataidat titkosítva tároljuk, harmadik félnek nem adjuk ki, és az oldal HTTPS-en keresztül kommunikál.",
    },
  ],
};
