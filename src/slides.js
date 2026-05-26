const pptxgen = require("pptxgenjs");
const fs   = require("fs");
const path = require("path");

const ASSETS_DIR = path.join(__dirname, '..', 'assets');
const DIST_DIR   = path.join(__dirname, '..', 'dist');

const ORANGE      = "E8560A";
const ORANGE_MID  = "C94D08";
const ORANGE_LIGHT= "FDE8DA";
const CHARCOAL    = "2D2D2D";
const GRAY_DARK   = "4A4A4A";
const GRAY_MID    = "8A8A8A";
const GRAY_LIGHT  = "E2E2E2";
const GRAY_CARD   = "F4F4F4";
const WHITE       = "FFFFFF";
const BG_LIGHT    = "FAFAFA";

const gradOrange  = "image/png;base64," + fs.readFileSync(path.join(ASSETS_DIR, 'gradient_orange.png')).toString("base64");
const gradRed     = "image/png;base64," + fs.readFileSync(path.join(ASSETS_DIR, 'grad_red.png')).toString("base64");
const gradGreen   = "image/png;base64," + fs.readFileSync(path.join(ASSETS_DIR, 'grad_green.png')).toString("base64");
const gradvRed    = "image/png;base64," + fs.readFileSync(path.join(ASSETS_DIR, 'gradv_red.png')).toString("base64");
const gradvGreen  = "image/png;base64," + fs.readFileSync(path.join(ASSETS_DIR, 'gradv_green.png')).toString("base64");
const iconLaptop  = "image/png;base64," + fs.readFileSync(path.join(ASSETS_DIR, 'icon_laptop.png')).toString("base64");
const iconServer  = "image/png;base64," + fs.readFileSync(path.join(ASSETS_DIR, 'icon_server.png')).toString("base64");
const iconTeam    = "image/png;base64," + fs.readFileSync(path.join(ASSETS_DIR, 'icon_team.png')).toString("base64");
const iconEye     = "image/png;base64," + fs.readFileSync(path.join(ASSETS_DIR, 'icon_eye.png')).toString("base64");
const qrPA        = "image/jpeg;base64," + fs.readFileSync(path.join(ASSETS_DIR, 'QR_PA.jpeg')).toString("base64");

