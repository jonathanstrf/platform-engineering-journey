const fs   = require("fs");
const path = require("path");
const { PNG } = require("pngjs");

const ASSETS_DIR = path.join(__dirname, '..', 'assets');
fs.mkdirSync(ASSETS_DIR, { recursive: true });

const ORANGE       = [232, 86, 10];
const ORANGE_LIGHT = [253, 232, 218];

// ── PNG buffer helpers ────────────────────────────────────────

function newPNG(w, h) {
  const p = new PNG({ width: w, height: h });
  p.data = Buffer.alloc(w * h * 4, 0);
  return p;
}

function hexToArr(c) {
  return [parseInt(c.slice(0,2),16), parseInt(c.slice(2,4),16), parseInt(c.slice(4,6),16)];
}

function setPixel(data, W, H, x, y, rgb, a = 255) {
  x = Math.round(x); y = Math.round(y);
  if (x < 0 || x >= W || y < 0 || y >= H) return;
  const i = (y * W + x) * 4;
  const sa = a/255, da = data[i+3]/255;
  const oa = sa + da*(1-sa);
  if (oa === 0) return;
  data[i]   = Math.round((rgb[0]*sa + data[i]  *da*(1-sa)) / oa);
  data[i+1] = Math.round((rgb[1]*sa + data[i+1]*da*(1-sa)) / oa);
  data[i+2] = Math.round((rgb[2]*sa + data[i+2]*da*(1-sa)) / oa);
  data[i+3] = Math.round(oa * 255);
}

function disk(data, W, H, cx, cy, r, rgb) {
  cx = Math.round(cx); cy = Math.round(cy); r = Math.ceil(r);
  for (let dy = -r; dy <= r; dy++)
    for (let dx = -r; dx <= r; dx++)
      if (dx*dx + dy*dy <= r*r)
        setPixel(data, W, H, cx+dx, cy+dy, rgb);
}

// ── Drawing primitives ────────────────────────────────────────

function strokeRect(data, W, H, x0, y0, x1, y1, rgb, lw) {
  const r = lw/2;
  for (let x = x0; x <= x1; x++) { disk(data,W,H,x,y0,r,rgb); disk(data,W,H,x,y1,r,rgb); }
  for (let y = y0; y <= y1; y++) { disk(data,W,H,x0,y,r,rgb); disk(data,W,H,x1,y,r,rgb); }
}

function fillRect(data, W, H, x0, y0, x1, y1, rgb) {
  for (let y = Math.round(y0); y <= Math.round(y1); y++)
    for (let x = Math.round(x0); x <= Math.round(x1); x++)
      setPixel(data, W, H, x, y, rgb);
}

// Angles follow PIL convention: 0=right, 90=bottom, 180=left, 270=top (clockwise)
function strokeArc(data, W, H, cx, cy, rx, ry, aDeg0, aDeg1, rgb, lw) {
  const r = lw/2;
  let a0 = aDeg0 * Math.PI/180;
  let a1 = aDeg1 * Math.PI/180;
  if (a1 <= a0) a1 += 2*Math.PI;
  const steps = Math.ceil(Math.max(rx,ry) * 2 * Math.PI * (a1-a0)/(2*Math.PI)) * 6;
  for (let i = 0; i <= steps; i++) {
    const a = a0 + (a1-a0)*i/steps;
    disk(data, W, H, cx + rx*Math.cos(a), cy + ry*Math.sin(a), r, rgb);
  }
}

function fillEllipse(data, W, H, cx, cy, rx, ry, rgb) {
  for (let y = Math.round(cy-ry); y <= Math.round(cy+ry); y++)
    for (let x = Math.round(cx-rx); x <= Math.round(cx+rx); x++) {
      const dx=(x-cx)/rx, dy=(y-cy)/ry;
      if (dx*dx + dy*dy <= 1) setPixel(data, W, H, x, y, rgb);
    }
}

