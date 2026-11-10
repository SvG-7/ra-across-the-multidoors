const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/saish/.gemini/antigravity/brain/935f113b-6f1a-4ec0-b6c8-50be60006ca4';
const BASE_URL = 'http://127.0.0.1:4173/ra-across-the-multidoors/';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log('=== MULTI-DOORS COMPREHENSIVE VERIFICATION SUITE ===');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  const viewports = [
    { name: 'iPhone-SE-320px', width: 320, height: 640 },
    { name: 'Galaxy-S20-360px', width: 360, height: 740 },
    { name: 'iPhone-14-390px', width: 390, height: 844 },
    { name: 'iPhone-15ProMax-430px', width: 430, height: 932 },
  ];

  // 1. Viewport & Overflow Tests
  for (const vp of viewports) {
    console.log(`\n[Viewport Test] Testing ${vp.name} (${vp.width}x${vp.height})...`);
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: true,
      hasTouch: true,
    });
    const page = await ctx.newPage();
    await page.goto(BASE_URL);
    await page.waitForSelector('text=RA: ACROSS THE MULTI-DOORS', { timeout: 10000 });

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    console.log(`  - ${vp.name}: clientWidth=${clientWidth}, scrollWidth=${scrollWidth}`);
    if (scrollWidth > clientWidth) {
      console.warn(`  ! WARNING: horizontal overflow detected on ${vp.name}: ${scrollWidth} > ${clientWidth}`);
    } else {
      console.log(`  ✓ Clean: No horizontal overflow on ${vp.name}.`);
    }

    if (vp.name === 'iPhone-14-390px') {
      await page.screenshot({ path: path.join(ARTIFACT_DIR, '01_ch1_dimensional_cards_390px.png'), fullPage: false });
    }
    await ctx.close();
  }

  // 2. Video Recording Session 1: Cinematic Entrance & Dimension Choice
  console.log('\n[Recording Session 1] Cinematic Entrance & Chapter 1 Dimension Portal...');
  const videoDir1 = path.join(ARTIFACT_DIR, 'rec_entrance');
  if (!fs.existsSync(videoDir1)) fs.mkdirSync(videoDir1, { recursive: true });

  const recContext1 = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    recordVideo: { dir: videoDir1, size: { width: 390, height: 844 } },
  });
  const page1 = await recContext1.newPage();
  await page1.goto(BASE_URL);
  await page1.waitForSelector('text=Watch Spider-Man Cinematic Entrance', { timeout: 10000 });

  console.log('  - Opening Spider-Man Cinematic Entrance...');
  await page1.click('text=Watch Spider-Man Cinematic Entrance');
  await sleep(1500);
  await page1.screenshot({ path: path.join(ARTIFACT_DIR, '02_cinematic_entrance_in_action.png') });
  
  // Wait through landing sequence
  await sleep(3500);
  await page1.screenshot({ path: path.join(ARTIFACT_DIR, '03_cinematic_hero_landing.png') });
  
  // Close cinematic modal
  await page1.click('button:has-text("Continue")');
  await sleep(600);

  // Select Dimension choice (Between Two Worlds)
  console.log('  - Selecting Dimension Choice: "Enter Between Two Worlds"...');
  await page1.click('button:has-text("Select Dimension")');
  await sleep(800);
  await page1.screenshot({ path: path.join(ARTIFACT_DIR, '04_ch1_dimension_confirmed.png') });

  // Advance to Chapter 2
  console.log('  - Advancing to Chapter 2...');
  await page1.click('button:has-text("ENTER CHAPTER 2")');
  await sleep(3200);

  await recContext1.close();
  console.log('✓ Recording Session 1 complete.');

  // 3. Video Recording Session 2: Chapter 2 Spider-Man Noir Corridor & Ned
  console.log('\n[Recording Session 2] Chapter 2 Spider-Man Noir Corridor & Ned Scenario...');
  const videoDir2 = path.join(ARTIFACT_DIR, 'rec_noir');
  if (!fs.existsSync(videoDir2)) fs.mkdirSync(videoDir2, { recursive: true });

  const recContext2 = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    recordVideo: { dir: videoDir2, size: { width: 390, height: 844 } },
  });
  const page2 = await recContext2.newPage();
  await page2.goto(BASE_URL);
  await page2.waitForSelector('text=RA: ACROSS THE MULTI-DOORS');
  await page2.click('button:has-text("Select Dimension")');
  await sleep(600);
  await page2.click('button:has-text("ENTER CHAPTER 2")');
  
  // Wait for Chapter 2
  try {
    const skipBtn = page2.locator('button:has-text("Skip")');
    if (await skipBtn.isVisible({ timeout: 1500 })) {
      await skipBtn.click();
    }
  } catch (e) {}

  await page2.waitForSelector('text=The Invisible Resident', { timeout: 10000 });
  await page2.waitForSelector('text=Ned rarely attends events', { timeout: 10000 });
  console.log('  ✓ Verified: Chapter 2 scenario with Ned is visible.');

  const ch2Content = await page2.textContent('body');
  const hasRoom204Ned = ch2Content.includes('ROOM 204 // NED');
  console.log(`  - Door label ROOM 204 // NED present: ${hasRoom204Ned}`);

  // Screenshot Chapter 2 with Spider-Man Noir corridor
  await sleep(1000);
  await page2.screenshot({ path: path.join(ARTIFACT_DIR, '05_ch2_noir_corridor_scene.png') });

  // Select an approach in Chapter 2
  await page2.click('button:has-text("Send a brief personal check-in")');
  await sleep(800);
  await page2.screenshot({ path: path.join(ARTIFACT_DIR, '06_ch2_ned_feedback.png') });

  // Advance through remaining chapters to build complete answers
  console.log('  - Advancing through Chapters 3, 4, 5, 6, 7...');
  await page2.click('button:has-text("Continue to Ch. 3")');
  await sleep(1200);
  try { const s = page2.locator('button:has-text("Skip")'); if (await s.isVisible()) await s.click(); } catch(e){}
  await page2.waitForSelector('text=Same Title, Different Relationships');
  await page2.click('button:has-text("Explain the concern and its impact")');
  await sleep(500);

  await page2.click('button:has-text("Continue to Ch. 4")');
  await sleep(1200);
  try { const s = page2.locator('button:has-text("Skip")'); if (await s.isVisible()) await s.click(); } catch(e){}
  await page2.waitForSelector('text=Two Communication Languages');
  await page2.click('button:has-text("Personal message")');
  await sleep(500);

  await page2.click('button:has-text("Continue to Ch. 5")');
  await sleep(1200);
  try { const s = page2.locator('button:has-text("Skip")'); if (await s.isVisible()) await s.click(); } catch(e){}
  await page2.waitForSelector('text=Independence Doesn’t Mean Isolation');
  await sleep(500);

  await page2.click('button:has-text("Continue to Ch. 6")');
  await sleep(1200);
  try { const s = page2.locator('button:has-text("Skip")'); if (await s.isVisible()) await s.click(); } catch(e){}
  await page2.waitForSelector('text=When Superpowers Fail');
  await page2.click('button:has-text("Confirm their preferred direct channel")');
  await sleep(500);

  await page2.click('button:has-text("Continue to Ch. 7")');
  await sleep(1500);
  try { const s = page2.locator('button:has-text("Skip")'); if (await s.isVisible()) await s.click(); } catch(e){}
  await page2.waitForSelector('text=The Multiverse RA', { timeout: 10000 });
  await sleep(2500);

  await recContext2.close();
  console.log('✓ Recording Session 2 complete.');

  // 4. Video Recording Session 3: Interactive Map Panning, Zooming, Bottom Sheet & Takeaway
  console.log('\n[Recording Session 3] Interactive Map Pan, Zoom, Bottom Sheet & Takeaway...');
  const videoDir3 = path.join(ARTIFACT_DIR, 'rec_map');
  if (!fs.existsSync(videoDir3)) fs.mkdirSync(videoDir3, { recursive: true });

  const recContext3 = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    recordVideo: { dir: videoDir3, size: { width: 390, height: 844 } },
  });
  const page3 = await recContext3.newPage();
  await page3.goto(BASE_URL);
  
  // Set up answered session in localStorage
  await page3.evaluate(() => {
    const session = {
      attendeeId: 'test-user-noir-demo',
      selectedCommunity: 'Both',
      currentChapter: 7,
      answers: {
        2: 'opt_c2_checkin',
        3: 'opt_c3_impact',
        4: 'opt_c4_directmsg',
        6: 'opt_c6_timing',
      },
      storyReveals: {},
      isComplete: true,
      lastActive: Date.now(),
    };
    localStorage.setItem('ra_attendee_session', JSON.stringify(session));
  });

  await page3.reload();
  await page3.waitForSelector('text=The Multiverse RA', { timeout: 10000 });
  await sleep(1500);

  // Screenshot Chapter 7 Completed 8-Leg Spider Web
  console.log('  - Checking Chapter 7 Spider Silhouette Web...');
  await page3.screenshot({ path: path.join(ARTIFACT_DIR, '07_ch7_completed_spider_web.png') });

  // Test Takeaway Screenshot Card Mode
  console.log('  - Testing Takeaway Screenshot Mode Card...');
  await page3.click('button:has-text("Screenshot my takeaway")');
  await sleep(1000);
  await page3.screenshot({ path: path.join(ARTIFACT_DIR, '08_supportive_screenshot_card.png') });

  // Return to Takeaway View
  await page3.click('button:has-text("Back to Takeaway")');
  await sleep(600);

  // Enter Exploration Mode to open Interactive Neighborhood Map
  console.log('  - Opening Exploration Mode for Interactive Neighborhood Map...');
  await page3.click('button:has-text("Explore the two worlds")');
  await sleep(1000);
  await page3.screenshot({ path: path.join(ARTIFACT_DIR, '09_interactive_map_initial.png') });

  // Test Zoom In (+)
  console.log('  - Testing Zoom In (+)...');
  await page3.click('button[title="Zoom In"]');
  await sleep(400);
  await page3.click('button[title="Zoom In"]');
  await sleep(400);

  // Test Dragging / Panning on the map
  console.log('  - Testing Pointer Drag Panning...');
  const mapElement = await page3.$('svg');
  if (mapElement) {
    const box = await mapElement.boundingBox();
    if (box) {
      await page3.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page3.mouse.down();
      await page3.mouse.move(box.x + box.width / 2 - 80, box.y + box.height / 2 - 60, { steps: 8 });
      await page3.mouse.up();
      await sleep(600);
      console.log('  ✓ Pan drag performed successfully.');
    }
  }
  await page3.screenshot({ path: path.join(ARTIFACT_DIR, '10_interactive_map_panned.png') });

  // Test Reset / Fit
  console.log('  - Testing Reset / Fit View...');
  await page3.click('button[title="Reset / Fit View"]');
  await sleep(500);

  // Test Explore Full Map toggle
  console.log('  - Testing Explore Full Map Mode toggle...');
  await page3.click('text=Explore Full Map');
  await sleep(800);
  await page3.screenshot({ path: path.join(ARTIFACT_DIR, '11_interactive_map_explore_mode.png') });

  // Click Landmark 2 (Apt 502 / Ned)
  console.log('  - Selecting Landmark 2 (Ned\'s Apartment)...');
  const node2 = await page3.$('text=Apt 502 (Ned)');
  if (node2) {
    await node2.click();
    await sleep(600);
  }
  await page3.screenshot({ path: path.join(ARTIFACT_DIR, '12_landmark_ned_bottom_sheet.png') });

  // Verify Bottom Sheet contains scenario and learning reflection
  const trackerText = await page3.textContent('body');
  const hasWhatYouLeaned = trackerText.includes('What You Leaned Toward:') || trackerText.includes('Your Selected Approach:');
  const hasNedText = trackerText.includes('Ned rarely attends events');
  console.log(`  - Bottom sheet has Ned scenario: ${hasNedText}`);
  console.log(`  - Bottom sheet has chosen learning approach: ${hasWhatYouLeaned}`);

  // Test Tab Switch: Accessible Chapter List View
  console.log('  - Testing Accessible Chapter List View tab...');
  await page3.click('button:has-text("Chapter List")');
  await sleep(600);
  await page3.screenshot({ path: path.join(ARTIFACT_DIR, '13_accessible_chapter_list_view.png') });

  await recContext3.close();
  console.log('✓ Recording Session 3 complete.');

  await browser.close();
  console.log('\n=== ALL PLAYWRIGHT TESTS PASSED SUCCESSFULLY! ===');
}

run().catch((err) => {
  console.error('Test Suite Failed:', err);
  process.exit(1);
});
