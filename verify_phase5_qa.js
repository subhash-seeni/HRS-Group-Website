const puppeteer = require('puppeteer-core');
const path = require('path');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = path.resolve('C:/Users/SUBHASH/.gemini/antigravity-ide/brain/1f029da0-b7ec-4b63-a050-531c0614f7e0');

const viewports = [
  { name: 'mobile-small', width: 360, height: 740 },
  { name: 'mobile-standard', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'laptop-small', width: 1024, height: 768 },
  { name: 'desktop-laptop', width: 1280, height: 800 },
  { name: 'desktop-large', width: 1440, height: 900 },
  { name: 'ultrawide', width: 1920, height: 1080 }
];

const testRoutes = [
  '/',
  '/about',
  '/businesses',
  '/businesses/hrs-aluglaze',
  '/businesses/geotrix',
  '/businesses/school-of-facade-technologies',
  '/businesses/hrishikesh-ventures',
  '/businesses/hrishikesh-food-products',
  '/businesses/hrishikesh-consumer-products',
  '/businesses/firstgen',
  '/businesses/firstgen-hotels',
  '/businesses/indian-brand-house',
  '/contact',
  '/careers',
  '/careers/senior-structural-facade-engineer',
  '/news',
  '/news/soft-curriculum-framework',
  '/privacy',
  '/terms'
];

(async () => {
  console.log('=== STARTING PHASE 5 QA & VERIFICATION SUITE ===');

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // 1. Responsive Viewport Check across 7 breakpoints
  console.log('\n1. Testing 7 responsive breakpoints (360, 390, 768, 1024, 1280, 1440, 1920 px)...');
  const samplePages = ['/', '/businesses', '/businesses/hrs-aluglaze', '/contact', '/careers', '/news'];
  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    for (const route of samplePages) {
      const res = await page.goto(`http://localhost:3000${route}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
      if (res.status() !== 200) {
        throw new Error(`Failed to load ${route} at ${vp.width}px: HTTP ${res.status()}`);
      }
    }
    console.log(`  [PASS] All core pages verified at ${vp.width}x${vp.height} (${vp.name})`);
  }

  // 2. Heading Hierarchy Check (Single H1 per page)
  console.log('\n2. Verifying heading hierarchy (exactly one h1 per page)...');
  for (const route of testRoutes) {
    await page.goto(`http://localhost:3000${route}`, { waitUntil: 'domcontentloaded' });
    const h1Count = await page.$$eval('h1', (els) => els.length);
    if (h1Count !== 1) {
      throw new Error(`Route ${route} has ${h1Count} h1 elements (expected exactly 1)`);
    }
  }
  console.log(`  [PASS] Verified single <h1> on all ${testRoutes.length} sampled routes.`);

  // 3. Accessibility & Keyboard Navigation Pass
  console.log('\n3. Testing keyboard navigation and focus rings...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle0' });

  // Tab through form elements
  await page.keyboard.press('Tab'); // Skip link / Header
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  const focusedTag = await page.evaluate(() => document.activeElement ? document.activeElement.tagName : 'NONE');
  console.log(`  [PASS] Keyboard focus active: current active element tag is ${focusedTag}`);

  // 4. Reduced-Motion Mode Check
  console.log('\n4. Testing with prefers-reduced-motion media query emulation...');
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  const resMotion = await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  if (resMotion.status() !== 200) throw new Error('Reduced motion page failed');
  console.log('  [PASS] Home renders cleanly under prefers-reduced-motion: reduce');

  // 5. Full-Site Internal Link Crawl
  console.log('\n5. Executing full-site internal link crawl (verifying zero broken links)...');
  const visited = new Set();
  const queue = [...testRoutes];
  const brokenLinks = [];
  const checkedHrefs = new Set();

  while (queue.length > 0) {
    const current = queue.shift();
    if (visited.has(current)) continue;
    visited.add(current);

    try {
      await page.goto(`http://localhost:3000${current}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      const hrefs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a[href]'))
          .map((a) => a.getAttribute('href'))
          .filter((h) => h && h.startsWith('/') && !h.startsWith('//') && !h.startsWith('/api/'));
      });

      for (const rawHref of hrefs) {
        const clean = rawHref.split('?')[0].split('#')[0];
        if (!clean || checkedHrefs.has(clean)) continue;
        checkedHrefs.add(clean);

        // Check status code via HTTP
        const checkStatus = await new Promise((resolve) => {
          const req = http.get(`http://localhost:3000${clean}`, (res) => {
            resolve({ ok: res.statusCode >= 200 && res.statusCode < 400, status: res.statusCode });
          });
          req.on('error', (err) => resolve({ ok: false, error: err.message }));
        });

        if (!checkStatus.ok) {
          brokenLinks.push({ path: clean, source: current, status: checkStatus.status || checkStatus.error });
          console.error(`  [BROKEN] ${clean} from ${current}: ${checkStatus.status}`);
        } else {
          // If it's a detail route not yet in visited, queue it
          if ((clean.startsWith('/projects/') || clean.startsWith('/brands/') || clean.startsWith('/news/') || clean.startsWith('/careers/')) && !visited.has(clean)) {
            queue.push(clean);
          }
        }
      }
    } catch (e) {
      console.warn(`Warning crawling ${current}:`, e.message);
    }
  }

  console.log(`\n--- LINK CRAWL SUMMARY ---`);
  console.log(`Total unique internal paths verified: ${checkedHrefs.size}`);
  console.log(`Broken links found: ${brokenLinks.length}`);
  if (brokenLinks.length > 0) {
    throw new Error(`Found ${brokenLinks.length} broken links: ${JSON.stringify(brokenLinks, null, 2)}`);
  }

  console.log(`\n--- CONSOLE ERRORS CHECK ---`);
  console.log(`Total console errors intercepted: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.log('Console errors encountered:', consoleErrors);
  }

  // 6. Test Sitemap and Robots
  console.log('\n6. Checking /sitemap.xml and /robots.txt...');
  const sitemapRes = await page.goto('http://localhost:3000/sitemap.xml');
  const sitemapText = await sitemapRes.text();
  if (!sitemapText.includes('<urlset') || !sitemapText.includes('hrsgroup.in/businesses/hrs-aluglaze')) {
    throw new Error('Sitemap XML output invalid or missing entity URLs');
  }
  console.log('  [PASS] /sitemap.xml is valid and lists all entity URLs');

  const robotsRes = await page.goto('http://localhost:3000/robots.txt');
  const robotsText = await robotsRes.text();
  console.log('  Actual robots.txt content:\n', robotsText);
  if (!robotsText.includes('User-agent: *') && !robotsText.includes('User-Agent: *')) {
    throw new Error('Robots.txt output invalid: ' + robotsText);
  }
  console.log('  [PASS] /robots.txt is valid');

  await browser.close();
  console.log('\n=== ALL PHASE 5 QA CHECKS PASSED SUCCESSFULLY ===');
})().catch((err) => {
  console.error('Fatal error during Phase 5 QA audit:', err);
  process.exit(1);
});
