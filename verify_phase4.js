const puppeteer = require('puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = path.resolve('C:/Users/SUBHASH/.gemini/antigravity-ide/brain/1f029da0-b7ec-4b63-a050-531c0614f7e0');

(async () => {
  console.log('--- STARTING PHASE 4 VERIFICATION ---');

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // 1. Responsive checks for /contact, /careers, /news across 360, 768, 1440 px
  const routes = ['/contact', '/careers', '/news'];
  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 360, height: 800 },
  ];

  for (const r of routes) {
    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      const res = await page.goto(`http://localhost:3000${r}`, { waitUntil: 'networkidle0', timeout: 25000 });
      if (res.status() !== 200) {
        throw new Error(`Failed to load ${r} at ${vp.name}: HTTP ${res.status()}`);
      }
      console.log(`  [OK] ${r} at ${vp.width}x${vp.height} (${vp.name})`);
    }
  }

  // 2. Contact form tests
  console.log('\n2. Testing Contact Form (Empty, Error, Preselection, Success)...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle0' });

  // A. Empty form screenshot
  await page.screenshot({
    path: path.join(artifactDir, 'contact_form_empty.png'),
    fullPage: false,
  });
  console.log('  Saved contact_form_empty.png');

  // B. Empty submit test
  await page.click('button[type="submit"]');
  await new Promise((r) => setTimeout(r, 600));

  // Verify inline errors appeared
  const hasErrors = await page.evaluate(() => {
    return !!document.getElementById('fullName-error') && !!document.getElementById('workEmail-error');
  });
  if (!hasErrors) {
    throw new Error('Validation errors failed to appear on empty submit');
  }
  console.log('  [PASS] Empty submit triggers validation errors');

  await page.screenshot({
    path: path.join(artifactDir, 'contact_form_error.png'),
    fullPage: false,
  });
  console.log('  Saved contact_form_error.png');

  // C. Test Entity Preselection from URL
  console.log('  Testing ?entity=hrs-aluglaze preselection and adaptive dropdown...');
  await page.goto('http://localhost:3000/contact?entity=hrs-aluglaze', { waitUntil: 'networkidle0' });
  const selectedEntityVal = await page.$eval('#entity', (el) => el.value);
  const enquiryOptions = await page.$$eval('#enquiryType option', (opts) => opts.map((o) => o.value));

  if (selectedEntityVal !== 'hrs-aluglaze') {
    throw new Error(`Expected entity value hrs-aluglaze, got ${selectedEntityVal}`);
  }
  if (!enquiryOptions.includes('Project enquiry')) {
    throw new Error(`Expected Aluglaze options, got: ${JSON.stringify(enquiryOptions)}`);
  }
  console.log('  [PASS] Entity preselected as hrs-aluglaze with adaptive options: ' + enquiryOptions.slice(0, 2).join(', '));

  // D. Fill valid details and submit
  await page.type('#fullName', 'Aarav Sompura');
  await page.type('#workEmail', 'aarav.sompura@shubhconsultants.in');
  await page.type('#phone', '+91 98250 12345');
  await page.type('#company', 'Shubh Architectural Consultants');
  await page.type('#message', 'Requesting engineering documentation and CWCT certifications for SG Highway project.');
  await page.click('#consent');

  // Submit
  await page.click('button[type="submit"]');

  // Wait for success screen
  await page.waitForSelector('#contact-form-success', { timeout: 10000 });
  const successText = await page.$eval('#contact-form-success', (el) => el.textContent);
  if (!successText.includes('We will respond within one working day')) {
    throw new Error('Success message missing confident confirmation promise');
  }
  console.log('  [PASS] Form submission success registered with confirmation message');

  await page.screenshot({
    path: path.join(artifactDir, 'contact_form_success.png'),
    fullPage: false,
  });
  console.log('  Saved contact_form_success.png');

  // 3. Capture Job Detail Page
  console.log('\n3. Testing and Capturing Job Detail Page...');
  await page.goto('http://localhost:3000/careers/senior-structural-facade-engineer', { waitUntil: 'networkidle0' });
  await page.screenshot({
    path: path.join(artifactDir, 'careers_job_detail.png'),
    fullPage: true,
  });
  console.log('  Saved careers_job_detail.png');

  // 4. Capture News Article Detail Page
  console.log('\n4. Testing and Capturing News Article Detail Page...');
  await page.goto('http://localhost:3000/news/soft-curriculum-framework', { waitUntil: 'networkidle0' });
  await page.screenshot({
    path: path.join(artifactDir, 'news_article_detail.png'),
    fullPage: true,
  });
  console.log('  Saved news_article_detail.png');

  // 5. Test RSS Feed
  console.log('\n5. Testing /news/rss.xml feed...');
  const rssRes = await page.goto('http://localhost:3000/news/rss.xml');
  const rssContent = await rssRes.text();
  if (!rssContent.includes('<rss version="2.0"') || !rssContent.includes('School of Facade Technologies')) {
    throw new Error('RSS feed output invalid');
  }
  console.log('  [PASS] /news/rss.xml returned valid RSS 2.0 XML');

  await browser.close();
  console.log('\n--- PHASE 4 VERIFICATION COMPLETE: ALL CHECKS PASSED ---');
})().catch((err) => {
  console.error('Fatal error during Phase 4 verification:', err);
  process.exit(1);
});
