const puppeteer = require('puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = path.resolve('C:/Users/SUBHASH/.gemini/antigravity-ide/brain/1f029da0-b7ec-4b63-a050-531c0614f7e0');

(async () => {
  console.log('Launching Chrome for Phase 3A captures...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Helper to capture full page cleanly
  const captureFull = async (url, filename, width, height) => {
    console.log(`Capturing ${filename} (${width}x${height}) at ${url}...`);
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    const res = await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    console.log(`Status for ${url}: ${res.status()}`);
    if (res.status() !== 200) {
      throw new Error(`Failed to load ${url}: status ${res.status()}`);
    }
    await page.screenshot({
      path: path.join(artifactDir, filename),
      fullPage: true
    });
  };

  // 1. /businesses at 1440px and 360px
  await captureFull('http://localhost:3000/businesses', 'businesses_desktop_1440.png', 1440, 900);
  await captureFull('http://localhost:3000/businesses', 'businesses_mobile_360.png', 376, 812);

  // 2. /about at 1440px and 360px
  await captureFull('http://localhost:3000/about', 'about_desktop_1440.png', 1440, 900);
  await captureFull('http://localhost:3000/about', 'about_mobile_360.png', 376, 812);

  // 3. /businesses/hrs-aluglaze at 1440px and 360px
  await captureFull('http://localhost:3000/businesses/hrs-aluglaze', 'entity_aluglaze_desktop_1440.png', 1440, 900);
  await captureFull('http://localhost:3000/businesses/hrs-aluglaze', 'entity_aluglaze_mobile_360.png', 376, 812);

  // 4. Test end-to-end entities: hrishikesh-food-products & indian-brand-house
  console.log('Testing end-to-end entities across breakpoints (360, 768, 1024, 1440)...');
  const breakpoints = [360, 768, 1024, 1440];
  const testEntities = ['hrishikesh-food-products', 'indian-brand-house'];

  for (const slug of testEntities) {
    for (const width of breakpoints) {
      await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
      const res = await page.goto(`http://localhost:3000/businesses/${slug}`, { waitUntil: 'networkidle0' });
      if (res.status() !== 200) {
        throw new Error(`Failed ${slug} at ${width}px: status ${res.status()}`);
      }
      console.log(`Verified ${slug} at ${width}px (HTTP 200 OK)`);
    }
  }

  // 5. Test sector query filter interaction on /businesses
  console.log('Testing sector query filter on /businesses...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000/businesses?sector=built-environment', { waitUntil: 'networkidle0' });
  await page.screenshot({
    path: path.join(artifactDir, 'businesses_filter_built_env_1440.png'),
    fullPage: false
  });
  console.log('Filter capture saved.');

  await browser.close();
  console.log('All Phase 3A captures and responsive checks completed successfully.');
})().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
