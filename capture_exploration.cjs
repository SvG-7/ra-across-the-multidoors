const { chromium } = require('playwright');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/saish/.gemini/antigravity/brain/935f113b-6f1a-4ec0-b6c8-50be60006ca4';
const BASE_URL = 'http://localhost:4173/ra-across-the-multidoors/';

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
    isMobile: true,
    hasTouch: true,
  });
  const page = await ctx.newPage();

  // Pre-seed completed session in Chapter 7 with all 4 decisions answered
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.setItem(
      'ra_attendee_session',
      JSON.stringify({
        attendeeId: 'verified-attendee-7',
        currentChapter: 7,
        community: 'Residence hall',
        answers: {
          2: 'opt_c2_checkin',
          3: 'opt_c3_perspective',
          4: 'opt_c4_directmsg',
          6: 'opt_c6_shorter',
        },
        hasCompleted: true,
      })
    );
  });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await sleep(1500);

  // 1. Capture Chapter 6 portal door open to verify Ch 6 artwork
  await page.evaluate(() => {
    const raw = localStorage.getItem('ra_attendee_session');
    if (raw) {
      const s = JSON.parse(raw);
      s.currentChapter = 6;
      localStorage.setItem('ra_attendee_session', JSON.stringify(s));
    }
  });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await sleep(1000);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'portal_ch6_shifting_anchors.png') });
  console.log('Saved portal_ch6_shifting_anchors.png');

  // Jump back to Chapter 7
  await page.evaluate(() => {
    const raw = localStorage.getItem('ra_attendee_session');
    if (raw) {
      const s = JSON.parse(raw);
      s.currentChapter = 7;
      localStorage.setItem('ra_attendee_session', JSON.stringify(s));
    }
  });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await sleep(1200);

  // 2. Open Screenshot Mode
  console.log('Capturing Screenshot Mode...');
  const ssBtn = page.locator('button:has-text("Screenshot my takeaway")').first();
  await ssBtn.click();
  await sleep(600);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'takeaway_screenshot_mode.png') });
  console.log('Saved takeaway_screenshot_mode.png');

  // Return to Takeaway
  const backBtn = page.locator('button:has-text("Back to Takeaway")').first();
  await backBtn.click();
  await sleep(500);

  // 3. Open Exploration Mode
  console.log('Capturing Exploration Mode & Peer Comparisons...');
  const exploreBtn = page.locator('button:has-text("Explore the two worlds")').first();
  await exploreBtn.click();
  await sleep(800);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'exploration_neighborhood_map.png') });
  console.log('Saved exploration_neighborhood_map.png');

  // Scroll down to Peer Comparisons
  const peerBanner = page.locator('text=Here are some other approaches people explored').first();
  if (await peerBanner.isVisible()) {
    await peerBanner.scrollIntoViewIfNeeded();
    await sleep(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'peer_comparisons_supportive.png') });
    console.log('Saved peer_comparisons_supportive.png');
  }

  await browser.close();
  console.log('=== EXPLORATION & SCREENSHOT CAPTURE COMPLETE ===');
}

run();
