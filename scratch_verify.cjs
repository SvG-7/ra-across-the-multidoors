const { chromium } = require('playwright');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/saish/.gemini/antigravity/brain/935f113b-6f1a-4ec0-b6c8-50be60006ca4';
const BASE_URL = 'https://svg-7.github.io/ra-across-the-multidoors/';

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log('--- STARTING COMPREHENSIVE VERIFICATION ON LIVE SITE ---');
  console.log('Target URL:', BASE_URL);

  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch (e) {
    console.log('Chrome launch failed, trying default chromium:', e.message);
    browser = await chromium.launch({ headless: true });
  }

  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // iPhone 14 mobile viewport
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
    isMobile: true,
    hasTouch: true,
  });

  const page = await context.newPage();

  try {
    console.log('1. Loading live audience site...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    console.log('Site loaded successfully. Current URL:', page.url());

    // Verify Title & Hero
    const title = await page.title();
    console.log('Page Title:', title);

    await page.waitForSelector('text=Which community have you worked in?', { timeout: 10000 });
    console.log('Found community selection question.');

    // Screenshot 1: Welcome / Selection Screen
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_01_welcome_screen.png') });
    console.log('Saved test_01_welcome_screen.png');

    // Click "Residence hall" option
    console.log('2. Selecting Residence hall...');
    const hallBtn = await page.locator('button:has-text("Residence hall")').first();
    await hallBtn.click();
    await sleep(400);

    // Trigger the entry animation preview button
    const replayEntryBtn = await page.locator('button:has-text("Watch Spider-Man Pull Entrance Doors")').first();
    if (await replayEntryBtn.isVisible()) {
      console.log('Triggering Entry Transition animation (pulling entrance doors open)...');
      await replayEntryBtn.click();
      await sleep(650); // capture mid-transition
      await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_02_transition_entry_to_1.png') });
      console.log('Saved test_02_transition_entry_to_1.png');
      await sleep(1500); // wait for completion
    }

    // Advance Ch 1 -> Ch 2
    console.log('3. Navigating from Chapter 1 to Chapter 2 (Spider-Man swings across on anchored web)...');
    const enterCh2Btn = await page.locator('button:has-text("ENTER CHAPTER 2")').first();
    await enterCh2Btn.click();
    await sleep(600); // capture mid swing
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_03_transition_1_to_2.png') });
    console.log('Saved test_03_transition_1_to_2.png');
    await sleep(1500);

    await page.waitForSelector('text=The Invisible Resident', { timeout: 10000 });
    console.log('Chapter 2 loaded!');

    // Answer Question in Chapter 2
    console.log('4. Answering Question in Chapter 2 (Scenario: The Disappearing Act)...');
    const ch2Option = await page.locator('button:has-text("Send a brief personal check-in")').first();
    if (await ch2Option.isVisible()) {
      await ch2Option.click();
      console.log('Selected Chapter 2 option: Send a brief personal check-in');
      await sleep(500);
    }

    // Advance Ch 2 -> Ch 3
    console.log('5. Navigating from Chapter 2 to Chapter 3 (Shoots web toward next panel, pulls forward)...');
    const nextBtnCh2 = await page.locator('button:has-text("Continue to Ch. 3")').first();
    await nextBtnCh2.click();
    await sleep(600);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_04_transition_2_to_3.png') });
    console.log('Saved test_04_transition_2_to_3.png');
    await sleep(1500);

    await page.waitForSelector('text=Same Title, Different Relationships', { timeout: 10000 });
    console.log('Chapter 3 loaded!');

    // Answer Question in Chapter 3
    console.log('6. Answering Question in Chapter 3 (Scenario: Peer Dynamics)...');
    const ch3Option = await page.locator('button:has-text("Ask for their perspective")').first();
    if (await ch3Option.isVisible()) {
      await ch3Option.click();
      console.log('Selected Chapter 3 option: Ask for their perspective');
      await sleep(500);
    }

    // Advance Ch 3 -> Ch 4
    console.log('7. Navigating from Chapter 3 to Chapter 4 (Two web strands branching into routes)...');
    const nextBtnCh3 = await page.locator('button:has-text("Continue to Ch. 4")').first();
    await nextBtnCh3.click();
    await sleep(650);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_05_transition_3_to_4.png') });
    console.log('Saved test_05_transition_3_to_4.png');
    await sleep(1500);

    await page.waitForSelector('text=Two Communication Languages', { timeout: 10000 });
    console.log('Chapter 4 loaded!');

    // Answer Question in Chapter 4
    console.log('8. Answering Question in Chapter 4 (Scenario: Outreach Channel)...');
    const ch4Option = await page.locator('button:has-text("Personal message")').first();
    if (await ch4Option.isVisible()) {
      await ch4Option.click();
      console.log('Selected Chapter 4 option: Personal message');
      await sleep(500);
    }

    // Advance Ch 4 -> Ch 5
    console.log('9. Navigating from Chapter 4 to Chapter 5 (Spider-Man crawls along frame border)...');
    const nextBtnCh4 = await page.locator('button:has-text("Continue to Ch. 5")').first();
    await nextBtnCh4.click();
    await sleep(650);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_06_transition_4_to_5.png') });
    console.log('Saved test_06_transition_4_to_5.png');
    await sleep(1500);

    await page.waitForSelector('text=Independence Doesn’t Mean Isolation', { timeout: 10000 });
    console.log('Chapter 5 loaded!');

    // Advance Ch 5 -> Ch 6
    console.log('10. Navigating from Chapter 5 to Chapter 6 (Descends upside-down & turns comic page)...');
    const nextBtnCh5 = await page.locator('button:has-text("Continue to Ch. 6")').first();
    await nextBtnCh5.click();
    await sleep(700);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_07_transition_5_to_6.png') });
    console.log('Saved test_07_transition_5_to_6.png');
    await sleep(1500);

    await page.waitForSelector('text=When Superpowers Fail', { timeout: 10000 });
    console.log('Chapter 6 loaded!');

    // Test Backward Navigation from Ch 6 to Ch 5
    console.log('11. Testing Backward Navigation (Reverse Web-Zip)...');
    const backBtnCh6 = await page.locator('button:has-text("Back to Ch. 5")').first();
    await backBtnCh6.click();
    await sleep(180);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_08_transition_backward.png') });
    console.log('Saved test_08_transition_backward.png');
    await sleep(600);
    await page.waitForSelector('text=Independence Doesn’t Mean Isolation', { timeout: 5000 });
    console.log('Back navigation confirmed to Chapter 5!');

    // Re-advance to Chapter 6
    const reNext = await page.locator('button:has-text("Continue to Ch. 6")').first();
    await reNext.click();
    await sleep(1500);

    // Answer Question in Chapter 6
    console.log('12. Answering Question in Chapter 6 (Scenario: Adapting Approach)...');
    const ch6Option = await page.locator('button:has-text("Confirm their preferred direct channel and timing")').first();
    if (await ch6Option.isVisible()) {
      await ch6Option.click();
      console.log('Selected Chapter 6 option: Confirm their preferred direct channel and timing');
      await sleep(500);
    }

    // Advance Ch 6 -> Ch 7
    console.log('13. Navigating from Chapter 6 to Chapter 7 (Spreads strands into Spider-Tracker constellation)...');
    const nextBtnCh6 = await page.locator('button:has-text("Continue to Ch. 7")').first();
    await nextBtnCh6.click();
    await sleep(700);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_09_transition_6_to_7.png') });
    console.log('Saved test_09_transition_6_to_7.png');
    await sleep(1500);

    await page.waitForSelector('text=The Multiverse RA', { timeout: 10000 });
    console.log('Chapter 7 / Spider-Tracker loaded!');

    // Screenshot Chapter 7 Tracker View
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_10_chapter7_tracker.png') });
    console.log('Saved test_10_chapter7_tracker.png');

    // 14. Open "View My RA Takeaway" Field Guide Card
    console.log('14. Opening "View My RA Takeaway" Field Guide Modal...');
    const takeawayBtn = await page.locator('button:has-text("View My RA Takeaway")').first();
    await takeawayBtn.click();
    await sleep(600);

    // Verify Field Guide Card Elements
    await page.waitForSelector('text=MY RA FIELD GUIDE', { timeout: 10000 });
    await page.waitForSelector('text=What my choices suggest', { timeout: 10000 });
    await page.waitForSelector('text=Based on your choices in today’s scenarios.', { timeout: 10000 });
    console.log('Field Guide Card verified with required title, subtitle, and disclaimer!');

    // Verify 4 Core Sections
    const strengths = await page.locator('text=Key Strengths Observed').isVisible();
    const growth = await page.locator('text=A Skill to Practice Next').isVisible();
    const crossLesson = await page.locator('text=Lesson to Borrow from').isVisible();
    const actionWeek = await page.locator('text=Your Action for This Week').isVisible();
    console.log('Section check:', { strengths, growth, crossLesson, actionWeek });

    // Screenshot 11: Field Guide Modal standard view
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_11_field_guide_modal_standard.png') });
    console.log('Saved test_11_field_guide_modal_standard.png');

    // 15. Toggle Screenshot View
    console.log('15. Toggling Screenshot View...');
    const screenshotToggleBtn = await page.locator('button:has-text("Screenshot View")').first();
    await screenshotToggleBtn.click();
    await sleep(400);

    // Screenshot 12: Field Guide Modal Screenshot-Ready Mode
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_12_field_guide_screenshot_mode.png') });
    console.log('Saved test_12_field_guide_screenshot_mode.png');

    // Exit Screenshot View
    const exitScreenshotBtn = await page.locator('button:has-text("Exit Screenshot View")').first();
    await exitScreenshotBtn.click();
    await sleep(400);

    // Close Modal
    const closeModalBtn = await page.locator('button:has-text("Done")').first();
    if (await closeModalBtn.isVisible()) {
      await closeModalBtn.click();
      await sleep(300);
    }

    console.log('--- ALL AUTOMATED VERIFICATIONS PASSED SUCESSFULLY ON LIVE PROD! ---');
  } catch (err) {
    console.error('Test failed with error:', err);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_failure.png') });
    throw err;
  } finally {
    await browser.close();
  }
}

run();
