/* ==========================================================================
   AnimeHub – admin-data.js
   Admin panel demó adatai (dashboard, animék, statisztika, aktivitás)
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
  userGrowth: [320, 340, 420, 480, 460, 520, 560, 540, 600, 620, 580, 650, 640, 700, 680, 720, 700, 690, 730, 720, 750, 740, 720, 760, 750, 740, 760, 750, 745, 750],

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

  /* ----- Statisztika oldal ----- */
  statCards: [
    { label: "Összes megtekintés",   value: "182,453", trend: "+23.5%", icon: "eye" },
    { label: "Egyedi felhasználók",  value: "54,782",  trend: "+18.2%", icon: "users" },
    { label: "Megtekintett epizódok", value: "278,154", trend: "+21.7%", icon: "episode" },
    { label: "Átlagos nézési idő",   value: "24:38",   trend: "+6.3%",  icon: "clock" },
    { label: "Új regisztrációk",     value: "2,846",   trend: "+18.9%", icon: "userplus" },
    { label: "Premium feliratkozások", value: "324",   trend: "+15.4%", icon: "crown" },
  ],

  viewsTrend: [16000, 18000, 22000, 21000, 24000, 26000, 30000, 33000, 28000, 31000, 30000, 32000, 31000, 28000, 30000],

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
      { page: "dashboard", href: "admin.html", icon: "home", label: "Irányítópult" },
    ]},
    { group: "Tartalom kezelése", items: [
      { page: "animes",     href: "admin-animes.html", icon: "anime", label: "Animék" },
      { page: "episodes",   href: "#", icon: "episode", label: "Epizódok" },
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
      { page: "settings", href: "admin-settings.html", icon: "settings", label: "Beállítások" },
      { page: "logs",     href: "#", icon: "logs", label: "Naplók" },
      { page: "security", href: "#", icon: "lock", label: "Biztonság" },
      { page: "backups",  href: "#", icon: "save", label: "Mentések" },
    ]},
  ],
};
