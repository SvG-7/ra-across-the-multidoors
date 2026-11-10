const { chromium } = require('playwright');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/saish/.gemini/antigravity/brain/935f113b-6f1a-4ec0-b6c8-50be60006ca4';
const PROD_URL = 'https://svg-7.github.io/ra-across-the-multidoors/';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
    isMobile: true,
    hasTouch: true,
  });
  const page = await ctx.newPage();
  console.log('Testing live public production URL...');
  const res = await page.goto(PROD_URL, { waitUntil: 'networkidle' });
  console.log(`Live HTTP Status: ${res.status()}`);

  await page.waitForSelector('text=Which community have you worked in?');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'live_prod_ch1_portal.png') });
  console.log('Captured live production Chapter 1!');

  await browser.close();
  console.log('=== LIVE PRODUCTION VERIFICATION PASSED ===');
}

run();
