/* ==========================================================================
   AnimeHub – mock.js
   Központi MOCK adatréteg az új oldalakhoz. Csak statikus/mock adat, hogy
   később minimális módosítással backend/API-ra cserélhető legyen.

   Backend integrációkor elég a MOCK.* getterek helyére valódi fetch-et tenni,
   pl.:  const topAnime = await api.get('/top/anime')   // MOCK.topAnime helyett
   A megjelenítő kód (js/*.js) csak ezt a réteget olvassa.
   ========================================================================== */

const MOCK = {
  /* ----- Top Anime ----- */
  topAnime: [
    { rank: 1, title: "Frieren: Beyond Journey's End", jp: "葬送のフリーレン", score: 9.32, members: "742K", type: "TV", eps: 28, year: 2023, genres: ["Kaland", "Dráma", "Fantasy"], image: "assets/img/poster-frieren.svg" },
    { rank: 2, title: "Fullmetal Alchemist: Brotherhood", jp: "鋼の錬金術師", score: 9.10, members: "3.2M", type: "TV", eps: 64, year: 2009, genres: ["Akció", "Kaland", "Dráma"], image: "assets/img/poster-fma.svg" },
    { rank: 3, title: "Attack on Titan: The Final Season", jp: "進撃の巨人", score: 9.05, members: "2.1M", type: "TV", eps: 16, year: 2023, genres: ["Akció", "Dráma"], image: "assets/img/poster-attack-on-titan.svg" },
    { rank: 4, title: "Jujutsu Kaisen Season 2", jp: "呪術廻戦", score: 8.98, members: "1.4M", type: "TV", eps: 23, year: 2023, genres: ["Akció", "Természetfeletti"], image: "assets/img/poster-jujutsu-kaisen.svg" },
    { rank: 5, title: "Demon Slayer: Hashira Training", jp: "鬼滅の刃", score: 8.90, members: "1.6M", type: "TV", eps: 8, year: 2024, genres: ["Akció", "Történelmi"], image: "assets/img/poster-demon-slayer.svg" },
    { rank: 6, title: "Solo Leveling", jp: "俺だけレベルアップな件", score: 8.84, members: "980K", type: "TV", eps: 12, year: 2024, genres: ["Akció", "Fantasy"], image: "assets/img/poster-solo-leveling.svg" },
    { rank: 7, title: "One Piece", jp: "ワンピース", score: 8.72, members: "2.4M", type: "TV", eps: 1102, year: 1999, genres: ["Akció", "Kaland", "Vígjáték"], image: "assets/img/poster-one-piece.svg" },
    { rank: 8, title: "Chainsaw Man", jp: "チェンソーマン", score: 8.60, members: "1.3M", type: "TV", eps: 12, year: 2022, genres: ["Akció", "Horror"], image: "assets/img/poster-chainsaw-man.svg" },
    { rank: 9, title: "Bleach: TYBW", jp: "BLEACH 千年血戦篇", score: 8.95, members: "890K", type: "TV", eps: 26, year: 2022, genres: ["Akció", "Természetfeletti"], image: "assets/img/poster-bleach.svg" },
    { rank: 10, title: "Spy x Family", jp: "スパイファミリー", score: 8.55, members: "1.5M", type: "TV", eps: 37, year: 2022, genres: ["Akció", "Vígjáték"], image: "assets/img/poster-spy-family.svg" },
    { rank: 11, title: "My Hero Academia", jp: "僕のヒーローアカデミア", score: 8.40, members: "2.0M", type: "TV", eps: 138, year: 2016, genres: ["Akció", "Iskola"], image: "assets/img/poster-my-hero-academia.svg" },
    { rank: 12, title: "Blue Lock", jp: "ブルーロック", score: 8.32, members: "760K", type: "TV", eps: 24, year: 2022, genres: ["Sport", "Dráma"], image: "assets/img/poster-blue-lock.svg" },
  ],

  /* ----- Értesítések ----- */
  notifications: [
    { id: 1, type: "episode", title: "Új epizód", text: "A Jujutsu Kaisen 2. évad 18. része most elérhető!", when: "2 perce", unread: true, image: "assets/img/poster-jujutsu-kaisen.svg" },
    { id: 2, type: "reply", title: "Új válasz", text: "uchiha_sasuke23 válaszolt a hozzászólásodra.", when: "18 perce", unread: true, image: "assets/img/avatar-sasuke.svg" },
    { id: 3, type: "like", title: "Kedvelés", text: "sakura_haruno és 12 másik kedvelte a posztodat.", when: "1 órája", unread: true, image: "assets/img/avatar-sakura.svg" },
    { id: 4, type: "system", title: "Szint lépés", text: "Gratulálunk! Elérted a 23. szintet. 🎉", when: "3 órája", unread: false, image: "" },
    { id: 5, type: "episode", title: "Emlékeztető", text: "A Solo Leveling új része holnap 17:00-kor érkezik.", when: "5 órája", unread: false, image: "assets/img/poster-solo-leveling.svg" },
    { id: 6, type: "friend", title: "Új követő", text: "kakashi_sensei követni kezdett téged.", when: "Tegnap", unread: false, image: "assets/img/avatar-kakashi.svg" },
    { id: 7, type: "achievement", title: "Új jelvény", text: "Megszerezted a „Maratonfutó” jelvényt.", when: "Tegnap", unread: false, image: "" },
    { id: 8, type: "system", title: "Premium ajánlat", text: "48 órás akció: -30% a Premium előfizetésre!", when: "2 napja", unread: false, image: "" },
  ],

  /* ----- Achievementek / jelvények ----- */
  achievements: [
    { name: "Első lépések", desc: "Nézd meg az első epizódodat", icon: "▶", tier: "bronze", unlocked: true, progress: 100 },
    { name: "Maratonfutó", desc: "Nézz 12 epizódot egy nap alatt", icon: "🔥", tier: "silver", unlocked: true, progress: 100 },
    { name: "Kritikus", desc: "Írj 50 értékelést", icon: "★", tier: "gold", unlocked: true, progress: 100 },
    { name: "Közösségi", desc: "Szerezz 100 kedvelést", icon: "💬", tier: "silver", unlocked: true, progress: 100 },
    { name: "Gyűjtő", desc: "Adj 200 animét a listádhoz", icon: "📚", tier: "gold", unlocked: false, progress: 68 },
    { name: "Éjjeli bagoly", desc: "Nézz animét éjfél után 30 alkalommal", icon: "🌙", tier: "bronze", unlocked: false, progress: 43 },
    { name: "Szezonvadász", desc: "Kövess 20 szezonális animét", icon: "🍂", tier: "silver", unlocked: false, progress: 25 },
    { name: "Legenda", desc: "Érd el az 50. szintet", icon: "👑", tier: "platina", unlocked: false, progress: 46 },
  ],

  /* ----- Ranglista (leaderboard) ----- */
  leaderboard: [
    { rank: 1, user: "gojo_satoru", xp: 184320, level: 92, watched: 1842, avatar: "assets/img/avatar-kakashi.svg", vip: true },
    { rank: 2, user: "itachi_uchiha", xp: 176540, level: 88, watched: 1720, avatar: "assets/img/avatar-itachi.svg", vip: true },
    { rank: 3, user: "sakura_h", xp: 158900, level: 81, watched: 1590, avatar: "assets/img/avatar-sakura.svg", vip: false },
    { rank: 4, user: "naruto_fan_23", xp: 142100, level: 76, watched: 1402, avatar: "assets/img/avatar-neji.svg", vip: false },
    { rank: 5, user: "kiba_inuzuka", xp: 131750, level: 71, watched: 1288, avatar: "assets/img/avatar-kiba.svg", vip: true },
    { rank: 6, user: "shino_a", xp: 122400, level: 67, watched: 1201, avatar: "assets/img/avatar-shino.svg", vip: false },
    { rank: 7, user: "rocklee_99", xp: 110850, level: 62, watched: 1098, avatar: "assets/img/avatar-rocklee.svg", vip: false },
    { rank: 8, user: "hinata_h", xp: 98300, level: 57, watched: 967, avatar: "assets/img/avatar-hinata.svg", vip: false },
    { rank: 9, user: "gaara_s", xp: 87600, level: 52, watched: 854, avatar: "assets/img/avatar-gaara.svg", vip: false },
    { rank: 10, user: "temari_wind", xp: 76200, level: 47, watched: 743, avatar: "assets/img/avatar-temari.svg", vip: false },
  ],

  /* ----- Premium csomagok ----- */
  premiumPlans: [
    { id: "havi", name: "Havi", price: "1 490 Ft", period: "/hó", note: "Bármikor lemondható", featured: false, cta: "Kiválasztás" },
    { id: "eves", name: "Éves", price: "11 900 Ft", period: "/év", note: "2 hónap ingyen · legnépszerűbb", featured: true, cta: "Kiválasztás", save: "-33%" },
    { id: "elet", name: "Örökös", price: "34 900 Ft", period: "egyszeri", note: "Egyszeri fizetés, örök hozzáférés", featured: false, cta: "Kiválasztás" },
  ],
  premiumFeatures: [
    { icon: "ad", free: false, prem: true, label: "Reklámmentes élmény" },
    { icon: "hd", free: "720p", prem: "4K", label: "Maximális videóminőség" },
    { icon: "dl", free: false, prem: true, label: "Offline letöltések" },
    { icon: "early", free: false, prem: true, label: "24 órával korábbi hozzáférés" },
    { icon: "sim", free: "1", prem: "4", label: "Egyidejű eszközök" },
    { icon: "badge", free: false, prem: true, label: "Exkluzív profil jelvény" },
    { icon: "party", free: false, prem: true, label: "Watch Party házigazda" },
    { icon: "support", free: "Normál", prem: "Elsőbbségi", label: "Ügyfélszolgálat" },
  ],
};

