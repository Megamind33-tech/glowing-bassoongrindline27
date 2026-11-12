import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const mark = await readFile(new URL("../public/branding/grindline-27-mark.svg", import.meta.url));
const brandingDir = new URL("../public/branding/", import.meta.url);

for (const size of [180, 192, 512]) {
  const png = await sharp(mark).resize(size, size).png().toBuffer();
  await writeFile(new URL(`grindline-27-icon-${size}.png`, brandingDir), png);
}

// Keep the native launcher and splash assets aligned with the web/PWA identity.
const androidRes = fileURLToPath(new URL("../android/app/src/main/res/", import.meta.url));
let hasAndroidPlatform = true;
try {
  await access(androidRes);
} catch {
  hasAndroidPlatform = false;
}

if (hasAndroidPlatform) {
  for (const density of [
    { name: "mdpi", icon: 48, adaptive: 108 },
    { name: "hdpi", icon: 72, adaptive: 162 },
    { name: "xhdpi", icon: 96, adaptive: 216 },
    { name: "xxhdpi", icon: 144, adaptive: 324 },
    { name: "xxxhdpi", icon: 192, adaptive: 432 },
  ]) {
    const dir = new URL(`../android/app/src/main/res/mipmap-${density.name}/`, import.meta.url);
    await mkdir(dir, { recursive: true });
    const icon = await sharp(mark).resize(density.icon, density.icon).png().toBuffer();
    await writeFile(new URL("ic_launcher.png", dir), icon);
    await writeFile(new URL("ic_launcher_round.png", dir), icon);
    const adaptiveMark = await sharp(mark).resize(Math.round(density.adaptive * 0.7)).png().toBuffer();
    const foreground = await sharp({
      create: { width: density.adaptive, height: density.adaptive, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
    }).composite([{ input: adaptiveMark, gravity: "centre" }]).png().toBuffer();
    await writeFile(new URL("ic_launcher_foreground.png", dir), foreground);
  }

  for (const group of ["drawable", "drawable-land-mdpi", "drawable-land-hdpi", "drawable-land-xhdpi", "drawable-land-xxhdpi", "drawable-land-xxxhdpi", "drawable-port-mdpi", "drawable-port-hdpi", "drawable-port-xhdpi", "drawable-port-xxhdpi", "drawable-port-xxxhdpi"]) {
    const dir = new URL(`../android/app/src/main/res/${group}/`, import.meta.url);
    await mkdir(dir, { recursive: true });
    let width = 480;
    let height = 800;
    try {
      const existing = await sharp(fileURLToPath(new URL("splash.png", dir))).metadata();
      width = existing.width || width;
      height = existing.height || height;
    } catch {
      // New density/orientation folder; use a conventional Android splash canvas.
    }
    const logoSize = Math.round(Math.min(width, height) * 0.45);
    const splashMark = await sharp(mark).resize(logoSize, logoSize).png().toBuffer();
    const splash = await sharp({
      create: { width, height, channels: 4, background: "#08090d" },
    }).composite([{ input: splashMark, gravity: "centre" }]).flatten({ background: "#08090d" }).png().toBuffer();
    await writeFile(new URL("splash.png", dir), splash);
  }
}

const markData = `data:image/svg+xml;base64,${mark.toString("base64")}`;
const social = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#11141b"/><stop offset="1" stop-color="#08090d"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <path d="M0 500 455 0h115L115 630H0zm1030 130h-95L1200 250v105z" fill="#1c222c"/>
  <path d="M0 526 475 0" stroke="#ccff00" stroke-width="5" opacity=".75"/>
  <image href="${markData}" x="108" y="134" width="248" height="248"/>
  <text x="402" y="258" fill="#f5f7fa" font-family="Arial,sans-serif" font-size="76" font-weight="900" font-style="italic" letter-spacing="-2">GRINDLINE <tspan fill="#ccff00">27</tspan></text>
  <text x="408" y="326" fill="#9aa3b2" font-family="Arial,sans-serif" font-size="23" font-weight="700" letter-spacing="7">ANDROID RACING LEAGUE</text>
  <rect x="408" y="374" width="188" height="7" rx="3.5" fill="#ccff00"/>
  <rect x="604" y="374" width="72" height="7" rx="3.5" fill="#ff2a3c"/>
  <text x="408" y="445" fill="#c5cbd8" font-family="Arial,sans-serif" font-size="25">500 Hz vehicle physics · Touch controls · Offline racing</text>
</svg>`);

const socialJpg = await sharp(social).jpeg({ quality: 92, mozjpeg: true }).toBuffer();
await writeFile(new URL("../src/app/opengraph-image.jpg", import.meta.url), socialJpg);
await writeFile(new URL("../src/app/twitter-image.jpg", import.meta.url), socialJpg);
await writeFile(new URL("../src/app/opengraph-image.alt.txt", import.meta.url), "Grindline 27 Android racing league branding");
await writeFile(new URL("../src/app/twitter-image.alt.txt", import.meta.url), "Grindline 27 Android racing league branding");
