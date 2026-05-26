# Reveal.js Migration Design
**Talk:** De Cero a Producción — Jonathan Ramírez, DevOpsDays Medellín 2026
**Date:** 2026-05-26
**Status:** Approved

---

## Goal

Migrate the 11-slide deck from PptxGenJS (static .pptx) to a Reveal.js web presentation. The result is a single self-contained HTML file that runs locally with no internet dependency, using a bundled local copy of Reveal.js.

---

## Technical Approach

- **Format:** Single `index.html` file with all slides inline
- **Framework:** Reveal.js (local copy in `vendor/reveal.js/`)
- **No build step** — open `dist/index.html` directly in the browser
- **Speaker notes** via Reveal's built-in notes plugin (`<aside class="notes">`)
- **Presentation mode** activated with `S` key (opens notes in separate window)

---

## Color Palette

| Token | Hex | Use |
|-------|-----|-----|
| Orange | `#E8560A` | Primary accent, headers, quotes |
| Orange mid | `#C94D08` | Story anchor text |
| Orange light | `#FDE8DA` | Highlight backgrounds |
| Purple | `#7C3AED` | Secondary accent, gradient endpoint |
| Background | `#0a080f` | Slide background (near-black with warm tint) |
| Text primary | `#e8e8e8` | Headings |
| Text secondary | `#999` | Body/bullet copy |
| Divider | `rgba(255,255,255,0.07)` | Subtle separators |

---

## Global Visual System

**Background:** `#0a080f` — near-black with a warm tint, consistent across all slides.

**Ambient gradient:** radial-gradient ellipses at ~20% and ~80% horizontal (or contextual positions) using `rgba(124,58,237,0.09)` — low-opacity purple glow that fills the card without overwhelming content.

**Top accent bar:** 3px horizontal gradient `linear-gradient(90deg, #E8560A, #7C3AED)` at the top of every slide.

**Font:** Arial (system font, no external dependency).

**Aspect ratio:** 16/9 enforced on all slide cards.

---

## Transitions & Animations

- **Slide transition:** Horizontal slide (`transition: 'slide'`)
- **Fragment auto-advance:** Items within a slide reveal automatically every 1 second (`data-autoslide="1000"` on fragment groups), so the speaker never clicks — the audience sees items appear at a natural reading pace
- **No click-to-advance fragments** — fragments are time-driven only

---

## Slide Layouts

### Slide 1 — Portada
Large centered title block. Speaker's name and event subtitle beneath. Orange accent on the title keyword. No bullet content.

### Slide 2 — El hilo conductor
Single large statement centered vertically. Advance this slide silently (no spoken cue) — the opening story flows directly into it without breaking cadence.

### Slide 3 — Los 4 problemas
Four problem cards in a 2×2 grid. Each card has an icon (or number), a short label, and a one-line descriptor. Cards use `#F4F4F4` background in light mode or a subtle dark variant in dark mode.

### Slide 4 — Un viaje de 5 actos
Five-step horizontal timeline or numbered list. Acts labeled with their titles. Visual progression from left to right.

### Slide 5 — Acto 1 (Entorno local)
Two-column before/after comparison. Left column (Before): pain points in red tones. Right column (After): improvements in green tones. Vertical divider line between columns.

### Slide 6 — Acto 2 (Infraestructura)
Three-column layout: Sin estándar → IaC → Golden Path. Left-to-right progression conveying maturity. Arrow or gradient connectors between columns.

### Slide 7 — Acto 3 (Gate vs Guardrail)
Two-column split with vertical center line.
- **Left (Gate):** ✗ icon in red + "Gate" label + 4 bullet items with red bullets
- **Right (Guardrail):** ✓ icon in green + "Guardrail" label + 4 bullet items with green bullets
- Content block vertically centered within the card
- Quote `"Completamente manual. Completamente evitable."` pinned to the bottom in orange italic
- Ambient purple gradient across full background (ellipse at 20% and 80%)
- Top gradient bar + vertical center divider

### Slide 8 — Acto 4 (Retroalimentación)
DORA metrics as the primary visual: four metric cards (Deployment Frequency, Lead Time, Change Failure Rate, MTTR). Story anchor (Kibana/veinte minutos) as a subtle callout below or beside.

### Slide 9 — Acto 5 (Tres cosas)
Three lesson cards with icon + title + subtext. Lessons derived from the "tres cosas" framing: precipitación → reflexión, visibilidad, cultura de plataforma.

### Slide 10 — Tu plan de acción
4×4 checklist grid matching the existing PPTX slide 10. Four sections: Entornos, Infraestructura, Escala, Visibilidad. Each section has 4 checkbox-style items.

### Slide 11 — Cierre
Closing statement, speaker handle/contact, and conference branding. Minimal — one or two elements centered.

---

## Speaker Notes

Every slide has a corresponding `<aside class="notes">` block with the spoken cue or key sentence from the Notion script. Notes are terse — keywords and anchor phrases, not full paragraphs.

Slide 2 note explicitly reads: *"[Avanzar en silencio — sin cue spoken]"* to remind the presenter not to speak.

---

## File Structure

```
D:\Proyects\Notion\
├── dist/
│   └── index.html          # self-contained Reveal.js presentation
├── vendor/
│   └── reveal.js/          # local copy of Reveal.js (CSS + JS)
│       ├── reveal.css
│       ├── reveal.js
│       └── theme/
│           └── black.css   # base theme (overridden inline)
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-05-26-reveal-slides-design.md
```

---

## Out of Scope

- Hosting / deployment (presentation is local only)
- PDF export (PPTX build remains for that)
- Slide builds from a JS/Node pipeline (single HTML file, no bundler)
- Dark/light mode toggle
