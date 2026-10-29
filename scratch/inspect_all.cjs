const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1200 } });
  const files = fs.readdirSync('public/images').filter(f => f.endsWith('.png'));
  const cards = files.map(f => {
    const filePath = path.join('public/images', f);
    const b64 = fs.readFileSync(filePath).toString('base64');
    return `
      <div style="border: 2px solid #ff1744; background: #0c0d14; border-radius: 6px; padding: 8px; text-align: center;">
        <div style="font-size: 13px; font-weight: bold; color: #00F0FF; margin-bottom: 6px; word-break: break-all;">${f}</div>
        <img src="data:image/png;base64,${b64}" style="max-width: 100%; height: 200px; object-fit: contain;" />
      </div>
    `;
  }).join('');

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="background: #050608; color: white; font-family: -apple-system, BlinkMacSystemFont, sans-serif; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; padding: 24px;">
        ${cards}
      </body>
    </html>
  `;
  await page.setContent(html);
  await page.waitForTimeout(1000);
  const outPath = 'C:/Users/saish/.gemini/antigravity/brain/935f113b-6f1a-4ec0-b6c8-50be60006ca4/all_spiderman_assets.png';
  await page.screenshot({ path: outPath, fullPage: true });
  console.log('Saved to', outPath);
  await browser.close();
}

main().catch(console.error);
