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

if (typeof window !== "undefined") window.MOCK = MOCK;
