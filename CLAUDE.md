# CLAUDE.md — multiunit.ca Landing Page

## Project Overview

You are building the **marketing landing page** for `multiunit.ca` — a property intelligence platform for Toronto/GTA real estate developers and investors. The landing page's sole job is to communicate the product's value and route visitors to the product page (a chatbot-based analysis tool).

This is a **landing page only**. The product page (chatbot UI) is a separate build scoped elsewhere.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + custom CSS for animations
- **Animation:** Framer Motion (scroll animations, entrance effects) + raw SVG stroke animation (CSS `stroke-dashoffset`)
- **3D/Illustration:** SVG-based isometric architecture illustration (no Three.js needed — pure SVG)
- **Component library:** [21st.dev](https://21st.dev) for select UI primitives (buttons, inputs, badges)
- **Fonts:** `Inter` (body/UI) + `Cal Sans` or `Geist` (display headlines) — load via `next/font`
- **Icons:** `lucide-react`
- **Deployment target:** Vercel

---

## Design System

### Color Palette

```
--color-bg:           #FFFFFF          /* Page background — pure white */
--color-bg-soft:      #F7F8FC          /* Soft off-white — used behind mockup card, section fills */
--color-navy:         #0F1F3D          /* Primary navy — headlines, strokes, strong UI elements */
--color-navy-mid:     #1E3A5F          /* Mid navy — secondary text, icon fills */
--color-navy-light:   #D6E0F0          /* Light navy tint — grid lines, dividers, subtle borders */
--color-accent:       #1E56A0          /* Accent blue — CTA buttons, active states, highlights */
--color-accent-glow:  #3B82F6          /* Electric blue — hover glows, animated stroke color */
--color-text:         #0F1F3D          /* Body text = navy, not black */
--color-text-muted:   #6B7A99          /* Muted — captions, labels, secondary copy */
--color-white:        #FFFFFF
```

### Typography

```
Display:  "Cal Sans" or "Geist" — weight 600–700, used for H1 and H2 only
Body:     "Inter" — weight 400/500, all body copy, labels, nav
Mono:     "Geist Mono" — data annotations on the SVG illustration, coordinate labels
```

**Type scale:**
```
H1 (hero):       clamp(3rem, 6vw, 5.5rem), tracking: -0.03em, weight: 700
H2 (sections):   clamp(2rem, 4vw, 3.5rem), tracking: -0.02em, weight: 600
H3 (cards):      1.25rem, weight: 600
Body large:      1.125rem, line-height: 1.7
Body:            1rem, line-height: 1.6
Label/caption:   0.75rem, uppercase, tracking: 0.1em, weight: 500
Mono data:       0.65rem, Geist Mono, color: var(--color-accent)
```

### Spacing & Layout

- Max content width: `1200px`
- Section vertical padding: `clamp(80px, 10vw, 140px)`
- Grid: 12-column CSS grid, mobile-first
- Border radius: `12px` cards, `8px` inputs/buttons, `0` for structural dividers

### Animation Principles

- All scroll animations use Framer Motion `useInView` with `once: true`
- Default entrance: `opacity 0→1, y: 24→0, duration: 0.6s, ease: [0.16, 1, 0.3, 1]`
- Stagger children: `0.08s` delay between items
- SVG stroke draw: CSS `stroke-dasharray` + `stroke-dashoffset`, triggered on scroll into view
- No animation if `prefers-reduced-motion: reduce` is set — wrap all Framer Motion variants with this check
- Hover states: `transform: translateY(-2px)`, duration `0.2s`

---

## Page Architecture

The page is a single long-scroll page. Section order mirrors Railway's structure:

```
1. Navbar
2. Hero
3. Product Mockup (floating UI card with demo tabs)
4. Stroke Animation Divider ("The Intelligence Layer")
5. How It Works (3 steps)
6. Analysis Lenses (feature cards)
7. Trusted By (placeholder logos)
8. Final CTA
9. Footer
```

---

## Section Specifications

---

### 1. Navbar

**Layout:** Fixed top, full width, white background with `backdrop-filter: blur(12px)` and a 1px bottom border `var(--color-navy-light)` that appears on scroll (not on load).

**Left:** Logo — placeholder wordmark: `multiunit` in Geist weight 700, lowercase, deep navy, with `.ca` in `var(--color-accent)` — same size, same weight, no space. When logo file is provided, swap `<img src="/logo.svg" />` here.

**Center:** Nav links — `Features`, `How It Works`, `Analysis`, `Pricing` (placeholder, links to `#section-id`)

**Right:** `Sign In` (ghost, text-only) + `Get Started →` (filled navy button, `border-radius: 8px`, white text)

**Mobile:** Hamburger menu, slide-down drawer, same links stacked.

---

### 2. Hero Section

**Background:** Pure white `#FFFFFF`

**Layout:** Centered, max-width `800px`, vertically padded `160px` top, `80px` bottom

**Eyebrow label:** Small uppercase label above headline: `Toronto & GTA · Property Intelligence`  
Style: `var(--color-accent)`, 0.75rem, letter-spacing 0.1em, with a `2px` left border in accent color, `padding-left: 10px`

**Headline (H1):**
```
Property Intelligence.
Instantly.
```
Two lines. `clamp(3.5rem, 6vw, 5.5rem)`. Weight 700. Deep navy. Tight tracking `-0.03em`.  
The word `Instantly.` animates in 0.3s after the first line — same entrance as the rest but slightly delayed.

**Subheadline:**
```
Enter any GTA address and get instant feasibility analysis —
zoning, MLI Select eligibility, multiplex potential, and full pro forma.
Built for developers who move fast.
```
Body large, `var(--color-text-muted)`, max-width `560px`, centered.

**CTA buttons (two, side by side):**
- Primary: `Analyze a Property →` — filled `var(--color-accent)`, white text, `border-radius: 8px`, `padding: 14px 28px`, hover: slight glow `box-shadow: 0 0 0 4px rgba(30, 86, 160, 0.15)`
- Secondary: `See a Demo` — outlined, navy border, navy text, same sizing

**Below CTAs:** Small text: `No account needed · Toronto/GTA addresses only (for now)`  
Style: 0.8rem, muted, centered

**Entrance animation:** Eyebrow → H1 line 1 → H1 line 2 → subhead → CTAs — each staggered by 0.1s on page load

---

### 3. Product Mockup Card (Hero Extension)

This is the **centerpiece of the page** — modeled directly on Railway's floating UI card. It sits below the hero text, spanning most of the viewport width (max `1100px`), with a soft drop shadow.

**Outer card:**
- Background: `var(--color-bg-soft)` `#F7F8FC`
- Border: `1px solid var(--color-navy-light)`
- Border radius: `16px`
- Box shadow: `0 32px 80px rgba(15, 31, 61, 0.12)`
- Slight `perspective` transform on load: starts `rotateX(6deg) scale(0.97)`, scrolls to `rotateX(0deg) scale(1)` — same as Railway's card tilt effect

**Inner background scene (behind the chatbot UI):**
The "sky" equivalent from Railway. Instead of a night sky, use a **faint isometric blueprint scene** — a low-opacity SVG of a Toronto-style building grid (semi-detached row houses, a mid-rise, a corner lot) drawn in `var(--color-navy-light)` strokes on `var(--color-bg-soft)`. Opacity: `0.4`. This is static/ambient, NOT the animated one (that comes later).

**Inner foreground: Chatbot UI Mock**

This is a realistic-looking UI mockup of the actual product — a chat interface. It should look like a real browser window or app panel, rendered as HTML inside the card.

Structure of the inner UI:
```
┌─────────────────────────────────────────────────────────┐
│  [Tab: MLI Select] [Tab: Multiplex] [Tab: Zoning] [Tab: Pro Forma]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Chat messages area                                     │
│  [Assistant bubble]: "I've analyzed 123 Example St,    │
│   Scarborough. Here's what I found..."                  │
│                                                         │
│  [Data card]: Zoning: RD (f0.6; d0.35) · Lot: 25×120  │
│  [Data card]: MLI Select Score: 87/100 ✓ Eligible      │
│  [Data card]: Max Units: 4 · FSI: 0.6 · GFA: 1,800sqft│
│                                                         │
│  [Input bar]: "Ask about this property..." [→ button]  │
└─────────────────────────────────────────────────────────┘
```

**Tab behavior:** Each tab shows a different pre-scripted conversation/result set. Clicking a tab swaps the visible chat content with a smooth `opacity` crossfade (`0.25s`). This is **static mock data**, not a live API call.

**Tab content (pre-scripted):**

*MLI Select tab:*
- Address: `247 Pharmacy Ave, Toronto, ON`
- Assistant message: "This property meets CMHC MLI Select eligibility criteria. Here's the breakdown:"
- Cards: Affordability Score: 82 pts · Energy Efficiency: Tier 2 eligible · LTV: Up to 95% · Amortization: 50yr available

*Multiplex tab:*
- Address: `88 Kingsway Cres, Etobicoke, ON`
- Assistant message: "Under Toronto's new as-of-right multiplex permissions, this lot supports up to 4 units."
- Cards: Lot Area: 3,400 sqft · Max Units: 4 · Parking: 0 required · Estimated GFA: 4,200 sqft

*Zoning tab:*
- Address: `1490 Midland Ave, Scarborough, ON`
- Assistant message: "Zoning analysis complete. Current designation allows significant density uplift."
- Cards: Current Zone: RM (u3) · Official Plan: Apartment Neighbourhood · Max Height: 14m · Setbacks: 6m front / 1.2m side

*Pro Forma tab:*
- Address: `34 Silverthorn Ave, York, ON`
- Assistant message: "Financial feasibility analysis for a 6-unit rental development:"
- Cards: Land: $1.1M · Hard Costs: $1.6M · Total: $2.9M · Stabilized NOI: $148K/yr · Cap Rate: 5.1%

**Styling of inner UI:**
- White background panels, `border-radius: 8px`, very light borders
- Chat bubbles: assistant = white with navy border-left `3px`, user = light navy fill
- Data cards: `background: white`, small, inline, grid of 2 or 3 per row, monospaced values in `var(--color-accent)`
- Tabs: pill style, active = navy fill white text, inactive = ghost with hover
- Input bar: pinned to bottom, white bg, navy border on focus

---

### 4. Stroke Animation Divider — "The Intelligence Layer"

This is the **Railway train moment** — the scroll-driven signature element of the page.

**What it is:** A full-width section, white background, containing a large SVG isometric illustration of a Toronto streetscape — specifically a row of 3–4 semi-detached houses with a mid-rise in the background, rendered as architectural line drawings in the style of the uploaded reference image.

**SVG style:**
- Stroke color: `var(--color-navy)` `#0F1F3D`
- Stroke width: `1px` base, `1.5px` for structural lines, `0.5px` for hatching/detail
- Fill: `none` (pure wireframe, no fills)
- Background: `#FFFFFF`
- Faint radial grid arcs in `var(--color-navy-light)` behind the buildings (like the blueprint reference)
- Data annotation labels floating near the buildings: `Zone: RD · 25×120 Lot · FSI: 0.6 · 4 Units Permitted` — in Geist Mono, small, positioned like engineering callouts with a small leader line

**Animation:**
- The SVG uses `stroke-dasharray` + `stroke-dashoffset` on every path
- When the section scrolls into view (`IntersectionObserver`), a CSS class is added that transitions `stroke-dashoffset` from full length to `0`
- Stagger groups: foundations first → walls → windows/doors → roof details → annotation labels last
- Total draw duration: `2.5s` with `ease-in-out`
- The annotation labels fade in (`opacity 0→1`) after the building finishes drawing

**Above the illustration:**
```
Section label (eyebrow): "Under the hood"
H2: "Every property. Every angle."
Body: "multiunit.ca cross-references zoning bylaws, CMHC policy, 
       municipal data, and financial models — in one analysis."
```
Centered, max-width `640px`, entrance animation on scroll.

**Implementation note:** The SVG paths must be pre-measured for `stroke-dasharray`. Use a script or manually set `stroke-dasharray: 1; stroke-dashoffset: 1` with `pathLength="1"` on each path — this normalizes the math and avoids measuring each path individually. This is the cleanest approach in production.

---

### 5. How It Works (3 Steps)

**Layout:** 3-column grid on desktop, stacked on mobile.

**Heading:**
```
Eyebrow: "Simple by design"
H2: "From address to insight in seconds."
```

**Steps:**

1. **Enter an address**  
   Icon: `MapPin` (lucide)  
   Copy: "Type any Toronto or GTA address. We'll pull zoning, lot data, and ownership context automatically."

2. **Choose your lens**  
   Icon: `SlidersHorizontal` (lucide)  
   Copy: "Select from MLI Select, Multiplex feasibility, Zoning analysis, or full Pro Forma. More lenses coming soon."

3. **Get your intelligence report**  
   Icon: `FileBarChart` (lucide)  
   Copy: "Receive a structured, shareable analysis — scores, flags, financials, and plain-language recommendations."

**Card styling:**
- White background, `1px solid var(--color-navy-light)` border
- `border-radius: 12px`, padding `32px`
- Icon in a small navy `40px` square with `border-radius: 8px`, white icon inside
- Step number (01/02/03) in top-right corner, `var(--color-navy-light)` color, large decorative size (`4rem`, opacity 0.3)
- Hover: `translateY(-4px)`, shadow deepens slightly

**Animation:** Cards enter staggered left-to-right on scroll into view.

---

### 6. Analysis Lenses Section

**Heading:**
```
Eyebrow: "What you can analyze"
H2: "Built around how developers actually think."
```

**Layout:** 2×2 grid on desktop, 1-column on mobile.

**Cards (4):**

1. **MLI Select Feasibility**  
   Description: "Determine CMHC MLI Select eligibility. Score affordability, accessibility, and energy tiers. Know your LTV ceiling before you model."  
   Tag: `Policy · Financing`

2. **Multiplex Feasibility**  
   Description: "Toronto's as-of-right multiplex rules unlocked new density city-wide. See exactly what's permitted on any lot — units, GFA, parking, setbacks."  
   Tag: `Zoning · Density`

3. **Zoning & Permitted Density**  
   Description: "Current zone, Official Plan designation, variance history, and maximum achievable density. The full picture, not just the label."  
   Tag: `Zoning · Policy`

4. **Financial Pro Forma**  
   Description: "Land + hard costs + soft costs vs. stabilized income. Cap rates, NOI, and a simple go/no-go score. Rough but fast — built for early-stage decisions."  
   Tag: `Finance · Feasibility`

**Card styling:**
- White bg, navy border `1px`, `border-radius: 12px`
- Tag rendered as small pill: `var(--color-navy-light)` bg, `var(--color-navy-mid)` text, `border-radius: 999px`, `font-size: 0.7rem`, uppercase
- On hover: left border changes to `3px solid var(--color-accent)`, card slides right `2px`
- Bottom of each card: `"More details →"` in accent color, small, appears on hover

**"More lenses coming soon" note** below the grid — centered, muted, italic.

---

### 7. Trusted By / Social Proof

**Heading:**
```
Eyebrow: "Early traction"
Text: "Used by developers and investors across the GTA"  (muted, smaller)
```

**Placeholder logo strip:** 6 placeholder company badges in a horizontal scrolling marquee (auto-scroll, no pause on hover needed). Use generic industry-sounding placeholder names rendered as clean text badges:

```
Greenfield Capital  ·  Axis Development  ·  NorthStar RE Group  ·  
Portside Ventures  ·  Cedar Grove Properties  ·  Maple Urban
```

Style: `font-weight: 500`, `color: var(--color-text-muted)`, separated by `·` dividers. These are text-only — no fake logos. When real logos are provided, replace with `<img>` tags.

**Below the strip:** One stat row (3 numbers):
```
1,200+          14           < 30 sec
Properties      Analysis     Time to
Analyzed        Lenses       First Report
```
Numbers in display size (`2.5rem`), navy, bold. Labels below in muted small text.
*(These are placeholder numbers — update when real data is available)*

---

### 8. Final CTA Section

**Background:** `var(--color-navy)` `#0F1F3D` — this is the **only dark section** on the page. Creates strong contrast at the end of the scroll.

**Layout:** Centered, `max-width: 700px`

**Content:**
```
H2 (white): "Your next deal starts with the right data."
Body (white/70% opacity): "Stop guessing. Enter any GTA address and get 
a full intelligence report in under a minute."
```

**Address input bar** (inline hero-style input):
```
[  🔍  Enter a Toronto/GTA address...  ] [ Analyze → ]
```
- Full-width input, `border-radius: 8px`, white background, navy placeholder text
- Button: white background, navy text, `font-weight: 600`
- On submit: routes to `/app` (the product/chatbot page) — pass address as query param `?address=...`
- Input width: `100%` of a `560px` max container

**Below input:** `No account needed to get started.` — white, 0.8rem, centered, muted opacity

**Background detail:** Faint isometric grid lines (same style as the SVG illustration but extremely faint, `opacity: 0.05`) tile the dark section for texture.

---

### 9. Footer

**Background:** `#0A1628` (slightly darker than CTA section navy)

**Layout:** 4-column grid

**Column 1:** Logo wordmark (white version) + `© 2025 multiunit.ca` + `Toronto, ON`

**Column 2 — Product:**  
Links: How It Works · Analysis Types · Pricing · Changelog

**Column 3 — Company:**  
Links: About · Contact · Privacy Policy · Terms of Service

**Column 4 — Stay Updated:**  
Small email input: `[Enter email] [Subscribe]` — inline, minimal styling  
Caption: "Product updates only. No spam."

**Bottom bar:** Thin 1px divider above. `Built in Toronto.` centered, muted, small.

---

## File Structure

```
multiunit-landing/
├── app/
│   ├── layout.tsx          # Font loading, metadata, global CSS
│   ├── page.tsx            # Assembles all sections
│   └── globals.css         # CSS custom properties, base resets, animation keyframes
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── ProductMockup.tsx   # The floating card with tabs + inner chat UI
│   ├── StrokeAnimation.tsx # SVG illustration + scroll-triggered draw animation
│   ├── HowItWorks.tsx
│   ├── AnalysisLenses.tsx
│   ├── TrustedBy.tsx
│   ├── FinalCTA.tsx
│   └── Footer.tsx
├── public/
│   ├── logo.svg            # PLACEHOLDER — swap when real logo is ready
│   └── building.svg        # The isometric Toronto building SVG
├── lib/
│   └── animations.ts       # Shared Framer Motion variants
└── CLAUDE.md               # This file
```

---

## SVG Building — Implementation Notes

The isometric building SVG (`/public/building.svg`) should depict:
- A Toronto semi-detached (2-unit side-by-side), 2.5 storeys
- Optionally: a small mid-rise (4–6 storey) in the background, slightly smaller/more distant
- Architectural detail level matching the Parliament Hill reference image: window mullions, brick hatching, roofline details, chimney stacks
- Drawn in isometric 3/4 view (same angle as reference)
- All paths must have `pathLength="1"` attribute for normalized stroke animation
- Annotation callouts: 4–6 floating text labels with `<line>` leader elements pointing to building features

**Generating this SVG:** Use an AI image tool to generate a reference, then trace to clean SVG paths, OR use a vector tool like Figma/Illustrator to create it from scratch at this level of detail. The SVG can be complex — it's the centrepiece.

**Fallback:** If the detailed isometric SVG is not yet ready, use a simpler geometric wireframe box-building as a placeholder that still animates correctly, and note `<!-- TODO: replace with detailed building SVG -->`.

---

## Routing

- Landing page: `/` (this build)
- Product/chatbot page: `/app` — **separate build, not scoped here**
- CTA buttons and address submit both route to `/app?address=[encoded_address]`
- Nav "Sign In" routes to `/login` (placeholder, not built)

---

## Performance Requirements

- Lighthouse score target: 90+ Performance, 100 Accessibility
- All images: `next/image` with proper `width`/`height`
- SVG: inline in JSX (not `<img>`) so CSS animations apply
- Fonts: `next/font` with `display: swap`
- Framer Motion: lazy-loaded (`dynamic(() => import(...), { ssr: false })`) for animation-heavy components
- No layout shift on font load

---

## Accessibility

- All interactive elements have visible focus rings (`outline: 2px solid var(--color-accent)`, `outline-offset: 2px`)
- Color contrast: all text/background combos pass WCAG AA minimum
- SVG illustration has `aria-hidden="true"` and `role="presentation"` — it's decorative
- Reduced motion: wrap all Framer Motion animations with:
  ```tsx
  const prefersReducedMotion = useReducedMotion();
  ```
  and skip/simplify animations when `true`
- Tab order follows visual reading order

---

## Placeholder Assets to Replace Later

| Placeholder | Location | Replace with |
|---|---|---|
| Text wordmark `multiunit.ca` | Navbar, Footer | `/public/logo.svg` (provided by client) |
| Placeholder company names | TrustedBy section | Real client logos as SVGs |
| Stats (1,200+, 14, <30sec) | TrustedBy section | Real product metrics |
| Simple box building SVG | StrokeAnimation | Detailed isometric Toronto building SVG |
| `/app` route | All CTAs | Real product page URL |

---

## Do Not

- Do not use a dark background anywhere except the Final CTA section and Footer
- Do not use gradients on the hero background — white only
- Do not use stock photography anywhere on this page
- Do not use any color outside the defined palette
- Do not add a cookie banner or any third-party scripts for now
- Do not add a pricing section (pricing not yet defined)
- Do not use `create-react-app` — this must be Next.js App Router
