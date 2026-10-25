const { chromium } = require('playwright');
const path = require('path');

async function run() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { background: #08090D; color: white; font-family: sans-serif; display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; padding: 20px; }
        .card { background: #140810; border: 2px solid #E62429; padding: 10px; border-radius: 8px; text-align: center; }
        img { max-width: 100%; max-height: 380px; object-fit: contain; }
      </style>
    </head>
    <body>
      <div class='card'><h3>PNG10</h3><img src='http://127.0.0.1:5173/images/spiderman_PNG10.png'></div>
      <div class='card'><h3>PNG11</h3><img src='http://127.0.0.1:5173/images/spiderman_PNG11.png'></div>
      <div class='card'><h3>PNG21</h3><img src='http://127.0.0.1:5173/images/spiderman_PNG21.png'></div>
      <div class='card'><h3>PNG28</h3><img src='http://127.0.0.1:5173/images/spiderman_PNG28.png'></div>
      <div class='card'><h3>PNG54</h3><img src='http://127.0.0.1:5173/images/spiderman_PNG54.png'></div>
      <div class='card'><h3>PNG40</h3><img src='http://127.0.0.1:5173/images/spiderman_PNG40.png'></div>
    </body>
    </html>
  `);
  await page.waitForTimeout(1000);
  const outPath = 'C:/Users/saish/.gemini/antigravity/brain/935f113b-6f1a-4ec0-b6c8-50be60006ca4/asset_inspection_3.png';
  await page.screenshot({ path: outPath });
  console.log('Saved to', outPath);
  await browser.close();
}

run().catch(console.error);
