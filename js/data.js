/* ==========================================================================
   AnimeHub – data.js
   Központi adatforrás: minden oldal ebből dolgozik.
   A képek az assets/img mappában lévő placeholderek – cseréld őket
   valódi képekre, csak az útvonalakat kell átírni.
   ========================================================================== */

/* ----- Globális beállítások ----- */
const CONFIG = {
  /* A lejátszóban futó videó – cseréld ki saját fájlra, pl. "assets/video/ep456.mp4".
     Alapból a Blender nyílt forrású animációs filmje (Sintel) fut benne demónak. */
  videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
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
};
