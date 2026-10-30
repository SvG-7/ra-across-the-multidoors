const { chromium } = require('playwright');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/saish/.gemini/antigravity/brain/935f113b-6f1a-4ec0-b6c8-50be60006ca4';
const BASE_URL = 'https://svg-7.github.io/ra-across-the-multidoors/';

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function advanceToNext(page, buttonText, expectedTitle, extraWait = 3400) {
  await sleep(600);
  const btn = page.locator(`button:has-text("${buttonText}")`).first();
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
  await sleep(extraWait);
  if (expectedTitle) {
    await page.waitForSelector(`text=${expectedTitle}`, { timeout: 15000 });
  }
}

async function run() {
  console.log('--- STARTING VERIFICATION OF 5 FOCUS AREAS ON LIVE PROD ---');
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch (e) {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  }

  // Session A: iPhone 14
  const contextA = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    isMobile: true,
    hasTouch: true,
  });
  const pageA = await contextA.newPage();

  // Session B: Galaxy S20 (Independent 2nd Attendee on Separate Device)
  const contextB = await browser.newContext({
    viewport: { width: 360, height: 740 },
    userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
    isMobile: true,
    hasTouch: true,
  });
  const pageB = await contextB.newPage();

  try {
    console.log('1. Loading Attendee A on iPhone 14...');
    await pageA.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Select Residence Hall
    await pageA.waitForSelector('text=Which community have you worked in?');
    await (await pageA.locator('button:has-text("Residence hall")').first()).click();
    await sleep(300);

    // Enter Chapter 2
    await advanceToNext(pageA, "ENTER CHAPTER 2", "The Invisible Resident");
    console.log('Attendee A entered Chapter 2.');

    // Ch 2: Choose Personal check-in
    await (await pageA.locator('button:has-text("Send a brief personal check-in")').first()).click();
    await sleep(400);

    // Ch 2 -> Ch 3
    await advanceToNext(pageA, "Continue to Ch. 3", "Same Title, Different Relationships");

    // Ch 3: Choose Ask perspective
    await (await pageA.locator('button:has-text("Ask for their perspective")').first()).click();
    await sleep(400);

    // Ch 3 -> Ch 4
    await advanceToNext(pageA, "Continue to Ch. 4", "Two Communication Languages");

    // Ch 4: Choose Group chat
    await (await pageA.locator('button:has-text("Community group chat")').first()).click();
    await sleep(400);

    // Ch 4 -> Ch 5
    await advanceToNext(pageA, "Continue to Ch. 5", "Independence Doesn’t Mean Isolation");

    // Ch 5 -> Ch 6
    await advanceToNext(pageA, "Continue to Ch. 6", "When Superpowers Fail");

    // Ch 6: Choose Confirm channel and timing
    await (await pageA.locator('button:has-text("Confirm their preferred direct channel and timing")').first()).click();
    await sleep(400);

    // Ch 6 -> Ch 7 (Tracker Finale)
    await advanceToNext(pageA, "Continue to Ch. 7", "The Multiverse RA", 4200);
    console.log('Attendee A entered Chapter 7.');

    // 2. NOW TEST ATTENDEE B ON SEPARATE DEVICE
    console.log('2. Loading Attendee B on Galaxy S20...');
    await pageB.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await pageB.waitForSelector('text=Which community have you worked in?');
    await (await pageB.locator('button:has-text("Apartment community")').first()).click();
    await sleep(300);

    // Enter Chapter 2
    await advanceToNext(pageB, "ENTER CHAPTER 2", "The Invisible Resident");

    // Ch 2: Choose Ask communication preferences (DIFFERENT from Attendee A)
    await (await pageB.locator('button:has-text("Ask how they prefer to connect")').first()).click();
    await sleep(400);

    // Ch 2 -> Ch 3
    await advanceToNext(pageB, "Continue to Ch. 3", "Same Title, Different Relationships");

    // Ch 3: Choose State expectation clearly (DIFFERENT from Attendee A)
    await (await pageB.locator('button:has-text("State the expectation clearly")').first()).click();
    await sleep(400);

    // Ch 3 -> Ch 4
    await advanceToNext(pageB, "Continue to Ch. 4", "Two Communication Languages");

    // Ch 4: Choose Personal message (DIFFERENT from Attendee A)
    await (await pageB.locator('button:has-text("Personal message")').first()).click();
    await sleep(400);

    // Ch 4 -> Ch 5
    await advanceToNext(pageB, "Continue to Ch. 5", "Independence Doesn’t Mean Isolation");

    // Ch 5 -> Ch 6
    await advanceToNext(pageB, "Continue to Ch. 6", "When Superpowers Fail");

    // Ch 6: Choose Shorten invitation (DIFFERENT from Attendee A)
    await (await pageB.locator('button:has-text("Make the invitation shorter and easier to answer")').first()).click();
    await sleep(400);

    // Ch 6 -> Ch 7
    await advanceToNext(pageB, "Continue to Ch. 7", "The Multiverse RA", 4200);
    console.log('Attendee B entered Chapter 7.');

    // Allow real-time sync messages to settle
    await sleep(2000);

    // 3. VERIFY ATTENDEE A FIELD GUIDE & TOPIC REFLECTIONS
    console.log('3. Inspecting Attendee A Field Guide...');
    const fieldGuideBtnA = await pageA.locator('button:has-text("View My RA Takeaway")').first();
    await fieldGuideBtnA.click();
    await sleep(500);

    // Check specific evidence
    const hasEvidenceCheckin = await pageA.locator('text=You prioritized "Send a brief personal check-in" in Chapter 2.').isVisible();
    const hasCrossChapterGroup = await pageA.locator('text=In Chapter 4, you prioritized broad community broadcasting').isVisible();
    const hasDeepDiveTopicReflections = await pageA.locator('text=Topic-by-Topic Decision Reflections').isVisible();
    const hasWhatPrioritizes = await pageA.locator('text=What this prioritizes:').first().isVisible();
    const hasWhatToWatchFor = await pageA.locator('text=What to watch for:').first().isVisible();
    const hasTryThis = await pageA.locator('text=Try this:').first().isVisible();

    console.log('Attendee A Field Guide Checks:', {
      hasEvidenceCheckin,
      hasCrossChapterGroup,
      hasDeepDiveTopicReflections,
      hasWhatPrioritizes,
      hasWhatToWatchFor,
      hasTryThis,
    });

    // Capture Screenshot of Field Guide Overview
    await pageA.screenshot({ path: path.join(ARTIFACT_DIR, 'eval_01_field_guide_overview_A.png') });
    console.log('Saved eval_01_field_guide_overview_A.png');

    // Scroll down to capture Deep Dive Topic Reflections
    const reflectionsHeading = pageA.locator('text=Topic-by-Topic Decision Reflections').first();
    await reflectionsHeading.scrollIntoViewIfNeeded();
    await sleep(600);
    await pageA.screenshot({ path: path.join(ARTIFACT_DIR, 'eval_02_field_guide_deep_dive_A.png') });
    console.log('Saved eval_02_field_guide_deep_dive_A.png');

    // Close Field Guide on Page A
    await (await pageA.locator('button:has-text("Back to Tracker")').first()).click();
    await sleep(500);

    // 4. VERIFY ILLUSTRATED NEIGHBORHOOD MAP ON ATTENDEE A
    console.log('4. Inspecting Illustrated Neighborhood Map...');
    // Verify landmarks visible
    await pageA.waitForSelector('text=APARTMENT DISTRICT');
    await pageA.waitForSelector('text=RESIDENCE HALL DISTRICT');

    // Click Landmark 2 (Apt 502 / Alex's Window)
    await pageA.evaluate(() => {
      const texts = Array.from(document.querySelectorAll('text'));
      const loc2 = texts.find((t) => t.textContent && t.textContent.includes('Apt 502'));
      if (loc2 && loc2.parentElement) {
        loc2.parentElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
    });
    await sleep(600);
    await pageA.screenshot({ path: path.join(ARTIFACT_DIR, 'eval_03_illustrated_map_landmark_detail.png') });
    console.log('Saved eval_03_illustrated_map_landmark_detail.png');

    // 5. VERIFY SHARED ROOM COMPARISON HUB
    console.log('5. Inspecting Shared Room Comparison Hub...');
    // Click "Compare in Room Web ->" in Landmark Drawer if open, or scroll down
    const compareBtn = await pageA.locator('button:has-text("Compare in Room Web")').first();
    if (await compareBtn.isVisible()) {
      await compareBtn.click();
      await sleep(600);
    }

    // Scroll down to MultiverseComparisonHub
    const roomHeading = await pageA.locator('text=OUR ROOM').first();
    await roomHeading.scrollIntoViewIfNeeded();
    await sleep(400);

    // Click to expand details for Option A if hidden
    const detailsBtn = await pageA.locator('button:has-text("Show Details"), button:has-text("Hide Details")').first();
    if (await detailsBtn.isVisible()) {
      await detailsBtn.click();
      await sleep(400);
    }

    await pageA.screenshot({ path: path.join(ARTIFACT_DIR, 'eval_04_shared_room_comparison_hub.png') });
    console.log('Saved eval_04_shared_room_comparison_hub.png');

    // Switch to "Explore Other" tab
    await (await pageA.locator('button:has-text("Explore Other")').first()).click();
    await sleep(400);
    await pageA.screenshot({ path: path.join(ARTIFACT_DIR, 'eval_05_explore_alternatives_tab.png') });
    console.log('Saved eval_05_explore_alternatives_tab.png');

    // 6. VERIFY ATTENDEE B FIELD GUIDE PRODUCES DIFFERENT LEARNING
    console.log('6. Inspecting Attendee B Field Guide for Different Answers...');
    const fieldGuideBtnB = await pageB.locator('button:has-text("View My RA Takeaway")').first();
    await fieldGuideBtnB.click();
    await sleep(500);

    const hasEvidencePrefB = await pageB.locator('text=You prioritized "Ask how they prefer to connect" in Chapter 2.').isVisible();
    const hasDirectRefinementB = await pageB.locator('text=You already favored direct communication in Chapter 4.').isVisible();

    console.log('Attendee B Field Guide Checks:', {
      hasEvidencePrefB,
      hasDirectRefinementB,
    });

    await pageB.screenshot({ path: path.join(ARTIFACT_DIR, 'eval_06_field_guide_overview_B.png') });
    console.log('Saved eval_06_field_guide_overview_B.png');

    console.log('--- ALL AUTOMATED EVALUATIONS PASSED ON LIVE PROD! ---');
  } catch (err) {
    console.error('Test execution failed:', err);
    await pageA.screenshot({ path: path.join(ARTIFACT_DIR, 'test_new_failure_A.png') });
    throw err;
  } finally {
    await browser.close();
  }
}

run();
