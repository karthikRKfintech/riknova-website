# Diwali 2026 fireworks overlay

A short (~6 s, hard cap 7 s) transparent fireworks + greeting overlay shown on
the **homepage only**, once per visitor per IST calendar day, during:

| | |
|---|---|
| Start (inclusive) | 8 Nov 2026 00:00:00 IST (`2026-11-07T18:30:00Z`) |
| End (exclusive) | 11 Nov 2026 00:00:00 IST (`2026-11-10T18:30:00Z`) |

Activation is automatic and uses `Asia/Kolkata` (fixed UTC+05:30) regardless of
the visitor's timezone. No deployment is needed to turn it on or off at those
times. Outside the window, the gate does one date comparison and nothing else:
no storage access, no extra network request, no animation code is loaded.

## Files

| File | Role |
|---|---|
| `diwaliConfig.ts` | Kill switch, dates, storage key, eligibility + safe storage helpers, dev preview parsing |
| `DiwaliGate.tsx` | Mounted in `App.tsx` (homepage). Decides eligibility, lazy-loads the overlay, error boundary |
| `DiwaliOverlay.tsx` | Overlay UI: canvas, greeting, Skip button, reduced-motion variant (separate lazy chunk) |
| `fireworksEngine.ts` | Canvas 2D particle engine (separate lazy chunk) |

## Behaviour

- Starts after the existing loading screen fades, and only while the tab is visible.
- Marks the visit as shown (`localStorage["riknova:diwali-fireworks-2026:v1:lastShownIstDate"] = "YYYY-MM-DD"`, IST date) only when it actually starts.
- If localStorage is unavailable, it falls back to sessionStorage, then to memory (so at worst it shows once per page load). It never throws.
- `pointer-events: none` everywhere except the Skip button (also Esc). It sits at `z-[90]`, above the navbar (`z-50`) and below the Book-a-Demo modal (`z-[100]`).
- `prefers-reduced-motion: reduce` gets a static greeting with no fireworks. If Canvas is unavailable, the same static greeting is used.
- If the tab is hidden mid-show, everything is torn down. All rAF calls, timers, listeners and canvas memory are released on finish or skip.

## Local preview (development only)

Preview parameters are read only when `import.meta.env.DEV` is true (`pnpm dev`).
Vite removes this code from production builds, so these parameters do nothing on
riknova.com.

```bash
cd src/frontend
pnpm dev
```

| URL | Effect |
|---|---|
| `http://localhost:5173/?diwali-preview=1` | Force the full show, ignoring date and "already shown". Every reload replays it and storage is not written. |
| `http://localhost:5173/?diwali-preview=reduced` | Force the reduced-motion static greeting |
| `http://localhost:5173/?diwali-now=2026-11-08T00:00:00%2B05:30` | Simulate "now" with the real eligibility and storage rules (boundary testing) |

To leave preview mode, remove the query parameter. For mobile and tablet layouts, use
browser devtools device emulation with the same URL. To reset the once-per-day
state, run `localStorage.removeItem("riknova:diwali-fireworks-2026:v1:lastShownIstDate")`
in the console.

## Emergency disable

1. Set `DIWALI_ANIMATION_ENABLED = false` in `diwaliConfig.ts`.
2. Commit to `main` (via PR); Cloudflare Workers Builds redeploys.

Fastest option, with no code change: in the Cloudflare dashboard → Workers & Pages →
`riknova-website` → Deployments, roll back to the previous version.

## After the festival

The feature goes dormant automatically after 11 Nov 2026 00:00 IST. The folder
and the `<DiwaliGate />` line in `App.tsx` can be removed at any time.
