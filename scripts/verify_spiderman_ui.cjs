const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ARTIFACTS_DIR = 'C:/Users/saish/.gemini/antigravity/brain/935f113b-6f1a-4ec0-b6c8-50be60006ca4';
const BASE_URL = 'http://127.0.0.1:5173/';

async function run() {
  console.log('Launching browser for Spider-Man UI & Tracker Verification...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  // Mobile device context (iPhone 14/15 size: 390x844)
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  const page = await context.newPage();

  // Listen to console logs
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('PAGE ERROR:', msg.text());
  });

  console.log(`Navigating to ${BASE_URL}...`);
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Clear any existing session so we start completely fresh
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Verify Chapter 1: Opening Screen with Prominent Spider-Man Artwork
  console.log('Verifying Chapter 1 Opening Screen...');
  const heroImg = await page.$('img[alt="Spider-Man Character Portrait"]');
  if (heroImg) {
    const isVisible = await heroImg.isVisible();
    const naturalWidth = await heroImg.evaluate(el => el.naturalWidth);
    console.log(`Hero image visible: ${isVisible}, natural width: ${naturalWidth}px`);
  } else {
    console.warn('Hero image not found with alt="Spider-Man Character Portrait"');
  }

  // Select community option "Both Worlds"
  const bothOption = await page.getByText('Both', { exact: false }).first();
  if (await bothOption.isVisible()) {
    await bothOption.click();
    console.log('Selected "Both" community option');
  }

  await page.waitForTimeout(500);

  // Capture Screenshot 1: Opening Screen with Prominent Spider-Man Artwork
  const screen1Path = path.join(ARTIFACTS_DIR, '01_spiderman_hero_opening.png');
  await page.screenshot({ path: screen1Path, fullPage: false });
  console.log(`Saved: ${screen1Path}`);

  // Click "Continue to Chapter 2"
  const continueBtn = await page.getByText(/Continue to Chapter 2|ENTER CHAPTER 2/i).first();
  await continueBtn.click();
  console.log('Clicked continue to Chapter 2');

  // Wait for swinging animation / transition
  await page.waitForTimeout(1200);

  // 2. Verify Chapter 2: Comic styling, Situation brief, Decision choices
  console.log('Verifying Chapter 2 Comic styling...');
  await page.waitForSelector('text=ISSUE #2');

  // Choose option in Chapter 2
  const ch2Opt = await page.getByText('Send a brief personal check-in').first();
  await ch2Opt.click();
  console.log('Selected Chapter 2 option');
  await page.waitForTimeout(600);

  // Capture Screenshot 2: Middle Chapter Comic Styling with Decision Saved
  const screen2Path = path.join(ARTIFACTS_DIR, '02_middle_chapter_comic_styling.png');
  await page.screenshot({ path: screen2Path, fullPage: false });
  console.log(`Saved: ${screen2Path}`);

  // Navigate through Chapters 3, 4, 5, 6 to reach Chapter 7
  // Ch. 2 -> Ch. 3
  await page.getByText(/Continue to Ch\. 3/i).first().click();
  await page.waitForTimeout(1000);

  // Ch. 3: select approach
  await page.getByText(/Ask for their perspective/i).first().click();
  await page.waitForTimeout(500);
  await page.getByText(/Continue to Ch\. 4/i).first().click();
  await page.waitForTimeout(1000);

  // Ch. 4: select Personal message
  await page.getByText(/Personal message/i).first().click();
  await page.waitForTimeout(500);
  await page.getByText(/Continue to Ch\. 5/i).first().click();
  await page.waitForTimeout(1000);

  // Ch. 5: Story reveal
  await page.getByText(/Continue to Ch\. 6/i).first().click();
  await page.waitForTimeout(1000);

  // Ch. 6: Verify Chapter 4 recall
  const recallText = await page.getByText(/Personal message/i).first();
  console.log('Chapter 6 recall visible:', await recallText.isVisible());
  await page.getByText(/Confirm their preferred direct channel/i).first().click();
  await page.waitForTimeout(500);

  // Ch. 6 -> Ch. 7 (Final Chapter)
  await page.getByText(/Continue to Ch\. 7/i).first().click();
  await page.waitForTimeout(1500);

  // 3. Verify Chapter 7: Interactive Spider-Tracker
  console.log('Verifying Chapter 7 Spider-Tracker...');
  await page.waitForSelector('text=Your Spider-Tracker');

  // Verify perched Spider-Man artwork
  const perchedImg = await page.$('img[alt="Spider-Man Perched"]');
  if (perchedImg) {
    const isPerchedVisible = await perchedImg.isVisible();
    const pWidth = await perchedImg.evaluate(el => el.naturalWidth);
    console.log(`Perched Spider-Man visible: ${isPerchedVisible}, width: ${pWidth}px`);
  }

  // Tap marker 2 on the SVG map to open detail drawer
  const marker2 = await page.locator('svg text:has-text("2")').first();
  await marker2.click({ force: true });
  console.log('Tapped Chapter 2 SVG marker');
  await page.waitForTimeout(800);

  // Capture Screenshot 3: Final Tracker with Perched Spider-Man & Open Detail Drawer
  const screen3Path = path.join(ARTIFACTS_DIR, '03_spiderman_tracker_with_drawer.png');
  await page.screenshot({ path: screen3Path, fullPage: false });
  console.log(`Saved: ${screen3Path}`);

  // Switch to "Chapter List View" tab
  const listTabBtn = await page.getByText('Chapter List View').first();
  await listTabBtn.click();
  await page.waitForTimeout(600);

  // Capture Screenshot 4: Tracker Alternative List View
  const screen4Path = path.join(ARTIFACTS_DIR, '04_spiderman_tracker_list_view.png');
  await page.screenshot({ path: screen4Path, fullPage: false });
  console.log(`Saved: ${screen4Path}`);

  // Test Refresh Persistence
  console.log('Testing page reload persistence...');
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const reloadedTracker = await page.getByText('Your Spider-Tracker').first();
  console.log('Tracker visible after refresh:', await reloadedTracker.isVisible());

  // Test Narrow Screen (320px)
  await page.setViewportSize({ width: 320, height: 600 });
  await page.waitForTimeout(500);
  const screen5Path = path.join(ARTIFACTS_DIR, '05_mobile_320px_tracker.png');
  await page.screenshot({ path: screen5Path, fullPage: false });
  console.log(`Saved: ${screen5Path}`);

  await browser.close();
  console.log('Playwright test completed successfully!');
}

run().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
