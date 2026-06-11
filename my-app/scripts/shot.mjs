// Screenshot harness: real Edge via Playwright (no browser download).
// Real wall-clock time => CSS transitions, setTimeout, AND requestAnimationFrame
// all run (unlike Chrome's --virtual-time-budget, which stalls on infinite rAF).
//
// Usage: node scripts/shot.mjs [url] [out] [width] [height] [waitMs] [mouseX,mouseY]
import { chromium } from "playwright-core";

const [
  ,
  ,
  url = "http://localhost:3000",
  out = "shot.png",
  width = "1280",
  height = "1400",
  waitMs = "2200",
  mouse = "", // e.g. "640,560" to park the custom cursor there
] = process.argv;

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({
  viewport: { width: +width, height: +height },
  deviceScaleFactor: 1,
});
await page.goto(url, { waitUntil: "networkidle" });

if (mouse) {
  const [mx, my] = mouse.split(",").map(Number);
  // A couple of steps so velocity-based effects have a direction to react to.
  await page.mouse.move(mx - 60, my - 40);
  await page.mouse.move(mx, my, { steps: 8 });
}

await page.waitForTimeout(+waitMs);
await page.screenshot({ path: out });
await browser.close();
console.log("saved", out, `(${width}x${height})`);
