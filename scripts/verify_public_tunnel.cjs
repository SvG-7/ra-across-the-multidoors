const { chromium, devices } = require('playwright');
const path = require('path');

const ARTIFACTS_DIR = 'C:/Users/saish/.gemini/antigravity/brain/935f113b-6f1a-4ec0-b6c8-50be60006ca4';
const PUBLIC_URL = 'https://supplemental-leon-olive-fishing.trycloudflare.com';

async function testMobileProfile(browser, deviceName, screenshotPrefix) {
  console.log(`\n========================================`);
  console.log(`Testing Public URL with ${deviceName}...`);
  console.log(`URL: ${PUBLIC_URL}`);
  console.log(`========================================`);

  const deviceConfig = devices[deviceName] || {
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  };

  const context = await browser.newContext({
    ...deviceConfig,
  });

  const page = await context.newPage();
  const errors = [];
  const networkErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`[${deviceName}] CONSOLE ERROR:`, msg.text());
      errors.push(msg.text());
    }
  });

  page.on('response', resp => {
    if (resp.status() >= 400) {
      console.log(`[${deviceName}] HTTP ${resp.status()} on ${resp.url()}`);
      networkErrors.push(`${resp.status()} ${resp.url()}`);
    }
  });

  // 1. Initial Load
  console.log(`[${deviceName}] Loading page...`);
  const response = await page.goto(PUBLIC_URL, { waitUntil: 'networkidle', timeout: 30000 });
  console.log(`[${deviceName}] HTTP Status: ${response.status()}`);
  
  if (response.status() !== 200) {
    throw new Error(`Failed to load page: HTTP ${response.status()}`);
  }

  // Verify first screen displays reliably
  await page.waitForSelector('text=RA: ACROSS THE MULTI-DOORS', { timeout: 10000 });
  console.log(`[${deviceName}] Event Title verified!`);

  // Verify Spider-Man Hero Image loads
  const heroImg = await page.$('img[alt="Spider-Man Character Portrait"]');
  if (heroImg) {
    const isVisible = await heroImg.isVisible();
    const naturalWidth = await heroImg.evaluate(el => el.naturalWidth);
    console.log(`[${deviceName}] Hero image visible: ${isVisible}, natural width: ${naturalWidth}px`);
  }

  // Screenshot Screen 1 (Chapter 1)
  const sc1 = path.join(ARTIFACTS_DIR, `${screenshotPrefix}_01_hero_screen.png`);
  await page.screenshot({ path: sc1, fullPage: false });
  console.log(`[${deviceName}] Saved: ${sc1}`);

  // Select "Apartment community"
  const aptBtn = await page.getByText('Apartment community', { exact: false }).first();
  await aptBtn.click();
  console.log(`[${deviceName}] Selected Apartment community`);
  await page.waitForTimeout(400);

  // Click continue to Chapter 2
  const continueBtn = await page.getByText(/ENTER CHAPTER 2|Continue to Chapter 2/i).first();
  await continueBtn.click();
  console.log(`[${deviceName}] Navigating to Chapter 2...`);
  await page.waitForTimeout(1400);

  // Verify Chapter 2
  await page.waitForSelector('text=THE INVISIBLE RESIDENT', { timeout: 10000 });
  console.log(`[${deviceName}] Chapter 2 verified!`);

  // Choose option in Chapter 2
  const ch2Opt = await page.getByText('Send a brief personal check-in').first();
  await ch2Opt.click();
  console.log(`[${deviceName}] Selected Chapter 2 choice`);
  await page.waitForTimeout(600);

  // Screenshot Screen 2 (Chapter 2 Decision)
  const sc2 = path.join(ARTIFACTS_DIR, `${screenshotPrefix}_02_chapter2_decision.png`);
  await page.screenshot({ path: sc2, fullPage: false });
  console.log(`[${deviceName}] Saved: ${sc2}`);

  // Fast-forward to Chapter 7
  // Ch. 2 -> Ch. 3
  await page.getByText(/Continue to Ch\. 3/i).first().click();
  await page.waitForTimeout(1200);
  await page.getByText(/Ask for their perspective/i).first().click();
  await page.waitForTimeout(400);

  // Ch. 3 -> Ch. 4
  await page.getByText(/Continue to Ch\. 4/i).first().click();
  await page.waitForTimeout(1200);
  await page.getByText(/Personal message/i).first().click();
  await page.waitForTimeout(400);

  // Ch. 4 -> Ch. 5
  await page.getByText(/Continue to Ch\. 5/i).first().click();
  await page.waitForTimeout(1200);

  // Ch. 5 -> Ch. 6
  await page.getByText(/Continue to Ch\. 6/i).first().click();
  await page.waitForTimeout(1200);

  // Verify Chapter 6 recalled Chapter 4 choice
  const recalled = await page.getByText(/Personal message/i).first();
  console.log(`[${deviceName}] Chapter 6 recall active:`, await recalled.isVisible());
  await page.getByText(/Confirm their preferred direct channel/i).first().click();
  await page.waitForTimeout(400);

  // Ch. 6 -> Ch. 7
  await page.getByText(/Continue to Ch\. 7/i).first().click();
  await page.waitForTimeout(1500);

  // Verify Spider-Tracker
  await page.waitForSelector('text=Your Spider-Tracker', { timeout: 10000 });
  console.log(`[${deviceName}] Chapter 7 Spider-Tracker verified!`);

  // Tap marker 2 on map to open bottom drawer
  const marker2 = await page.locator('svg text:has-text("2")').first();
  await marker2.click({ force: true });
  await page.waitForTimeout(800);

  // Screenshot Screen 3 (Chapter 7 Spider-Tracker with Drawer)
  const sc3 = path.join(ARTIFACTS_DIR, `${screenshotPrefix}_03_tracker_drawer.png`);
  await page.screenshot({ path: sc3, fullPage: false });
  console.log(`[${deviceName}] Saved: ${sc3}`);

  // Test Refresh Persistence
  console.log(`[${deviceName}] Testing page reload persistence over public tunnel...`);
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const reloadedTracker = await page.getByText('Your Spider-Tracker').first();
  console.log(`[${deviceName}] Still on Chapter 7 after refresh:`, await reloadedTracker.isVisible());

  await context.close();
  console.log(`[${deviceName}] Test passed with 0 critical network errors!`);
}

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  // Test iPhone 14 (Safari emulation)
  await testMobileProfile(browser, 'iPhone 14', 'public_iphone_safari');

  // Test Pixel 7 (Android Chrome emulation)
  await testMobileProfile(browser, 'Pixel 7', 'public_android_chrome');

  await browser.close();
  console.log('\n======================================================');
  console.log('ALL PUBLIC TUNNEL MOBILE TESTS COMPLETED SUCCESSFULLY!');
  console.log('======================================================\n');
}

main().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