function fillPolygon(data, W, H, pts, rgb) {
  const minY = Math.round(Math.min(...pts.map(p=>p[1])));
  const maxY = Math.round(Math.max(...pts.map(p=>p[1])));
  for (let y = minY; y <= maxY; y++) {
    const xs = [];
    for (let i = 0; i < pts.length; i++) {
      const [x0,y0] = pts[i], [x1,y1] = pts[(i+1)%pts.length];
      if ((y0 <= y && y1 > y) || (y1 <= y && y0 > y))
        xs.push(x0 + (y-y0)/(y1-y0)*(x1-x0));
    }
    xs.sort((a,b)=>a-b);
    for (let i = 0; i < xs.length-1; i+=2)
      for (let x = Math.round(xs[i]); x <= Math.round(xs[i+1]); x++)
        setPixel(data, W, H, x, y, rgb);
  }
}

// ── Icon draw functions ───────────────────────────────────────

function drawLaptop(d, W, H, s) {
  const lw = s*0.05;
  strokeRect(d, W, H, s*.12, s*.10, s*.88, s*.65, ORANGE, lw);
  fillRect(d, W, H,   s*.19, s*.17, s*.81, s*.58, ORANGE_LIGHT);
  strokeRect(d, W, H, s*.05, s*.68, s*.95, s*.80, ORANGE, lw);
  fillPolygon(d, W, H, [[s*.28,s*.65],[s*.72,s*.65],[s*.78,s*.68],[s*.22,s*.68]], ORANGE);
}

function drawServer(d, W, H, s) {
  const lw = s*0.045;
  for (let i = 0; i < 3; i++) {
    const y0 = s*(0.12 + i*0.27), y1 = y0 + s*0.20;
    strokeRect(d, W, H, s*.08, y0, s*.92, y1, ORANGE, lw);
    const cx = s*0.82, cy = (y0+y1)/2, r = s*0.055;
    fillEllipse(d, W, H, cx, cy, r, r, ORANGE);
  }
}

function drawTeam(d, W, H, s) {
  const lw = s*0.045;
  for (const cxr of [0.22, 0.50, 0.78]) {
    const cx = s*cxr, r = s*0.10;
    strokeArc(d, W, H, cx, s*.08+r, r, r, 0, 360, ORANGE, lw);
    const ax=cx-s*.14, ay=s*.34, aw=cx+s*.14, ah=s*.70;
    strokeArc(d, W, H, (ax+aw)/2, (ay+ah)/2, (aw-ax)/2, (ah-ay)/2, 180, 360, ORANGE, lw);
  }
}

function drawEye(d, W, H, s) {
  const lw = s*0.055;
  const cx=s/2, cy=s/2;
  const rx=(s*.94-s*.06)/2, ry=(s*.78-s*.22)/2;
  strokeArc(d, W, H, cx, cy, rx, ry, 210, 330, ORANGE, lw);
  strokeArc(d, W, H, cx, cy, rx, ry,  30, 150, ORANGE, lw);
  strokeArc(d, W, H, cx, cy, s*0.15, s*0.15, 0, 360, ORANGE, lw);
  fillEllipse(d, W, H, cx, cy, s*0.07, s*0.07, ORANGE);
}

// ── Icon builder ──────────────────────────────────────────────

