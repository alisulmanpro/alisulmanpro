# Ali Sulman — Portfolio

Personal portfolio site, built with **React 19 + TypeScript + Vite**, animated with **Framer Motion** and **Lenis** smooth scrolling.

## Run locally

```bash
cd portfolio
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Deploy on Vercel

1. Import the `alisulmanpro/alisulmanpro` repo in Vercel.
2. Set **Root Directory** to `portfolio`.
3. Framework preset: **Vite** (build `npm run build`, output `dist`).

## Edit the content

All text, links and project details live in [`src/data.ts`](src/data.ts). Project cards are in
[`src/components/Work.tsx`](src/components/Work.tsx). Colours are CSS variables at the top of
[`src/index.css`](src/index.css).

## What's animated

| Where | Animation |
|---|---|
| Intro | Green preloader counts 0 → 100, name rises letter by letter, panel lifts away |
| Hero | Headline letters rise from masks, highlight sweeps under "products", arch grows, photo slides up |
| Hero | 3D neural sphere follows the cursor; arch, photo and chips move in parallax layers |
| Everywhere | Custom two-part cursor ("View" on project cards, "Chat" on the WhatsApp badge), magnetic buttons |
| Marquee | Speeds up with scroll velocity and flips direction when scrolling up |
| Numbers | Count up when they enter the screen |
| Projects | Cards open from a clipped frame and tilt in 3D toward the cursor; light sheen on hover |
| Routify | Route draws itself on the map while a courier dot drives along it |
| Rozzy | Spoken order types itself out with voice waves, then the bill appears |
| VU Pilot AI | Deadlines slide in, WhatsApp reminder toast loops |
| About | Statement lights up word by word as you scroll; timeline line draws itself |
| Teaching | Green band opens like a window; outlined text slides with scroll |
| Footer | Giant name rises letter by letter; letters jump on hover |

Smooth scrolling and motion are turned off automatically for visitors who enable "reduce motion" in their system settings.
