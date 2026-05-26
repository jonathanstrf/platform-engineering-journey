# PE Talk — Slides Source

Jonathan Ramírez's Platform Engineering conference talk: **"De Cero a Producción"**.
Presented at **DevOpsDays Medellín 2026**.

## Structure

```
D:\Proyects\Notion\
├── src/
│   ├── gradients.js      # generates gradient + icon PNGs into assets/
│   ├── slides.js         # builds the PPTX from assets/, outputs to dist/
│   ├── flyer.js          # builds the A4 portrait printable flyer (dist/)
│   └── icons/
│       ├── icon_laptop.png   # original Python-generated (do not regenerate)
│       ├── icon_team.png     # original Python-generated (do not regenerate)
│       └── icon_eye.png      # original Python-generated (do not regenerate)
├── assets/            # generated PNGs (do not edit manually)
├── dist/              # generated PPTX + PDF outputs
├── node_modules/
├── package.json
└── CLAUDE.md
```

## Build workflow

```powershell
cd D:\Proyects\Notion

npm install                # one-time
npm run assets             # generates assets/ (gradients + icons)
npm run build              # generates dist/PE_Talk_JonathanRamirez_v28.pptx
npm run flyer              # generates dist/PE_Talk_JonathanRamirez_flyer.pptx
npm run all                # assets + build + flyer
```

## Outputs

| File | Description |
|------|-------------|
| `dist/PE_Talk_JonathanRamirez_v28.pptx` | Main slide deck (16:9) |
| `dist/PE_Talk_JonathanRamirez_flyer.pptx` | Printable handout (A4 portrait) — export to PDF before distributing |

## Slide map

| Slide | Content |
|-------|---------|
| 1  | Portada |
| 2  | El hilo conductor — advance silently after opening story, before introducing yourself |
| 3  | Los 4 problemas |
| 4  | Un viaje de 5 actos |
| 5  | Acto 1 — Entorno local (before/after) |
| 6  | Acto 2 — Infraestructura (3 columns: Sin estándar → IaC → Golden Path) |
| 7  | Acto 3 — Escala (Gate vs Guardrail + RabbitMQ story anchor) |
| 8  | Acto 4 — Retroalimentación (DORA metrics + Kibana story anchor) |
| 9  | Acto 5 — Tres cosas (lessons) |
| 10 | Tu plan de acción (4×4 checklist) |
| 11 | Cierre |

## Checklist (slide 10 + flyer)

Both `slides.js` and `flyer.js` share the same 4×4 checklist. When updating items, edit the `sections` / `SECTIONS` array in **both files**.

| Section | Items |
|---------|-------|
| Entornos | .tool-versions, gestor de versiones, tiempo de onboarding, setup con un solo comando |
| Infraestructura | Audit de deploys, módulo IaC compartido, definición de deploy correcto, catálogo de servicios con dueño |
| Escala | Lista de pedidos de equipos, gates → guardrails, NPS interno trimestral, golden path documentado |
| Visibilidad | 4 métricas DORA, exponer métricas, post-incidente imposibility question, SLOs compartidos |

## Color palette

| Constant | Hex | Use |
|----------|-----|-----|
| `ORANGE` | `E8560A` | Primary accent, quotes |
| `ORANGE_MID` | `C94D08` | Story anchor text |
| `ORANGE_LIGHT` | `FDE8DA` | Story anchor background, highlight cards |
| `CHARCOAL` | `2D2D2D` | Main text |
| `GRAY_DARK` | `4A4A4A` | Body/bullet text |
| `GRAY_CARD` | `F4F4F4` | Card backgrounds |

## Linked Notion page

Talk script: **🎤 Guión de la Charla y Guía de Ensayo (ES)**
Page ID: `35d2d4b5-c14f-813f-8989-e75bb8350b6d`

Slides must stay in sync with the script. Key alignment rules:
- Slide 2 has no spoken cue — advance it silently after the opening story
- "Plataforma como producto" is an Act 3 concept (slide 7), not Act 2
- Act 5 uses "tres cosas" framing — anti-patterns are embedded in lessons, not listed separately
- Lesson subtexts on slide 9 match the spoken versions in the script
- Acto 4 script covers DORA metrics as pillar 2 (replaced runbooks, which are now a one-liner in pillar 3)
- Checklist items on slide 10 are not enumerated in the script — the script just references the slide
