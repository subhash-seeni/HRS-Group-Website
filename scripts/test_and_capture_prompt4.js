const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = 'C:\\Users\\SUBHASH\\.gemini\\antigravity-ide\\brain\\097dae4c-6250-44af-9296-b3accf8f61a0';
const DOCS_DIR = 'd:\\HRS group\\HRS Group Website\\docs\\screenshots';

const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Users\\SUBHASH\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
];

function getChromePath() {
  for (const p of CHROME_PATHS) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error('Chrome executable not found');
}

async function run() {
  const chromePath = getChromePath();
  console.log('Using browser:', chromePath);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    protocolTimeout: 0,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  // Test 1: Viewport Diagnostics across 360, 768, 1024, 1440, 1920
  const viewports = [
    { width: 360, height: 680, name: '360x680 (Mobile Small)' },
    { width: 768, height: 1024, name: '768x1024 (Tablet Portrait)' },
    { width: 1024, height: 768, name: '1024x768 (Tablet Landscape)' },
    { width: 1440, height: 900, name: '1440x900 (Desktop HD)' },
    { width: 1920, height: 1080, name: '1920x1080 (Desktop FHD)' },
  ];

  console.log('\n--- Viewport Diagnostics on Fresh Homepage ---');
  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      sessionStorage.setItem('hrs_page_intro_seen', 'true');
      const intro = document.getElementById('hrs-page-intro');
      if (intro) intro.remove();
    });

    const metrics = await page.evaluate(() => {
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      const docH = document.documentElement.scrollHeight;
      return {
        docW,
        winW,
        docH,
        overflow: docW > winW,
      };
    });

    console.log(`Viewport ${vp.name}: ScrollWidth=${metrics.docW}px, WindowWidth=${metrics.winW}px, TotalHeight=${metrics.docH}px, HorizOverflow? ${metrics.overflow}`);
  }

  // Set to standard 1440x900 for section captures
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.25 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    sessionStorage.setItem('hrs_page_intro_seen', 'true');
    const intro = document.getElementById('hrs-page-intro');
    if (intro) intro.remove();
  });

  // Capture Section 1: Our Businesses (#businesses)
  console.log('\n--- Capturing Businesses Section ---');
  await page.evaluate(() => {
    const el = document.getElementById('businesses');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'prompt4_01_businesses_desktop.png') });
  await page.screenshot({ path: path.join(DOCS_DIR, 'prompt4_01_businesses_desktop.png') });
  console.log('Saved: prompt4_01_businesses_desktop.png');

  // Capture Section 2: Brand Wall (Hrishikesh Consumer Products)
  console.log('\n--- Capturing Brand Wall ---');
  await page.evaluate(() => {
    const el = document.getElementById('brand-wall');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'prompt4_02_brandwall.png') });
  await page.screenshot({ path: path.join(DOCS_DIR, 'prompt4_02_brandwall.png') });
  console.log('Saved: prompt4_02_brandwall.png');

  // Capture Section 3: The Group, Calmly (#about)
  console.log('\n--- Capturing Calm About Section ---');
  await page.evaluate(() => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'prompt4_03_calm_about.png') });
  await page.screenshot({ path: path.join(DOCS_DIR, 'prompt4_03_calm_about.png') });
  console.log('Saved: prompt4_03_calm_about.png');

  // Capture Section 4: News (#news)
  console.log('\n--- Capturing News Section ---');
  await page.evaluate(() => {
    const el = document.getElementById('news');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'prompt4_04_news.png') });
  await page.screenshot({ path: path.join(DOCS_DIR, 'prompt4_04_news.png') });
  console.log('Saved: prompt4_04_news.png');

  // Capture Section 5: Careers & Contact (#careers-contact)
  console.log('\n--- Capturing Careers and Contact ---');
  await page.evaluate(() => {
    const el = document.getElementById('careers-contact');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'prompt4_05_careers_contact.png') });
  await page.screenshot({ path: path.join(DOCS_DIR, 'prompt4_05_careers_contact.png') });
  console.log('Saved: prompt4_05_careers_contact.png');

  // Capture Section 6: Mobile Businesses Accordion (360x740)
  console.log('\n--- Capturing Mobile Businesses Accordion ---');
  await page.setViewport({ width: 360, height: 740, deviceScaleFactor: 1.25 });
  await page.goto('http://localhost:3000/#businesses', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    sessionStorage.setItem('hrs_page_intro_seen', 'true');
    const intro = document.getElementById('hrs-page-intro');
    if (intro) intro.remove();
    const el = document.getElementById('businesses');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'prompt4_06_businesses_mobile.png') });
  await page.screenshot({ path: path.join(DOCS_DIR, 'prompt4_06_businesses_mobile.png') });
  console.log('Saved: prompt4_06_businesses_mobile.png');

  // Capture Full Page Desktop Screenshot at 1440x900
  console.log('\n--- Capturing Full Page Desktop Screenshot ---');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    sessionStorage.setItem('hrs_page_intro_seen', 'true');
    const intro = document.getElementById('hrs-page-intro');
    if (intro) intro.remove();
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'prompt4_full_page_desktop.png'), fullPage: true });
  await page.screenshot({ path: path.join(DOCS_DIR, 'prompt4_full_page_desktop.png'), fullPage: true });
  console.log('Saved: prompt4_full_page_desktop.png');

  // Capture Full Page Mobile Screenshot at 375x812
  console.log('\n--- Capturing Full Page Mobile Screenshot ---');
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    sessionStorage.setItem('hrs_page_intro_seen', 'true');
    const intro = document.getElementById('hrs-page-intro');
    if (intro) intro.remove();
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'prompt4_full_page_mobile.png'), fullPage: true });
  await page.screenshot({ path: path.join(DOCS_DIR, 'prompt4_full_page_mobile.png'), fullPage: true });
  console.log('Saved: prompt4_full_page_mobile.png');

  await browser.close();
  console.log('\nAll Prompt 4 diagnostics and screenshots completed successfully!');
}

run().catch((err) => {
  console.error('Error running test script:', err);
  process.exit(1);
});
