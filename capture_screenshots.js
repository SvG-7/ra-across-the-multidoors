import { chromium } from 'playwright';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/saish/.gemini/antigravity/brain/935f113b-6f1a-4ec0-b6c8-50be60006ca4';

async function capture() {
  console.log('Launching browser with system channel...');
  let browser;
  try {
    browser = await chromium.launch({ channel: 'msedge' });
  } catch (e) {
    console.log('Edge not available, trying chrome...', e.message);
    browser = await chromium.launch({ channel: 'chrome' });
  }

  // 1. Desktop Hero & Intro
  console.log('Opening desktop page...');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await desktopContext.newPage();
  await page.goto('http://127.0.0.1:5173/');

  // Capture Intro splash
  await page.waitForTimeout(700);
  console.log('Capturing intro sequence...');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '01_intro_sequence.png') });

  // Click to skip intro and enter hero
  await page.click('body');
  await page.waitForTimeout(1600); // Wait for entrance animations and spiderweb canvas

  console.log('Capturing desktop hero view...');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '02_desktop_hero.png'), fullPage: false });
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '03_desktop_fullpage.png'), fullPage: true });

  // 2. Mobile Viewport (iPhone 14)
  console.log('Capturing mobile view...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://127.0.0.1:5173/');
  await mobilePage.waitForTimeout(400);
  await mobilePage.click('body'); // skip intro
  await mobilePage.waitForTimeout(1600);
  console.log('Capturing mobile hero view...');
  await mobilePage.screenshot({ path: path.join(ARTIFACT_DIR, '04_mobile_hero.png') });

  // 3. Test Clicking "ENTER THE MULTIVERSE" Web Shooter Button
  console.log('Clicking ENTER THE MULTIVERSE CTA...');
  const ctaButton = page.locator('button:has-text("ENTER THE MULTIVERSE")');
  await ctaButton.hover();
  await page.waitForTimeout(300);
  await ctaButton.click();

  // Capture warping/web shooting
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '05_web_shoot_warp.png') });

  // Wait for transition into Phase 2 teaser placeholder page
  await page.waitForTimeout(2000);
  console.log('Capturing Phase 2 Multiverse Preview...');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '06_multiverse_preview.png'), fullPage: true });

  await browser.close();
  console.log('Screenshot capture complete!');
}

capture().catch((err) => {
  console.error('Capture failed:', err);
  process.exit(1);
});
