# Design Brief

## Direction

RIKNOVA FINTECH SOLUTIONS — premium dark-futuristic fintech landing page with glassmorphism, animated aurora gradients, and command-center aesthetic.

## Tone

Confident, technically advanced, premium — dark space background with luminous cyan and violet accents that signal innovation without corporate cliché.

## Differentiation

Floating glassmorphism cards over an animated aurora gradient space background create a "financial command center" aesthetic that feels like the future of finance, not a bank website.

## Color Palette

| Token      | OKLCH           | Role                              |
| ---------- | --------------- | --------------------------------- |
| background | 0.08 0.02 260   | Deep space base (#060816)         |
| foreground | 0.95 0.01 260   | Primary white text                |
| card       | 0.12 0.025 260  | Glass card surface (#101827)      |
| primary    | 0.55 0.2 265    | Electric blue CTA (#2563EB)       |
| accent     | 0.72 0.15 195   | Cyan highlight (#06B6D4)          |
| secondary  | 0.55 0.22 300   | Violet accent (#7C3AED)           |
| muted      | 0.18 0.02 260   | Subdued surface                   |
| muted-fg   | 0.6 0.02 260    | Secondary text (#94A3B8)          |
| success    | 0.65 0.18 150   | Positive states (#10B981)         |
| border     | 0.22 0.02 260   | Subtle dividers                   |
| ring       | 0.72 0.15 195   | Focus states                      |

## Typography

- Display: Space Grotesk — headlines, hero text, brand moments
- Body: DM Sans — paragraphs, UI labels, descriptions
- Mono: Geist Mono — code snippets, data values, technical labels
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl md:text-5xl font-bold tracking-tight`, label `text-sm font-semibold tracking-widest uppercase`, body `text-base md:text-lg`

## Elevation & Depth

Glassmorphism hierarchy: cards use `backdrop-blur(20px)` with semi-transparent dark backgrounds and subtle borders. Shadows are deep and cool-toned. Hero has floating dashboard mockup with `shadow-elevated`.

## Structural Zones

| Zone    | Background              | Border              | Notes                                      |
| ------- | ----------------------- | ------------------- | ------------------------------------------ |
| Header  | transparent → glass     | border-b subtle   | Sticky, blur on scroll                     |
| Hero    | background + aurora     | —                   | Full viewport, floating mockup             |
| Content | alternating muted/30    | —                   | Every other section gets subtle lift       |
| Footer  | muted/40                | border-t subtle   | Darker than content, contained width       |

## Spacing & Rhythm

Section gaps: py-24 to py-32. Content max-width: container 2xl (1400px). Card padding: p-6 to p-8. Micro-spacing: gap-4 for grids, gap-6 for card groups.

## Component Patterns

- Buttons: rounded-lg, primary uses gradient-primary, ghost uses glass with hover:bg-white/5
- Cards: rounded-xl, glass utility, shadow-glass, hover:shadow-elevated with translateY(-4px)
- Badges: rounded-full, glass background, text-xs uppercase tracking-wider

## Motion

- Entrance: fade-in-up with staggered delays per section, 0.6s ease-out
- Hover: cards lift 4px + shadow-elevated, buttons scale(1.02), 0.3s cubic-bezier(0.4,0,0.2,1)
- Decorative: aurora-move 20s infinite on background orbs, float 6s on hero mockup, pulse-glow on CTAs

## Constraints

- Dark mode only — no light mode tokens
- Lucide icons exclusively
- No raw hex colors in components — semantic tokens only
- Glassmorphism must use backdrop-filter with fallback
- All animations respect prefers-reduced-motion

## Signature Detail

Aurora gradient orbs (violet + cyan) slowly drift behind the hero section while glassmorphism cards float above, creating depth through layered transparency — the "financial command center" moment.
