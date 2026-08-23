import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputDir = 'C:\\Users\\PC\\.gemini\\antigravity-ide\\scratch\\custom-auto-gates\\dist\\audit_screenshots';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const pagesToAudit = [
  { name: '01_home_dark', url: 'http://localhost:3000/#', theme: 'dark' },
  { name: '01_home_light', url: 'http://localhost:3000/#', theme: 'light' },
  { name: '02_about_dark', url: 'http://localhost:3000/#about', theme: 'dark' },
  { name: '02_about_light', url: 'http://localhost:3000/#about', theme: 'light' },
  { name: '03_service_repairs_dark', url: 'http://localhost:3000/#service', theme: 'dark' },
  { name: '03_service_repairs_light', url: 'http://localhost:3000/#service', theme: 'light' },
  { name: '04_contact_dark', url: 'http://localhost:3000/#contact', theme: 'dark' },
  { name: '04_contact_light', url: 'http://localhost:3000/#contact', theme: 'light' },
  { name: '05_testimonials_dark', url: 'http://localhost:3000/#testimonials', theme: 'dark' },
  { name: '05_testimonials_light', url: 'http://localhost:3000/#testimonials', theme: 'light' },
  { name: '06_council_guide_dark', url: 'http://localhost:3000/#council-guide', theme: 'dark' },
  { name: '06_council_guide_light', url: 'http://localhost:3000/#council-guide', theme: 'light' },
  { name: '07_suburb_brisbane_dark', url: 'http://localhost:3000/#gates-brisbane', theme: 'dark' },
  { name: '07_suburb_brisbane_light', url: 'http://localhost:3000/#gates-brisbane', theme: 'light' },
  { name: '08_suburb_ipswich_dark', url: 'http://localhost:3000/#gates-ipswich', theme: 'dark' },
  { name: '09_suburb_goldcoast_dark', url: 'http://localhost:3000/#gates-gold-coast', theme: 'dark' }
];

async function runVisualAudit() {
  console.log('🚀 Starting Comprehensive Visual & Color Audit...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  const auditReport = [];

  for (const item of pagesToAudit) {
    console.log(`\n🔍 Auditing: ${item.name} (${item.url}) in ${item.theme} mode...`);
    await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Set theme attribute on html/body
    await page.evaluate((theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('theme-dark');
        document.documentElement.classList.remove('theme-light');
      } else {
        document.documentElement.classList.add('theme-light');
        document.documentElement.classList.remove('theme-dark');
      }
      window.dispatchEvent(new Event('resize'));
    }, item.theme);

    await new Promise(r => setTimeout(r, 600));

    // Screenshot full page
    const screenshotPath = path.join(outputDir, `${item.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`📸 Saved screenshot: ${screenshotPath}`);

    // Inspect colors, visibility, sections, fonts, broken images
    const pageMetrics = await page.evaluate(() => {
      const results = {
        title: document.title,
        heading1: document.querySelector('h1')?.innerText?.trim() || 'NO H1 FOUND',
        h2Headings: Array.from(document.querySelectorAll('h2')).map(h => h.innerText.trim()).filter(Boolean),
        images: {
          total: document.querySelectorAll('img').length,
          broken: []
        },
        contrastIssues: [],
        sections: []
      };

      // Check broken images
      document.querySelectorAll('img').forEach((img, idx) => {
        if (!img.complete || img.naturalWidth === 0) {
          results.images.broken.push({
            src: img.src,
            alt: img.alt || 'No alt',
            index: idx
          });
        }
      });

      // Inspect sections
      const sections = document.querySelectorAll('section, main > div, header, footer');
      sections.forEach((sec, idx) => {
        const rect = sec.getBoundingClientRect();
        const style = window.getComputedStyle(sec);
        if (rect.height > 20) {
          results.sections.push({
            id: sec.id || sec.className || `section-${idx}`,
            tag: sec.tagName.toLowerCase(),
            height: Math.round(rect.height),
            bg: style.backgroundColor,
            color: style.color
          });
        }
      });

      // Sample key text elements for visibility & contrast
      const textElements = document.querySelectorAll('h1, h2, h3, p, button, a.btn');
      textElements.forEach(el => {
        const style = window.getComputedStyle(el);
        const color = style.color;
        const fontSize = style.fontSize;
        const fontWeight = style.fontWeight;
        const opacity = style.opacity;
        const visibility = style.visibility;
        const display = style.display;

        // check if transparent or invisible
        if (display !== 'none' && visibility !== 'hidden') {
          if (opacity === '0' || color === 'rgba(0, 0, 0, 0)') {
            results.contrastIssues.push({
              tag: el.tagName,
              text: el.innerText.slice(0, 40),
              issue: 'Zero opacity or transparent color'
            });
          }
        }
      });

      return results;
    });

    auditReport.push({
      pageName: item.name,
      url: item.url,
      theme: item.theme,
      metrics: pageMetrics
    });
  }

  // Audit Modals: Contact Modal & Troubleshooter Modal
  console.log('\n🔍 Auditing Modals...');
  await page.goto('http://localhost:3000/#', { waitUntil: 'networkidle2' });
  
  // Test Contact Modal in dark & light
  for (const theme of ['dark', 'light']) {
    await page.evaluate((theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('theme-dark');
        document.documentElement.classList.remove('theme-light');
      } else {
        document.documentElement.classList.add('theme-light');
        document.documentElement.classList.remove('theme-dark');
      }
    }, theme);

    // Open Contact Modal by clicking free quote button
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const quoteBtn = btns.find(b => b.innerText.includes('Book Free Measure') || b.innerText.includes('Free Quote') || b.innerText.includes('Book Free On-Site'));
      if (quoteBtn) quoteBtn.click();
    });

    await new Promise(r => setTimeout(r, 500));
    const modalShot = path.join(outputDir, `modal_contact_${theme}.png`);
    await page.screenshot({ path: modalShot });
    console.log(`📸 Saved modal screenshot: ${modalShot}`);

    // Close modal
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 300));
  }

  // Test Troubleshooter Modal
  for (const theme of ['dark', 'light']) {
    await page.evaluate((theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('theme-dark');
        document.documentElement.classList.remove('theme-light');
      } else {
        document.documentElement.classList.add('theme-light');
        document.documentElement.classList.remove('theme-dark');
      }
    }, theme);

    // Click emergency troubleshooting button or trigger it
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, a'));
      const tBtn = btns.find(b => b.innerText.includes('Emergency') || b.innerText.includes('Troubleshoot') || b.innerText.includes('Diagnostic'));
      if (tBtn) tBtn.click();
    });

    await new Promise(r => setTimeout(r, 500));
    const tModalShot = path.join(outputDir, `modal_troubleshooter_${theme}.png`);
    await page.screenshot({ path: tModalShot });
    console.log(`📸 Saved troubleshooter modal screenshot: ${tModalShot}`);

    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 300));
  }

  const reportJsonPath = path.join(outputDir, 'audit_summary.json');
  fs.writeFileSync(reportJsonPath, JSON.stringify(auditReport, null, 2));
  console.log(`\n✅ Visual Audit completed! Full summary written to: ${reportJsonPath}`);

  await browser.close();
}

runVisualAudit().catch(err => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
