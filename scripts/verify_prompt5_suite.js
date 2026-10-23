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

function saveDual(filename, buffer) {
  const p1 = path.join(ARTIFACT_DIR, filename);
  const p2 = path.join(DOCS_DIR, filename);
  fs.writeFileSync(p1, buffer);
  fs.writeFileSync(p2, buffer);
  console.log(`Saved screenshot: ${filename}`);
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
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
  });

  // 1. Initial Load & Console Errors Check
  console.log('\n--- Test 1: Page Load & Console Errors ---');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1200));

  console.log(`Console errors during initial load: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    consoleErrors.forEach((e) => console.log('  ERROR:', e));
  }

  // 2. Broken Links Check
  console.log('\n--- Test 2: Broken Links Scan ---');
  const links = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a[href]'));
    return anchors.map((a) => ({
      href: a.getAttribute('href'),
      text: a.innerText.trim().slice(0, 30),
    }));
  });
  console.log(`Total links found on homepage: ${links.length}`);
  const brokenLinks = [];
  for (const link of links) {
    if (!link.href) continue;
    if (link.href.startsWith('#')) {
      const targetExists = await page.evaluate((sel) => !!document.querySelector(sel), link.href);
      if (!targetExists) {
        brokenLinks.push(`Internal anchor not found: ${link.href} (${link.text})`);
      }
    }
  }
  console.log(`Broken internal links: ${brokenLinks.length}`);
  if (brokenLinks.length > 0) {
    brokenLinks.forEach((b) => console.log('  BROKEN:', b));
  }

  // 3. Anchor Jumps & Fast Scrolling Stability
  console.log('\n--- Test 3: Anchor Jumps & Scrolling Stability ---');
  const anchorsToTest = ['#bogo', '#businesses', '#about'];
  for (const hash of anchorsToTest) {
    await page.evaluate((targetHash) => {
      const el = document.querySelector(targetHash);
      if (el) el.scrollIntoView();
    }, hash);
    await new Promise((r) => setTimeout(r, 800));
    const isTargetVisible = await page.evaluate((targetHash) => {
      const el = document.querySelector(targetHash);
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top >= -200 && rect.top <= window.innerHeight;
    }, hash);
    console.log(`Jump to ${hash} target in view? ${isTargetVisible}`);
  }

  // Fast scrolling up and down repeatedly
  console.log('Running repeated fast scroll cycles...');
  for (let i = 0; i < 4; i++) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise((r) => setTimeout(r, 200));
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 200));
  }
  await new Promise((r) => setTimeout(r, 500));
  console.log(`Console errors after repeated fast scrolls: ${consoleErrors.length}`);

  // 4. Mobile & Touch Viewport Check (< 1024px)
  console.log('\n--- Test 4: Mobile / Touch Layout (< 1024px) ---');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1000));

  const mobileLayoutCheck = await page.evaluate(() => {
    const desktopCards = document.querySelector('#bogo-cards .hidden.lg\\:flex');
    const mobileCards = document.querySelector('#bogo-cards .flex.lg\\:hidden');
    const roadmapTrack = document.querySelector('#bogo-roadmap [class*="flex-col lg:flex-row"]');
    const horizOverflow = document.documentElement.scrollWidth > window.innerWidth;
    return {
      desktopCardsHidden: desktopCards ? window.getComputedStyle(desktopCards).display === 'none' : true,
      mobileCardsVisible: mobileCards ? window.getComputedStyle(mobileCards).display !== 'none' : false,
      roadmapIsVertical: roadmapTrack ? window.getComputedStyle(roadmapTrack).flexDirection === 'column' : false,
      horizOverflow,
    };
  });
  console.log('Mobile layout verification:', mobileLayoutCheck);

  // 5. Reduced Motion Verification
  console.log('\n--- Test 5: Prefers-Reduced-Motion Emulation ---');
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1000));

  const reducedMotionCheck = await page.evaluate(() => {
    const pageIntro = document.getElementById('hrs-page-intro');
    const marquee = document.querySelector('.animate-marquee');
    const marqueeAnim = marquee ? window.getComputedStyle(marquee).animationName : 'none';
    const splitWords = Array.from(document.querySelectorAll('.split-line-inner'));
    const allWordsVisible = splitWords.every((w) => {
      const s = window.getComputedStyle(w);
      return parseFloat(s.opacity) >= 0.9;
    });
    return {
      pageIntroRendered: !!pageIntro,
      marqueeAnimation: marqueeAnim,
      allSplitWordsVisible: allWordsVisible,
    };
  });
  console.log('Reduced motion check:', reducedMotionCheck);

  // 6. Keyboard Navigation & Visible Focus
  console.log('\n--- Test 6: Keyboard Navigation & Visible Focus ---');
  // Reset media features
  await page.emulateMediaFeatures([]);
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1000));

  // Press Tab multiple times to verify focus transitions
  for (let t = 0; t < 6; t++) {
    await page.keyboard.press('Tab');
  }
  const focusedTag = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el) return 'none';
    return `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${el.className ? '.' + el.className.split(' ')[0] : ''}`;
  });
  console.log(`Active focused element after Tab navigation: ${focusedTag}`);

  // Test Explorer Arrow Key Navigation
  const explorerArrows = await page.evaluate(() => {
    const explorer = document.getElementById('bogo-explorer');
    if (!explorer) return false;
    explorer.focus();
    return true;
  });
  if (explorerArrows) {
    await page.keyboard.press('ArrowRight');
    await new Promise((r) => setTimeout(r, 200));
    await page.keyboard.press('ArrowRight');
    await new Promise((r) => setTimeout(r, 200));
    const brandName = await page.evaluate(() => {
      const el = document.querySelector('#bogo-explorer h3');
      return el ? el.innerText : '';
    });
    console.log(`Brand active after ArrowRight navigation: ${brandName}`);
  }

  // 7. No-JS Full Page Verification
  console.log('\n--- Test 7: JavaScript Disabled Check ---');
  const noJsPage = await browser.newPage();
  await noJsPage.setJavaScriptEnabled(false);
  await noJsPage.setViewport({ width: 1440, height: 900 });
  await noJsPage.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  const noJsContent = await noJsPage.evaluate(() => {
    const h1 = document.querySelector('h1')?.innerText;
    const bogoHead = document.querySelector('#bogo h2')?.innerText;
    const businessesHead = document.querySelector('#businesses h2')?.innerText;
    const aboutHead = document.querySelector('#about h2')?.innerText;
    const noscriptInExplorer = !!document.querySelector('#bogo-explorer noscript');
    return {
      hasH1: !!h1,
      bogoHead,
      businessesHead,
      aboutHead,
      noscriptInExplorer,
    };
  });
  console.log('No-JS verification:', noJsContent);
  await noJsPage.close();

  // 8. 4x CPU Throttling Scroll Performance Profile
  console.log('\n--- Test 8: 4x CPU Throttling Scroll Performance Profile ---');
  const client = await page.target().createCDPSession();
  await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });

  await page.evaluate(() => {
    sessionStorage.setItem('hrs_page_intro_seen', 'true');
    const intro = document.getElementById('hrs-page-intro');
    if (intro) intro.remove();
  });

  const fpsMetrics = await page.evaluate(async () => {
    return new Promise((resolve) => {
      let frames = 0;
      let startTime = performance.now();
      const duration = 2000; // 2 seconds scroll test

      function countFrames() {
        frames++;
        if (performance.now() - startTime < duration) {
          requestAnimationFrame(countFrames);
        } else {
          const elapsed = (performance.now() - startTime) / 1000;
          const fps = Math.round(frames / elapsed);
          resolve({ fps, frames, elapsed });
        }
      }

      // Smooth programmatic scroll down
      let scrollPos = 0;
      const scrollInterval = setInterval(() => {
        scrollPos += 80;
        window.scrollTo(0, scrollPos);
        if (performance.now() - startTime >= duration) {
          clearInterval(scrollInterval);
        }
      }, 16);

      requestAnimationFrame(countFrames);
    });
  });
  console.log(`4x CPU Throttled Scroll Frame Rate: ${fpsMetrics.fps} FPS (${fpsMetrics.frames} frames in ${fpsMetrics.elapsed.toFixed(1)}s)`);
  await client.send('Emulation.setCPUThrottlingRate', { rate: 1 });

  // 9. Total Page Weight & Assets Report
  console.log('\n--- Test 9: Asset Sizes & Page Weight ---');
  const storeFiles = fs.readdirSync('public/bogo/stores');
  let storeBytes = 0;
  storeFiles.forEach((f) => {
    storeBytes += fs.statSync(path.join('public/bogo/stores', f)).size;
  });
  console.log(`Total BOGO Concept Store Renders (${storeFiles.length} files): ${(storeBytes / 1024).toFixed(1)} KB`);

  // 10. Capture Clean Deliverable Screenshots of Every Homepage Section
  console.log('\n--- Test 10: Capturing Section Screenshots (Desktop & Mobile) ---');
  const sections = [
    { id: 'hero', name: '01_hero' },
    { id: 'group-intro', name: '02_group_intro' },
    { id: 'bogo', name: '03_bogo_hero' },
    { id: 'bogo-explorer', name: '04_bogo_explorer' },
    { id: 'bogo-formats', name: '05_bogo_formats' },
    { id: 'bogo-cards', name: '06_bogo_cards' },
    { id: 'bogo-roadmap', name: '07_bogo_roadmap' },
    { id: 'bogo-close', name: '08_bogo_close' },
    { id: 'businesses', name: '09_businesses' },
    { id: 'brandwall', name: '10_brandwall' },
    { id: 'about', name: '11_calm_about' },
    { id: 'news', name: '12_news' },
    { id: 'careers-contact', name: '13_careers_contact' },
    { id: 'footer', name: '14_footer' },
  ];

  // Desktop captures (1440x900)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    sessionStorage.setItem('hrs_page_intro_seen', 'true');
    const intro = document.getElementById('hrs-page-intro');
    if (intro) intro.remove();
  });

  for (const s of sections) {
    const exists = await page.evaluate((id) => !!document.getElementById(id), s.id);
    if (exists) {
      const el = await page.$(`#${s.id}`);
      if (el) {
        await page.evaluate((id) => {
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ block: 'center' });
        }, s.id);
        await new Promise((r) => setTimeout(r, 600));
        const buf = await el.screenshot();
        saveDual(`desktop_${s.name}.png`, buf);
      }
    }
  }

  // Mobile captures (390x844)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    sessionStorage.setItem('hrs_page_intro_seen', 'true');
    const intro = document.getElementById('hrs-page-intro');
    if (intro) intro.remove();
  });

  for (const s of sections) {
    const exists = await page.evaluate((id) => !!document.getElementById(id), s.id);
    if (exists) {
      const el = await page.$(`#${s.id}`);
      if (el) {
        await page.evaluate((id) => {
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ block: 'center' });
        }, s.id);
        await new Promise((r) => setTimeout(r, 600));
        const buf = await el.screenshot();
        saveDual(`mobile_${s.name}.png`, buf);
      }
    }
  }

  console.log('\n--- Full Audit Test Suite Completed Successfully ---');
  await browser.close();
}

run().catch((err) => {
  console.error('Fatal error in audit suite:', err);
  process.exit(1);
});