/* ==========================================================================
   Anime adatlap – bővített szekciók (mock)
   Ezek statikus demó adatok az adatlap új blokkjaihoz. Backendkor egy
   /anime/:id/full válasszal cserélhetők.
   ========================================================================== */
MOCK.animeDetail = {
  characters: [
    { name: "Yuji Itadori", role: "Főszereplő", image: "assets/img/avatar-rocklee.svg", va: "Junya Enoki", vaImg: "assets/img/avatar-kiba.svg" },
    { name: "Megumi Fushiguro", role: "Főszereplő", image: "assets/img/avatar-sasuke.svg", va: "Yuma Uchida", vaImg: "assets/img/avatar-neji.svg" },
    { name: "Nobara Kugisaki", role: "Főszereplő", image: "assets/img/avatar-sakura.svg", va: "Asami Seto", vaImg: "assets/img/avatar-ino.svg" },
    { name: "Satoru Gojo", role: "Mellékszereplő", image: "assets/img/avatar-kakashi.svg", va: "Yuichi Nakamura", vaImg: "assets/img/avatar-itachi.svg" },
    { name: "Ryomen Sukuna", role: "Antagonista", image: "assets/img/avatar-akatsuki.svg", va: "Junichi Suwabe", vaImg: "assets/img/avatar-gaara.svg" },
    { name: "Maki Zenin", role: "Mellékszereplő", image: "assets/img/avatar-tenten.svg", va: "Mikako Komatsu", vaImg: "assets/img/avatar-temari.svg" },
  ],
  franchise: [
    { title: "1. évad", type: "TV · 24 ep", year: "2020", image: "assets/img/poster-jujutsu-kaisen.svg", current: false },
    { title: "0 Film", type: "Film", year: "2021", image: "assets/img/poster-jujutsu-kaisen.svg", current: false },
    { title: "2. évad", type: "TV · 23 ep", year: "2023", image: "assets/img/poster-jujutsu-kaisen.svg", current: true },
    { title: "3. évad", type: "TV · Hamarosan", year: "2026", image: "assets/img/poster-jujutsu-kaisen.svg", current: false },
  ],
  screenshots: ["assets/img/backdrop-sasuke.svg", "assets/img/backdrop-naruto.svg", "assets/img/backdrop-solo-leveling.svg", "assets/img/backdrop-profile.svg", "assets/img/backdrop-sasuke.svg", "assets/img/backdrop-naruto.svg"],
  themes: [
    { kind: "OP", n: 1, title: "Kaikai Kitan", artist: "Eve", eps: "1–13" },
    { kind: "OP", n: 2, title: "Ao no Sumika", artist: "Tatsuya Kitani", eps: "1–23 (2. évad)" },
    { kind: "ED", n: 1, title: "Lost in Paradise", artist: "ALI feat. AKLO", eps: "1–13" },
    { kind: "ED", n: 2, title: "Akari", artist: "Soushi Sakiyama", eps: "1–23 (2. évad)" },
  ],
  trailer: { thumb: "assets/img/backdrop-sasuke.svg", title: "Hivatalos előzetes", yt: "PkKuAvb-8xs" },
  recommendations: [
    { title: "Chainsaw Man", score: 8.6, image: "assets/img/poster-chainsaw-man.svg" },
    { title: "Demon Slayer", score: 8.9, image: "assets/img/poster-demon-slayer.svg" },
    { title: "Bleach: TYBW", score: 8.95, image: "assets/img/poster-bleach.svg" },
    { title: "Solo Leveling", score: 8.84, image: "assets/img/poster-solo-leveling.svg" },
    { title: "Attack on Titan", score: 9.05, image: "assets/img/poster-attack-on-titan.svg" },
    { title: "Blue Lock", score: 8.32, image: "assets/img/poster-blue-lock.svg" },
  ],
  studio: { name: "MAPPA", founded: "2011", country: "Japán 🇯🇵", works: 42, desc: "Prémium animációs stúdió, ismert a Jujutsu Kaisen, Chainsaw Man és az Attack on Titan Final Season munkáiról." },
  stats: [
    { label: "Rangsor", value: "#4" },
    { label: "Népszerűség", value: "#2" },
    { label: "Tagok", value: "1.4M" },
    { label: "Kedvencek", value: "128K" },
  ],
  production: [
    ["Típus", "TV Sorozat"], ["Epizódok", "23"], ["Státusz", "Befejezett"],
    ["Sugárzás", "2023.07 – 2023.12"], ["Szezon", "Nyár 2023"], ["Stúdió", "MAPPA"],
    ["Forrás", "Manga"], ["Műfaj", "Akció, Természetfeletti"], ["Időtartam", "24 perc / ep"],
    ["Korhatár", "R – 17+"],
  ],
};

