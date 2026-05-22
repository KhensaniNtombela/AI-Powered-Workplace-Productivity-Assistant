# FlowState AI — Polish & Functionality Pass

This is a large request. I'll ship it in **4 phases** so you can review each. Phase 1 starts immediately on approval.

---

## Phase 1 — Home, Auth & Navbar quick wins
- **Home page**
  - Remove the 4 stat cards (Tasks Today, Focus Hours, Productivity Score, Upcoming Deadlines)
  - Remove "No credit card required" and "SOC 2 ready" trust line
  - Replace the green hero card's top band with a real music cover image; Play button → if not logged in, redirect to `/login`; if logged in, go to `/dashboard/music`
  - Move "Burnout risk" floating chip so it sits *above* the green CTA, not overlapping
- **Login / Signup**
  - "Work email" → "Email"
  - On "Verify your email" screen, Back button goes to `/login` (not the previous form state)
  - Add **Forgot password** link → triggers `supabase.auth.resetPasswordForEmail` and shows a check-inbox screen
  - Create `/reset-password` route to set a new password
- **Pricing → Auth redirect-back**
  - "Start free" / "Start 14-day trial" pass `?redirect=/pricing` to login; "Back home" button on login respects `redirect` and returns there
- **Navbar**
  - Hide notification bell unless user is logged in AND inside `/dashboard/*`
  - Add **scroll-to-top floating arrow** (appears after scrolling 400px) globally on public pages
  - Wire the navbar search to filter a static list of site pages/features and navigate on select
  - Globe/language switcher: wire to `i18next` with EN/ES/FR/DE/AR translations covering nav, home hero, and common labels (full-site translation; persists in localStorage)

## Phase 2 — Music, ASMR & Floating Player
- **Real audio**: replace fake bar animation with actual `<audio>` playback using a single `audioRef` (Pixabay/Freesound CDN tracks for demo)
- **Music & ASMR page**
  - Each ASMR sound (Rain, Thunder, Ocean, Café, Fire, Theta/Delta, etc.) loops a real audio file with working volume slider
  - "Choose your environment" presets (Mountain Lake, Rainy Café, Cozy Night Room, Forest, Library) — clicking starts the matching layered ASMR mix
  - Connect buttons deep-link in new tab: Spotify → spotify.com, Apple Music → music.apple.com, YouTube Music → music.youtube.com
- **Floating player (global)**
  - Only appears AFTER a track is chosen (not on mount)
  - Minimise button hides it; reopens automatically when user returns to `/dashboard/music` and a track is active
  - State lifted to a `PlayerProvider` context so it survives navigation and actually plays/pauses real audio
- **Focus mode**
  - Timer fully functional (start/pause/reset already works — verify)
  - Add a working music picker (Lo-Fi, Rainfall, Theta Waves) that uses the same PlayerProvider so sound actually plays
  - "Music" button in focus mode toggles the focus-music track

## Phase 3 — Support & Contact
- Functional search bar filtering FAQ list as you type
- Pre-populated FAQ list (8–10 common questions about FlowState, pricing, AI, privacy, integrations)
- Contact form: success toast = "Your message has been delivered." Form resets so a new message can be sent immediately

## Phase 4 — Polish pass & verification
- Verify all routes render, no console errors
- Confirm scroll-to-top, language switcher, search work across pages
- Confirm music playback works on Music page, Focus mode, and via floating player

---

## Technical notes
- **i18n**: add `react-i18next` + `i18next` with 5 language JSON resource bundles. Wrap app in `I18nextProvider`. Translations cover ~40 keys (nav, hero CTAs, common buttons).
- **PlayerProvider**: new `src/components/player-provider.tsx` holds `currentTrack`, `playing`, `volume`, `minimised`, single shared `HTMLAudioElement`. Replaces `FloatingPlayer`'s internal state.
- **Reset password**: new `src/routes/reset-password.tsx` listens for `type=recovery` in URL hash and calls `supabase.auth.updateUser({ password })`.
- **Demo audio**: use free CC0 loops from `https://cdn.pixabay.com/...` (lo-fi, rain, fireplace, ocean, café). No API keys needed.
- **Search**: navbar search uses a static index of `{ title, href, keywords }` entries — fuzzy match with `fuse.js`.

Confirm to start with **Phase 1**, or tell me to reorder.