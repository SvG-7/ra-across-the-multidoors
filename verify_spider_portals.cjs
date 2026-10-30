const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/saish/.gemini/antigravity/brain/935f113b-6f1a-4ec0-b6c8-50be60006ca4';
const BASE_URL = 'http://localhost:4173/ra-across-the-multidoors/';

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log('=== STARTING SPIDER WEB & PORTAL ARTWORK PLAYWRIGHT VERIFICATION ===');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  const videoDir = path.join(ARTIFACT_DIR, 'spider_video');
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  // 1. RECORDED WALKTHROUGH ON IPHONE 14 (390x844)
  console.log('\n--- 1. Testing Full Flow & Recording on iPhone 14 (390x844) ---');
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

    // Ch 1 Portal Scene (Spider-Man between two entrances)
    console.log('Capturing Chapter 1 Portal Scene...');
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'portal_ch1_between_worlds.png') });

    // Continue to Chapter 2
    console.log('Navigating to Chapter 2...');
    await page.locator('button:has-text("ENTER CHAPTER 2")').first().click();
    await sleep(3400);
    await page.waitForSelector('text=Invisible Resident');

    // Select Ch 2 Answer
    console.log('Answering Chapter 2...');
    await page.locator('button:has-text("Send a brief personal check-in")').first().click();
    await sleep(800);
    console.log('Capturing Chapter 2 Portal Scene...');
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'portal_ch2_hanging_window.png') });

    // Continue to Chapter 3
    console.log('Navigating to Chapter 3...');
    await page.locator('button:has-text("Continue to Ch. 3")').first().click();
    await sleep(3400);
    await page.waitForSelector('text=Different Relationships');

    // Select Ch 3 Answer
    console.log('Answering Chapter 3...');
    await page.locator('button:has-text("Ask for their perspective")').first().click();
    await sleep(800);
    console.log('Capturing Chapter 3 Portal Scene...');
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'portal_ch3_hall_corridor.png') });

    // Continue to Chapter 4
    console.log('Navigating to Chapter 4...');
    await page.locator('button:has-text("Continue to Ch. 4")').first().click();
    await sleep(3400);
    await page.waitForSelector('text=Communication Languages');

    // Select Ch 4 Answer
    console.log('Answering Chapter 4...');
    await page.locator('button:has-text("Personal message")').first().click();
    await sleep(800);
    console.log('Capturing Chapter 4 Portal Scene...');
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'portal_ch4_connecting_symbols.png') });

    // Continue to Chapter 5 (Story)
    console.log('Navigating to Chapter 5...');
    await page.locator('button:has-text("Continue to Ch. 5")').first().click();
    await sleep(3400);
    await page.waitForSelector('text=Independence');
    await sleep(800);
    console.log('Capturing Chapter 5 Portal Scene...');
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'portal_ch5_courtyard_overview.png') });

    // Continue to Chapter 6
    console.log('Navigating to Chapter 6...');
    await page.locator('button:has-text("Continue to Ch. 6")').first().click();
    await sleep(3400);
    await page.waitForSelector('text=Superpowers Fail');

    // Select Ch 6 Answer
    console.log('Answering Chapter 6...');
    await page.locator('button:has-text("Make the invitation shorter and easier to answer")').first().click();
    await sleep(800);
    console.log('Capturing Chapter 6 Portal Scene...');
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'portal_ch6_shifting_anchors.png') });

    // Continue to Chapter 7 (Finale)
    console.log('Navigating to Chapter 7 Finale...');
    await page.locator('button:has-text("Continue to Ch. 7")').first().click();
    await sleep(3600); // Chapter transition
    await page.waitForSelector('text=Your RA Takeaway');

    // Allow 4 seconds for the 8-legged spider web reveal animation to settle!
    console.log('Waiting for 8-legged Spider Web animation to complete & settle...');
    await sleep(4000);

    // Capture Chapter 7 Portal Scene & Spider Web formation
    console.log('Capturing Chapter 7 Portal Scene and Completed Spider Web...');
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'spider_web_completed_shape.png') });

    // Tap Leg Pair 1 (Chapter 2: Connection) to inspect interactive drawer
    console.log('Tapping Legs 1-2 button to inspect interactive reflection drawer...');
    await page.locator('button:has-text("Legs 1-2")').first().click();
    await sleep(700);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'spider_leg_pair_ch2_drawer.png') });

    // Tap Leg Pair 3 (Chapter 4: Communication)
    console.log('Tapping Legs 5-6 button to inspect Communication reflection drawer...');
    await page.locator('button:has-text("Legs 5-6")').first().click();
    await sleep(700);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'spider_leg_pair_ch4_drawer.png') });

    // Scroll to and capture Supportive Takeaway Card
    console.log('Capturing Supportive Takeaway Card...');
    const takeawayCard = page.locator('h1:has-text("Your RA Takeaway")').locator('..').locator('..');
    await takeawayCard.scrollIntoViewIfNeeded();
    await sleep(500);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'supportive_takeaway_card.png') });

    // Click "Screenshot my takeaway"
    console.log('Opening Screenshot Mode...');
    await page.locator('button:has-text("Screenshot my takeaway")').first().click();
    await sleep(700);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'supportive_screenshot_card.png') });

    // Return to takeaway
    await page.locator('button:has-text("Back to Summary")').first().click();
    await sleep(500);

    // Click "Explore the two worlds"
    console.log('Opening Exploration Mode...');
    await page.locator('button:has-text("Explore the two worlds")').first().click();
    await sleep(900);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'neighborhood_map_and_exploration.png') });

    // Scroll down to Peer Comparisons
    console.log('Checking Peer Comparisons text in Exploration Mode...');
    const peerComparisonHeader = page.locator('text=Here are some other approaches people explored');
    if (await peerComparisonHeader.isVisible()) {
      console.log('VERIFIED: "Here are some other approaches people explored" is visible!');
      await peerComparisonHeader.scrollIntoViewIfNeeded();
      await sleep(500);
      await page.screenshot({ path: path.join(ARTIFACT_DIR, 'peer_comparisons_exploration.png') });
    }

    console.log('Finished iPhone 14 test successfully.');
  } catch (err) {
    console.error('Error during iPhone 14 walkthrough:', err);
  } finally {
    await recordContext.close();
  }

  // Find generated video and copy/rename to spider_web_formation.webm
  const files = fs.readdirSync(videoDir);
  const webmFiles = files.filter(f => f.endsWith('.webm'));
  if (webmFiles.length > 0) {
    webmFiles.sort((a, b) => {
      return fs.statSync(path.join(videoDir, b)).mtimeMs - fs.statSync(path.join(videoDir, a)).mtimeMs;
    });
    const srcVideo = path.join(videoDir, webmFiles[0]);
    const targetVideo = path.join(ARTIFACT_DIR, 'spider_web_formation.webm');
    fs.copyFileSync(srcVideo, targetVideo);
    console.log(`Video saved to: ${targetVideo}`);
  }

  // 2. QUICK MULTI-VIEWPORT VERIFICATION (iPhone SE 320px)
  console.log('\n--- Verifying Viewport: 320px_iphone_se (320x600) ---');
  const ctx320 = await browser.newContext({
    viewport: { width: 320, height: 600 },
    isMobile: true,
    hasTouch: true,
  });
  const p320 = await ctx320.newPage();
  try {
    await p320.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await p320.waitForSelector('text=Which community have you worked in?');
    await p320.locator('button:has-text("Residence hall")').first().click();
    await sleep(300);

    await p320.locator('button:has-text("ENTER CHAPTER 2")').first().click();
    await sleep(3400);
    await p320.locator('button:has-text("Send a brief personal check-in")').first().click();
    await sleep(400);

    await p320.locator('button:has-text("Continue to Ch. 3")').first().click();
    await sleep(3400);
    await p320.locator('button:has-text("Ask for their perspective")').first().click();
    await sleep(400);

    await p320.locator('button:has-text("Continue to Ch. 4")').first().click();
    await sleep(3400);
    await p320.locator('button:has-text("Personal message")').first().click();
    await sleep(400);

    await p320.locator('button:has-text("Continue to Ch. 5")').first().click();
    await sleep(3400);

    await p320.locator('button:has-text("Continue to Ch. 6")').first().click();
    await sleep(3400);
    await p320.locator('button:has-text("Make the invitation shorter and easier to answer")').first().click();
    await sleep(400);

    await p320.locator('button:has-text("Continue to Ch. 7")').first().click();
    await sleep(3600);
    await sleep(4000); // Spider settles

    await p320.screenshot({ path: path.join(ARTIFACT_DIR, 'spider_web_320px.png') });
    console.log('Saved screenshot for 320px_iphone_se');
  } catch (e) {
    console.error('Error verifying 320px_iphone_se:', e);
  } finally {
    await ctx320.close();
  }

  await browser.close();
  console.log('=== PLAYWRIGHT VERIFICATION COMPLETE ===');
}

run();