/* ----- Watch oldal – bővített funkciók (mock) ----- */
MOCK.watch = {
  audioTracks: ["Japán (eredeti)", "Magyar szinkron", "Angol szinkron"],
  subtitleTracks: ["Magyar", "Angol", "Kikapcsolva"],
  qualities: ["4K (2160p)", "1080p", "720p", "480p", "Auto"],
  shortcuts: [
    ["Szóköz / K", "Lejátszás / szünet"], ["J / ←", "10 mp vissza"], ["L / →", "10 mp előre"],
    ["F", "Teljes képernyő"], ["T", "Theatre mód"], ["I", "Mini player"], ["M", "Némítás"],
    ["C", "Felirat be/ki"], [", / .", "Kockázás"], ["0–9", "Ugrás %-ra"], ["Shift + N", "Következő epizód"],
  ],
  party: {
    room: "AH-7F3K2",
    host: "Katsu",
    participants: [
      { user: "Katsu", avatar: "assets/img/avatar-akatsuki.svg", host: true },
      { user: "gojo_satoru", avatar: "assets/img/avatar-kakashi.svg", host: false },
      { user: "sakura_h", avatar: "assets/img/avatar-sakura.svg", host: false },
      { user: "itachi_uchiha", avatar: "assets/img/avatar-itachi.svg", host: false },
    ],
    chat: [
      { user: "gojo_satoru", text: "Ez a jelenet legendás 🔥", when: "14:32" },
      { user: "sakura_h", text: "Végre elkezdtük!", when: "14:33" },
      { user: "itachi_uchiha", text: "Csendet, jön a legjobb rész", when: "14:35" },
    ],
  },
  notes: [
    { t: "08:14", text: "Itachi visszaemlékezés kezdete" },
    { t: "15:40", text: "Fontos párbeszéd a klánról" },
  ],
  bookmarks: [
    { t: "02:10", label: "Intro vége" },
    { t: "19:55", label: "Cliffhanger" },
  ],
};