function makeIcon(file, drawFn, size = 200) {
  const png = newPNG(size, size);
  drawFn(png.data, size, size, size);

  let minX=size, minY=size, maxX=0, maxY=0;
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++)
      if (png.data[(y*size+x)*4+3] > 0) {
        if (x<minX) minX=x; if (x>maxX) maxX=x;
        if (y<minY) minY=y; if (y>maxY) maxY=y;
      }

  if (minX > maxX) {
    fs.writeFileSync(path.join(ASSETS_DIR, file), PNG.sync.write(png));
    return;
  }

  const cw=maxX-minX+1, ch=maxY-minY+1;
  const pad=Math.round(size*0.15), sq=Math.max(cw,ch)+pad*2;
  const ox=Math.round((sq-cw)/2), oy=Math.round((sq-ch)/2);

  const padded = newPNG(sq, sq);
  for (let y = 0; y < ch; y++)
    for (let x = 0; x < cw; x++) {
      const si=((y+minY)*size+(x+minX))*4, di=((y+oy)*sq+(x+ox))*4;
      padded.data[di]=png.data[si]; padded.data[di+1]=png.data[si+1];
      padded.data[di+2]=png.data[si+2]; padded.data[di+3]=png.data[si+3];
    }

  const final = newPNG(size, size);
  const scale = sq/size;
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const sx=x*scale, sy=y*scale;
      const x0=Math.floor(sx), y0=Math.floor(sy);
      const x1=Math.min(x0+1,sq-1), y1=Math.min(y0+1,sq-1);
      const fx=sx-x0, fy=sy-y0, di=(y*size+x)*4;
      for (let c = 0; c < 4; c++) {
        const A=padded.data[(y0*sq+x0)*4+c], B=padded.data[(y0*sq+x1)*4+c];
        const C=padded.data[(y1*sq+x0)*4+c], D=padded.data[(y1*sq+x1)*4+c];
        final.data[di+c]=Math.round(A*(1-fx)*(1-fy)+B*fx*(1-fy)+C*(1-fx)*fy+D*fx*fy);
      }
    }

  fs.writeFileSync(path.join(ASSETS_DIR, file), PNG.sync.write(final));
  console.log(`Created: assets/${file}`);
}

// ── Gradient generators ───────────────────────────────────────

function gradH(file, c1, c2, w=1280, h=720) {
  const png = newPNG(w, h);
  const [r1,g1,b1]=hexToArr(c1), [r2,g2,b2]=hexToArr(c2);
  for (let y=0; y<h; y++)
    for (let x=0; x<w; x++) {
      const t=x/(w-1), i=(y*w+x)*4;
      png.data[i]=Math.round(r1+(r2-r1)*t); png.data[i+1]=Math.round(g1+(g2-g1)*t);
      png.data[i+2]=Math.round(b1+(b2-b1)*t); png.data[i+3]=255;
    }
  fs.writeFileSync(path.join(ASSETS_DIR, file), PNG.sync.write(png));
  console.log(`Created: assets/${file}`);
}

function gradV(file, c1, c2, w=80, h=400) {
  const png = newPNG(w, h);
  const [r1,g1,b1]=hexToArr(c1), [r2,g2,b2]=hexToArr(c2);
  for (let y=0; y<h; y++) {
    const t=y/(h-1);
    for (let x=0; x<w; x++) {
      const i=(y*w+x)*4;
      png.data[i]=Math.round(r1+(r2-r1)*t); png.data[i+1]=Math.round(g1+(g2-g1)*t);
      png.data[i+2]=Math.round(b1+(b2-b1)*t); png.data[i+3]=255;
    }
  }
  fs.writeFileSync(path.join(ASSETS_DIR, file), PNG.sync.write(png));
  console.log(`Created: assets/${file}`);
}

// ── Main ──────────────────────────────────────────────────────

console.log("=== Generating gradients ===");
gradH("gradient_orange.png", "FF7020", "C94D08");
gradV("gradv_red.png",       "B91C1C", "DC2626");
gradV("gradv_green.png",     "1A6B3A", "22A55E");
gradH("grad_red.png",        "9B1C1C", "EF4444", 600, 80);
gradH("grad_green.png",      "14532D", "22C55E", 600, 80);

console.log("\n=== Generating icons ===");
// laptop, team, eye: use originals from src/icons/ (Python-generated, preferred quality)
const ICONS_SRC = path.join(__dirname, 'icons');
for (const icon of ['icon_laptop.png', 'icon_team.png', 'icon_eye.png']) {
  fs.copyFileSync(path.join(ICONS_SRC, icon), path.join(ASSETS_DIR, icon));
  console.log(`Copied:  assets/${icon}`);
}
// server: JS-generated version
makeIcon("icon_server.png", drawServer);

console.log("\nAll assets generated. Run: npm run build");
