import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const artifactsDir = 'C:\\Users\\PC\\.gemini\\antigravity-ide\\brain\\45451473-e77b-4f0b-8660-18264638abae';

const possiblePaths = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
];

let browserPath = possiblePaths.find(p => fs.existsSync(p));

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: browserPath,
    headless: true,
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1. Dark Mode Hero & Header
  await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('cag_theme', 'dark');
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('theme-dark');
  });
  await new Promise(r => setTimeout(r, 600));

  const darkHeroPath = path.join(artifactsDir, 'dark_mode_hero_nav.png');
  await page.screenshot({ path: darkHeroPath });
  console.log('Saved 1:', darkHeroPath);

  // 2. Light / Day Mode Hero & Header - Click real theme button
  await page.evaluate(() => {
    const themeBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Dark Mode') || b.textContent.includes('Day Mode'));
    if (themeBtn) {
      themeBtn.click();
    } else {
      localStorage.setItem('cag_theme', 'light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  });
  await new Promise(r => setTimeout(r, 800));

  const dayHeroPath = path.join(artifactsDir, 'day_mode_hero_nav.png');
  await page.screenshot({ path: dayHeroPath });
  console.log('Saved 2:', dayHeroPath);

  // Switch back to Dark Mode by clicking theme button
  await page.evaluate(() => {
    const themeBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Day Mode') || b.textContent.includes('Dark Mode'));
    if (themeBtn) {
      themeBtn.click();
    } else {
      localStorage.setItem('cag_theme', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  });
  await new Promise(r => setTimeout(r, 500));

  // 3. Scroll to Gate Visualizer & Calculator
  await page.evaluate(() => {
    window.scrollTo({ top: 920, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));

  const visualizerPath = path.join(artifactsDir, 'dark_mode_visualizer.png');
  await page.screenshot({ path: visualizerPath });
  console.log('Saved 3:', visualizerPath);

  // 4. Scroll to Services / Pillars
  await page.evaluate(() => {
    window.scrollTo({ top: 1950, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));

  const servicesPath = path.join(artifactsDir, 'dark_mode_services.png');
  await page.screenshot({ path: servicesPath });
  console.log('Saved 4:', servicesPath);

  // 5. Scroll to Footer
  await page.evaluate(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));

  const footerPath = path.join(artifactsDir, 'dark_mode_footer.png');
  await page.screenshot({ path: footerPath });
  console.log('Saved 5:', footerPath);

  // 6. Mobile Drawer in Dark Mode
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('cag_theme', 'dark');
    document.documentElement.setAttribute('data-theme', 'dark');
  });
  await new Promise(r => setTimeout(r, 400));

  // Open mobile menu
  await page.evaluate(() => {
    const menuBtn = document.querySelector('button[aria-label*="menu" i]');
    if (menuBtn) menuBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  const mobileDrawerPath = path.join(artifactsDir, 'mobile_drawer_dark.png');
  await page.screenshot({ path: mobileDrawerPath });
  console.log('Saved 6:', mobileDrawerPath);

  await browser.close();
  console.log('🎉 All updated screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