/* ----- Manga szekció (mock) ----- */
MOCK.manga = [
  { id: "berserk", title: "Berserk", jp: "ベルセルク", author: "Kentaro Miura", score: 9.47, chapters: 374, status: "Folyamatban", genres: ["Akció", "Dark Fantasy", "Seinen"], cover: "assets/img/poster-attack-on-titan.svg", year: 1989 },
  { id: "vagabond", title: "Vagabond", jp: "バガボンド", author: "Takehiko Inoue", score: 9.24, chapters: 327, status: "Szünetel", genres: ["Akció", "Történelmi", "Seinen"], cover: "assets/img/poster-demon-slayer.svg", year: 1998 },
  { id: "one-piece", title: "One Piece", jp: "ワンピース", author: "Eiichiro Oda", score: 9.21, chapters: 1110, status: "Folyamatban", genres: ["Akció", "Kaland", "Shounen"], cover: "assets/img/poster-one-piece.svg", year: 1997 },
  { id: "jjk", title: "Jujutsu Kaisen", jp: "呪術廻戦", author: "Gege Akutami", score: 8.71, chapters: 271, status: "Befejezett", genres: ["Akció", "Természetfeletti"], cover: "assets/img/poster-jujutsu-kaisen.svg", year: 2018 },
  { id: "csm", title: "Chainsaw Man", jp: "チェンソーマン", author: "Tatsuki Fujimoto", score: 8.66, chapters: 190, status: "Folyamatban", genres: ["Akció", "Horror"], cover: "assets/img/poster-chainsaw-man.svg", year: 2018 },
  { id: "solo", title: "Solo Leveling", jp: "나 혼자만 레벨업", author: "Chugong", score: 8.79, chapters: 200, status: "Befejezett", genres: ["Akció", "Fantasy", "Manhwa"], cover: "assets/img/poster-solo-leveling.svg", year: 2018 },
  { id: "aot", title: "Attack on Titan", jp: "進撃の巨人", author: "Hajime Isayama", score: 9.05, chapters: 139, status: "Befejezett", genres: ["Akció", "Dráma"], cover: "assets/img/poster-attack-on-titan.svg", year: 2009 },
  { id: "spy", title: "Spy x Family", jp: "スパイファミリー", author: "Tatsuya Endo", score: 8.55, chapters: 98, status: "Folyamatban", genres: ["Vígjáték", "Akció"], cover: "assets/img/poster-spy-family.svg", year: 2019 },
];
MOCK.mangaDetail = {
  synopsis: "Egy sötét, középkori világban egy magányos kardforgató, Guts, a Fekete Kardforgató járja útját bosszúért. Az emberi ambíció, a barátság és az árulás eposzi története, amely a manga műfaj egyik csúcsteljesítménye.",
  volumes: 42, published: "1989 – jelenleg", serialization: "Young Animal", demographic: "Seinen",
  chapters: Array.from({ length: 12 }, (_, i) => ({ n: 374 - i, title: `${374 - i}. fejezet`, date: `2024.${String(6 - (i % 6)).padStart(2, "0")}.15.`, read: i > 3 })),
  characters: [
    { name: "Guts", role: "Főszereplő", image: "assets/img/avatar-sasuke.svg" },
    { name: "Griffith", role: "Antagonista", image: "assets/img/avatar-itachi.svg" },
    { name: "Casca", role: "Főszereplő", image: "assets/img/avatar-sakura.svg" },
    { name: "Puck", role: "Mellékszereplő", image: "assets/img/avatar-choji.svg" },
  ],
};
MOCK.readerPages = Array.from({ length: 8 }, (_, i) => ({ n: i + 1, img: ["assets/img/backdrop-sasuke.svg", "assets/img/backdrop-naruto.svg", "assets/img/backdrop-solo-leveling.svg", "assets/img/backdrop-profile.svg"][i % 4] }));

if (typeof window !== "undefined") window.MOCK = MOCK;