async function main() {
  fs.mkdirSync(DIST_DIR, { recursive: true });

  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Jonathan Ramírez";
  pres.title = "De Cero a Producción — Platform Engineering";

  // ── SLIDE 1: PORTADA ────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    s.addImage({ data: gradOrange, x: 0, y: 0, w: 0.22, h: 5.625 });
    s.addText("N-iX", {
      x: 8.5, y: 0.3, w: 1.2, h: 0.35,
      fontSize: 13, color: ORANGE, bold: true, align: "right",
      fontFace: "Arial Black", margin: 0
    });
    s.addText("De Cero a Producción", {
      x: 0.6, y: 0.85, w: 9.1, h: 1.15,
      fontSize: 44, color: CHARCOAL, bold: true,
      fontFace: "Arial Black", margin: 0
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y: 2.1, w: 8.8, h: 0.04,
      fill: { color: GRAY_MID }, line: { color: GRAY_MID }
    });
    s.addText("Un viaje de Platform Engineering a través de equipos reales", {
      x: 0.6, y: 2.25, w: 9.1, h: 0.55,
      fontSize: 18, color: ORANGE, italic: true,
      fontFace: "Arial", margin: 0
    });
    s.addText([
      { text: "Jonathan Ramírez", options: { bold: true, color: CHARCOAL } },
      { text: "  ·  N-iX", options: { color: GRAY_MID } }
    ], {
      x: 0.6, y: 4.6, w: 9, h: 0.4,
      fontSize: 14, fontFace: "Arial", margin: 0
    });
    s.addText("Track de Platform Engineering", {
      x: 0.6, y: 5.1, w: 4, h: 0.3,
      fontSize: 11, color: ORANGE, fontFace: "Arial", margin: 0
    });
  }

  // ── SLIDE 2: EL HILO ────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06,
      fill: { color: ORANGE }, line: { color: ORANGE }
    });
    s.addText("El hilo conductor", {
      x: 0.5, y: 0.3, w: 9, h: 0.4,
      fontSize: 13, color: ORANGE, bold: true, fontFace: "Arial", margin: 0
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 1.0, w: 8.4, h: 3.2,
      fill: { color: GRAY_CARD }, line: { color: GRAY_LIGHT },
      shadow: { type: "outer", blur: 10, offset: 3, angle: 135, color: "000000", opacity: 0.08 }
    });
    s.addImage({ data: gradOrange, x: 0.8, y: 1.0, w: 0.12, h: 3.2 });
    s.addText("Un desarrollador debería poder pasar de cero a listo para producción sin llamar a nadie.", {
      x: 1.1, y: 1.0, w: 7.8, h: 3.2,
      fontSize: 26, color: CHARCOAL, bold: true, fontFace: "Arial Black",
      align: "center", valign: "middle", margin: 0
    });
    s.addText("Todo lo demás es el camino para llegar ahí.", {
      x: 0.8, y: 4.4, w: 8.4, h: 0.4,
      fontSize: 14, color: GRAY_MID, fontFace: "Arial", align: "center", margin: 0
    });
  }

  // ── SLIDE 3: LOS 4 PROBLEMAS ────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: BG_LIGHT };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06,
      fill: { color: ORANGE }, line: { color: ORANGE }
    });
    s.addText("Los mismos 4 problemas, siempre", {
      x: 0.5, y: 0.25, w: 9, h: 0.45,
      fontSize: 22, color: CHARCOAL, bold: true, fontFace: "Arial Black", margin: 0
    });
    const problems = [
      { n: "1", label: "Entorno local",      desc: "Días configurando.\nFunciona en mi máquina.",              icon: iconLaptop },
      { n: "2", label: "Infraestructura",    desc: "Cada equipo despliega\ndiferente. Deriva total.",          icon: iconServer },
      { n: "3", label: "Escala",             desc: "El equipo de plataforma\nse vuelve el cuello de botella.", icon: iconTeam   },
      { n: "4", label: "Visibilidad",        desc: "Algo falla.\nNadie sabe dónde mirar.",                     icon: iconEye    },
    ];
    problems.forEach((p, i) => {
      const x = 0.3 + i * 2.38;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 0.9, w: 2.1, h: 4.1,
        fill: { color: i % 2 === 0 ? GRAY_CARD : WHITE },
        line: { color: GRAY_LIGHT, width: 1 },
        shadow: { type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.07 }
      });
      s.addImage({ data: gradOrange, x, y: 0.9, w: 2.1, h: 0.1 });
      s.addText(p.n, {
        x, y: 1.0, w: 2.1, h: 0.55,
        fontSize: 26, color: ORANGE, bold: true, fontFace: "Arial Black",
        align: "center", margin: 0
      });
      s.addText(p.label, {
        x, y: 1.55, w: 2.1, h: 0.4,
        fontSize: 13, color: CHARCOAL, bold: true, fontFace: "Arial Black",
        align: "center", margin: 0
      });
      s.addText(p.desc, {
        x: x + 0.1, y: 2.0, w: 1.9, h: 1.2,
        fontSize: 11, color: GRAY_DARK, fontFace: "Arial",
        align: "center", valign: "top", margin: 0
      });
      s.addImage({ data: p.icon, x: x + 0.55, y: 3.3, w: 1.0, h: 1.0 });
    });
    s.addText("\"No son problemas de personas. Son problemas de plataforma.\"", {
      x: 0.5, y: 5.1, w: 9, h: 0.3,
      fontSize: 12, color: ORANGE, italic: true, fontFace: "Arial", align: "center", margin: 0
    });
  }

  // ── SLIDE 4: 5 ACTOS ────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: BG_LIGHT };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06,
      fill: { color: ORANGE }, line: { color: ORANGE }
    });
    s.addText("Un viaje de 5 actos", {
      x: 0.5, y: 0.2, w: 9, h: 0.5,
      fontSize: 22, color: CHARCOAL, bold: true, fontFace: "Arial Black", margin: 0
    });
    const acts = [
      { n: "1", label: "El problema del entorno local"    },
      { n: "2", label: "El problema de la infraestructura" },
      { n: "3", label: "El problema de la escala"          },
      { n: "4", label: "El ciclo de retroalimentación"     },
      { n: "5", label: "Tres cosas"                          },
    ];
    acts.forEach((act, i) => {
      const y = 0.9 + i * 0.82;
      s.addImage({ data: gradOrange, x: 0.4, y, w: 0.55, h: 0.55 });
      s.addText(act.n, {
        x: 0.4, y, w: 0.55, h: 0.55,
        fontSize: 18, color: WHITE, bold: true, fontFace: "Arial Black",
        align: "center", valign: "middle", margin: 0
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 1.05, y, w: 8.55, h: 0.55,
        fill: { color: i === 0 ? ORANGE_LIGHT : GRAY_CARD },
        line: { color: GRAY_LIGHT }
      });
      s.addText(act.label, {
        x: 1.2, y: y + 0.05, w: 8.2, h: 0.45,
        fontSize: 14, color: CHARCOAL, bold: true, fontFace: "Arial Black",
        valign: "middle", margin: 0
      });
    });
    s.addText("\"Un desarrollador debería poder pasar de cero a listo para producción sin llamar a nadie.\"", {
      x: 0.5, y: 5.1, w: 9, h: 0.3,
      fontSize: 12, color: ORANGE, italic: true, fontFace: "Arial", align: "center", margin: 0
    });
  }

  // ── SLIDE 5: ACTO 1 ─────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06,
      fill: { color: ORANGE }, line: { color: ORANGE }
    });
    s.addText([
      { text: "Acto 1  ", options: { color: ORANGE, bold: true } },
      { text: "El problema del entorno local", options: { color: CHARCOAL } }
    ], { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 20, fontFace: "Arial Black", margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.4, y: 0.95, w: 4.1, h: 3.6,
      fill: { color: "FEF2F2" }, line: { color: "FCA5A5", width: 1 }
    });
    s.addImage({ data: gradvRed, x: 0.4, y: 0.95, w: 4.1, h: 0.5 });
    s.addText("✗  Antes", {
      x: 0.4, y: 0.95, w: 4.1, h: 0.5,
      fontSize: 15, color: WHITE, bold: true, fontFace: "Arial Black",
      align: "center", valign: "middle", margin: 0
    });
    s.addText([
      { text: "Node 24 en local",           options: { bullet: true, breakLine: true } },
      { text: "Node 18 en el servidor",     options: { bullet: true, breakLine: true } },
      { text: "Sin .tool-versions",         options: { bullet: true, breakLine: true } },
      { text: "Horas de debugging",         options: { bullet: true, breakLine: true } },
      { text: "\"En mi máquina funciona\"", options: { bullet: true } },
    ], { x: 0.6, y: 1.6, w: 3.7, h: 2.6, fontSize: 13, color: GRAY_DARK, fontFace: "Arial", paraSpaceAfter: 6 });

    s.addText("→", { x: 4.6, y: 2.5, w: 0.8, h: 0.5, fontSize: 24, color: ORANGE, align: "center", margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.5, y: 0.95, w: 4.1, h: 3.6,
      fill: { color: "F0FDF4" }, line: { color: "86EFAC", width: 1 }
    });
    s.addImage({ data: gradvGreen, x: 5.5, y: 0.95, w: 4.1, h: 0.5 });
    s.addText("✓  Después", {
      x: 5.5, y: 0.95, w: 4.1, h: 0.5,
      fontSize: 15, color: WHITE, bold: true, fontFace: "Arial Black",
      align: "center", valign: "middle", margin: 0
    });
    s.addText([
      { text: ".tool-versions en el repo",    options: { bullet: true, breakLine: true } },
      { text: "asdf / mise para todos",       options: { bullet: true, breakLine: true } },
      { text: "Local = CI = Staging",         options: { bullet: true, breakLine: true } },
      { text: "Onboarding en minutos",        options: { bullet: true, breakLine: true } },
      { text: "Resuelto una vez, para todos", options: { bullet: true } },
    ], { x: 5.7, y: 1.6, w: 3.7, h: 2.6, fontSize: 13, color: GRAY_DARK, fontFace: "Arial", paraSpaceAfter: 6 });

    s.addText("\"Horas para descubrir que el problema era un número.\"", {
      x: 0.5, y: 5.1, w: 9, h: 0.3,
      fontSize: 12, color: ORANGE, italic: true, fontFace: "Arial", align: "center", margin: 0
    });
  }

  // ── SLIDE 6: ACTO 2 ─────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: BG_LIGHT };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06,
      fill: { color: ORANGE }, line: { color: ORANGE }
    });
    s.addText([
      { text: "Acto 2  ", options: { color: ORANGE, bold: true } },
      { text: "El problema de la infraestructura", options: { color: CHARCOAL } }
    ], { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 20, fontFace: "Arial Black", margin: 0 });

    const cols = [
      { title: "Sin estándar",     hdrColor: "DC2626", bg: "FEF2F2", border: "FCA5A5",
        items: ["Bash script", "GitHub Action a medias", "Deploy manual", "\"¿Funciona en prod?\""] },
      { title: "IaC como contrato", useGrad: true, bg: ORANGE_LIGHT, border: ORANGE,
        items: ["Módulos versionados", "Revisión compartida", "Definición de \"correcto\"", "Drift visible"] },
      { title: "Golden Path",      hdrColor: "16A34A", bg: "F0FDF4", border: "86EFAC",
        items: ["Self-service", "Defaults seguros", "Equipos autónomos", "Invitación, no mandato"] },
    ];
    cols.forEach((col, i) => {
      const x = 0.35 + i * 3.15;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 0.9, w: 2.95, h: 3.8,
        fill: { color: col.bg }, line: { color: col.border, width: 1 }
      });
      if (col.useGrad) {
        s.addImage({ data: gradOrange, x, y: 0.9, w: 2.95, h: 0.55 });
      } else {
        s.addImage({ data: col.title === "Sin estándar" ? gradvRed : gradvGreen, x, y: 0.9, w: 2.95, h: 0.55 });
      }
      s.addText(col.title, {
        x, y: 0.9, w: 2.95, h: 0.55,
        fontSize: 13, color: WHITE, bold: true, fontFace: "Arial Black",
        align: "center", valign: "middle", margin: 0
      });
      s.addText(col.items.map((item, j) => ({
        text: item, options: { bullet: true, breakLine: j < col.items.length - 1 }
      })), {
        x: x + 0.15, y: 1.6, w: 2.65, h: 2.8,
        fontSize: 12, color: GRAY_DARK, fontFace: "Arial", paraSpaceAfter: 8
      });
    });
    s.addText("\"Nadie había escrito qué significaba 'listo para producción'\"", {
      x: 0.5, y: 5.1, w: 9, h: 0.3,
      fontSize: 12, color: ORANGE, italic: true, fontFace: "Arial", align: "center", margin: 0
    });
  }

  // ── SLIDE 7: ACTO 3 ─────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06,
      fill: { color: ORANGE }, line: { color: ORANGE }
    });
    s.addText([
      { text: "Acto 3  ", options: { color: ORANGE, bold: true } },
      { text: "El problema de la escala", options: { color: CHARCOAL } }
    ], { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 20, fontFace: "Arial Black", margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.4, y: 0.9, w: 4.1, h: 3.5,
      fill: { color: "FEF2F2" }, line: { color: "FCA5A5", width: 1 }
    });
    s.addImage({ data: gradvRed, x: 0.4, y: 0.9, w: 4.1, h: 0.5 });
    s.addText("✗  Gate", {
      x: 0.4, y: 0.9, w: 4.1, h: 0.5,
      fontSize: 16, color: WHITE, bold: true, fontFace: "Arial Black",
      align: "center", valign: "middle", margin: 0
    });
    s.addText([
      { text: "Para. Pide permiso. Espera.",    options: { bullet: true, breakLine: true } },
      { text: "Equipos bloqueados días",        options: { bullet: true, breakLine: true } },
      { text: "Tu DM = cola de tickets",        options: { bullet: true, breakLine: true } },
      { text: "Plataforma = cuello de botella", options: { bullet: true } },
    ], { x: 0.6, y: 1.55, w: 3.7, h: 2.5, fontSize: 13, color: GRAY_DARK, fontFace: "Arial", paraSpaceAfter: 8 });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.5, y: 0.9, w: 4.1, h: 3.5,
      fill: { color: "F0FDF4" }, line: { color: "86EFAC", width: 1 }
    });
    s.addImage({ data: gradvGreen, x: 5.5, y: 0.9, w: 4.1, h: 0.5 });
    s.addText("✓  Guardrail", {
      x: 5.5, y: 0.9, w: 4.1, h: 0.5,
      fontSize: 16, color: WHITE, bold: true, fontFace: "Arial Black",
      align: "center", valign: "middle", margin: 0
    });
    s.addText([
      { text: "Avanza — estos son tus límites",    options: { bullet: true, breakLine: true } },
      { text: "Self-service con defaults seguros", options: { bullet: true, breakLine: true } },
      { text: "Policy-as-code en deploy time",     options: { bullet: true, breakLine: true } },
      { text: "Plataforma como producto",          options: { bullet: true } },
    ], { x: 5.7, y: 1.55, w: 3.7, h: 2.5, fontSize: 13, color: GRAY_DARK, fontFace: "Arial", paraSpaceAfter: 8 });

    s.addText("\"Completamente manual. Completamente evitable.\"", {
      x: 0.5, y: 5.1, w: 9, h: 0.3,
      fontSize: 12, color: ORANGE, italic: true, fontFace: "Arial", align: "center", margin: 0
    });
  }

  // ── SLIDE 8: ACTO 4 ─────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: BG_LIGHT };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06,
      fill: { color: ORANGE }, line: { color: ORANGE }
    });
    s.addText([
      { text: "Acto 4  ", options: { color: ORANGE, bold: true } },
      { text: "El ciclo de retroalimentación", options: { color: CHARCOAL } }
    ], { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 20, fontFace: "Arial Black", margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 0.88, w: 9, h: 0.78,
      fill: { color: GRAY_CARD }, line: { color: GRAY_LIGHT }
    });
    s.addImage({ data: gradOrange, x: 0.5, y: 0.88, w: 0.12, h: 0.78 });
    s.addText("\"Una plataforma sin visibilidad no es una plataforma. Es una caja negra con buena documentación.\"", {
      x: 0.75, y: 0.88, w: 8.5, h: 0.78,
      fontSize: 13, color: CHARCOAL, fontFace: "Arial", italic: true,
      valign: "middle", margin: 0
    });

    const pillars = [
      { title: "Visibilidad",          desc: "Métricas para los equipos que dependen de ti, no solo para ti." },
      { title: "Runbooks como código", desc: "El conocimiento de las personas convertido en remediación automatizada." },
      { title: "Cerrar el ciclo",      desc: "Incidente → corrección en la plataforma → nunca más." },
    ];
    pillars.forEach((p, i) => {
      const x = 0.3 + i * 3.18;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 1.85, w: 2.98, h: 2.5,
        fill: { color: i % 2 === 0 ? GRAY_CARD : WHITE },
        line: { color: GRAY_LIGHT, width: 1 },
        shadow: { type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.07 }
      });
      s.addImage({ data: gradOrange, x, y: 1.85, w: 2.98, h: 0.1 });
      s.addText(p.title, {
        x: x + 0.1, y: 2.02, w: 2.78, h: 0.55,
        fontSize: 13, color: CHARCOAL, bold: true, fontFace: "Arial Black",
        align: "center", margin: 0
      });
      s.addText(p.desc, {
        x: x + 0.1, y: 2.65, w: 2.78, h: 1.65,
        fontSize: 12, color: GRAY_DARK, fontFace: "Arial",
        align: "center", valign: "top", margin: 0
      });
    });

    s.addText("\"Lo aprendimos a las malas.\"", {
      x: 0.5, y: 5.1, w: 9, h: 0.3,
      fontSize: 12, color: ORANGE, italic: true, fontFace: "Arial", align: "center", margin: 0
    });
  }

  // ── SLIDE 9: ACTO 5 ─────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06,
      fill: { color: ORANGE }, line: { color: ORANGE }
    });
    s.addText([
      { text: "Acto 5  ", options: { color: ORANGE, bold: true } },
      { text: "Tres cosas", options: { color: CHARCOAL } }
    ], { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 20, fontFace: "Arial Black", margin: 0 });

    const lessons = [
      { n: "1", title: "Empieza por la experiencia del desarrollador",
        desc: "Si tarda más de 1 hora en correr la app, tu plataforma tiene un bug. Mídelo." },
      { n: "2", title: "La adopción es una feature",
        desc: "No optimices para tu equipo — optimiza para la velocidad de los equipos de producto." },
      { n: "3", title: "Tu plataforma nunca está terminada",
        desc: "Tiene usuarios. Los usuarios tienen problemas. Trátala como un producto. Elige siempre el guardrail." },
    ];
    lessons.forEach((l, i) => {
      const y = 0.9 + i * 1.5;
      s.addImage({ data: gradOrange, x: 0.4, y, w: 0.7, h: 1.2 });
      s.addText(l.n, {
        x: 0.4, y, w: 0.7, h: 1.2,
        fontSize: 30, color: WHITE, bold: true, fontFace: "Arial Black",
        align: "center", valign: "middle", margin: 0
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 1.2, y, w: 8.4, h: 1.2,
        fill: { color: GRAY_CARD }, line: { color: GRAY_LIGHT, width: 1 }
      });
      s.addText(l.title, {
        x: 1.35, y: y + 0.1, w: 8.1, h: 0.4,
        fontSize: 14, color: CHARCOAL, bold: true, fontFace: "Arial Black", margin: 0
      });
      s.addText(l.desc, {
        x: 1.35, y: y + 0.55, w: 8.1, h: 0.5,
        fontSize: 12, color: GRAY_DARK, fontFace: "Arial", margin: 0
      });
    });
  }

  // ── SLIDE 10: CHECKLIST ─────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: BG_LIGHT };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06,
      fill: { color: ORANGE }, line: { color: ORANGE }
    });
    s.addText("Tu plan de acción", {
      x: 0.5, y: 0.2, w: 9, h: 0.45,
      fontSize: 22, color: CHARCOAL, bold: true, fontFace: "Arial Black", margin: 0
    });
    const sections = [
      { label: "Entornos",       items: ["Agrega .tool-versions a cada repositorio", "Estandariza el gestor de versiones", "Mide el tiempo de onboarding ahora", "Automatiza el setup del entorno con un solo comando"] },
      { label: "Infraestructura",items: ["Audita cómo despliega cada equipo", "Crea un módulo de IaC compartido", "Define qué es un deploy correcto", "Asigna un dueño explícito a cada servicio en un catálogo compartido"] },
      { label: "Escala",         items: ["Haz una lista de lo que los equipos te piden", "Reemplaza los gates por guardrails", "Mide el NPS interno de tu plataforma cada trimestre", "Documenta tu golden path con un ejemplo real de principio a fin"] },
      { label: "Visibilidad",    items: ["Calcula tus 4 métricas DORA antes de cualquier iniciativa", "Expón métricas a los equipos dependientes", "Tras cada incidente: ¿qué lo haría imposible?", "Define SLOs para tus servicios críticos y compártelos con los equipos dependientes"] },
    ];
    sections.forEach((sec, i) => {
      const col=i%2, row=Math.floor(i/2);
      const x=0.4+col*4.85, y=0.85+row*2.05;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y, w: 4.55, h: 1.9,
        fill: { color: WHITE }, line: { color: GRAY_LIGHT, width: 1 },
        shadow: { type: "outer", blur: 5, offset: 2, angle: 135, color: "000000", opacity: 0.06 }
      });
      s.addImage({ data: gradOrange, x, y, w: 4.55, h: 0.38 });
      s.addText(sec.label, {
        x: x+0.12, y, w: 4.3, h: 0.38,
        fontSize: 13, color: WHITE, bold: true, fontFace: "Arial Black",
        valign: "middle", margin: 0
      });
      s.addText(sec.items.map((item, j) => ({
        text: "☐  " + item, options: { breakLine: j < sec.items.length - 1 }
      })), {
        x: x+0.15, y: y+0.46, w: 4.25, h: 1.36,
        fontSize: 10, color: GRAY_DARK, fontFace: "Arial", paraSpaceAfter: 4, margin: 0
      });
    });

    // QR code — links to the printable flyer
    s.addText("Descarga el flyer →", {
      x: 6.1, y: 5.1, w: 2.4, h: 0.25,
      fontSize: 9, color: GRAY_MID, fontFace: "Arial", align: "right", italic: true, margin: 0
    });
    s.addImage({ data: qrPA, x: 8.6, y: 4.83, w: 0.75, h: 0.75 });
  }

  // ── SLIDE 11: CIERRE ────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    s.addImage({ data: gradOrange, x: 0, y: 0, w: 0.22, h: 5.625 });
    s.addText("Un desarrollador debería poder pasar de cero a listo para producción sin llamar a nadie.", {
      x: 0.6, y: 1.2, w: 9, h: 2.8,
      fontSize: 32, color: ORANGE, bold: true, fontFace: "Arial Black",
      align: "center", valign: "middle", margin: 0
    });
    s.addText("Espacio abierto para debate y lo que quieran traer a la mesa.", {
      x: 0.6, y: 4.35, w: 9, h: 0.4,
      fontSize: 13, color: GRAY_MID, italic: true, fontFace: "Arial",
      align: "center", margin: 0
    });
    s.addText([
      { text: "Jonathan Ramírez", options: { bold: true, color: GRAY_MID } },
      { text: "  ·  N-iX",        options: { color: GRAY_MID } }
    ], { x: 0.6, y: 5.1, w: 9, h: 0.3, fontSize: 12, fontFace: "Arial", align: "center", margin: 0 });
  }

  await pres.writeFile({ fileName: path.join(DIST_DIR, 'PE_Talk_JonathanRamirez_v28.pptx') });
  console.log("Built: dist/PE_Talk_JonathanRamirez_v28.pptx");
}

main().catch(console.error);
