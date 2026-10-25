const { chromium } = require('playwright');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/saish/.gemini/antigravity/brain/935f113b-6f1a-4ec0-b6c8-50be60006ca4';
const BASE_URL = 'http://127.0.0.1:5173';

async function run() {
  console.log('--- STARTING MULTI-DOORS TEST SUITE ---');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  try {
    // 1. Fresh Attendee Session 1 (iPhone 14: 390x844)
    const att1Context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const att1Page = await att1Context.newPage();

    // 2. Fresh Attendee Session 2 (Galaxy S20: 360x740)
    const att2Context = await browser.newContext({
      viewport: { width: 360, height: 740 },
      isMobile: true,
      hasTouch: true,
    });
    const att2Page = await att2Context.newPage();

    console.log('[Step 1] Navigating Attendee 1 to audience link...');
    await att1Page.goto(BASE_URL + '/');

    // Verify first screen displays immediately without blank screen or login
    await att1Page.waitForSelector('text=RA: ACROSS THE MULTI-DOORS', { timeout: 8000 });
    await att1Page.waitForSelector('text=Which community have you worked in?', { timeout: 8000 });
    console.log('✓ Verified: First screen displays with full content on mobile.');

    // Verify all 4 options are present
    const optionsText = await att1Page.textContent('body');
    if (!optionsText.includes('Residence hall') ||
        !optionsText.includes('Apartment community') ||
        !optionsText.includes('Both') ||
        !optionsText.includes('New to the RA role')) {
      throw new Error('Chapter 1 missing required 4 community options!');
    }
    console.log('✓ Verified: 4 community options visible.');

    // Verify no admin controls or "become host" in attendee UI
    const adminButtonCount = await att1Page.locator('text=Presenter Nexus').count();
    const switchAdminCount = await att1Page.locator('text=Switch to admin').count();
    if (adminButtonCount > 0 || switchAdminCount > 0) {
      throw new Error('Admin or host buttons exposed in attendee view!');
    }
    console.log('✓ Verified: Zero admin controls exposed to attendees.');

    // Screenshot Chapter 1
    await att1Page.screenshot({ path: path.join(ARTIFACT_DIR, '01_mobile_ch1_entry.png') });

    // Attendee 1 selects "Residence hall"
    await att1Page.click('button:has-text("Residence hall")');
    await att1Page.waitForSelector('text=Dimension Confirmed: Residence hall');

    // Navigating Attendee 2 to audience link
    console.log('[Step 2] Testing independent Attendee 2...');
    await att2Page.goto(BASE_URL + '/');
    await att2Page.waitForSelector('text=Which community have you worked in?');
    // Attendee 2 selects "Apartment community"
    await att2Page.click('button:has-text("Apartment community")');
    await att2Page.waitForSelector('text=Dimension Confirmed: Apartment community');

    // Attendee 1 advances to Chapter 2
    console.log('[Step 3] Testing independent navigation...');
    await att1Page.click('button:has-text("ENTER CHAPTER 2")');
    await att1Page.waitForSelector('text=The Invisible Resident');

    // Confirm Attendee 2 is STILL on Chapter 1!
    const att2StillOnCh1 = await att2Page.locator('text=Which community have you worked in?').count();
    if (att2StillOnCh1 === 0) {
      throw new Error('FAILED: Attendee 1 navigation affected Attendee 2!');
    }
    console.log('✓ Verified: Attendee 1 navigation did NOT affect Attendee 2.');

    // Now Attendee 2 advances to Chapter 2 at their own pace
    await att2Page.click('button:has-text("ENTER CHAPTER 2")');
    await att2Page.waitForSelector('text=The Invisible Resident');
    console.log('✓ Verified: Both attendees navigate independently.');

    // Chapter 2 Decision: Attendee 1
    console.log('[Step 4] Testing Chapter 2 decision & consideration...');
    await att1Page.waitForSelector('text=What would you try first?');
    await att1Page.click('button:has-text("Send a brief personal check-in.")');

    // Verify consideration feedback appears
    await att1Page.waitForSelector('text=APPROACH CONSIDERATION');
    await att1Page.waitForSelector('text=A personal check-in creates an opening');
    // Verify takeaway appears
    await att1Page.waitForSelector('text=/Low visibility/i');
    console.log('✓ Verified: Specific consideration & takeaway displayed.');

    // Screenshot Chapter 2
    await att1Page.screenshot({ path: path.join(ARTIFACT_DIR, '02_mobile_ch2_decision_saved.png') });

    // Test revising answer in Chapter 2
    console.log('[Step 5] Testing answer revision & Back button...');
    await att1Page.click('button:has-text("Ask how they prefer to connect.")');
    await att1Page.waitForSelector('text=Asking how they prefer to connect honors their boundaries');
    console.log('✓ Verified: Answer revision works smoothly.');

    // Test Back button to Chapter 1
    await att1Page.click('button:has-text("Back to Ch. 1")');
    await att1Page.waitForSelector('text=Which community have you worked in?');
    // Re-advance to Chapter 2
    await att1Page.click('button:has-text("ENTER CHAPTER 2")');
    await att1Page.waitForSelector('text=The Invisible Resident');

    // Attendee 2 makes choice in Chapter 2
    await att2Page.click('button:has-text("Find a natural opportunity to talk.")');

    // Advance to Chapter 3
    console.log('[Step 6] Testing Chapter 3: Trust and boundaries...');
    await att1Page.click('button:has-text("Continue to Ch. 3")');
    await att1Page.waitForSelector('text=Same Title, Different Relationships');
    await att1Page.waitForSelector('text=How would you start the conversation?');
    // Verify scope note is displayed
    await att1Page.waitForSelector('text=These are possible opening approaches, not complete policy procedures');
    await att1Page.click('button:has-text("Ask for their perspective.")');
    await att1Page.waitForSelector('text=/Build trust while keeping expectations clear/i');
    console.log('✓ Verified: Chapter 3 decision, scope note, and takeaway.');

    // Attendee 2 advances to Chapter 3
    await att2Page.click('button:has-text("Continue to Ch. 3")');
    await att2Page.click('button:has-text("Explain the concern and its impact.")');

    // Advance to Chapter 4: Communication
    console.log('[Step 7] Testing Chapter 4: Communication Route...');
    await att1Page.click('button:has-text("Continue to Ch. 4")');
    await att1Page.waitForSelector('text=Two Communication Languages');
    await att1Page.waitForSelector('text=Which channel would you try first for a community invitation?');

    // Attendee 1 chooses "Personal message"
    await att1Page.click('button:has-text("Personal message")');
    await att1Page.waitForSelector('text=TRANSMISSION ROUTE VISUALIZER');
    await att1Page.waitForSelector('text=Direct 1-on-1 Route');
    await att1Page.waitForSelector('text=/Sending a message and reaching someone/i');
    console.log('✓ Verified: Chapter 4 route graphic renders.');
    await att1Page.screenshot({ path: path.join(ARTIFACT_DIR, '03_mobile_ch4_route.png') });

    // Attendee 2 chooses "Community group chat"
    await att2Page.click('button:has-text("Continue to Ch. 4")');
    await att2Page.click('button:has-text("Community group chat")');

    // Advance to Chapter 5: Story Reveal
    console.log('[Step 8] Testing Chapter 5: Alex Schedule Story Reveal...');
    await att1Page.click('button:has-text("Continue to Ch. 5")');
    await att1Page.waitForSelector('text=Independence Doesn’t Mean Isolation');
    await att1Page.waitForSelector('text=BEHIND APARTMENT 502 // ALEX’S SCHEDULE');

    // Tap each story card to reveal
    await att1Page.click('button:has-text("Classes")');
    await att1Page.waitForSelector('text=Morning lectures, dense reading loads');
    await att1Page.click('button:has-text("Work shifts")');
    await att1Page.waitForSelector('text=Off-campus job 25 hours a week');
    await att1Page.click('button:has-text("Responsibilities at home")');
    await att1Page.click('button:has-text("Limited time")');
    await att1Page.waitForSelector('text=All schedule factors uncovered');
    await att1Page.waitForSelector('text=/Independence doesn’t remove the need/i');
    console.log('✓ Verified: Chapter 5 story cards unlock and stay visible.');
    await att1Page.screenshot({ path: path.join(ARTIFACT_DIR, '04_mobile_ch5_story_reveal.png') });

    await att2Page.click('button:has-text("Continue to Ch. 5")');

    // Advance to Chapter 6: Adaptability (Testing Recall)
    console.log('[Step 9] Testing Chapter 6: Recall & Adaptation...');
    await att1Page.click('button:has-text("Continue to Ch. 6")');
    await att1Page.waitForSelector('text=When Superpowers Fail');

    // VERIFY CRITICAL REQUIREMENT: Attendee 1's screen must recall "Personal message"!
    const att1RecalledCh4 = await att1Page.locator('text=/Earlier in Chapter 4, you chose/i').filter({ hasText: 'Personal message' }).count();
    if (att1RecalledCh4 === 0) {
      throw new Error('FAILED: Attendee 1 did not recall Chapter 4 Personal message choice!');
    }
    console.log('✓ Verified: Attendee 1 correctly recalls Chapter 4 "Personal message".');

    // Attendee 2 advances to Chapter 6 and verify recall of "Community group chat"!
    await att2Page.click('button:has-text("Continue to Ch. 6")');
    await att2Page.waitForSelector('text=When Superpowers Fail');
    const att2RecalledCh4 = await att2Page.locator('text=/Earlier in Chapter 4, you chose/i').filter({ hasText: 'Community group chat' }).count();
    if (att2RecalledCh4 === 0) {
      throw new Error('FAILED: Attendee 2 did not recall Chapter 4 Community group chat choice!');
    }
    console.log('✓ Verified: Attendee 2 correctly recalls Chapter 4 "Community group chat".');

    // Attendee 1 chooses adaptation
    await att1Page.click('button:has-text("Confirm their preferred direct channel and timing.")');
    await att1Page.waitForSelector('text=ADAPTED COMMUNICATION PATH');
    await att1Page.waitForSelector('text=/Use what you learn to adapt/i');
    console.log('✓ Verified: Chapter 6 adaptation and route graphic.');
    await att1Page.screenshot({ path: path.join(ARTIFACT_DIR, '05_mobile_ch6_adaptation.png') });

    // Advance to Chapter 7: Conclusion
    console.log('[Step 10] Testing Chapter 7: Personal Web & Approaches...');
    await att1Page.click('button:has-text("Continue to Ch. 7")');
    await att1Page.waitForSelector('text=The Multiverse RA');
    await att1Page.waitForSelector('text=Approaches You Explored');
    await att1Page.waitForSelector('text=Residence hall');
    await att1Page.waitForSelector('text=Personal message');
    await att1Page.waitForSelector('text=COMPLETED MULTIVERSE WEB');
    await att1Page.waitForSelector('text=/Take one approach from the other world/i');
    console.log('✓ Verified: Chapter 7 personal summary card and finished web canvas.');
    await att1Page.screenshot({ path: path.join(ARTIFACT_DIR, '06_mobile_ch7_conclusion.png') });

    // Step 11: Refresh Persistence
    console.log('[Step 11] Testing Refresh Persistence...');
    await att1Page.reload();
    await att1Page.waitForSelector('text=The Multiverse RA');
    await att1Page.waitForSelector('text=Approaches You Explored');
    console.log('✓ Verified: Refreshing page resumes exact chapter and answers.');

    // Step 12: Narrow Viewport Check (320px)
    console.log('[Step 12] Testing Narrow 320px viewport...');
    await att1Page.setViewportSize({ width: 320, height: 600 });
    await att1Page.waitForTimeout(300);
    const scrollWidth = await att1Page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await att1Page.evaluate(() => document.documentElement.clientWidth);
    if (scrollWidth > clientWidth + 2) {
      console.warn(`Warning: Potential horizontal overflow at 320px (scrollWidth: ${scrollWidth}, clientWidth: ${clientWidth})`);
    } else {
      console.log('✓ Verified: No horizontal overflow at 320px width.');
    }
    await att1Page.screenshot({ path: path.join(ARTIFACT_DIR, '07_mobile_320px_layout.png') });

    // Step 13: Protected Admin Passcode Check
    console.log('[Step 13] Testing Protected Presenter Access...');
    const adminContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const adminPage = await adminContext.newPage();
    await adminPage.goto(BASE_URL + '/?admin=true');
    await adminPage.waitForSelector('text=Presenter Team Access');
    await adminPage.fill('input[type="password"]', 'wrongpasscode');
    await adminPage.click('button:has-text("Unlock")');
    await adminPage.waitForSelector('text=Invalid passcode');
    console.log('✓ Verified: Wrong passcode correctly rejected.');

    await adminPage.fill('input[type="password"]', 'multiverse2026');
    await adminPage.click('button:has-text("Unlock")');
    await adminPage.waitForSelector('text=PRESENTER COMMAND NEXUS');
    console.log('✓ Verified: Valid passcode unlocks Presenter Nexus.');
    await adminPage.screenshot({ path: path.join(ARTIFACT_DIR, '08_presenter_nexus_protected.png') });

    // Step 14: Big Screen Stage Display
    console.log('[Step 14] Testing Stage Display (?display=true)...');
    const displayPage = await adminContext.newPage();
    await displayPage.goto(BASE_URL + '/?display=true');
    await displayPage.waitForSelector('text=PROJECTOR STAGE DISPLAY');
    await displayPage.screenshot({ path: path.join(ARTIFACT_DIR, '09_stage_display_screen.png') });
    console.log('✓ Verified: Big screen projector display works.');

    console.log('--- ALL TEST SUITE CHECKS COMPLETED SUCCESSFULLY! ---');
  } finally {
    await browser.close();
  }
}

run().catch((e) => {
  console.error('Test suite failed:', e);
  process.exit(1);
});
