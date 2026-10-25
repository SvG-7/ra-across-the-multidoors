const { chromium } = require('playwright');
const path = require('path');

const ARTIFACTS_DIR = 'C:/Users/saish/.gemini/antigravity/brain/935f113b-6f1a-4ec0-b6c8-50be60006ca4';
const BASE_URL = 'http://127.0.0.1:5173/';

async function run() {
  console.log('Capturing swinging transition...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });

  const page = await context.newPage();
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const continueBtn = await page.getByText('ENTER CHAPTER 2').first();
  await continueBtn.click();

  // Wait 400ms right in the center of the swing
  await page.waitForTimeout(400);

  const swingImg = await page.$('img[alt="Spider-Man Swinging"]');
  if (swingImg) {
    console.log('Swinging image found! Visible:', await swingImg.isVisible());
    const box = await swingImg.boundingBox();
    console.log('Bounding box:', box);
  }

  const swingPath = path.join(ARTIFACTS_DIR, '06_spiderman_swinging_transition.png');
  await page.screenshot({ path: swingPath, fullPage: false });
  console.log(`Saved screenshot to: ${swingPath}`);

  await browser.close();
  console.log('Test complete!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
