const puppeteer = require('puppeteer-core');
const path = require('path');

const artifactDir = 'C:/Users/PC/.gemini/antigravity-ide/brain/fda705ff-5694-4d70-84ca-6c00aaf2c428';
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // 1. Capture Header & Hero
  console.log('Capturing Hero...');
  await page.screenshot({ path: path.join(artifactDir, 'screenshot_1_hero_header.png') });

  // 2. Element screenshot of Core Solutions
  console.log('Capturing Core Solutions element...');
  const elSolutions = await page.$('#core-solutions');
  if (elSolutions) {
    await elSolutions.screenshot({ path: path.join(artifactDir, 'screenshot_2_core_solutions.png') });
  }

  // 3. Element screenshot of Project Gallery
  console.log('Capturing Project Gallery element...');
  const elGallery = await page.$('#gallery');
  if (elGallery) {
    await elGallery.screenshot({ path: path.join(artifactDir, 'screenshot_3_project_gallery.png') });
  }

  // 4. Open Quick Pay Modal
  console.log('Capturing Quick Pay Modal...');
  const payButtons = await page.$$('button');
  for (const btn of payButtons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (/pay invoice/i.test(text)) {
      await btn.click();
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: path.join(artifactDir, 'screenshot_4_quickpay_modal.png') });
      break;
    }
  }

  await browser.close();
  console.log('All element screenshots captured successfully!');
}

run().catch(console.error);
