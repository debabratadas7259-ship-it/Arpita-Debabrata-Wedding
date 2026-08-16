# Arpita ❤️ Debabrata — Wedding Invitation Website

A mobile-first, traditional Bengali wedding invitation website, built to be shared over WhatsApp and hosted free on GitHub Pages.

> **Note on photos & music:** No real photos or music file were provided, so the site currently runs on elegant CSS/SVG artwork (alpana motifs, lotus, diyas) instead of placeholder stock images. It works perfectly as-is — but it will look even better once you drop in the couple's real photos and a song, following the steps below. The site is built to gracefully fall back to the decorative artwork if any file is missing, so you'll never see a broken-image icon.

---

## 1. How to open the website

- **Locally:** double-click `index.html`, or right-click → "Open with" your browser. (Some browsers restrict local file access slightly — if animations/fonts don't load correctly, use a simple local server: `python3 -m http.server` in this folder, then visit `http://localhost:8000`.)
- **Online:** once hosted on GitHub Pages (see step 8), just open the link.

## 2. How to add photos

Add these files into the `images/` folder, using **exactly** these filenames:

| File | Used for |
|---|---|
| `opening-invitation.png` | Full-screen background on the very first opening screen |
| `couple.jpg` | Large photo in the gallery |
| `photo1.jpg` | Gallery — Pre-Wedding |
| `photo2.jpg` | Gallery — Family |
| `photo3.jpg` | Gallery — Engagement |
| `photo4.jpg` | Gallery — Memories |
| `photo5.jpg` | Gallery — Wedding Preparations |

As soon as a file is added with the correct name, it will appear automatically — no code changes needed. Any photo you don't add simply shows a decorative placeholder instead.

For best results, keep photos under ~500KB each (compress at [squoosh.app](https://squoosh.app) or similar) so the site stays fast on mobile data.

## 3. How to add music

Add a file named `wedding.mp3` inside the `music/` folder. The **♫ Play Music** button on the opening screen will then work automatically. Music never autoplays — it only starts when a guest taps the button, per mobile browser rules and accessibility best practice.

## 4. How to change the WhatsApp number

Open `script.js` and edit this line near the top:

```javascript
const RSVP_WHATSAPP_NUMBER = "918240244879";
```

Use the full number with country code and no `+`, spaces, or dashes (e.g. `91XXXXXXXXXX`).

## 5. How to update event dates

Open `script.js` and edit:

```javascript
const WEDDING_DATE = "2026-12-13T19:00:00+05:30";
```

This date/time powers the live countdown and the "Save the Date" calendar file. Keep the `+05:30` at the end — that's the Asia/Kolkata timezone offset.

## 6. How to update event times

Individual ritual times (Ashirbad, Gaye Holud, Bor Boron, etc.) currently show **"Date & Time to be announced."** Once confirmed, open `index.html`, find the ritual card you want to update inside the `<!-- RITUALS -->` section, and replace the line:

```html
<span class="ritual-time">Date &amp; Time to be announced</span>
```

with the actual date/time text, e.g.:

```html
<span class="ritual-time">12 Dec 2026, 6:00 PM</span>
```

## 7. How to update the venue

Open `script.js` and edit:

```javascript
const WEDDING_LOCATION = "CW92+82V, Denanchar Orphuli Char, West Bengal, India";
```

This automatically updates the Venue section's "Get Directions" Google Maps link and the RSVP WhatsApp message. To change the Plus Code / address text shown on screen, also edit the Venue section in `index.html` (search for `venue-pluscode` and `venue-line`).

## 8. How to host on GitHub Pages

1. Create a new GitHub repository named `Arpita-Debababrata-Wedding` (or any name you like).
2. Upload all files in this folder (`index.html`, `style.css`, `script.js`, `README.md`, `images/`, `music/`) to the repository, keeping the same structure — `index.html` must be in the root.
3. Go to the repo's **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/root`.
5. Save. GitHub will give you a live link, typically:
   ```
   https://USERNAME.github.io/Arpita-Debababrata-Wedding/
   ```
6. Share that link on WhatsApp — it will show the invitation preview using `opening-invitation.png` (once added) thanks to the Open Graph tags already in `index.html`.

## 9. How to connect a custom domain later

1. Buy a domain (e.g. `arpitaanddebabrata.com`) from any registrar.
2. In the repo, go to **Settings → Pages → Custom domain**, enter your domain, and save. GitHub will create a `CNAME` file automatically.
3. At your domain registrar, add a `CNAME` record pointing to `USERNAME.github.io`, or the `A` records GitHub's documentation specifies for apex domains.
4. Wait for DNS to propagate (can take a few minutes to a few hours), then enable "Enforce HTTPS" in the Pages settings once available.

---

## File structure

```
Arpita-Debababrata-Wedding/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
├── images/
│   ├── opening-invitation.png   (add your own)
│   ├── couple.jpg                (add your own)
│   ├── photo1.jpg                (add your own)
│   ├── photo2.jpg                (add your own)
│   ├── photo3.jpg                (add your own)
│   ├── photo4.jpg                (add your own)
│   └── photo5.jpg                (add your own)
│
└── music/
    └── wedding.mp3                (add your own)
```

Built with plain HTML, CSS and JavaScript only — no backend, no build step, no dependencies beyond Google Fonts (Playfair Display & Noto Serif Bengali), so it runs anywhere for free, including GitHub Pages.
