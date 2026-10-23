const http = require('http');

async function check() {
  const res = await fetch('http://localhost:3000/motion-lab/');
  const html = await res.text();
  const cssMatches = [...html.matchAll(/href="([^"]+\.css[^"]*)"/g)];
  console.log('CSS links found in HTML:', cssMatches.map(m => m[1]));
  
  for (const match of cssMatches) {
    const url = 'http://localhost:3000' + match[1];
    const cssRes = await fetch(url);
    const cssText = await cssRes.text();
    console.log(`URL: ${url}`);
    console.log(`CSS length: ${cssText.length} bytes`);
    console.log(`Contains 'sr-only': ${cssText.includes('sr-only')}`);
    console.log(`Contains 'max-w-7xl': ${cssText.includes('max-w-7xl')}`);
    console.log(`Contains 'surface-ink': ${cssText.includes('surface-ink')}`);
    console.log('CSS first 200 chars:\n', cssText.slice(0, 200));
  }
}

check().catch(console.error);
