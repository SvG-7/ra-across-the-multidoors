const { chromium } = require('playwright');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/saish/.gemini/antigravity/brain/935f113b-6f1a-4ec0-b6c8-50be60006ca4';
const BASE_URL = 'https://svg-7.github.io/ra-across-the-multidoors/';

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log('Capturing mid-transition frames for all Spider-Man animations...');
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch (e) {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  }
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
    isMobile: true,
    hasTouch: true,
  });

  const page = await context.newPage();
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  // 1. Welcome -> Select -> Entry animation
  const hallBtn = await page.locator('button:has-text("Residence hall")').first();
  await hallBtn.click();
  await sleep(300);

  // Click Watch Spider-Man Pull Entrance Doors and snapshot at 300ms
  const replayEntryBtn = await page.locator('button:has-text("Watch Spider-Man Pull Entrance Doors")').first();
  await replayEntryBtn.click();
  await sleep(320);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'anim_01_entry_pull.png') });
  console.log('Captured anim_01_entry_pull.png');
  await sleep(1000);

  // Ch 1 -> Ch 2 (Swing)
  const enterCh2Btn = await page.locator('button:has-text("ENTER CHAPTER 2")').first();
  await enterCh2Btn.click();
  await sleep(350);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'anim_02_swing_1_to_2.png') });
  console.log('Captured anim_02_swing_1_to_2.png');
  await sleep(1000);

  // Ch 2 -> Ch 3 (Web Pull)
  const ch2Btn = await page.locator('button:has-text("Continue to Ch. 3")').first();
  await ch2Btn.click();
  await sleep(320);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'anim_03_web_pull_2_to_3.png') });
  console.log('Captured anim_03_web_pull_2_to_3.png');
  await sleep(1000);

  // Ch 3 -> Ch 4 (Dual Routes)
  const ch3Btn = await page.locator('button:has-text("Continue to Ch. 4")').first();
  await ch3Btn.click();
  await sleep(350);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'anim_04_dual_routes_3_to_4.png') });
  console.log('Captured anim_04_dual_routes_3_to_4.png');
  await sleep(1000);

  // Ch 4 -> Ch 5 (Border Crawl)
  const ch4Btn = await page.locator('button:has-text("Continue to Ch. 5")').first();
  await ch4Btn.click();
  await sleep(350);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'anim_05_crawl_4_to_5.png') });
  console.log('Captured anim_05_crawl_4_to_5.png');
  await sleep(1000);

  // Ch 5 -> Ch 6 (Hanging Flip)
  const ch5Btn = await page.locator('button:has-text("Continue to Ch. 6")').first();
  await ch5Btn.click();
  await sleep(380);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'anim_06_hanging_flip_5_to_6.png') });
  console.log('Captured anim_06_hanging_flip_5_to_6.png');
  await sleep(1000);

  // Ch 6 -> Ch 7 (Constellation)
  const ch6Btn = await page.locator('button:has-text("Continue to Ch. 7")').first();
  await ch6Btn.click();
  await sleep(380);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'anim_07_constellation_6_to_7.png') });
  console.log('Captured anim_07_constellation_6_to_7.png');
  await sleep(1000);

  await browser.close();
  console.log('Finished capturing all animation mid-frames!');
}

run();
