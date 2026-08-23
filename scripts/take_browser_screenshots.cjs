const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const artifactDir = 'C:/Users/PC/.gemini/antigravity-ide/brain/fda705ff-5694-4d70-84ca-6c00aaf2c428';
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function capture() {
  console.log('Launching Chrome from:', chromePath);
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });

  // 1. Hero & Top Bar Screenshot
  console.log('Capturing Hero and Header...');
  const heroPath = path.join(artifactDir, 'screenshot_1_hero_header.png');
  await page.screenshot({ path: heroPath });
  console.log('Saved:', heroPath);

  // 2. Scroll to and capture the new 8-Card Core Solutions Section
  console.log('Capturing Core Solutions 8-card section...');
  await page.evaluate(() => {
    const el = document.getElementById('core-solutions');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1200));
  const solutionsPath = path.join(artifactDir, 'screenshot_2_core_solutions.png');
  await page.screenshot({ path: solutionsPath });
  console.log('Saved:', solutionsPath);

  // 3. Scroll to and capture Project Gallery
  console.log('Capturing Project Gallery section...');
  await page.evaluate(() => {
    const el = document.getElementById('gallery');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1500));
  const galleryPath = path.join(artifactDir, 'screenshot_3_project_gallery.png');
  await page.screenshot({ path: galleryPath });
  console.log('Saved:', galleryPath);

  // 4. Open Quick Pay Modal and capture in Day Mode
  console.log('Capturing Quick Pay Modal...');
  const payButtons = await page.$$('button');
  for (const btn of payButtons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (/pay|invoice|deposit/i.test(text)) {
      await btn.click();
      await new Promise(r => setTimeout(r, 600));
      break;
    }
  }
  const payModalPath = path.join(artifactDir, 'screenshot_4_quickpay_modal.png');
  await page.screenshot({ path: payModalPath });
  console.log('Saved:', payModalPath);

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Screenshot capture error:', err);
  process.exit(1);
});
