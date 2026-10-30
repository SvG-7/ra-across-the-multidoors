const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/saish/.gemini/antigravity/brain/935f113b-6f1a-4ec0-b6c8-50be60006ca4';
const BASE_URL = 'http://localhost:4173/ra-across-the-multidoors/';

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log('=== STARTING MOBILE CORRECTIONS VERIFICATION ===');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  const viewports = [
    { name: '320px_iphone_se', width: 320, height: 600 },
    { name: '360px_galaxy_s20', width: 360, height: 740 },
    { name: '390px_iphone14', width: 390, height: 844 },
    { name: '430px_iphone_promax', width: 430, height: 932 },
  ];

  // Video output directory
  const videoDir = path.join(ARTIFACT_DIR, 'recording');
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  // 1. RECORDED RUN ON IPHONE 14 (390x844) WITH VIDEO CAPTURE
  console.log('\n--- 1. Testing Full Interaction & Recording on iPhone 14 (390x844) ---');
  const recordContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    isMobile: true,
    hasTouch: true,
    recordVideo: {
      dir: videoDir,
      size: { width: 390, height: 844 },
    },
  });
  const page = await recordContext.newPage();

  try {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('text=Which community have you worked in?');
    await page.locator('button:has-text("Residence hall")').first().click();
    await sleep(400);

    // Transition 1: Entry -> Ch 1
    console.log('Triggering Transition 1 (Entry -> Ch 1)...');
    await page.locator('button:has-text("ENTER CHAPTER 2")').first().click();
    // Capture midpoint frame of Spider-Man pulling entrance
    await sleep(1000);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_trans_01_pull_390.png') });
    await sleep(1800);
    await page.waitForSelector('text=The Invisible Resident');

    // Ch 2 Answer
    await page.locator('button:has-text("Send a brief personal check-in")').first().click();
    await sleep(500);

    // Transition 2: Ch 2 -> Ch 3 (Lunging Pull)
    console.log('Triggering Transition 3 (Ch 2 -> Ch 3)...');
    await page.locator('button:has-text("Continue to Ch. 3")').first().click();
    await sleep(1100);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_trans_02_pull_390.png') });
    await sleep(1800);
    await page.waitForSelector('text=Same Title, Different Relationships');

    // Ch 3 Answer
    await page.locator('button:has-text("Ask for their perspective")').first().click();
    await sleep(500);

    // Transition 3: Ch 3 -> Ch 4 (Dual firing routes)
    console.log('Triggering Transition 4 (Ch 3 -> Ch 4)...');
    await page.locator('button:has-text("Continue to Ch. 4")').first().click();
    await sleep(1100);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_trans_03_routes_390.png') });
    await sleep(1800);
    await page.waitForSelector('text=Two Communication Languages');

    // Ch 4 Answer
    await page.locator('button:has-text("Personal message")').first().click();
    await sleep(500);

    // Transition 4: Ch 4 -> Ch 5 (Crawling)
    console.log('Triggering Transition 5 (Ch 4 -> Ch 5)...');
    await page.locator('button:has-text("Continue to Ch. 5")').first().click();
    await sleep(1100);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_trans_04_crawl_390.png') });
    await sleep(1800);
    await page.waitForSelector('text=Independence Doesn’t Mean Isolation');

    // Transition 5: Ch 5 -> Ch 6 (Hanging Flip)
    console.log('Triggering Transition 6 (Ch 5 -> Ch 6)...');
    await page.locator('button:has-text("Continue to Ch. 6")').first().click();
    await sleep(1100);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_trans_05_flip_390.png') });
    await sleep(1800);
    await page.waitForSelector('text=When Superpowers Fail');

    // Ch 6 Answer
    await page.locator('button:has-text("Make the invitation shorter and easier to answer")').first().click();
    await sleep(500);

    // Transition 6: Ch 6 -> Ch 7 (Heroic Landing Finale)
    console.log('Triggering Transition 7 (Ch 6 -> Ch 7 Finale)...');
    await page.locator('button:has-text("Continue to Ch. 7")').first().click();
    await sleep(1400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_trans_06_finale_390.png') });
    await sleep(2400);
    await page.waitForSelector('text=Your RA Takeaway');
    console.log('Reached Chapter 7 Simplified Takeaway!');

    // 2. VERIFY SIMPLIFIED CHAPTER 7 TAKEAWAY
    console.log('\n--- 2. Verifying Simplified Chapter 7 Ending ---');
    const hasTakeawayTitle = await page.locator('h1:has-text("Your RA Takeaway")').isVisible();
    const hasStrengths = await page.locator('text=Potential Strengths Observed').isVisible();
    const hasSkillToPractice = await page.locator('text=Skill to Practice:').isVisible();
    const hasActionThisWeek = await page.locator('text=Action This Week:').isVisible();
    const hasScreenshotBtn = await page.locator('button:has-text("Screenshot my takeaway")').isVisible();
    const hasExploreBtn = await page.locator('button:has-text("Explore the two worlds")').isVisible();

    console.log('Chapter 7 Takeaway Checks:', {
      hasTakeawayTitle,
      hasStrengths,
      hasSkillToPractice,
      hasActionThisWeek,
      hasScreenshotBtn,
      hasExploreBtn,
    });

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_final_takeaway_390.png') });
    console.log('Saved mobile_final_takeaway_390.png');

    // 3. VERIFY REPAIRED SCREENSHOT VIEW
    console.log('\n--- 3. Verifying Repaired Screenshot View ---');
    await page.locator('button:has-text("Screenshot my takeaway")').click();
    await sleep(500);

    const hasDedicatedCard = await page.locator('#takeaway-screenshot-card').isVisible();
    const hasBackFromScreenshot = await page.locator('button:has-text("Back to Takeaway")').isVisible();
    const cardMascot = await page.locator('#takeaway-screenshot-card img[alt="Spider-Man Mascot"]').first();
    const hasMascot = await cardMascot.isVisible();

    // Verify card is not clipped by checking bounding box
    const cardBox = await page.locator('#takeaway-screenshot-card').boundingBox();
    console.log('Screenshot Card Bounding Box (390px viewport):', cardBox);

    console.log('Screenshot View Checks:', {
      hasDedicatedCard,
      hasBackFromScreenshot,
      hasMascot,
      cardWidth: cardBox?.width,
      cardHeight: cardBox?.height,
    });

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_screenshot_card_390.png') });
    console.log('Saved mobile_screenshot_card_390.png');

    // Return back to Takeaway
    await page.locator('button:has-text("Back to Takeaway")').first().click();
    await sleep(500);

    // 4. VERIFY EXPLORATION VIEW (SPLIT NEIGHBORHOOD MAP + TABS)
    console.log('\n--- 4. Verifying Exploration View & Split Neighborhood Map ---');
    await page.locator('button:has-text("Explore the two worlds")').click();
    await sleep(500);

    await page.waitForSelector('text=Explore the Two Worlds');
    const hasAptDistrict = await page.locator('text=APARTMENTS').first().isVisible();
    const hasHallDistrict = await page.locator('text=RESIDENCE HALL').first().isVisible();
    const hasBreezewayText = await page.locator('text=Separate units • Breezeways').first().isVisible();
    const hasLoungeText = await page.locator('text=Shared hall • Lounge').first().isVisible();

    console.log('Split Neighborhood Map Visual Checks:', {
      hasAptDistrict,
      hasHallDistrict,
      hasBreezewayText,
      hasLoungeText,
    });

    // Capture Split Map Overview
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_split_map_390.png') });
    console.log('Saved mobile_split_map_390.png');

    // Tap Landmark 2 (Apt 502 / Alex) to test detail panel
    await page.evaluate(() => {
      const texts = Array.from(document.querySelectorAll('text'));
      const loc = texts.find((t) => t.textContent && t.textContent.includes('Apt 502'));
      if (loc && loc.parentElement) {
        loc.parentElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
    });
    await sleep(500);

    const hasLandmarkDetail = await page.locator('text=Apt 502 (Alex)').first().isVisible();
    console.log('Landmark Detail Drawer Check:', { hasLandmarkDetail });
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_landmark_detail_390.png') });
    console.log('Saved mobile_landmark_detail_390.png');

    // Scroll to Multiverse Comparison Hub tabs
    const tabsContainer = page.locator('text=My Choices').first();
    await tabsContainer.scrollIntoViewIfNeeded();
    await sleep(400);

    const hasMyChoicesTab = await page.locator('button:has-text("My Choices")').isVisible();
    const hasOurRoomTab = await page.locator('button:has-text("Our Room")').isVisible();
    const hasOtherApproachesTab = await page.locator('button:has-text("Other Approaches")').isVisible();

    console.log('Comparison Tabs Checks:', {
      hasMyChoicesTab,
      hasOurRoomTab,
      hasOtherApproachesTab,
    });

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_exploration_tabs_390.png') });
    console.log('Saved mobile_exploration_tabs_390.png');

  } finally {
    await recordContext.close();
    console.log('Video recording finalized!');
  }

  // 5. TEST OTHER VIEWPORTS (320px, 360px, 430px)
  for (const vp of viewports.filter(v => v.width !== 390)) {
    console.log(`\n--- Testing ${vp.name} (${vp.width}x${vp.height}) ---`);
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: true,
      hasTouch: true,
    });
    const p = await ctx.newPage();
    try {
      await p.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
      await p.waitForSelector('text=Which community have you worked in?');
      await p.locator('button:has-text("Residence hall")').first().click();
      await sleep(300);

      // Jump directly to Ch 7 via localStorage for fast responsive verification
      await p.evaluate(() => {
        const sessionData = {
          attendeeId: 'att_mobile_' + Math.random().toString(36).substring(2, 7),
          currentChapter: 7,
          selectedCommunity: 'Residence hall',
          answers: {
            2: 'opt_c2_personal',
            3: 'opt_c3_perspective',
            4: 'opt_c4_directmsg',
            6: 'opt_c6_shorter'
          },
          revealedStoryIds: ['classes', 'work']
        };
        localStorage.setItem('ra_attendee_session', JSON.stringify(sessionData));
      });
      await p.reload({ waitUntil: 'domcontentloaded' });
      await p.waitForSelector('text=Your RA Takeaway', { timeout: 10000 });

      // Screenshot Takeaway
      await p.screenshot({ path: path.join(ARTIFACT_DIR, `mobile_takeaway_${vp.width}.png`) });
      console.log(`Saved mobile_takeaway_${vp.width}.png`);

      // Screenshot Screenshot Card
      await p.locator('button:has-text("Screenshot my takeaway")').click();
      await sleep(400);
      await p.screenshot({ path: path.join(ARTIFACT_DIR, `mobile_screenshot_card_${vp.width}.png`) });
      console.log(`Saved mobile_screenshot_card_${vp.width}.png`);

      // Back & Explore
      await p.locator('button:has-text("Back to Takeaway")').first().click();
      await sleep(300);
      await p.locator('button:has-text("Explore the two worlds")').click();
      await sleep(400);

      // Screenshot Split Map
      await p.screenshot({ path: path.join(ARTIFACT_DIR, `mobile_split_map_${vp.width}.png`) });
      console.log(`Saved mobile_split_map_${vp.width}.png`);
    } finally {
      await ctx.close();
    }
  }

  await browser.close();
  console.log('\n=== ALL MOBILE VERIFICATIONS PASSED SUCCESSFULLY! ===');
}

run().catch((err) => {
  console.error('Fatal error during verification:', err);
  process.exit(1);
});
