# TERRAN COMMAND — Cinematic Military-Industrial Quantum AI Interface

```
╔═══════════════════════════════════════════════════════════════╗
║           // TERRAN DOMINION · CLASSIFIED //                  ║
║           ORBITAL COMMAND INTERFACE v3.7.1                    ║
║           SECTOR: KOPRULU · NODE: ALPHA-7                    ║
╚═══════════════════════════════════════════════════════════════╝
```

A cinematic orbital AI warfare terminal themed around the Terran Dominion from StarCraft. Built with React 18, Three.js (R3F), and Framer Motion 11. The experience simulates a classified military-industrial quantum command environment — not a landing page, not a portfolio piece, but a diegetic interface into an orbital defense network.

Users descend through five operational sectors: BOOT SEQUENCE → QUANTUM REACTOR → DEPLOYMENT GRID → TACTICAL DATABASE → NEURAL NETWORK, each separated by animated SYSTEMS LINK dividers, wrapped in persistent atmospheric layers (tactical grid overlay, data stream sweeps, depth fog, energy pulse, CRT scanlines, HUD corner brackets).

---

## Table of Contents

1. [Project Vision](#1-project-vision)
2. [Quick Start](#2-quick-start)
3. [Architecture](#3-architecture)
4. [Component Inventory](#4-component-inventory)
5. [Design System](#5-design-system)
6. [Three.js Systems](#6-threejs-systems)
7. [Animation & Motion Design](#7-animation--motion-design)
8. [Section-by-Section Walkthrough](#8-section-by-section-walkthrough)
9. [Atmospheric Layer System](#9-atmospheric-layer-system)
10. [Component API Reference](#10-component-api-reference)
11. [CSS Variable Reference](#11-css-variable-reference)
12. [Media Asset Pipeline](#12-media-asset-pipeline)
13. [Performance Optimization](#13-performance-optimization)
14. [Theming & Customization](#14-theming--customization)
15. [Production Build & Deployment](#15-production-build--deployment)
16. [Troubleshooting](#16-troubleshooting)
17. [Developer Notes](#17-developer-notes)
18. [Future Roadmap](#18-future-roadmap)

---

## 1. Project Vision

### 1.1 Conceptual Foundation

This is not a conventional website. It is an environmental interface — a diegetic command terminal that the user does not browse but rather _occupies_. Every visual decision serves the fiction of being inside a Terran orbital AI warfare station.

### 1.2 Design Doctrine

| Principle | Application |
|---|---|
| Cinematic restraint | Glow is controlled, not overwhelming. Darkness occupies 60%+ of screen real estate. |
| Tactical realism | UI elements mimic military HUD systems: clearance badges, Z-time clocks, grid coordinates |
| Technological overwhelm | Three.js scenes are not decorative — they are the environmental backbone |
| Diegetic consistency | Every pixel belongs to the same universe. No generic gradients, no playful motion |
| Depth through layers | 12+ composited layers create physical depth (3D → atmospheric overlays → UI → scanlines) |

### 1.3 What This Is NOT

- Not a startup landing page
- Not generic cyberpunk (rainbow neon, TRON lines, glitch effects)
- Not an influencer portfolio
- Not a template site
- Not a game (though inspired by StarCraft UI)

### 1.4 Target Experience

The user should feel:
- **Immersed** — surrounded by environmental systems on all sides
- **Monitored** — the interface is watching, processing, reporting
- **Cleared** — each section has a clearance level; scrolling feels like descending deeper
- **Technologically overwhelmed** — multiple synchronized systems operate simultaneously
- **Inside a classified infrastructure** — the UI does not explain itself; it reports status

---

## 2. Quick Start

### 2.1 Prerequisites

- **Node.js** >= 18.x (tested with 20.x)
- **npm** >= 9.x (or pnpm/yarn)

### 2.2 Installation

```bash
git clone <repository>
cd terran-cmd
npm install
```

### 2.3 Development

```bash
npm run dev
```

Opens Vite dev server at `http://localhost:5173`. HMR enabled for all components. Three.js scenes hot-reload via R3F.

### 2.4 Production Build

```bash
npm run build
```

Outputs to `dist/`. Three.js (~1MB gzipped 305KB) dominates bundle size. No code-splitting is currently configured — the entire app is a single chunk.

### 2.5 Preview

```bash
npm run preview
```

Serves `dist/` locally for production verification.

---

## 3. Architecture

### 3.1 Technology Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| Framework | React | 18.2 | Component model, state, lifecycle |
| Build | Vite | 5.1 | Dev server, HMR, bundling |
| 3D Engine | Three.js (R3F) | 0.160 / 8.15 | Hero planet scene, quantum reactor |
| 3D Helpers | @react-three/drei | 9.92 | `Stars`, `OrbitControls` (implied) |
| Animation | Framer Motion | 11.0 | Section entrances, letter reveals, hover states |
| Styling | Plain CSS | — | All styles in single `App.css`, ~1050 lines |

### 3.2 Directory Layout

```
terran-cmd/
├── index.html                  # Vite entry (minimal)
├── package.json                # Dependencies & scripts
├── vite.config.js              # Vite configuration
├── HANDOFF.md                  # Condensed dev reference
├── README.md                   # This document
├── public/
│   └── media/                  # Static assets (GIFs, images)
│       ├── battlecruiser1.jpg  # Hero overlay image
│       ├── cruiserlocked.gif   # Used in fleet + cinematic grid
│       ├── marine.gif
│       ├── tank.gif
│       ├── goliath.gif
│       ├── ghostcommando.gif
│       ├── robocommando.gif
│       ├── sovietcommando.gif
│       ├── tycus.gif
│       ├── ghostgirl.gif
│       ├── giphy.gif
│       ├── dropship.jpg
│       ├── cruiserwing.jpg
│       ├── fleetcommando.jpg
│       ├── ghost.jpg
│       └── ... (other static images)
├── src/
│   ├── main.jsx                # ReactDOM.createRoot entry
│   ├── App.jsx                 # Root layout: section orchestration
│   ├── App.css                 # All styles (~1050 lines)
│   └── components/
│       ├── HeroSection.jsx     # BOOT SEQUENCE section
│       ├── ThreeScene.jsx      # Orchestrates all hero 3D elements
│       ├── Planet.jsx          # Rotating planet with continent patches
│       ├── Battlecruiser.jsx   # 3D battlecruiser with drifting + auto-fire
│       ├── LaserBeam.jsx       # Transient laser bolt from cruiser to planet
│       ├── ImpactFlash.jsx     # Expanding sphere on impact
│       ├── ImpactLight.jsx     # Fading pointLight at impact
│       ├── CameraRig.jsx       # Orbital camera controller
│       ├── QuantumCore.jsx     # QUANTUM REACTOR 3D scene
│       ├── AnimatedText.jsx    # Letter-by-letter reveal (Framer Motion)
│       ├── CountUp.jsx         # requestAnimationFrame number counter
│       ├── SectionMeta.jsx     # Clearance badge + coords + live Z-time
│       ├── SectionDivider.jsx  # "◈ SYSTEMS LINK ◈" separator
│       ├── Navbar.jsx          # Fixed HUD navigation
│       ├── FleetGrid.jsx       # DEPLOYMENT GRID section
│       ├── CinematicGrid.jsx   # TACTICAL DATABASE section
│       ├── MissionBriefing.jsx # NEURAL NETWORK section
│       └── MatrixTerminal.jsx  # Falling quotes overlay (vanilla DOM)
```

### 3.3 Component Tree

```
<App>
  ├── <Navbar />                         (fixed, z-index: 1000)
  ├── <HeroSection />                    (100vh, z-index: 1)
  │   ├── <Canvas>
  │   │   └── <ThreeScene />
  │   │       ├── <CameraRig />          (null render, controls Three camera)
  │   │       ├── <Stars />
  │   │       ├── lights (ambient + directional + point)
  │   │       ├── <Planet />
  │   │       ├── <Battlecruiser /> ×3
  │   │       └── lasers/flashes/lights arrays
  │   ├── <SectionMeta />
  │   ├── <AnimatedText /> ×2
  │   ├── button / hero-deploy-btn
  │   ├── <CountUp /> ×3 (stats)
  │   └── sector status
  ├── <SectionDivider />                 "◈ SYSTEMS LINK ◈"
  ├── <section class="quantum-core-section">
  │   ├── <Canvas>
  │   │   └── <QuantumCoreScene />
  │   │       ├── fogExp2
  │   │       ├── lights
  │   │       ├── core cube
  │   │       ├── inner cube
  │   │       ├── <Rings /> (5)
  │   │       ├── <Particles /> (2500)
  │   │       ├── <EnergyBeams /> (20)
  │   │       └── <gridHelper />
  │   └── overlay (status dot, title, desc)
  ├── <SectionDivider />
  ├── <FleetGrid />                      (6-tile grid)
  ├── <SectionDivider />
  ├── <CinematicGrid />                  (10-card GIF grid)
  ├── <SectionDivider />
  ├── <MissionBriefing />                (classified panel)
  ├── <SectionDivider />
  ├── <MatrixTerminal />                 (fixed, z-index: 1)
  ├── .atmo-grid                         (fixed, z-index: 3)
  ├── .atmo-data-stream                  (fixed, z-index: 3)
  ├── .atmo-fog                          (fixed, z-index: 2)
  ├── .atmo-energy-pulse                 (fixed, z-index: 2)
  ├── .global-scanlines                  (fixed, z-index: 9998)
  ├── .global-vignette                   (fixed, z-index: 9997)
  └── .corner-* ×4                       (fixed, z-index: 9999)
```

### 3.4 Data Flow

This is a **static site** — no API, no backend, no state management library. All state is local `useState` / `useRef`.

- **Transient effects** (lasers, flashes, lights): state arrays in `ThreeScene.jsx`, items self-remove via `onDone` callbacks
- **Counters**: `CountUp` component manages its own `requestAnimationFrame` loop
- **Timestamp**: `SectionMeta` runs a `setInterval` every 1s, each instance is independent
- **MatrixTerminal**: vanilla DOM manipulation via `useEffect` — creates/removes `div` elements
- **Scroll position**: Navbar tracks via `scroll` event listener
- **Section navigation**: `scrollIntoView({ behavior: "smooth" })` on nav link click

No prop drilling beyond one level. No context providers. No Redux/Zustand.

---

## 4. Component Inventory

### 4.1 Three.js Scene Components (Hero)

#### `Planet.jsx` (70 lines)

| Aspect | Detail |
|---|---|
| Geometry | `SphereGeometry(2, 64, 64)` |
| Material | `MeshPhongMaterial` — blue surface (#1155aa) with emissive glow (#001133) |
| Continents | 6 data points → 70 random patches each using spherical coordinates. Colors: greens (#2d8a4e, #3a9e5a, #2d7a42) + one desert continent (#c8a85a). Each patch is a `SphereGeometry(1, 6, 6)` placed at radius 2.01 |
| Atmosphere | BackSide sphere at radius 2.2, 10% opacity cyan + wireframe overlay at 6% opacity |
| Rotation | Y-axis at `delta * 0.08`, atmosphere counter-rotates at `delta * 0.02` |
| Vertices | ~450 continent patches × 36 tris each ≈ 16,200 tris total |

#### `Battlecruiser.jsx` (44 lines)

| Aspect | Detail |
|---|---|
| Geometry | Box (2.2 × 0.28 × 0.7) hull + Box (0.35³) bridge + Cone (0.14 × 0.7) nose + 2× Cylinder (0.1/0.13 × 1.1) engine nacelles + Box winglets + Cylinder antennae |
| Materials | Metal (#888899, 80 shininess), DarkMetal (#556677, 60), Chrome (#99aacc, 100), EngineGlow (#4488ff basic) |
| Drift | Sinusoidal on X (0.3Hz) and Y (0.5Hz) with amplitude 0.18–0.25 units |
| Auto-fire | Timer 0.3–0.8s random interval. Fires laser via `onFire(worldPosition)` callback |
| Scale variants | Full-scale (1.0) lead ship, 0.55 support, 0.35 scout |
| Point light | Blue engine glow at `[-1.2, -0.1, 0]`, intensity 2, distance 4 |

#### `LaserBeam.jsx` (24 lines)

| Aspect | Detail |
|---|---|
| Geometry | `CylinderGeometry(0.025, 0.025, length * 0.6, 4)` — 4 segments (square cross-section) |
| Positioning | Midpoint between source and target, `Quaternion` aligned from Y-axis to direction vector |
| Lifetime | Starts at 1.0, decrements by 0.08/frame, fades opacity. Self-removes |
| Color | 60% orange (#ff6600), 40% red (#ff2200) per beam |

#### `ImpactFlash.jsx` (16 lines)

| Aspect | Detail |
|---|---|
| Geometry | `SphereGeometry(0.18, 8, 8)` |
| Lifetime | 1.0 → 0 at -0.06/frame. Scale expands `1 + (1 - life) * 2.5` |
| Material | `MeshBasicMaterial` orange (#ff6600), opacity fades proportionally |

#### `ImpactLight.jsx` (10 lines)

| Aspect | Detail |
|---|---|
| Type | `pointLight` (#ff5500), base intensity 6, distance 8 |
| Lifetime | Intensity fades `life * 6`, decrements by 0.08/frame |
| Purpose | Illuminates the planet surface at impact point |

#### `CameraRig.jsx` (11 lines)

| Aspect | Detail |
|---|---|
| Orbit radius | 9 units |
| Orbit speed | `delta * 0.12` radians/frame (≈7° per second at 60fps) |
| Y position | `2.5 + sin(angle * 0.4) * 1` — gentle vertical bob |
| LookAt | Always `(0, 0, 0)` — centers on planet |
| Render | Returns `null` — no DOM output |

#### `ThreeScene.jsx` (59 lines)

Orchestrator that composes all hero 3D elements. Manages transient state arrays for combat effects. Lighting setup:

```
ambientLight   #112244, intensity 1.5
directionalLight #ffffff, intensity 2, position (5, 3, 5)
pointLight     #1a9fff, intensity 3, distance 25, position (-4, 2, 3)
Stars          7000 stars, radius 200, depth 60, factor 4, saturation 0.5
```

### 4.2 Three.js Scene Components (Quantum Reactor)

#### `QuantumCore.jsx` (134 lines)

| Sub-component | Lines | Details |
|---|---|---|
| `Rings` | 14 lines | 5 torus rings at radii 3.0 → 4.6 (step 0.4), thickness 0.02, 16 radial/100 tubular segments. Colors alternate violet (#8b5cf6) and crimson (#ff2a6d). Random rotation axes |
| `Particles` | 24 lines | 2500 `Points` with `BufferGeometry`, random positions in 80³ volume, cyan (#7dd3fc), size 0.03, opacity 0.8 |
| `EnergyBeams` | 16 lines | 20 `CylinderGeometry(0.01, 0.01, 20, 6)` beams. Random positions in 30×20×20 volume. Orange (#f97316). |
| `QuantumCoreScene` | 80 lines | The main export |

**Animation loop** (all in single `useFrame`):

| Object | Transformation | Rate |
|---|---|---|
| Core cube | rotation.x +=, rotation.y += | 0.002, 0.003 rad/frame |
| Core scale | `1 + sin(t × 2) × 0.03` pulsing | 2Hz breathing |
| Inner cube | rotation.x -=, rotation.y += | 0.01 rad/frame (faster) |
| Group (core + rings) | rotation.y += | 0.002 rad/frame |
| Particles | rotation.y += | 0.0008 rad/frame (very slow) |
| Point light 1 | intensity `6 + sin(t × 4) × 2` | 4Hz, range 4–8 |
| Camera X | `lerp(mouse.x × 4, current, 0.02)` | Smooth follow |
| Camera Y | `lerp(-mouse.y × 3, current, 0.02)` | Smooth follow |

**Camera**: Position `(0, 0, 14)`, FOV 60°, lookAt `(0, 0, 0)`. Mouse-reactive with lerp factor 0.02.

**Lighting**:
```
ambientLight  #9f7bff, intensity 1.2
pointLight    #c084ff, intensity 4–8 (pulsing), distance 100, position (0,0,0) — at core center
pointLight    #ff2a6d, intensity 3, distance 50, position (4, -2, 4) — crimson accent
```

**Fog**: `FogExp2("#05010a", 0.045)` — subtle depth fade matching void-black background.

**Core material**:
```
MeshPhysicalMaterial
  color: #12081f (near-black)
  emissive: #b388ff (violet glow)
  emissiveIntensity: 2
  transmission: 1 (glass-like)
  transparent: true
  roughness: 0
  metalness: 0.8
  clearcoat: 1
```

**Grid**: `GridHelper(100, 100, "#8b5cf6", "#222")` at y=-5.

### 4.3 UI Components

#### `Navbar.jsx` (34 lines)

- Fixed top bar, height 56px, blur backdrop, translucent bg
- Logo: "テラン.司令" (.司令 span is blue accent)
- 4 nav links: 戦略/COMMAND → #hero, 量子/REACTOR → #quantum, 艦隊/DEPLOY → #fleet, 情報/INTEL → #briefing
- Each link: Japanese label (13px Sawarabi) + English subtitle (9px hud) with underline-on-hover animation
- Status pill: teal pulsing dot + "オンライン" text
- Navbar border-bottom appears on scroll (y > 20px) referencing `var(--hud-border)`
- Scroll tracking via `useState` + scroll event listener

#### `AnimatedText.jsx` (18 lines)

- Splits text string into individual `<motion.span>` elements
- Each letter fades in + slides up (y: 40 → 0)
- Stagger delay: `i × 0.04s` per character
- Duration 0.5s, easing `easeOut`
- Uses `letterVariants` object with custom `(i)` for per-letter delay
- Non-breaking spaces for whitespace preservation
- Used twice in hero: "REDSTAR" (title line) and "DIVISION" (sub line)

#### `CountUp.jsx` (13 lines)

- Animates from 0 to `end` over `duration` (default 1500ms)
- Uses `requestAnimationFrame` loop with `performance.now()` timing
- Optional `suffix` string (e.g. "K")
- Used 3 times in hero stats: 147 units, 12K minerals, 3K vespene
- Auto-cleanup via `cancelAnimationFrame` in return

#### `SectionMeta.jsx` (20 lines)

- Renders: `[●] // CLEARANCE: XXX` badge + `COORDS: XXX` + `HH:MM:SSZ` timestamp
- Clearance dot pulses via `pulse-dot` animation
- `crimson` prop changes dot + border to `var(--crimson)` for classified content
- Timestamp updates every 1s via `setInterval` — ISO 8601 time portion + "Z"
- Each instance is independent with its own interval
- Font 9px hud, letter-spacing 0.15em

#### `SectionDivider.jsx` (2 lines)

- Single `<div className="section-divider" />`
- Renders as 2px gradient line with centered "◈ SYSTEMS LINK ◈" label
- Background `var(--dark)` behind label masks the gradient line

#### `MatrixTerminal.jsx` (103 lines)

- **50 Japanese tactical quotes** in array (e.g. "総員、戦闘配置", "量子炉、安定状態", "敵性反応を確認")
- Creates column `<div>` elements with stacked quotes (8–20 per column)
- 15% chance of crimson alert styling
- Random: horizontal position, fall duration (10–22s), opacity (0.1–0.45), font size (0.65–1.15rem)
- Interval: new column every 250ms
- Initial burst: 25 columns over 3 seconds
- Cleanup: `clearInterval` on unmount, `setTimeout` auto-removes each column
- Vanilla DOM via `useEffect` — directly appends to `#matrixTerminal` div
- Fixed z-index: 1 (lowest overlay, behind atmospheric layers)

### 4.4 Page Section Components

#### `HeroSection.jsx` (65 lines)

- Full viewport height section with `position: relative; overflow: hidden`
- Three layers: Canvas (z-index 1) → image overlay (z-index 2, right 60%, mix-blend-mode screen, 18% opacity) → content (z-index 5)
- Content centered vertically + horizontally: clearance meta → Japanese subtitle → REDSTAR (title) → DIVISION (sub) → tagline → deploy button
- Deploy button: hover expands violet fill from left, text flips to black
- Bottom HUD: 3 stats left-aligned + sector status right-aligned
- All motion enter animations staggered: stats at 0.8s delay, sector at 1.0s, button at 1.2s

#### `FleetGrid.jsx` (44 lines)

- Section `#fleet` with clearance meta + "艦隊 DEPLOYMENT GRID" heading
- 12-column CSS grid with 6 tiles:
  - `tile-hero`: columns 1–9, rows 1–3 (400px min-height) — dropship.jpg
  - `tile-gif`: columns 9–13, row 1 — cruiserlocked.gif (red alert border)
  - `tile-sm`: columns 9–13, row 2 — cruiserwing.jpg
  - `tile-md` × 4: span 4 columns — fleet, ghost, commando images
- Hover: border-color shifts to violet, scale 1.02
- Japanese label in DotGothic16 + English in hud font
- Tile entrance: stagger by index (0.1s delay per tile), slide up 30px

#### `CinematicGrid.jsx` (25 lines)

- Section with 5-column CSS Grid (named grid-template-areas):
  - Row 1: hero (3 cols) + medium1 + medium2
  - Row 2: hero (3 cols) + small1 + small2
  - Row 3: small3 → small7 (5 cols)
- 10 GIF cards with hover shine effect (linear-gradient sweep left→right on ::after)
- Card border: gold/orange tone, flicker animation (4s cycle)
- Badges: Orbitron font, gold text, amber left border, blur backdrop
- Responsive: at 700px collapses to 2 columns
- Images sourced from `public/media/`

#### `MissionBriefing.jsx` (50 lines)

- Section `#briefing` with crimson CLASSIFIED clearance meta
- Panel: dark gradient bg, cyan border + box-shadow glow
- Header: "// NEURAL NETWORK · MISSION BRIEFING" + blinking "機密 · CLASSIFIED" red label
- Two-column grid:
  - **Left**: operation order badge + Japanese mission briefing text (Noto Sans JP, 12px, line-height 2.2) + English quote with cyan left border
  - **Right**: parameters table (6 rows: sector, threat, casualties, objective, commander, status) + system bars (power core 98%, scanner 100%, comms 85%) + full-width button
- System bars: 3px height, signal-cyan → reactor-teal gradient fill
- Button: cyan border, hover brightens bg

---

## 5. Design System

### 5.1 Color System

The palette is divided into 3 functional groups:

#### Surface Colors (Backgrounds, Containers)

| Variable | Hex | RGB | Usage |
|---|---|---|---|
| `--void-black` | `#05010A` | rgb(5, 1, 10) | Primary page background, fog color |
| `--obsidian` | `#0B0F1A` | rgb(11, 15, 26) | HUD backgrounds, panel fills |
| `--graphite` | `#161B2C` | rgb(22, 27, 44) | Card surfaces, secondary fills |
| `--slate` | `#23283B` | rgb(35, 40, 59) | Border surfaces, tier-3 backgrounds |

#### Accent Colors (UI, Glows, Data)

| Variable | Hex | Role | Semantic Meaning |
|---|---|---|---|
| `--lavender` | `#C084FC` | Primary accent, AI systems | Holograms, neural infrastructure, quantum energy |
| `--violet` | `#8B5CF6` | UI accent (replaces old blue) | Borders, buttons, active states, headings |
| `--plasma` | `#A855F7` | Gold-equivalent highlight | Data highlights, mineral counters |
| `--ultraviolet` | `#D8B4FE` | Soft glow | Background radial gradients, soft highlights |

#### Functional Colors (Status, Data, Alerts)

| Variable | Hex | Role | Constraint |
|---|---|---|---|
| `--crimson` | `#FF2A6D` | Warnings, threats, alerts | MUST ONLY indicate threat/warning/hostile |
| `--warning` | `#EF4444` | Secondary red | Error states, destructive actions |
| `--signal-cyan` | `#7DD3FC` | Data, UI borders, neutral systems | Data flow, signal transmission, sync |
| `--ion-blue` | `#38BDF8` | Secondary blue | Unused currently, available for data viz |
| `--reactor-teal` | `#22D3EE` | Status OK | System online indicators, positive states |

#### Neutral & Text

| Variable | Hex | Usage |
|---|---|---|
| `--steel` | `#71717A` | Muted UI, disabled states |
| `--titanium` | `#A1A1AA` | Secondary text, metadata |
| `--text-primary` | `#F5F3FF` | Primary text (off-white with violet tint) |
| `--text-secondary` | `#A1A1AA` | Secondary text, labels |

#### Legacy Aliases

These exist for backward compatibility with the original blue-themed CSS.

| Alias | Resolves To | Original Hex |
|---|---|---|
| `--blue` | `var(--violet)` = `#8B5CF6` | `#1a9fff` |
| `--blue-glow` | `var(--lavender)` = `#C084FC` | `#00d4ff` |
| `--red` | `var(--crimson)` = `#FF2A6D` | `#ff3030` |
| `--gold` | `var(--plasma)` = `#A855F7` | `#ffc040` |
| `--teal` | `var(--reactor-teal)` = `#22D3EE` | `#00e5c8` |
| `--dark` | `var(--void-black)` = `#05010A` | `#000508` |
| `--hud-bg` | rgba(11, 15, 26, 0.82) | rgba(0, 8, 24, 0.82) |
| `--hud-border` | rgba(139, 91, 246, 0.3) | rgba(26, 159, 255, 0.3) |

### 5.2 Typography

| Variable | Font | Weight Used | Size Range | Purpose |
|---|---|---|---|---|
| `--font-display` | Zen Dots | 700, 900 | clamp(48px, 8vw, 96px) | Hero titles, section headings |
| `--font-hud` | M PLUS 1 Code | 400, 700 | 7px–13px | Stats, metadata, buttons, labels |
| `--font-pixel` | DotGothic16 | 400 | 12px | Japanese unit labels in fleet tiles |
| `--font-body` | Noto Sans JP | 300 | 12px | Japanese lore text, long-form content |
| `--font-impact` | Reggae One | 400 | — | Available but unused |
| `--font-ui` | Sawarabi Gothic | 700 | 11px–13px | Nav links, small UI elements |
| `--font-mono` | Share Tech Mono | 400 | — | Available fallback for monospace |

**Design rules:**
- Headers: massive, wide tracking (0.08–0.4em), line-height ≤ 1
- Metadata: tiny (7–11px), uppercase, wide tracking, low opacity (0.2–0.6)
- Japanese text: always paired with English subtitle in smaller size
- Never use font-weight < 300; body text is deliberately small (12px)

### 5.3 Spacing System

All spacing is manual — no spacing scale. Common values:

| Context | Value |
|---|---|
| Section padding | 60–80px top/bottom, 40px sides |
| Grid gaps | 12px (fleet), 1.2rem (cinematic) |
| Navbar height | 56px |
| Corner brackets | 40×40px, offset 8px from edges |
| HUD stats offset | 40px from bottom/left |
| Button padding | 14px 40px |

### 5.4 Border & Box-Shadow System

| Element | Border | Box Shadow |
|---|---|---|
| Navbar | 1px `var(--hud-border)` bottom | — |
| Fleet tiles | 1px `var(--hud-border)` | — |
| Briefing panel | 1px rgba(125,211,252,0.25) | 0 25px 45px rgba(0,0,0,0.7), inset 0 1px 0 rgba(125,211,252,0.15), 0 0 30px rgba(125,211,252,0.08) |
| Cinematic grid | 1px rgba(255,200,100,0.25) | 0 25px 45px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,200,0.1) |
| GIF cards | inset 0 0 0 1px rgba(255,160,60,0.2) | 0 8px 20px rgba(0,0,0,0.6) |
| Section badges | 1px `var(--hud-border)` | — |
| Buttons | 1.5px `var(--blue)` | — |

### 5.5 Z-Index Master Chart

| Layer | Z-Index | Elements |
|---|---|---|
| Matrix terminal (falling quotes) | 1 | `.matrix-terminal` |
| Body scanlines (body::before) | 2 | `body::before` |
| Atmospheric fog | 2 | `.atmo-fog`, `.atmo-energy-pulse` |
| Atmospheric grid | 3 | `.atmo-grid`, `.atmo-data-stream` |
| Hero 3D canvas | 1 | `.hero-canvas` |
| Hero image overlay | 2 | `.hero-image-overlay` |
| Hero content | 5 | `.hero-content`, `.hero-stats`, `.hero-sector` |
| Section content | 10 | `.fleet`, `.briefing`, `.cinematic-section` |
| Section divider | 10 | `.section-divider` |
| Navbar | 1000 | `.navbar` |
| Global vignette | 9997 | `.global-vignette` |
| Global scanlines | 9998 | `.global-scanlines` |
| Corner brackets | 9999 | `.corner-tl`, `.corner-tr`, `.corner-bl`, `.corner-br` |

---

## 6. Three.js Systems

### 6.1 Scene Architecture Overview

Two independent R3F `Canvas` instances exist in the page:

1. **Hero Canvas** — `HeroSection.jsx` lines 11–20. Camera (0,2,9), FOV 50°, background #000005, alpha false
2. **Quantum Canvas** — `App.jsx` lines 22–29. Camera (0,0,14), FOV 60°, background transparent, alpha true

They share no state, lights, or objects. Each is a completely isolated Three.js context. The quantum canvas has alpha:true so the section's CSS radial-gradient background shows through.

### 6.2 Hero Scene Technical Details

```
Scene graph:
├── CameraRig (orbits camera at 0.12 rad/s, radius 9, y-bob)
├── Stars (7000 particles, radius 200, depth 60)
├── ambientLight (blue tint #112244, 1.5)
├── directionalLight (white, 2, pos 5,3,5)
├── pointLight (cyan #1a9fff, 3, dist 25, pos -4,2,3)
├── Planet
│   ├── mesh (sphere, Phong blue, 64 segments)
│   │   ├── mesh × ~420 (continent patches, SphereGeometry 1,6,6)
│   ├── mesh (atmosphere, sphere, BackSide, 10% cyan)
│   └── mesh (wireframe overlay, 6% light blue)
├── Battlecruiser ×3 (positions: 3.5,2.2,2 / 4.2,0.8,-1.5 / 5,-0.5,0.5)
│   ├── box hull, box bridge, cone nose
│   ├── cylinder engine pods ×2, sphere glow ×2
│   ├── box winglets ×2, cylinder antennae ×2
│   └── pointLight engine glow
├── LaserBeam ×N (transient, auto-cleaning)
├── ImpactFlash ×N (transient, auto-cleaning)
└── ImpactLight ×N (transient, auto-cleaning)
```

**Battlecruiser autonomous behavior:**
- Each cruiser independently oscillates position and rotation using `Date.now() * 0.001 + phaseOffset` as time base
- Different phaseOffsets (0, 2, 4) desynchronize their motion
- Lead ship (scale 1.0) fires at planet surface; support ships (scale 0.55, 0.35) may fire or not
- Fire rate: 0.3–0.8s random interval
- Laser target: random point on sphere radius 2.05 using uniform spherical distribution

**Effect lifecycle:**
1. `handleFire` called → creates laser + flash + light with unique `id`
2. Laser: appears at cruiser, travels to target (cylinder positioned at midpoint)
3. Flash: sphere at target expands from 1× to 3.5× scale over ~16 frames
4. Light: pointLight at target fades intensity 6→0 over ~12 frames
5. Each effect calls `onDone` → filters itself out of state array

### 6.3 Quantum Reactor Scene Technical Details

```
Scene graph:
├── fogExp2 (#05010a, 0.045 density)
├── ambientLight (violet #9f7bff, 1.2)
├── pointLight (lavender #c084ff, 4–8 pulsing, dist 100) at origin
├── pointLight (crimson #ff2a6d, 3, dist 50) at (4, -2, 4) — offset red accent
├── group (coreGroup, rotates Y at 0.002 rad/frame)
│   ├── mesh (core cube, BoxGeometry 4,4,4, PhysicalMaterial)
│   │   ├── color #12081f, emissive #b388ff, emissiveIntensity 2
│   │   ├── transmission 1, roughness 0, metalness 0.8, clearcoat 1
│   │   ├── breathes 2Hz: scale 1 ± 3%
│   │   └── rotates independently: x += 0.002, y += 0.003
│   ├── mesh (inner cube, BoxGeometry 1.2, 1.2, 1.2, BasicMaterial #ff66ff)
│   │   └── counter-rotates: x -= 0.01, y += 0.01
│   └── mesh ×5 (torus rings, radii 3.0–4.6, random axes)
├── Points ×2500 (buffer geometry, cyan #7dd3fc, size 0.03)
├── mesh ×20 (cylinder energy beams, orange #f97316, random positions)
└── gridHelper (100×100, violet #8b5cf6 / dark #222, at y=-5)
```

**Mouse interaction:**
- Camera lerps toward `(mouse.x × 4, -mouse.y × 3, 14)` at factor 0.02
- Translates 2D mouse position into 3D space: X range ±4, Y range ±3
- Smooth follow — never reaches target, always catching up

### 6.4 R3F Patterns & Conventions

| Pattern | Used In | Notes |
|---|---|---|
| `useRef` for mesh/group refs | All 3D components | Avoids re-renders |
| `useMemo` for static geometry data | Planet continents, ring data, particle positions, beam positions | Prevents re-computation |
| `useFrame((state, delta) => {...})` | Animation loops | First arg `state` has clock, mouse, camera, etc. |
| `useThree()` | CameraRig (camera), QuantumCore (camera, mouse) | Accesses R3F context |
| `attach="fog"` | QuantumCore | Sets `scene.fog` via R3F attach pattern |
| `attach="attributes-position"` | QuantumCore Particles | Sets `geometry.attributes.position` |
| `THREE.Vector3` / `Quaternion` | LaserBeam | Vector math for beam positioning |
| `onDone` callback pattern | Lasers, flashes, lights | Self-cleaning transient effects |

---

## 7. Animation & Motion Design

### 7.1 Design Principles

- **No bounce, spring, or playful easing** — all Framer Motion uses `ease: "easeOut"`
- **Staggered entrances** follow section hierarchy: meta appears first, then title, then content
- **Hover states** are subtle: scale 1.01–1.03, border-color shifts, no dramatic transforms
- **Three.js animations** are constant additive rotations (`+= delta * rate`) — no keyframes, no tweens
- **CSS animations** reserved for atmospheric effects (pulse, flicker, fall, data stream)

### 7.2 Framer Motion Animation Registry

| Component | Animation | Trigger | Delay | Duration | Easing |
|---|---|---|---|---|---|
| Navbar | slide down y:-60 | page load | 0 | 0.8s | easeOut |
| Hero deploy button | fade + slide y:20 | page load | 1.2s | 0.7s | easeOut |
| Hero stats | fade + slide x:-20 | page load | 0.8s | 0.6s | easeOut |
| Hero sector | fade + slide x:20 | page load | 1.0s | 0.6s | easeOut |
| FleetGrid h2 | fade + slide y:20 | whileInView | 0 | 0.6s | easeOut |
| FleetGrid p | fade | whileInView | 0.2s | 0.5s | easeOut |
| Fleet tiles ×6 | fade + slide y:30 | whileInView | i×0.1s | 0.5s | easeOut |
| Briefing panel | fade + slide y:40 | whileInView | 0 | 0.7s | easeOut |
| Briefing button | scale 1.02 | hover | — | — | — |
| Letter animations | fade + slide y:40 | page load | i×0.04s | 0.5s | easeOut |

### 7.3 CSS Animation Registry

| Keyframe | Duration | Iteration | Element | Purpose |
|---|---|---|---|---|
| `pulse-dot` | 1.8s | infinite | `.nav-dot`, `.clearance-dot` | Status indicator breathing |
| `rotate-emblem` | 30s | infinite | `.hero-emblem` | Slow emblem rotation (unused) |
| `flicker` | 4s | infinite | `.cinematic-grid` | Gold border intensity oscillation |
| `matrixFall` | 10–22s | infinite | `.matrix-column` | Quotes falling from top |
| `blink` | 1s | step-end infinite | `.briefing-classified` | Red CLASSIFIED text blink |
| `bracket-in` | 0.8s | forwards | `.corner-*` | Corner brackets fade in |
| `energyPulse` | 6s | ease-in-out infinite | `.atmo-energy-pulse` | Ambient glow breathing |
| `dataStream` | 8s / 12s | linear infinite | `.atmo-data-stream` | Horizontal scan sweep |

### 7.4 Three.js Animation Rates

| Object | Property | Rate | Frequency |
|---|---|---|---|
| Planet | rotation.y | delta × 0.08 | — |
| Atmosphere | rotation.y | delta × (-0.02) | — |
| Camera orbit | angle | delta × 0.12 | — |
| Core cube | rotation.x | +0.002/frame | — |
| Core cube | rotation.y | +0.003/frame | — |
| Core cube | scale | sin(t×2) × 0.03 | 2Hz |
| Inner cube | rotation.x | -0.01/frame | — |
| Inner cube | rotation.y | +0.01/frame | — |
| Core group | rotation.y | +0.002/frame | — |
| Particles | rotation.y | +0.0008/frame | — |
| Center pointLight | intensity | 6 + sin(t×4) × 2 | 4Hz |
| Battlecruiser X drift | position.x | sin(t×0.3) × 0.25 | 0.3Hz |
| Battlecruiser Y drift | position.y | sin(t×0.5) × 0.18 | 0.5Hz |
| Battlecruiser pitch | rotation.x | sin(t×0.4) × 0.04 | 0.4Hz |

---

## 8. Section-by-Section Walkthrough

### 8.1 BOOT SEQUENCE (`#hero`)

**Files:** `HeroSection.jsx` + `ThreeScene.jsx` + `Planet.jsx` + `Battlecruiser.jsx` + effect components

**Entry animation:** A planet slowly rotates in deep space as battlecruisers drift in formation. Over 1.2 seconds, title text animates letter-by-letter, stats slide in from the left, sector status from the right. The deploy button appears last.

**User interaction:** None (pointer-events disabled on content container except button). The camera orbits automatically. Battlecruisers autonomously fire lasers at the planet.

**Key visual:** Battlecruiser1.jpg overlays the right 60% of the screen at 18% opacity with screen blend mode — a ghostly capital ship looming in the background.

**Clearance:** COMMAND // SECTOR: KOPRULU // GRID: ALPHA-7

### 8.2 QUANTUM REACTOR (`#quantum`)

**Files:** `QuantumCore.jsx` (app.jsx inline section)

**Entry:** A large transparent cube with violet emissive glow pulses at 2Hz, surrounded by 5 orbital rings alternating violet and crimson. 2500 cyan particles float in the darkness. 20 orange energy beams stab through the scene. The camera follows the user's mouse.

**User interaction:** Mouse movement controls camera position (smooth lerp). No clickable UI in this section.

**Key visual:** The core material uses `transmission: 1` creating a glass-like refractive cube with `clearcoat: 1` for a specular highlight sheen. The inner cube counter-rotates inside it, visible through the glass.

**Clearance:** REACTOR // NODE: QUANTUM-7 // SIGNAL: STABLE

### 8.3 DEPLOYMENT GRID (`#fleet`)

**Files:** `FleetGrid.jsx`

**Entry:** Section heading slides up, then 6 tiles stagger in from below at 0.1s intervals. Each tile shows a unit image with Japanese/English label.

**User interaction:** Hover zooms tile to 1.02× and shifts border to violet. The weapons-locked tile (cruiserlocked.gif) has red border treatment.

**Grid layout:** 12-column CSS grid with custom spans per tile. Hero tile spans 8 columns × 2 rows (400px min-height). Medium tiles span 4 columns (220px min-height).

**Clearance:** TACTICAL // GRID: DEPLOY-4 // SECTOR: KOPRULU

### 8.4 TACTICAL DATABASE (`#cinematic`)

**Files:** `CinematicGrid.jsx`

**Entry:** Section appears with cinematic flicker border animation. 10 GIF cards arranged in named grid areas (3 rows × 5 columns).

**User interaction:** Hover triggers a diagonal light sweep (::after pseudo-element), card lifts 5px, border illuminates to gold.

**Key visual:** The entire section container has a flickering gold border (4s cycle), repeating scanline overlay (::before), and warm amber/gold color scheme contrasting the rest of the site's violet palette.

**Responsive:** At ≤700px, collapses to 2-column layout.

### 8.5 NEURAL NETWORK (`#briefing`)

**Files:** `MissionBriefing.jsx`

**Entry:** Panel slides up with fade. Classified badge in crimson blinks "機密 · CLASSIFIED". Two-column grid reveals Japanese lore text on left, mission parameters on right.

**User interaction:** "ACCESS FULL INTEL" button at bottom has hover scale effect.

**Parameters table:**
- SECTOR: KOPRULU
- THREAT: CRITICAL (red text)
- CASUALTIES: CLASSIFIED
- OBJ: ORBITAL SUPREMACY
- CMD: ADM. RAYNOR
- STATUS: ACTIVE ⬤ (teal)

**System diagnostics:** Three animated progress bars (Power Core 98%, Scanner 100%, Comms 85%) with signal-cyan → reactor-teal gradient fills.

**Clearance:** CLASSIFIED (crimson) // NODE: NEURAL-2 // ENCRYPTION: AES-256

---

## 9. Atmospheric Layer System

The site composites 12+ layers to create physical depth and environmental continuity. Layers are fixed-position `div` elements appended in `App.jsx` after all sections, ordered by z-index.

### 9.1 Layer Stack (back to front)

```
Layer 0: Page background (var(--void-black) = #05010A)
─────────────────────────────────────────────── z: 0
Layer 1: MatrixTerminal (falling Japanese quotes)
─────────────────────────────────────────────── z: 1
Layer 2: body::before scanlines (1px white lines at 1.5% opacity, soft-light blend)
Layer 3: atmo-fog (dual radial gradient: violet 30% + cyan 70%)
Layer 4: atmo-energy-pulse (6s breathing circle, violet at 1.5% opacity peak)
─────────────────────────────────────────────── z: 2
Layer 5: atmo-grid (64px repeating violet grid lines at 3% opacity)
Layer 6: atmo-data-stream (2 horizontal scan lines: cyan 8s sweep + lavender 12s reverse)
─────────────────────────────────────────────── z: 3
Layer 7: Section content (varies by section)
─────────────────────────────────────────────── z: 1–10
Layer 8: Navbar (blur backdrop, translucent)
─────────────────────────────────────────────── z: 1000
Layer 9: Global vignette (radial gradient edge darkening, 50%→85%)
─────────────────────────────────────────────── z: 9997
Layer 10: Global scanlines (4px repeating dark lines at 8% opacity)
─────────────────────────────────────────────── z: 9998
Layer 11: Corner HUD brackets (violet borders, top-left/right, bottom-left/right)
─────────────────────────────────────────────── z: 9999
```

### 9.2 Layer Details

**atmo-grid:** Fixed position, 64px repeating lines in both axes. Each line is violet at 3% opacity. Subtle — visible only on close inspection. Gives the entire page a tactical HUD grid feel.

**atmo-data-stream:** Two horizontal 1px lines that sweep across the viewport:
- Line 1 (::before): Signal-cyan, 6% opacity, top of viewport, 8s left→right sweep
- Line 2 (::after): Lavender, 4% opacity, 30% from bottom, 12s right→left sweep

**atmo-fog:** Two overlapping radial gradients that create depth haze:
- Violet 4% at 30% left, fading to transparent at 60%
- Signal-cyan 2% at 70% right, fading at 50%

**atmo-energy-pulse:** A 6s breathing effect. At peak, a 1.5% opacity violet circle expands from center. Barely visible — creates subconscious ambient energy.

**global-scanlines:** Classic CRT monitor scanline effect. 3px transparent + 1px black (8% opacity) repeating pattern.

**global-vignette:** Radial gradient from transparent at center to 85% dark at edges. Draws focus to center of screen.

**body::before scanlines:** Finer scanline grain. 1px white (1.5% opacity) + 2px transparent, soft-light blend mode. Adds texture without darkening.

**Corner brackets:** Four 40×40px L-shaped violet borders at each corner of the viewport. Fade in over 0.8s. Positioned at z-index 9999 — always on top.

---

## 10. Component API Reference

### 10.1 Battlecruiser

```jsx
<Battlecruiser
  position={[x, y, z]}       // required, e.g. [3.5, 2.2, 2]
  scale={1}                   // optional, default 1
  rotY={Math.PI}              // optional, default Math.PI
  phaseOffset={0}             // optional, default 0 — desyncs drift
  onFire={(pos) => {}}        // optional — called with [x,y,z] world position
/>
```

- `onFire` fires every 0.3–0.8s randomly
- `phaseOffset` shifts the `sin()` time base — use 0, 2, 4 etc. for desync
- Scale 0.35→1.0 tested; extreme values may break visual proportions

### 10.2 LaserBeam

```jsx
<LaserBeam
  from={THREE.Vector3}       // required — source position
  to={THREE.Vector3}         // required — target position
  onDone={() => {}}          // required — cleanup callback
/>
```

- Auto-destructs after ~12 frames (life -0.08/frame)
- Color randomly chosen: 60% #ff6600, 40% #ff2200

### 10.3 ImpactFlash

```jsx
<ImpactFlash
  position={THREE.Vector3}   // required
  onDone={() => {}}          // required
/>
```

- Expands from scale 1→3.5, fades opacity, dies in ~16 frames

### 10.4 ImpactLight

```jsx
<ImpactLight
  position={THREE.Vector3}   // required
  onDone={() => {}}          // required
/>
```

- pointLight (#ff5500), intensity decays 6→0 over ~12 frames

### 10.5 CountUp

```jsx
<CountUp
  end={147}                   // required — target number
  duration={1500}             // optional — ms, default 1500
  suffix="K"                  // optional — appended text
/>
```

- Animates 0 → end using requestAnimationFrame
- Suffix is rendered as-is (e.g. "12K")

### 10.6 AnimatedText

```jsx
<AnimatedText
  text="REDSTAR"              // required
  className="hero-title-line" // required — CSS class for styling
/>
```

- Splits every character into independent animated span
- Whitespace becomes `\u00A0` (non-breaking space)
- Stagger delay: `index × 0.04s`

### 10.7 SectionMeta

```jsx
<SectionMeta
  clearance="// CLEARANCE: COMMAND"  // required
  coords="SECTOR: KOPRULU // GRID: ALPHA-7" // required
  crimson                              // optional flag — enables red variant
/>
```

- Each instance has its own 1-second interval for timestamp
- Timestamp format: `HH:MM:SSZ` (UTC)

### 10.8 SectionDivider

```jsx
<SectionDivider />
```

- No props. Renders gradient line with "◈ SYSTEMS LINK ◈" label.

---

## 11. CSS Variable Reference

### 11.1 All Custom Properties

```css
/* Surfaces */
--void-black: #05010A;
--obsidian: #0B0F1A;
--graphite: #161B2C;
--slate: #23283B;

/* Accents */
--lavender: #C084FC;
--violet: #8B5CF6;
--plasma: #A855F7;
--ultraviolet: #D8B4FE;

/* Functional */
--crimson: #FF2A6D;
--warning: #EF4444;
--signal-cyan: #7DD3FC;
--ion-blue: #38BDF8;
--reactor-teal: #22D3EE;

/* Neutrals */
--steel: #71717A;
--titanium: #A1A1AA;
--text-primary: #F5F3FF;
--text-secondary: #A1A1AA;

/* Legacy aliases */
--blue: var(--violet);
--blue-glow: var(--lavender);
--red: var(--crimson);
--gold: var(--plasma);
--teal: var(--reactor-teal);
--dark: var(--void-black);
--hud-bg: rgba(11, 15, 26, 0.82);
--hud-border: rgba(139, 91, 246, 0.3);

/* Fonts */
--font-display: 'Zen Dots', cursive;
--font-hud: 'M PLUS 1 Code', monospace;
--font-pixel: 'DotGothic16', sans-serif;
--font-body: 'Noto Sans JP', sans-serif;
--font-impact: 'Reggae One', cursive;
--font-ui: 'Sawarabi Gothic', sans-serif;
--font-mono: 'Share Tech Mono', monospace;
```

### 11.2 Variable Usage by Section

| Section | Primary Variable | Accent Variable | Status Color |
|---|---|---|---|
| Navbar | `--hud-bg` | `--blue` | `--teal` |
| Hero | `--dark` | `--blue` | `--teal` |
| Quantum Core | `#05010a` (hardcoded) | `#c084fc` (hardcoded) | `#ff2a6d` (hardcoded) |
| Fleet | `--dark` | `--blue` | `--red` (alert) |
| Cinematic | `--dark` | gold (hardcoded) | gold (hardcoded) |
| Briefing | `--dark` | `--signal-cyan` | `--red` |

### 11.3 Adding New Colors

Add to `:root` in `App.css`. Follow naming convention:
- Surfaces: `--material-name` e.g. `--titanium`
- Colors: `--color-name` e.g. `--lavender`
- Functional: `--purpose` e.g. `--warning`
- Keep hex values in the palette's spectral range (deep dark + violet/lavender/cyan/crimson)

---

## 12. Media Asset Pipeline

### 12.1 Asset Location

All static media served from `public/media/`. Referenced in components as `/media/filename.ext`.

### 12.2 Current Asset Inventory

| File | Type | Used In | Purpose |
|---|---|---|---|
| battlecruiser1.jpg | Image | HeroSection | Hero overlay background (right 60%, screen blend, 18% opacity) |
| cruiserlocked.gif | GIF | FleetGrid, CinematicGrid | "Weapons Locked" tile + cinematic hero card |
| marine.gif | GIF | CinematicGrid | Marine unit display |
| tank.gif | GIF | CinematicGrid | Siege Tank unit display |
| goliath.gif | GIF | CinematicGrid | Goliath unit display |
| robocommando.gif | GIF | CinematicGrid | Robo Commando display |
| sovietcommando.gif | GIF | CinematicGrid | Soviet Commando display |
| ghostcommando.gif | GIF | CinematicGrid, FleetGrid | Ghost unit display |
| tycus.gif | GIF | CinematicGrid | Tychus character display |
| ghostgirl.gif | GIF | CinematicGrid | Spectre division display |
| giphy.gif | GIF | CinematicGrid | Tactical feed display |
| dropship.jpg | Image | FleetGrid | Dropship class tile |
| cruiserwing.jpg | Image | FleetGrid | Cruiser wing tile |
| fleetcommando.jpg | Image | FleetGrid | Fleet command tile |
| ghost.jpg | Image | FleetGrid | Ghost division tile |

### 12.3 Adding New Assets

1. Place file in `public/media/`
2. Reference in component as `/media/your-file.gif`
3. For images used as CSS backgrounds (like battlecruiser1.jpg in `.hero-image-overlay`), the path is relative to `public/` in the CSS `url('/media/...')`

### 12.4 Image Optimization Guidelines

- GIFs should be optimized (reduced color palette, limited frame count). The current GIFs are small-dimension (200–400px wide).
- The hero overlay image (battlecruiser1.jpg) is the largest asset — keep under 500KB.
- No lazy loading is configured for section images — all load on page start.

---

## 13. Performance Optimization

### 13.1 Current Bundle Size

| Asset | Size | Gzipped |
|---|---|---|
| JS (Three.js + app) | ~1077 KB | ~307 KB |
| CSS | ~19 KB | ~5 KB |
| HTML | ~1 KB | ~0.5 KB |

The large JS bundle is dominated by Three.js. No code-splitting is configured.

### 13.2 Three.js Performance

- **Hero scene**: ~20K tris (planet 16K + cruiser 2K + effects). Stars use `Points` (GPU-efficient). Should run at 60fps on any GPU from ~2015+.
- **Quantum scene**: ~10K tris (4K for core + 5 rings × ~600 tris each + 20 beams × ~24 tris). 2500 particle points. Fog and transparent materials add GPU fill-rate cost.
- **Two active Canvases**: Both scenes render simultaneously when both are in viewport. The quantum Canvas has `alpha: true` which prevents certain GPU optimizations.

### 13.3 Optimization Opportunities

1. **Code-splitting**: Dynamically import `ThreeScene` and `QuantumCoreScene` so they only load when scrolled into view
2. **Canvas disposal**: Pause render loop when canvas is out of viewport (IntersectionObserver)
3. **Reduce particle count**: 2500 particles × 2 scenes = 5000 point sprites
4. **GIF optimization**: Convert animated GIFs to video (`<video>` with webm) for better compression
5. **Font subsetting**: Google Fonts loads full character sets. Subset to only used characters (Latin + Japanese)
6. **Chunk splitting**: Move Three.js to vendor chunk via Rollup `manualChunks`

### 13.4 Current Bottlenecks

- Two simultaneous WebGL contexts (hero + quantum)
- MatrixTerminal creates ~4 DOM elements/second indefinitely (potential memory leak on very long sessions)
- No `will-change` or `contain` optimizations on animated elements
- All CSS in single file (~1050 lines) — no CSS modules or scoped styles

---

## 14. Theming & Customization

### 14.1 Changing the Color Palette

Edit `:root` variables in `App.css`. The legacy aliases (`--blue`, `--red`, etc.) will automatically propagate to all existing components.

```css
:root {
  --void-black: #YOUR_COLOR;
  --lavender: #YOUR_COLOR;
  /* ... */
}
```

Some sections have hardcoded colors that bypass variables:
- **Quantum Core**: Background `#05010a`, status color `#c084fc`, dot color `#ff2a6d`, title gradient `#ffffff → #c084fc → #7dd3fc`
- **Cinematic Grid**: Gold tones `#f39c12`, `#E6B422`, `#FFD966`, `#ffcd7e`
- **Briefing**: Red badge `#ff6060`, status green `#00e5c8`

These would need manual editing to fully retheme.

### 14.2 Changing Section Content

Each section component has its data embedded:
- `FleetGrid.jsx`: Edit `fleetTiles` array (image paths, labels)
- `CinematicGrid.jsx`: Edit `tiles` array (image paths, labels)
- `MissionBriefing.jsx`: Edit `briefingParams` and `briefingSystems` arrays. Edit the Japanese HTML text directly
- `MatrixTerminal.jsx`: Edit `quotes` array

### 14.3 Changing Section Order

In `App.jsx`, reorder the section components and their dividers:

```jsx
<HeroSection />
<SectionDivider />
<FleetGrid />       {/* moved up */}
<SectionDivider />
{/* quantum section */}  {/* moved down */}
```

Update `Navbar.jsx` scroll targets to match new section `id` attributes.

### 14.4 Adding a New Section

1. Create component file in `src/components/`:
   ```jsx
   export default function NewSection() {
     return (
       <section className="new-section" id="new-section">
         <SectionMeta clearance="// CLEARANCE: XXX" coords="NODE: XXX" />
         {/* content */}
       </section>
     );
   }
   ```
2. Add CSS in `App.css` under a `/* ── NEW SECTION ── */` comment block
3. Import and place in `App.jsx` between dividers
4. Add nav link in `Navbar.jsx`

---

## 15. Production Build & Deployment

### 15.1 Build Process

```bash
npm run build
```

Output structure:
```
dist/
├── index.html
├── assets/
│   ├── index-{hash}.js      # All JS (React, Three.js, app)
│   ├── index-{hash}.css     # All CSS
│   └── --                     # No media copied — served from public/
└── media/                     # Copied from public/media/ (Vite behavior)
```

### 15.2 Deployment

This is a static site. Deploy to any static host:

- **Netlify**: `npm run build`, deploy `dist/`
- **Vercel**: Auto-detects Vite, `npm run build` + `dist/` output
- **GitHub Pages**: Use `vite.config.js` with `base: '/repo-name/'`
- **S3/CloudFront**: Upload `dist/` contents

### 15.3 Environment Variables

None. Zero runtime configuration.

---

## 16. Troubleshooting

### 16.1 WebGL Context Lost

If the browser loses the WebGL context (common with multiple Canvases across tabs), the scenes will freeze. Reload the page. No recovery logic is implemented.

### 16.2 Three.js Transparency Issues

The quantum core's `transmission: 1` material may render incorrectly on some mobile GPUs (especially older Mali/Adreno). Fallback: reduce `transmission` to 0 and use high `opacity` instead.

### 16.3 Font Loading

Google Fonts are loaded via `index.html` link tags. If fonts fail to load (offline, blocked), the site falls back to `cursive` / `monospace` / `sans-serif` depending on the font family. The experience degrades visually but remains functional.

### 16.4 MatrixTerminal Memory

The MatrixTerminal creates ~4 DOM elements/second. On a typical session (<10 minutes), this is ~2400 elements that self-remove after 10–22 seconds. Peak DOM count should stay under ~100. For very long sessions, consider capping the interval or recycling elements.

### 16.5 Build Errors

- `Module not found: Can't resolve 'three'` → Run `npm install`
- `Unexpected token 'export'` → Check Node.js version (≥18 required)
- `[vite] Internal server error: Plugin css` → Check CSS syntax in App.css

---

## 17. Developer Notes

### 17.1 Code Style

- No comments in JSX code (per project convention)
- CSS section delimiters use `/* ── SECTION NAME ── */` pattern
- Components are single-file, default exports
- Files are named PascalCase matching the component name

### 17.2 Git Workflow

- No linter or formatter configured
- No pre-commit hooks
- Commit messages should describe the tactical/system impact, not just the technical change

### 17.3 Known Technical Debt

1. **Single CSS file**: ~1050 lines, no modules, high specificity coupling
2. **Hardcoded colors**: Quantum Core and Cinematic Grid sections bypass CSS variables
3. **No error boundaries**: A Three.js crash can bring down the entire page
4. **No loading states**: Three.js scenes render progressively as they load assets
5. **No responsive Three.js**: Canvas sizes update on resize but scene composition doesn't adapt for mobile
6. **No accessibility**: No ARIA labels, no keyboard navigation for 3D scenes, no reduced-motion media query
7. **No test suite**: Zero unit or integration tests

### 17.4 Recommended Improvements

| Priority | Improvement | Effort | Impact |
|---|---|---|---|
| P0 | Code-split Three.js scenes | 2h | Reduces initial load by ~700KB |
| P1 | IntersectionObserver pause for Canvases | 1h | GPU memory savings when scrolled away |
| P1 | Add `prefers-reduced-motion` queries | 1h | Accessibility compliance |
| P2 | Extract CSS modules per component | 4h | Maintainability, style isolation |
| P2 | Replace hardcoded colors with variables | 1h | Theming consistency |
| P3 | Add loading skeletons for sections | 2h | Perceived performance |
| P3 | Unit tests for CountUp, SectionMeta | 2h | Regression prevention |

---

## 18. Future Roadmap

### 18.1 Phase 1 — Stability (Current)

- All 5 sections implemented and styled
- Two Three.js scenes operational
- Atmospheric layer system complete
- MatrixTerminal quotes system active
- Section metadata framework in place

### 18.2 Phase 2 — Audio Environment

- Subtle reactor hum (Web Audio API, generated)
- Signal chirps on section entrance
- Radio chatter noise layer
- Ambient orbital drone
- All audio optional, user-initiated

### 18.3 Phase 3 — Interactivity

- Clickable fleet tiles → unit detail overlay
- Deploy button → animated fleet dispatch sequence
- Intel button → classified dossier modal
- Quantum core → click to stabilize/overload animation

### 18.4 Phase 4 — Polish

- Scroll-linked animation progress
- Parallax depth between atmospheric layers
- Mobile Three.js fallback (static images)
- Dark mode variant (currently always dark)
- i18n toggle: Japanese/English

---

```
╔═══════════════════════════════════════════════════════════════╗
║  END TRANSMISSION                                             ║
║  // TERRAN DOMINION · REDSTAR DIVISION //                    ║
║  // THIS INTERFACE IS CLASSIFIED //                           ║
║  // UNAUTHORIZED ACCESS WILL BE TERMINATED //                 ║
╚═══════════════════════════════════════════════════════════════╝
```
