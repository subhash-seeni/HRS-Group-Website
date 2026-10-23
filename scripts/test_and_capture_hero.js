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
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,1080'],
  });

  const page = await browser.newPage();

  // Test 1: Responsiveness & Overflow/Overlap checks at 360, 768, 1024, 1440, 1920
  console.log('\n--- Running Viewport Overflow & Overlap Diagnostics ---');
  const widths = [360, 768, 1024, 1440, 1920];
  const heights = [680, 1024, 768, 900, 1080];

  for (let i = 0; i < widths.length; i++) {
    const w = widths[i];
    const h = heights[i];
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });

    // Mark intro seen
    await page.evaluate(() => {
      sessionStorage.setItem('hrs_page_intro_seen', 'true');
      const intro = document.getElementById('hrs-page-intro');
      if (intro) intro.remove();
    });

    const metrics = await page.evaluate(() => {
      const header = document.querySelector('header');
      const hero = document.getElementById('hero');
      const headline = hero ? hero.querySelector('div.relative.select-none') : null;
      const ctas = hero ? hero.querySelector('.mt-8.flex') : null;

      const headerRect = header ? header.getBoundingClientRect() : null;
      const heroRect = hero ? hero.getBoundingClientRect() : null;
      const headlineRect = headline ? headline.getBoundingClientRect() : null;
      const ctasRect = ctas ? ctas.getBoundingClientRect() : null;

      return {
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
        headerBottom: headerRect ? headerRect.bottom : 0,
        headlineTop: headlineRect ? headlineRect.top : 0,
        headlineBottom: headlineRect ? headlineRect.bottom : 0,
        ctasBottom: ctasRect ? ctasRect.bottom : 0,
        heroHeight: heroRect ? heroRect.height : 0,
        scrollWidth: document.documentElement.scrollWidth,
      };
    });

    const hasHorizontalOverflow = metrics.scrollWidth > metrics.windowWidth;
    const overlapsHeader = metrics.headlineTop < metrics.headerBottom;
    const overflowsViewport = metrics.ctasBottom > metrics.windowHeight;

    console.log(
      `Width ${w}x${h}: HeaderBottom=${metrics.headerBottom}px, HeadlineTop=${metrics.headlineTop}px (Overlap? ${overlapsHeader}), CTABottom=${metrics.ctasBottom}px vs Viewport=${metrics.windowHeight}px (Overflow? ${overflowsViewport}), HorizOverflow? ${hasHorizontalOverflow}`
    );
  }

  // Test 2: Capture 7 Desktop Hero States at 1440x900
  console.log('\n--- Capturing 7 Hero States at 1440x900 ---');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });

  await page.evaluate(() => {
    sessionStorage.setItem('hrs_page_intro_seen', 'true');
    const intro = document.getElementById('hrs-page-intro');
    if (intro) intro.remove();
  });
  await new Promise((r) => setTimeout(r, 600));

  // Hover to pause auto-advancing timer during screenshot captures
  await page.hover('#hero');
  await new Promise((r) => setTimeout(r, 400));

  const slides = ['facades', 'homes', 'masalas', 'brands', 'stays', 'skills', 'retail'];

  for (let idx = 0; idx < slides.length; idx++) {
    const word = slides[idx];
    console.log(`Setting Hero state to [${idx}] ${word}...`);

    await page.evaluate((targetIdx) => {
      window.scrollTo(0, 0);
      if (typeof window.__setHeroSlide === 'function') {
        window.__setHeroSlide(targetIdx);
      }
    }, idx);

    // Wait for the 700ms transition to complete smoothly
    await new Promise((r) => setTimeout(r, 850));

    const filename = `hero_0${idx + 1}_${word}.png`;
    await page.screenshot({ path: path.join(ARTIFACT_DIR, filename) });
    await page.screenshot({ path: path.join(DOCS_DIR, filename) });
    console.log(`Saved screenshot: ${filename}`);
  }

  // Test 3: Businesses Mega-Panel on Desktop
  console.log('\n--- Capturing Businesses Mega-Panel ---');
  await page.click('button[aria-controls="businesses-mega-panel"]');
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'hero_desktop_mega_panel.png') });
  await page.screenshot({ path: path.join(DOCS_DIR, 'hero_desktop_mega_panel.png') });
  console.log('Saved screenshot: hero_desktop_mega_panel.png');

  // Close mega panel
  await page.click('button[aria-controls="businesses-mega-panel"]');
  await new Promise((r) => setTimeout(r, 400));

  // Test 4: Mobile Menu at 360x740
  console.log('\n--- Capturing Mobile Menu at 360x740 ---');
  await page.setViewport({ width: 360, height: 740, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    sessionStorage.setItem('hrs_page_intro_seen', 'true');
    const intro = document.getElementById('hrs-page-intro');
    if (intro) intro.remove();
  });
  await new Promise((r) => setTimeout(r, 500));

  // Click mobile hamburger menu
  console.log('Clicking mobile toggle button...');
  await page.click('button[aria-controls="mobile-navigation"]');
  await new Promise((r) => setTimeout(r, 600));

  // Expand Businesses accordion in mobile menu
  await page.evaluate(() => {
    const accBtn = document.querySelector('#mobile-navigation button');
    if (accBtn) accBtn.click();
  });
  await new Promise((r) => setTimeout(r, 600));

  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'hero_mobile_menu.png') });
  await page.screenshot({ path: path.join(DOCS_DIR, 'hero_mobile_menu.png') });
  console.log('Saved screenshot: hero_mobile_menu.png');

  // Test 5: Scrolled Header state (past hero over surface="paper")
  console.log('\n--- Capturing Scrolled Header State over Paper Surface ---');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    sessionStorage.setItem('hrs_page_intro_seen', 'true');
    window.scrollTo({ top: 1200, behavior: 'instant' });
    window.scrollBy({ top: -60, behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'hero_scrolled_header_paper.png') });
  await page.screenshot({ path: path.join(DOCS_DIR, 'hero_scrolled_header_paper.png') });
  console.log('Saved screenshot: hero_scrolled_header_paper.png');

  await browser.close();
  console.log('\nAll diagnostics and screenshots completed successfully!');
}

run().catch((err) => {
  console.error('Error running test script:', err);
  process.exit(1);
});
