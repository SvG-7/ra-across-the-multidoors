const { chromium } = require('playwright');
const path = require('path');

const ARTIFACTS_DIR = 'C:/Users/saish/.gemini/antigravity/brain/935f113b-6f1a-4ec0-b6c8-50be60006ca4';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const page = await context.newPage();
  page.on('console', msg => console.log('PAGE:', msg.text()));
  await page.goto('http://127.0.0.1:5173/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForTimeout(500);

  const btn = await page.locator('button:has-text("ENTER CHAPTER 2")').first();
  await btn.click({ noWaitAfter: true });
  await page.waitForTimeout(380);

  const swingPath = path.join(ARTIFACTS_DIR, '06_spiderman_swinging_transition.png');
  await page.screenshot({ path: swingPath, fullPage: false, animations: 'allow' });
  console.log(`Saved screenshot to: ${swingPath}`);

  await browser.close();
})();
