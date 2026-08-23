const puppeteer = require('puppeteer-core');
const path = require('path');

const artifactDir = 'C:/Users/PC/.gemini/antigravity-ide/brain/fda705ff-5694-4d70-84ca-6c00aaf2c428';
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,1080']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1080, deviceScaleFactor: 1.5 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Scroll down directly to the gallery header
  await page.evaluate(() => {
    const el = document.getElementById('gallery');
    if (el) el.scrollIntoView({ block: 'start', behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(artifactDir, 'screenshot_3_project_gallery.png') });

  // Now click on the first gallery image card to open Lightbox
  const card = await page.$('#gallery img');
  if (card) {
    await card.click();
    await new Promise(r => setTimeout(r, 700));
    await page.screenshot({ path: path.join(artifactDir, 'screenshot_5_lightbox_open.png') });
  }

  await browser.close();
  console.log('Viewport gallery capture done!');
}

run().catch(console.error);
