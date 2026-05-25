# TERRAN COMMAND — Developer Handoff

## Project Overview

A cinematic military-industrial quantum AI command interface themed around the Terran Dominion from StarCraft. The experience simulates an orbital defense network / classified AI warfare terminal with heavy Three.js integration, tactical HUD elements, and environmental atmospheric systems.

**Stack:** React 18 + Vite + Three.js (R3F) + Framer Motion 11

---

## Architecture

```
src/
  App.jsx              — Root layout: section composition + global overlays
  App.css              — All styles, CSS variables, keyframes, responsive
  main.jsx             — ReactDOM entry
  components/
    HeroSection.jsx     — BOOT SEQUENCE: planet scene + animated title + HUD stats
    ThreeScene.jsx      — Orchestrates Planet + 3x Battlecruisers + laser effects
    Planet.jsx          — Rotating planet with continent patches + atmosphere
    Battlecruiser.jsx   — 3D battlecruiser with idle drift + auto-cannon fire
    LaserBeam.jsx       — Transient laser beam (cylinder) from cruiser → planet
    ImpactFlash.jsx     — Expanding sphere flash on impact
    ImpactLight.jsx     — Fading pointLight at impact site
    CameraRig.jsx       — Slow orbital camera rotation around planet
    QuantumCore.jsx      — QUANTUM REACTOR: cube core + rings + particles + beams
    FleetGrid.jsx        — DEPLOYMENT GRID: 6-tile image grid with labels
    CinematicGrid.jsx    — TACTICAL DATABASE: 10-card GIF grid with cinematic theme
    MissionBriefing.jsx  — NEURAL NETWORK: classified mission params + system bars
    Navbar.jsx           — Fixed top nav with scroll-to-section + online status
    AnimatedText.jsx     — Letter-by-letter reveal animation
    CountUp.jsx          — Animated number counter (requestAnimationFrame)
    SectionMeta.jsx      — Clearance badge + coordinates + live Z-time clock
    SectionDivider.jsx   — "◈ SYSTEMS LINK ◈" separator between sections
    MatrixTerminal.jsx   — Falling Japanese tactical quotes overlay (vanilla DOM)
```

### Section Order

```
NAV (fixed)
↓
BOOT SEQUENCE   — HeroSection (#hero)
↓ divider
QUANTUM REACTOR — inline (#quantum) 
↓ divider
DEPLOYMENT GRID — FleetGrid (#fleet)
↓ divider
TACTICAL DB     — CinematicGrid
↓ divider
NEURAL NETWORK  — MissionBriefing (#briefing)
↓ divider
GLOBAL OVERLAYS — MatrixTerminal + atmosphere layers + scanlines + corners
```

---

## Design System (`:root` in App.css)

### Colors

| Variable | Value | Usage |
|---|---|---|
| `--void-black` | `#05010A` | Primary background |
| `--obsidian` | `#0B0F1A` | Secondary bg |
| `--graphite` | `#161B2C` | Surface |
| `--slate` | `#23283B` | Border surfaces |
| `--lavender` | `#C084FC` | AI/hologram/neural |
| `--violet` | `#8B5CF6` | Primary accent |
| `--plasma` | `#A855F7` | Gold-equivalent highlights |
| `--ultraviolet` | `#D8B4FE` | Soft glow |
| `--crimson` | `#FF2A6D` | Warnings, threats, alerts ONLY |
| `--signal-cyan` | `#7DD3FC` | Data, UI borders, systems |
| `--reactor-teal` | `#22D3EE` | Status OK indicators |

### Legacy aliases (map to new palette)

```
--blue        → var(--violet)
--blue-glow   → var(--lavender)
--red         → var(--crimson)
--gold        → var(--plasma)
--teal        → var(--reactor-teal)
--dark        → var(--void-black)
--hud-border  → rgba(139, 91, 246, 0.3)
```

### Fonts

| Variable | Font | Use |
|---|---|---|
| `--font-display` | Zen Dots | Large headers |
| `--font-hud` | M PLUS 1 Code | UI, stats, metadata |
| `--font-pixel` | DotGothic16 | Japanese labels |
| `--font-body` | Noto Sans JP | Body text |
| `--font-ui` | Sawarabi Gothic | Nav, small UI |
| `--font-mono` | Share Tech Mono | Monospace fallback |

---

## Key Technical Details

### Three.js Scenes

**Hero scene** (`ThreeScene.jsx`):
- Camera orbits planet at 0.12 rad/s via `CameraRig`
- 3 Battlecruisers drift with `sin(time)` patterns, fire lasers at random planet surface points
- Lasers, impact flashes, and impact lights are transient state arrays (auto-cleanup via `onDone`)
- 7000 stars via Drei `<Stars>`
- Lighting: ambient (blue) + directional (white) + point (cyan)

**Quantum Core scene** (`QuantumCore.jsx`):
- Mouse-reactive camera (lerp toward cursor)
- Core cube: `MeshPhysicalMaterial` with transmission 1, emissive violet
- Inner cube: `MeshBasicMaterial` magenta, counter-rotates
- 5 orbital rings (alternating violet/crimson), random axis rotation
- 2500 cyan particles in 80-unit volume, slow Y rotation
- 20 orange energy beams (random position/rotation)
- Grid floor at y=-5
- Fog: `FogExp2` #05010a at 0.045
- Pulsing point light intensity (4Hz sine wave)

### Animation Conventions

All Framer Motion transitions use `ease: "easeOut"` with durations 0.5–0.7s. No bounce, no spring, no playful easing. Section entrances use `whileInView` with `viewport: {{ once: true }}`.

### Motion Design Rules

- Easing: always `easeOut` (cubic bezier)
- No bounce, spring, or playful easing
- Section entrances: stagger delays 0.1–0.2s between child elements
- Hover states: subtle scale (1.01–1.03) with `cubic-bezier(0.2, 0.9, 0.4, 1.1)`
- Three.js rotations: constant additive (`+= delta * rate`)

### Atmospheric Overlays (z-index ordering)

| Layer | z-index | Description |
|---|---|---|
| MatrixTerminal | 1 | Falling Japanese quotes |
| atmo-fog | 2 | Radial gradient depth haze |
| atmo-energy-pulse | 2 | 6s breathing ambient glow |
| atmo-grid | 3 | Violet 64px grid lines (3% opacity) |
| atmo-data-stream | 3 | Horizontal scan lines (8s/12s sweep) |
| body::before scanlines | 2 | 3px repeating scanlines |
| global-scanlines | 9998 | CRT scan overlay |
| global-vignette | 9997 | Edge darkening |
| corner brackets | 9999 | HUD corner frames |

### SectionMeta Component

Renders clearance badge + tactical coordinates + live UTC timestamp. The timestamp updates every 1s via `setInterval`. Accepts `crimson` prop for classified/warning sections.

---

## Adding New Sections

1. Create component in `src/components/`
2. Import in `App.jsx`
3. Place between `<SectionDivider />` elements
4. Add a `SectionMeta` as the first child for clearance label
5. Use CSS variables for all colors
6. Motion: `ease: "easeOut"`, durations 0.5–0.7s

---

## Commands

```bash
npm run dev      # Vite dev server
npm run build    # Production build → dist/
npm run preview  # Preview production build
```

---

## Environment

```
Three.js r0.160
@react-three/fiber 8.15
@react-three/drei 9.92
Framer Motion 11
Vite 5.1
```

Media assets (GIFs, images) live in `public/media/`. Static site — no API, no backend.
