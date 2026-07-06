# AnimeHub

Anime streaming weboldal – statikus HTML + CSS + JS, keretrendszer nélkül.

## Oldalak

| Fájl | Oldal |
|---|---|
| `index.html` | Kezdőlap (hero carousel, folytatás, népszerű animék, ütemezés) |
| `anime.html` | Anime adatlap (Naruto Shippuden – értékelés, epizódok, kapcsolódók) |
| `watch.html` | Videólejátszó (KATSU dizájn, epizódlista, lejátszó vezérlők) |
| `profile.html` | Profil (statisztikák, kedvencek, nézési grafikon, kitűzők) |
| `team.html` | Csapat tagok (szűrés, keresés, rendezés, szerepkörök) |

## Struktúra

```
├── index.html / anime.html / watch.html / profile.html / team.html
├── css/
│   ├── base.css      # közös: változók, topbar, sidebar, gombok, kártyák
│   ├── home.css      # kezdőlap
│   ├── anime.css     # adatlap
│   ├── watch.css     # lejátszó
│   ├── profile.css   # profil
│   └── team.css      # csapat
├── js/
│   ├── data.js       # KÖZPONTI ADATOK – animék, epizódok, tagok stb.
│   ├── layout.js     # közös topbar + sidebar renderelése
│   ├── main.js       # közös logika (kereső, görgetés, fülek)
│   ├── home.js / watch.js / profile.js / team.js   # oldalankénti logika
└── assets/img/       # placeholder SVG képek (poszterek, avatarok, hátterek)
```

## Képek és videók cseréje

- A `assets/img/` mappában lévő SVG-k **placeholderek** – cseréld le őket valódi
  képekre (jpg/png/webp), és írd át az útvonalakat a `js/data.js`-ben, illetve
  a HTML-ekben (`poster-*.svg`, `backdrop-*.svg`, `avatar-*.svg`, `thumb-*.svg`).
- Videóhoz: a `watch.html`-ben van egy kikommentezett `<video>` tag – tedd a
  videófájlt pl. `assets/video/` alá és aktiváld.

## Futtatás

Nyisd meg az `index.html`-t böngészőben, vagy indíts egy helyi szervert:

```bash
python3 -m http.server 8000
# http://localhost:8000
```
