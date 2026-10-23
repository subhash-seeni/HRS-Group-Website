const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/SUBHASH/.gemini/antigravity-ide/brain/097dae4c-6250-44af-9296-b3accf8f61a0';
const DOCS_SCREENSHOTS = path.join(__dirname, '../docs/screenshots');

fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
fs.mkdirSync(DOCS_SCREENSHOTS, { recursive: true });

async function capture() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const execPath = fs.existsSync(chromePath) ? chromePath : edgePath;

  console.log('Using browser executable:', execPath);

  const browser = await puppeteer.launch({
    executablePath: execPath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,1080'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1080, deviceScaleFactor: 2 });

  console.log('Navigating to http://localhost:3000/motion-lab/ ...');
  await page.goto('http://localhost:3000/motion-lab/', { waitUntil: 'networkidle0', timeout: 30000 });

  // Ensure styles are fully loaded and PageIntro timer completes
  await new Promise((r) => setTimeout(r, 2200));

  // 1. Hero & SplitLines (Top)
  console.log('Capturing Hero...');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'motion_lab_01_hero.png') });
  await page.screenshot({ path: path.join(DOCS_SCREENSHOTS, 'motion_lab_01_hero.png') });

  // 2. ImageReveal & Concept Renders
  console.log('Capturing ImageReveal...');
  await page.evaluate(() => {
    const el = document.evaluate("//h2[contains(., 'ImageReveal')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    else window.scrollTo({ top: 1400, behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'motion_lab_02_imagereveal.png') });
  await page.screenshot({ path: path.join(DOCS_SCREENSHOTS, 'motion_lab_02_imagereveal.png') });

  // 3. PinScene (GSAP Pinned Scene)
  console.log('Capturing PinScene...');
  await page.evaluate(() => {
    const el = document.getElementById('pinned-scene');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    else window.scrollTo({ top: 2200, behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'motion_lab_03_pinscene.png') });
  await page.screenshot({ path: path.join(DOCS_SCREENSHOTS, 'motion_lab_03_pinscene.png') });

  // 4. MagneticButton & CursorLabel Interactions
  console.log('Capturing MagneticButton & CursorLabel...');
  await page.evaluate(() => {
    const el = document.evaluate("//h2[contains(., 'MagneticButton')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'motion_lab_04_magnetic_cursor.png') });
  await page.screenshot({ path: path.join(DOCS_SCREENSHOTS, 'motion_lab_04_magnetic_cursor.png') });

  // 5. ScrollText & Deliberate Orange Surface Block
  console.log('Capturing ScrollText & Orange surface...');
  await page.evaluate(() => {
    const el = document.evaluate("//h2[contains(., 'Single Deliberate Orange Surface Block')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'motion_lab_05_scrolltext_orange.png') });
  await page.screenshot({ path: path.join(DOCS_SCREENSHOTS, 'motion_lab_05_scrolltext_orange.png') });

  // 6. Logos & Extracted Brand Assets Inventory
  console.log('Capturing Logos Inventory...');
  await page.evaluate(() => {
    const el = document.evaluate("//h2[contains(., 'Extracted Logos & Wordmarks')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'motion_lab_06_logos_inventory.png') });
  await page.screenshot({ path: path.join(DOCS_SCREENSHOTS, 'motion_lab_06_logos_inventory.png') });

  await browser.close();
  console.log('All 6 motion lab screenshots captured successfully!');
}

capture().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
