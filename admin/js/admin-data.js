/* ==========================================================================
   AnimeHub – admin-data.js
   Admin panel demó adatai (dashboard, animék, epizódok, moderáció,
   statisztika, aktivitás). Az admin/ mappán belül fut, a képek a gyökér
   assets/ mappájából jönnek → renderkor "../" előtaggal.
   ========================================================================== */

const ADMIN = {
  /* ----- Dashboard stat kártyák ----- */
  dashStats: [
    { label: "Összes felhasználó", value: "12,846", trend: "+18.2%", icon: "users" },
    { label: "Összes anime",       value: "456",    trend: "+7.4%",  icon: "anime" },
    { label: "Összes epizód",      value: "2,846",  trend: "+12.6%", icon: "episode" },
    { label: "Oldalmegtekintések", value: "182,453", trend: "+23.5%", icon: "eye" },
  ],

  /* Felhasználók növekedése (napi) */
  userGrowth: [320, 340, 420, 480, 460, 520, 560, 540, 600, 620, 580, 650, 640, 700, 680, 720, 700, 690, 730, 720, 750, 740, 720, 760, 750, 740, 760, 750, 745, 780],

  /* Megtekintések forrása (fánk) */
  viewsSource: [
    { name: "Közvetlen",      value: 48.5, color: "#8B5CF6" },
    { name: "Keresőmotor",    value: 28.7, color: "#3B82F6" },
    { name: "Közösségi média", value: 12.4, color: "#EC4899" },
    { name: "Hivatkozások",   value: 7.2,  color: "#F59E0B" },
    { name: "Egyéb",          value: 3.2,  color: "#6B7280" },
  ],

  /* Aktuális tevékenységek */
  activities: [
    { type: "u", title: "Új felhasználó regisztrált", sub: "naruto_fan_23",         when: "2 perce" },
    { type: "e", title: "Új epizód hozzáadva",         sub: "Jujutsu Kaisen 2. évad 18. rész", when: "5 perce" },
    { type: "r", title: "Felhasználó jelentve",        sub: "uchiha_sasuke23",       when: "12 perce" },
    { type: "n", title: "Új hír közzétéve",            sub: "Nyári szezon újdonságai", when: "25 perce" },
    { type: "v", title: "Felhasználó rangot lépett",   sub: "akatsuki_itachi (VIP)", when: "1 órája" },
  ],

  /* ----- Animék tábla ----- */
  animes: [
    { title: "Solo Leveling", jp: "俺だけレベルアップな件", studio: "A-1 Pictures", genres: ["Akció", "Kaland", "Fantasy"], year: 2024, eps: 12, status: "active", created: "2024.01.10.", image: "assets/img/poster-solo-leveling.svg" },
    { title: "Demon Slayer: Kimetsu no Yaiba", jp: "鬼滅の刃", studio: "ufotable", genres: ["Akció", "Démonok", "Történelmi"], year: 2019, eps: 55, status: "active", created: "2019.04.06.", image: "assets/img/poster-demon-slayer.svg" },
    { title: "Jujutsu Kaisen", jp: "呪術廻戦", studio: "MAPPA", genres: ["Akció", "Iskola", "Természetfeletti"], year: 2020, eps: 47, status: "active", created: "2020.10.03.", image: "assets/img/poster-jujutsu-kaisen.svg" },
    { title: "Attack on Titan", jp: "進撃の巨人", studio: "Wit Studio", genres: ["Akció", "Dráma", "Fantasy"], year: 2013, eps: 87, status: "active", created: "2013.04.07.", image: "assets/img/poster-attack-on-titan.svg" },
    { title: "Tokyo Revengers", jp: "東京リベンジャーズ", studio: "LIDENFILMS", genres: ["Akció", "Dráma", "Időutazás"], year: 2021, eps: 37, status: "active", created: "2021.04.11.", image: "assets/img/poster-tokyo-revengers.svg" },
    { title: "One Piece", jp: "ワンピース", studio: "Toei Animation", genres: ["Akció", "Kaland", "Vígjáték"], year: 1999, eps: 1102, status: "active", created: "1999.10.20.", image: "assets/img/poster-one-piece.svg" },
    { title: "Chainsaw Man", jp: "チェンソーマン", studio: "MAPPA", genres: ["Akció", "Horror", "Természetfeletti"], year: 2022, eps: 12, status: "active", created: "2022.10.11.", image: "assets/img/poster-chainsaw-man.svg" },
    { title: "Bleach: Thousand-Year Blood War", jp: "BLEACH 千年血戦篇", studio: "Pierrot", genres: ["Akció", "Kaland", "Természetfeletti"], year: 2022, eps: 26, status: "active", created: "2022.10.10.", image: "assets/img/poster-bleach.svg" },
    { title: "My Hero Academia", jp: "僕のヒーローアカデミア", studio: "Bones", genres: ["Akció", "Iskola", "Szuperhős"], year: 2016, eps: 138, status: "active", created: "2016.04.03.", image: "assets/img/poster-my-hero-academia.svg" },
    { title: "Naruto Shippuden", jp: "NARUTO -ナルト- 疾風伝", studio: "Pierrot", genres: ["Akció", "Kaland", "Harcművészet"], year: 2007, eps: 500, status: "active", created: "2007.02.15.", image: "assets/img/poster-naruto-shippuden.svg" },
    { title: "Frieren: Beyond Journey's End", jp: "葬送のフリーレン", studio: "Madhouse", genres: ["Kaland", "Dráma", "Fantasy"], year: 2023, eps: 28, status: "active", created: "2023.09.29.", image: "assets/img/poster-frieren.svg" },
    { title: "Spy x Family", jp: "スパイファミリー", studio: "Wit Studio", genres: ["Akció", "Vígjáték", "Kémkedés"], year: 2022, eps: 37, status: "active", created: "2022.04.09.", image: "assets/img/poster-spy-family.svg" },
    { title: "Blue Lock", jp: "ブルーロック", studio: "8bit", genres: ["Sport", "Dráma", "Shounen"], year: 2022, eps: 24, status: "active", created: "2022.10.09.", image: "assets/img/poster-blue-lock.svg" },
    { title: "Dandadan", jp: "ダンダダン", studio: "Science SARU", genres: ["Akció", "Vígjáték", "Természetfeletti"], year: 2024, eps: 12, status: "active", created: "2024.10.04.", image: "assets/img/poster-dandadan.svg" },
    { title: "Black Clover", jp: "ブラッククローバー", studio: "Pierrot", genres: ["Akció", "Fantasy", "Mágia"], year: 2017, eps: 170, status: "inactive", created: "2017.10.03.", image: "assets/img/poster-black-clover.svg" },
  ],
  animeTotal: 456,

  /* Legújabb epizódok (dashboard) */
  latestEpisodes: [
    { anime: "Jujutsu Kaisen Season 2", ep: "2. évad 18. rész", created: "2024.06.18.", image: "assets/img/poster-jujutsu-kaisen.svg" },
    { anime: "Wind Breaker",            ep: "2. évad 6. rész",  created: "2024.06.18.", image: "assets/img/poster-wind-breaker.svg" },
    { anime: "Kaiju No. 8",             ep: "1. évad 7. rész",  created: "2024.06.17.", image: "assets/img/poster-kaiju-8.svg" },
    { anime: "My Hero Academia",        ep: "7. évad 10. rész", created: "2024.06.17.", image: "assets/img/poster-my-hero-academia.svg" },
    { anime: "The Irregular at Magic High School", ep: "3. évad 5. rész", created: "2024.06.16.", image: "assets/img/poster-irregular-magic.svg" },
  ],

  /* ----- Epizódok kezelése oldal ----- */
  episodeAnime: {
    title: "Jujutsu Kaisen", jp: "呪術廻戦", type: "TV Sorozat",
    studio: "MAPPA", year: 2020, seasons: 2, epsTotal: 47,
    image: "assets/img/poster-jujutsu-kaisen.svg",
  },
  episodes: [
    { n: 1,  title: "Ryomen Sukuna", jp: "両面宿儺", season: 1, len: "23:55", date: "2020.10.03.", status: "published", thumb: "assets/img/backdrop-sasuke.svg" },
    { n: 2,  title: "For Myself", jp: "自分のために", season: 1, len: "23:40", date: "2020.10.10.", status: "published", thumb: "assets/img/backdrop-naruto.svg" },
    { n: 3,  title: "Girl of Steel", jp: "鉄骨娘", season: 1, len: "23:55", date: "2020.10.17.", status: "published", thumb: "assets/img/backdrop-sasuke.svg" },
    { n: 4,  title: "Curse Womb Must Die", jp: "呪胎戴天", season: 1, len: "23:40", date: "2020.10.24.", status: "published", thumb: "assets/img/backdrop-naruto.svg" },
    { n: 5,  title: "Curse for You", jp: "呪いのあなたに", season: 1, len: "23:55", date: "2020.10.31.", status: "published", thumb: "assets/img/backdrop-sasuke.svg" },
    { n: 6,  title: "After Rain", jp: "雨のち", season: 1, len: "23:40", date: "2020.11.07.", status: "published", thumb: "assets/img/backdrop-naruto.svg" },
    { n: 7,  title: "Assault", jp: "急襲", season: 1, len: "23:55", date: "2020.11.14.", status: "draft", thumb: "assets/img/backdrop-sasuke.svg" },
    { n: 8,  title: "Boredom", jp: "退屈", season: 1, len: "23:40", date: "2020.11.21.", status: "draft", thumb: "assets/img/backdrop-naruto.svg" },
    { n: 9,  title: "Small Fry and Reverse Retribution", jp: "幼魚と逆罰", season: 1, len: "23:55", date: "2020.11.28.", status: "scheduled", thumb: "assets/img/backdrop-sasuke.svg" },
    { n: 10, title: "Idle Death Gamble", jp: "無為転変", season: 1, len: "23:40", date: "2020.12.05.", status: "scheduled", thumb: "assets/img/backdrop-naruto.svg" },
  ],
  episodesTotal: 47,

  /* ----- Moderáció oldal ----- */
  modOverview: [
    { label: "Új hozzászólás",      value: "243", trend: "+12.5%", dir: "up",   icon: "comment", tone: "e" },
    { label: "Jelentés",            value: "18",  trend: "-5.3%",  dir: "down", icon: "shield",  tone: "r" },
    { label: "Felhasználói jelentés", value: "7", trend: "+7.1%",  dir: "up",   icon: "flag",    tone: "n" },
    { label: "Elrejtett/törölt",    value: "12",  trend: "+9.8%",  dir: "up",   icon: "banSm",   tone: "u" },
  ],
  comments: [
    { user: "naruto_fan_23", vip: true,  avatar: "assets/img/avatar-itachi.svg", text: "Ez az epizód egyszerűen zseniális volt! 🔥🔥", ref: "Epizód: 456 – Itachi története", type: "Nyilvános hozzászólás", date: "Ma, 14:32", status: "approved" },
    { user: "uchiha_sasuke23", vip: false, avatar: "assets/img/avatar-sasuke.svg", text: "Sasuke a legjobb karakter az egész sorozatban! 💜", ref: "Anime: Naruto Shippuden", type: "Anime hozzászólás", date: "Ma, 13:47", status: "approved" },
    { user: "kage_shadow", vip: false, avatar: "assets/img/avatar-shino.svg", text: "Inkább nézzetek One Piece-t, ez sokkal jobb!!!", ref: "Anime: Naruto Shippuden", type: "Anime hozzászólás", date: "Ma, 12:15", status: "hidden" },
    { user: "sakura_haruno", vip: false, avatar: "assets/img/avatar-sakura.svg", text: "Sakura végre hasznos volt ebben a részben 😊", ref: "Epizód: 457 – Testvéri kötelék", type: "Nyilvános hozzászólás", date: "Tegnap, 22:41", status: "approved" },
    { user: "madara_uchiha", vip: false, avatar: "assets/img/avatar-akatsuki.svg", text: "Ez az oldal szörnyű… tele van hibákkal és reklámokkal!!!", ref: "Anime: Jujutsu Kaisen", type: "Anime hozzászólás", date: "Tegnap, 21:03", status: "deleted" },
    { user: "luffy_gear5", vip: true, avatar: "assets/img/avatar-rocklee.svg", text: "Gear 5 jelenet egyszerűen brutális volt! 😎", ref: "Epizód: 1102 – Gear 5", type: "Nyilvános hozzászólás", date: "Tegnap, 19:55", status: "approved" },
    { user: "random_user_69", vip: false, avatar: "assets/img/avatar-kiba.svg", text: "K*rva sz*r anime, időpazarlás az egész.", ref: "Anime: Tokyo Revengers", type: "Anime hozzászólás", date: "Tegnap, 18:30", status: "hidden" },
    { user: "gojo_satoru", vip: true, avatar: "assets/img/avatar-kakashi.svg", text: "Gojo sensei a legnagyobb király! 🔵", ref: "Anime: Jujutsu Kaisen", type: "Anime hozzászólás", date: "Tegnap, 17:12", status: "approved" },
  ],
  reportedUsers: [
    { user: "kage_shadow", reports: 5, avatar: "assets/img/avatar-shino.svg" },
    { user: "random_user_69", reports: 3, avatar: "assets/img/avatar-kiba.svg" },
    { user: "anime_hater_01", reports: 2, avatar: "assets/img/avatar-neji.svg" },
  ],

  /* ----- Statisztika oldal ----- */
  statCards: [
    { label: "Összes megtekintés",   value: "182,453", trend: "+23.5%", icon: "eye" },
    { label: "Egyedi felhasználók",  value: "54,782",  trend: "+18.2%", icon: "users" },
    { label: "Megtekintett epizódok", value: "278,154", trend: "+21.7%", icon: "episode" },
    { label: "Átlagos nézési idő",   value: "24:38",   trend: "+6.3%",  icon: "clock" },
    { label: "Új regisztrációk",     value: "2,846",   trend: "+18.9%", icon: "userplus" },
    { label: "Premium feliratkozások", value: "324",   trend: "+15.4%", icon: "crown" },
  ],

  viewsTrend: [16000, 18000, 22000, 21000, 24000, 26000, 30000, 33000, 28000, 31000, 30000, 32000, 31000, 28000, 34000],

  devices: [
    { name: "Mobil",      value: 47.8, color: "#8B5CF6" },
    { name: "Asztali gép", value: 32.6, color: "#3B82F6" },
    { name: "Tablet",     value: 11.2, color: "#EC4899" },
    { name: "Okos TV",    value: 6.1,  color: "#F59E0B" },
    { name: "Egyéb",      value: 2.3,  color: "#22C55E" },
  ],

  countries: [
    { flag: "🇭🇺", name: "Magyarország",     value: 34.6 },
    { flag: "🇺🇸", name: "Egyesült Államok", value: 16.8 },
    { flag: "🇩🇪", name: "Németország",      value: 8.7 },
    { flag: "🇷🇴", name: "Románia",          value: 6.1 },
    { flag: "🇫🇷", name: "Franciaország",    value: 4.3 },
    { flag: "🌍", name: "Egyéb",            value: 29.5 },
  ],

  popularAnimes: [
    { title: "Solo Leveling", rating: 9.3, views: 24532, image: "assets/img/poster-solo-leveling.svg" },
    { title: "Jujutsu Kaisen Season 2", rating: 9.0, views: 18749, image: "assets/img/poster-jujutsu-kaisen.svg" },
    { title: "Demon Slayer: Hashira Training Arc", rating: 9.1, views: 17652, image: "assets/img/poster-demon-slayer.svg" },
    { title: "Attack on Titan Final Season", rating: 9.0, views: 16981, image: "assets/img/poster-attack-on-titan.svg" },
    { title: "One Piece", rating: 9.0, views: 13847, image: "assets/img/poster-one-piece.svg" },
  ],

  watchHours: [3200, 2400, 4100, 3600, 5200, 4800, 7100, 6200, 4900, 5400, 3800, 4600],

  revenue: [
    { label: "Összes bevétel", value: "$5,324.45", trend: "+23.7%", icon: "dollar" },
    { label: "Premium bevétel", value: "$4,782.00", trend: "+21.4%", icon: "crown" },
    { label: "Hirdetési bevétel", value: "$542.45", trend: "+31.2%", icon: "ad" },
    { label: "Új feliratkozások", value: "324", trend: "+15.4%", icon: "userplus" },
  ],

  /* ----- Admin sidebar menü ----- */
  nav: [
    { group: "Áttekintés", items: [
      { page: "dashboard", href: "index.html", icon: "home", label: "Irányítópult" },
    ]},
    { group: "Tartalom kezelése", items: [
      { page: "animes",     href: "animes.html", icon: "anime", label: "Animék" },
      { page: "episodes",   href: "episodes.html", icon: "episode", label: "Epizódok" },
      { page: "watchlist",  href: "#", icon: "list", label: "Műsorlista" },
      { page: "categories", href: "#", icon: "folder", label: "Kategóriák" },
      { page: "studios",    href: "#", icon: "building", label: "Stúdiók" },
      { page: "tags",       href: "#", icon: "tag", label: "Címkék" },
    ]},
    { group: "Felhasználók", items: [
      { page: "users",   href: "#", icon: "users", label: "Felhasználók" },
      { page: "roles",   href: "#", icon: "shield", label: "Szerepkörök" },
      { page: "banners", href: "#", icon: "ban", label: "Bannerek" },
    ]},
    { group: "Oldal kezelése", items: [
      { page: "news",  href: "#", icon: "news", label: "Hírek" },
      { page: "pages", href: "#", icon: "file", label: "Oldalak" },
      { page: "ads",   href: "#", icon: "mega", label: "Hirdetések" },
    ]},
    { group: "Rendszer", items: [
      { page: "settings", href: "settings.html", icon: "settings", label: "Beállítások" },
      { page: "logs",     href: "#", icon: "logs", label: "Naplók" },
      { page: "security", href: "#", icon: "lock", label: "Biztonság" },
      { page: "backups",  href: "#", icon: "save", label: "Mentések" },
      { page: "moderation", href: "moderation.html", icon: "shield", label: "Moderáció" },
    ]},
  ],
};
