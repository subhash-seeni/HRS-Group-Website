const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/SUBHASH/.gemini/antigravity-ide/brain/097dae4c-6250-44af-9296-b3accf8f61a0';
const DOCS_DIR = path.join(__dirname, '../docs/screenshots');

fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
fs.mkdirSync(DOCS_DIR, { recursive: true });

async function run() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const execPath = fs.existsSync(chromePath) ? chromePath : edgePath;

  console.log('Using browser:', execPath);

  const browser = await puppeteer.launch({
    executablePath: execPath,
    headless: true,
    protocolTimeout: 0,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,1080'],
  });

  const page = await browser.newPage();

  // Test 1: Responsiveness check at 360, 768, 1024, 1440, 1920
  console.log('\n--- Running Viewport Diagnostics on BOGO Section ---');
  const widths = [360, 768, 1024, 1440, 1920];
  const heights = [680, 1024, 768, 900, 1080];

  for (let i = 0; i < widths.length; i++) {
    const w = widths[i];
    const h = heights[i];
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });

    await page.evaluate(() => {
      sessionStorage.setItem('hrs_page_intro_seen', 'true');
      const intro = document.getElementById('hrs-page-intro');
      if (intro) intro.remove();
    });

    const metrics = await page.evaluate(() => {
      const bogo = document.getElementById('bogo');
      const rect = bogo ? bogo.getBoundingClientRect() : null;
      return {
        windowWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        bogoHeight: rect ? rect.height : 0,
      };
    });

    const hasHorizontalOverflow = metrics.scrollWidth > metrics.windowWidth;
    console.log(`Width ${w}x${h}: BogoHeight=${metrics.bogoHeight}px, HorizOverflow? ${hasHorizontalOverflow}`);
  }

  // Test 2: Capture BOGO Hero Opening at 1440x900
  console.log('\n--- Capturing BOGO Hero Opening ---');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.25 });
  await page.goto('http://localhost:3000/#bogo', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    sessionStorage.setItem('hrs_page_intro_seen', 'true');
    const intro = document.getElementById('hrs-page-intro');
    if (intro) intro.remove();
    const bogoHero = document.getElementById('bogo');
    if (bogoHero) bogoHero.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 600));

  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'bogo_01_hero.png') });
  await page.screenshot({ path: path.join(DOCS_DIR, 'bogo_01_hero.png') });
  console.log('Saved: bogo_01_hero.png');

  // Test 3: Capture all 11 States of the BOGO Square Explorer
  console.log('\n--- Capturing 11 States of BOGO Explorer ---');
  const explorerBrands = [
    'essentials',
    'daily',
    'farms',
    'superfoods',
    'health',
    'beauty',
    'luxe',
    'divine',
    'paws',
    'play',
    'classroom',
  ];

  await page.evaluate(() => {
    const explorer = document.getElementById('bogo-explorer');
    if (explorer) explorer.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 400));

  for (let idx = 0; idx < explorerBrands.length; idx++) {
    const brandName = explorerBrands[idx];
    console.log(`Setting BOGO Explorer state to [${idx}] ${brandName}...`);

    await page.evaluate((targetIdx) => {
      const explorer = document.getElementById('bogo-explorer');
      if (explorer) explorer.scrollIntoView({ behavior: 'instant', block: 'center' });

      if (typeof window.__setBogoBrand === 'function') {
        window.__setBogoBrand(targetIdx);
      }
    }, idx);

    await new Promise((r) => setTimeout(r, 800));

    const filename = `bogo_explorer_${String(idx + 1).padStart(2, '0')}_${brandName}.png`;
    await page.screenshot({ path: path.join(ARTIFACT_DIR, filename) });
    await page.screenshot({ path: path.join(DOCS_DIR, filename) });
    console.log(`Saved screenshot: ${filename}`);
  }

  // Test 4: Formats & Distribution Section
  console.log('\n--- Capturing Formats & Distribution ---');
  await page.evaluate(() => {
    const formats = document.getElementById('bogo-formats');
    if (formats) formats.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'bogo_02_formats.png') });
  await page.screenshot({ path: path.join(DOCS_DIR, 'bogo_02_formats.png') });
  console.log('Saved: bogo_02_formats.png');

  // Test 5: Companion Cards Fanned State
  console.log('\n--- Capturing Companion Cards Fan ---');
  await page.evaluate(() => {
    const cards = document.getElementById('bogo-cards');
    if (cards) cards.scrollIntoView({ behavior: 'instant', block: 'center' });
    window.scrollBy({ top: 300, behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'bogo_03_card_fan.png') });
  await page.screenshot({ path: path.join(DOCS_DIR, 'bogo_03_card_fan.png') });
  console.log('Saved: bogo_03_card_fan.png');

  // Test 6: Technology Roadmap
  console.log('\n--- Capturing Technology Roadmap ---');
  await page.evaluate(() => {
    const tech = document.getElementById('bogo-roadmap');
    if (tech) tech.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'bogo_04_roadmap.png') });
  await page.screenshot({ path: path.join(DOCS_DIR, 'bogo_04_roadmap.png') });
  console.log('Saved: bogo_04_roadmap.png');

  // Test 7: BOGO Close
  console.log('\n--- Capturing BOGO Close Section ---');
  await page.evaluate(() => {
    const close = document.getElementById('bogo-close');
    if (close) close.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'bogo_05_close.png') });
  await page.screenshot({ path: path.join(DOCS_DIR, 'bogo_05_close.png') });
  console.log('Saved: bogo_05_close.png');

  // Test 8: Mobile View at 360x740
  console.log('\n--- Capturing Mobile BOGO Explorer & Formats ---');
  await page.setViewport({ width: 360, height: 740, deviceScaleFactor: 1.25 });
  await page.goto('http://localhost:3000/#bogo', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    sessionStorage.setItem('hrs_page_intro_seen', 'true');
    const intro = document.getElementById('hrs-page-intro');
    if (intro) intro.remove();
    const explorer = document.getElementById('bogo-explorer');
    if (explorer) explorer.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'bogo_mobile_explorer.png') });
  await page.screenshot({ path: path.join(DOCS_DIR, 'bogo_mobile_explorer.png') });
  console.log('Saved: bogo_mobile_explorer.png');

  await browser.close();
  console.log('\nAll BOGO diagnostics and screenshots completed successfully!');
}

run().catch((err) => {
  console.error('Error running BOGO test script:', err);
  process.exit(1);
});
