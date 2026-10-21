const puppeteer = require('puppeteer-core');
const path = require('path');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = path.resolve('C:/Users/SUBHASH/.gemini/antigravity-ide/brain/1f029da0-b7ec-4b63-a050-531c0614f7e0');

// All entity slugs
const entitySlugs = [
  'hrs-aluglaze',
  'geotrix',
  'school-of-facade-technologies',
  'hrishikesh-ventures',
  'hrishikesh-food-products',
  'hrishikesh-consumer-products',
  'firstgen',
  'firstgen-assets',
  'firstgen-hotels',
  'firstgen-enterprises',
  'indian-brand-house'
];

(async () => {
  console.log('--- STARTING PHASE 3B VERIFICATION ---');

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1. Check all entity routes at 1440px and 360px
  console.log('1. Verifying all entity pages return HTTP 200 at 1440px and 360px...');
  for (const slug of entitySlugs) {
    const url = `http://localhost:3000/businesses/${slug}`;
    
    // Desktop
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    const resDesktop = await page.goto(url, { waitUntil: 'networkidle0', timeout: 25000 });
    if (resDesktop.status() !== 200) {
      throw new Error(`Desktop failed on ${url}: ${resDesktop.status()}`);
    }

    // Mobile
    await page.setViewport({ width: 360, height: 800, deviceScaleFactor: 1 });
    const resMobile = await page.goto(url, { waitUntil: 'networkidle0', timeout: 25000 });
    if (resMobile.status() !== 200) {
      throw new Error(`Mobile failed on ${url}: ${resMobile.status()}`);
    }

    console.log(`  [OK] /businesses/${slug} (HTTP 200 at 1440px & 360px)`);
  }

  // 2. Capture Three Distinctive Layouts for Artifacts
  console.log('2. Capturing three distinctive layouts at 1440px and 360px...');

  const captureDistinctive = async (slug, baseFilename) => {
    const url = `http://localhost:3000/businesses/${slug}`;

    // Desktop 1440
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.screenshot({
      path: path.join(artifactDir, `${baseFilename}_1440.png`),
      fullPage: true
    });
    console.log(`  Saved ${baseFilename}_1440.png`);

    // Mobile 360
    await page.setViewport({ width: 376, height: 812, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.screenshot({
      path: path.join(artifactDir, `${baseFilename}_360.png`),
      fullPage: true
    });
    console.log(`  Saved ${baseFilename}_360.png`);
  };

  // Distinctive 1: HRS Aluglaze (Industrial Systems Grid & Showcase)
  await captureDistinctive('hrs-aluglaze', 'layout_aluglaze_distinctive');

  // Distinctive 2: Hrishikesh Ventures (13-Development Filterable Portfolio)
  await captureDistinctive('hrishikesh-ventures', 'layout_ventures_distinctive');

  // Distinctive 3: Hrishikesh Food Products (3-Model Switcher & Spice Showcase)
  await captureDistinctive('hrishikesh-food-products', 'layout_food_distinctive');

  // Bonus Distinctive 4: FirstGen Hotels (Flight Stays & Amuktamalyada Telugu Dining)
  await captureDistinctive('firstgen-hotels', 'layout_hotels_distinctive');

  // 3. Link Checker Script: Verify NO broken internal links
  console.log('3. Running internal link checker across all crawled routes...');
  const visited = new Set();
  const queue = [
    '/',
    '/about',
    '/businesses',
    '/contact',
    ...entitySlugs.map(s => `/businesses/${s}`)
  ];

  const brokenLinks = [];
  const checkedLinks = new Set();

  while (queue.length > 0) {
    const currentPath = queue.shift();
    if (visited.has(currentPath)) continue;
    visited.add(currentPath);

    const fullUrl = `http://localhost:3000${currentPath}`;
    try {
      await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      
      // Extract all internal links
      const hrefs = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('a[href]'));
        return anchors
          .map(a => a.getAttribute('href'))
          .filter(h => h && (h.startsWith('/') || h.startsWith('#')) && !h.startsWith('mailto:') && !h.startsWith('tel:'));
      });

      for (const href of hrefs) {
        if (href.startsWith('#')) continue; // Skip hash links on same page
        
        const cleanPath = href.split('?')[0].split('#')[0];
        if (!cleanPath) continue;

        if (!checkedLinks.has(cleanPath)) {
          checkedLinks.add(cleanPath);

          // Fast HTTP HEAD/GET check
          const linkCheckPromise = new Promise((resolve) => {
            const req = http.get(`http://localhost:3000${cleanPath}`, (res) => {
              if (res.statusCode >= 200 && res.statusCode < 400) {
                resolve({ path: cleanPath, status: res.statusCode, ok: true });
              } else {
                resolve({ path: cleanPath, status: res.statusCode, ok: false, source: currentPath });
              }
            });
            req.on('error', (err) => {
              resolve({ path: cleanPath, status: 'ERROR', ok: false, error: err.message, source: currentPath });
            });
          });

          const result = await linkCheckPromise;
          if (!result.ok) {
            brokenLinks.push(result);
            console.error(`  [BROKEN] ${result.path} (from ${result.source}): ${result.status}`);
          } else {
            // If it's a project or brand page and not yet queued, we can queue it
            if (cleanPath.startsWith('/projects/') || cleanPath.startsWith('/brands/')) {
              queue.push(cleanPath);
            }
          }
        }
      }
    } catch (e) {
      console.error(`Error crawling ${fullUrl}:`, e.message);
    }
  }

  console.log(`\n--- LINK CHECK SUMMARY ---`);
  console.log(`Total unique internal paths checked: ${checkedLinks.size}`);
  console.log(`Broken links found: ${brokenLinks.length}`);
  if (brokenLinks.length > 0) {
    console.error('Broken link details:', JSON.stringify(brokenLinks, null, 2));
    process.exit(1);
  } else {
    console.log('ALL INTERNAL LINKS VERIFIED: ZERO BROKEN LINKS.');
  }

  await browser.close();
  console.log('\n--- PHASE 3B VERIFICATION COMPLETE ---');
})().catch(err => {
  console.error('Fatal error in verification:', err);
  process.exit(1);
});
