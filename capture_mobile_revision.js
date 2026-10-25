import { chromium } from 'playwright';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/saish/.gemini/antigravity/brain/935f113b-6f1a-4ec0-b6c8-50be60006ca4';

async function capture() {
  console.log('Launching browser with msedge/chrome...');
  let browser;
  try {
    browser = await chromium.launch({ channel: 'msedge' });
  } catch (e) {
    browser = await chromium.launch({ channel: 'chrome' });
  }

  // Mobile Context: 390x844 (iPhone 14)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  const page = await mobileContext.newPage();
  console.log('Navigating to http://127.0.0.1:5173/ ...');
  await page.goto('http://127.0.0.1:5173/');

  // 1. Skip intro
  await page.waitForTimeout(400);
  await page.click('body');
  await page.waitForTimeout(600);

  // 2. Mobile Entry Screen
  console.log('Capturing mobile entry screen (390px)...');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_01_entry_screen.png') });

  // Test expanding the universe comparison drawer
  await page.click('text=[+] Compare the Two Worlds');
  await page.waitForTimeout(400);
  console.log('Capturing mobile entry with expanded drawer...');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_02_entry_expanded.png') });

  // 3. Test Clicking "ENTER THE MULTIVERSE" Web Shooter
  console.log('Clicking ENTER THE MULTIVERSE CTA...');
  await page.click('button:has-text("ENTER THE MULTIVERSE")');
  await page.waitForTimeout(250);
  console.log('Capturing mobile web shoot & warp...');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_03_web_shoot_warp.png') });

  // 4. Session View - Topic 1 (Waiting / Listening State: "Look up — the story continues")
  await page.waitForTimeout(1600);
  console.log('Capturing Topic 1 (Look up — listening state)...');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_04_topic1_look_up.png') });

  // 5. Session View - Topic 2 (Question Active: "Your turn")
  console.log('Navigating to Topic 2 (Live question)...');
  await page.click('button:has-text("NEXT TOPIC")');
  await page.waitForTimeout(600);
  console.log('Capturing Topic 2 (Your turn active)...');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_05_topic2_your_turn.png') });

  // 6. Session View - Topic 2 (Answer selected & acknowledged: "Response saved")
  console.log('Selecting an answer option...');
  await page.click('button:has-text("Check in with the neighbors first")');
  await page.waitForTimeout(400);
  console.log('Capturing Topic 2 (Response saved state)...');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_06_topic2_response_saved.png') });

  // 7. Session View - Topic 6 (Keyboard testing & reflection input)
  console.log('Navigating to Topic 6 via Presenter Nav...');
  await page.click('button:has-text("TOPIC NAV")');
  await page.waitForTimeout(300);
  await page.click('button:text-is("6")');
  await page.waitForTimeout(600);

  // Focus and type into reflection input (Testing on-screen keyboard ergonomics)
  console.log('Testing text reflection input...');
  const input = page.locator('#reflection-input');
  await input.click();
  await input.fill('Navigating from high-visibility dorm hallways to isolated apartment deadbolts requires intentional outreach.');
  await page.waitForTimeout(300);
  console.log('Capturing Topic 6 with keyboard/input interaction...');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_07_topic6_input_interaction.png') });

  // 8. Session View - Topic 7 & Conclusion Screen
  console.log('Navigating to Conclusion...');
  await page.click('button:has-text("TOPIC NAV")');
  await page.waitForTimeout(300);
  await page.click('button:text-is("7")');
  await page.waitForTimeout(500);
  await page.click('button:has-text("FINISH WORKSHOP")');
  await page.waitForTimeout(600);
  console.log('Capturing mobile conclusion screen...');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_08_conclusion.png') });

  // 9. Narrow Phone Test (360px - e.g. Galaxy S8 / small Android)
  console.log('Testing narrow 360px viewport...');
  const narrowContext = await browser.newContext({
    viewport: { width: 360, height: 740 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const narrowPage = await narrowContext.newPage();
  await narrowPage.goto('http://127.0.0.1:5173/');
  await narrowPage.waitForTimeout(400);
  await narrowPage.click('body');
  await narrowPage.waitForTimeout(600);
  console.log('Capturing narrow 360px entry screen...');
  await narrowPage.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_09_narrow_360px_entry.png') });

  await browser.close();
  console.log('All mobile revision screenshots captured successfully!');
}

capture().catch((err) => {
  console.error('Mobile capture failed:', err);
  process.exit(1);
});
