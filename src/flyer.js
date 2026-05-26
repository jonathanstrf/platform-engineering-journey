const pptxgen = require("pptxgenjs");
const fs   = require("fs");
const path = require("path");

const ASSETS_DIR = path.join(__dirname, '..', 'assets');
const DIST_DIR   = path.join(__dirname, '..', 'dist');

const ORANGE     = "E8560A";
const CHARCOAL   = "2D2D2D";
const GRAY_DARK  = "4A4A4A";
const GRAY_MID   = "8A8A8A";
const GRAY_LIGHT = "E2E2E2";
const WHITE      = "FFFFFF";
const BG_LIGHT   = "FAFAFA";

const gradOrange = "image/png;base64," +
  fs.readFileSync(path.join(ASSETS_DIR, 'gradient_orange.png')).toString("base64");

const SECTIONS = [
  { label: "Entornos",        items: ["Agrega .tool-versions a cada repositorio", "Estandariza el gestor de versiones", "Mide el tiempo de onboarding ahora", "Automatiza el setup del entorno con un solo comando"] },
  { label: "Infraestructura", items: ["Audita cómo despliega cada equipo", "Crea un módulo de IaC compartido", "Define qué es un deploy correcto", "Asigna un dueño explícito a cada servicio en un catálogo compartido"] },
  { label: "Escala",          items: ["Haz una lista de lo que los equipos te piden", "Reemplaza los gates por guardrails", "Mide el NPS interno de tu plataforma cada trimestre", "Documenta tu golden path con un ejemplo real de principio a fin"] },
  { label: "Visibilidad",     items: ["Calcula tus 4 métricas DORA antes de cualquier iniciativa", "Expón métricas a los equipos dependientes", "Tras cada incidente: ¿qué lo haría imposible?", "Define SLOs para tus servicios críticos y compártelos con los equipos dependientes"] },
];

async function main() {
  fs.mkdirSync(DIST_DIR, { recursive: true });

  const pres = new pptxgen();
  pres.defineLayout({ name: "A4_PORTRAIT", width: 8.27, height: 11.69 });
  pres.layout = "A4_PORTRAIT";
  pres.author = "Jonathan Ramírez";
  pres.title  = "Tu plan de acción — De Cero a Producción";

  const s = pres.addSlide();
  s.background = { color: BG_LIGHT };

  // ── Top accent bar ─────────────────────────────────────────────
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 8.27, h: 0.08,
    fill: { color: ORANGE }, line: { color: ORANGE }
  });

  // ── Title ──────────────────────────────────────────────────────
  s.addText("Tu plan de acción", {
    x: 0.5, y: 0.22, w: 7.27, h: 0.65,
    fontSize: 30, color: CHARCOAL, bold: true, fontFace: "Arial Black", margin: 0
  });

  // ── Subtitle ───────────────────────────────────────────────────
  s.addText("De Cero a Producción — Platform Engineering  ·  Jonathan Ramírez", {
    x: 0.5, y: 0.91, w: 7.27, h: 0.3,
    fontSize: 11, color: GRAY_MID, italic: true, fontFace: "Arial", margin: 0
  });

  // ── Divider ────────────────────────────────────────────────────
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.29, w: 7.27, h: 0.03,
    fill: { color: GRAY_LIGHT }, line: { color: GRAY_LIGHT }
  });

  // ── 2×2 card grid ──────────────────────────────────────────────
  const CARD_W = 3.54;
  const CARD_H = 4.5;
  const LEFT   = 0.5;
  const GAP_H  = 0.23;
  const TOP    = 1.45;
  const GAP_V  = 0.4;

  SECTIONS.forEach((sec, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = LEFT + col * (CARD_W + GAP_H);
    const y = TOP  + row * (CARD_H + GAP_V);

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: CARD_W, h: CARD_H,
      fill: { color: WHITE }, line: { color: GRAY_LIGHT, width: 1 },
      shadow: { type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.07 }
    });

    s.addImage({ data: gradOrange, x, y, w: CARD_W, h: 0.5 });
    s.addText(sec.label, {
      x: x + 0.14, y, w: CARD_W - 0.28, h: 0.5,
      fontSize: 14, color: WHITE, bold: true, fontFace: "Arial Black",
      valign: "middle", margin: 0
    });

    s.addText(sec.items.map((item, j) => ({
      text: "☐  " + item,
      options: { breakLine: j < sec.items.length - 1 }
    })), {
      x: x + 0.18, y: y + 0.55, w: CARD_W - 0.36, h: CARD_H - 0.65,
      fontSize: 13.5, color: GRAY_DARK, fontFace: "Arial",
      paraSpaceAfter: 20, valign: "middle", margin: 0
    });
  });

  // ── Footer ─────────────────────────────────────────────────────
  const footerY = 11.05;

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: footerY, w: 7.27, h: 0.03,
    fill: { color: GRAY_LIGHT }, line: { color: GRAY_LIGHT }
  });
  s.addText([
    { text: "Jonathan Ramírez", options: { bold: true, color: GRAY_MID } },
    { text: "  ·  N-iX  ·  DevOpsDays Medellín 2026  ·  linkedin.com/in/jonathanstrf", options: { color: GRAY_MID } }
  ], {
    x: 0.5, y: footerY + 0.1, w: 7.27, h: 0.3,
    fontSize: 10, fontFace: "Arial", align: "center", margin: 0
  });

  const outFile = path.join(DIST_DIR, "PE_Talk_JonathanRamirez_flyer.pptx");
  await pres.writeFile({ fileName: outFile });
  console.log("Built: dist/PE_Talk_JonathanRamirez_flyer.pptx");
}

main().catch(console.error);
