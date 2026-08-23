const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputDir = path.join(__dirname, '..', 'dist', 'detailed_audit');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to calculate relative luminance & contrast ratio
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrast(rgb1, rgb2) {
  const lum1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
  const lum2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

const auditTargets = [
  { id: 'home_dark', name: 'Homepage (Dark Theme)', url: 'http://localhost:3000/#', theme: 'dark' },
  { id: 'home_light', name: 'Homepage (Light Theme)', url: 'http://localhost:3000/#', theme: 'light' },
  { id: 'about_dark', name: 'About Us (Dark Theme)', url: 'http://localhost:3000/#about', theme: 'dark' },
  { id: 'about_light', name: 'About Us (Light Theme)', url: 'http://localhost:3000/#about', theme: 'light' },
  { id: 'service_dark', name: 'Service & Repairs (Dark Theme)', url: 'http://localhost:3000/#service', theme: 'dark' },
  { id: 'service_light', name: 'Service & Repairs (Light Theme)', url: 'http://localhost:3000/#service', theme: 'light' },
  { id: 'contact_dark', name: 'Contact Us & Showroom (Dark Theme)', url: 'http://localhost:3000/#contact', theme: 'dark' },
  { id: 'contact_light', name: 'Contact Us & Showroom (Light Theme)', url: 'http://localhost:3000/#contact', theme: 'light' },
  { id: 'testimonials_dark', name: 'Testimonials & Case Studies (Dark Theme)', url: 'http://localhost:3000/#testimonials', theme: 'dark' },
  { id: 'testimonials_light', name: 'Testimonials & Case Studies (Light Theme)', url: 'http://localhost:3000/#testimonials', theme: 'light' },
  { id: 'council_dark', name: 'Council & Pool Safety Guide (Dark Theme)', url: 'http://localhost:3000/#council-guide', theme: 'dark' },
  { id: 'council_light', name: 'Council & Pool Safety Guide (Light Theme)', url: 'http://localhost:3000/#council-guide', theme: 'light' },
  { id: 'suburb_brisbane_dark', name: 'Brisbane Suburb Silo (Dark Theme)', url: 'http://localhost:3000/#gates-brisbane', theme: 'dark' },
  { id: 'suburb_ipswich_dark', name: 'Ipswich Suburb Silo (Dark Theme)', url: 'http://localhost:3000/#gates-ipswich', theme: 'dark' },
  { id: 'suburb_goldcoast_dark', name: 'Gold Coast Suburb Silo (Dark Theme)', url: 'http://localhost:3000/#gates-gold-coast', theme: 'dark' }
];

async function runDetailedAudit() {
  console.log('🔬 Launching Detailed Visual & Color Contrast Auditor...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,1080']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1080 });

  const fullReport = [];

  for (const target of auditTargets) {
    console.log(`\n========================================`);
    console.log(`🎯 Analyzing: ${target.name} (${target.url})`);
    console.log(`========================================`);

    await page.goto(target.url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Set Theme
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
    }, target.theme);

    // Smooth scroll through entire page to trigger any lazy loaders and ensure all components are rendered
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 400;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 80);
      });
    });

    await new Promise(r => setTimeout(r, 600));

    // Capture Full Page Screenshot
    const shotPath = path.join(outputDir, `${target.id}.png`);
    await page.screenshot({ path: shotPath, fullPage: true });
    console.log(`📸 Full page capture saved: ${shotPath}`);

    // Analyze All Sections on this page
    const sectionAnalysis = await page.evaluate(() => {
      function parseRGB(str) {
        if (!str) return [0, 0, 0];
        const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        return m ? [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])] : [0, 0, 0];
      }

      function getLum(r, g, b) {
        const [rs, gs, bs] = [r, g, b].map(c => {
          c = c / 255;
          return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
      }

      function contrastRatio(color1Str, color2Str) {
        const c1 = parseRGB(color1Str);
        const c2 = parseRGB(color2Str);
        const lum1 = getLum(c1[0], c1[1], c1[2]);
        const lum2 = getLum(c2[0], c2[1], c2[2]);
        const bright = Math.max(lum1, lum2);
        const dark = Math.min(lum1, lum2);
        return ((bright + 0.05) / (dark + 0.05)).toFixed(2);
      }

      const elements = Array.from(document.querySelectorAll('header, section, footer, main > div'));
      const details = [];

      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.height < 40) return;

        const comp = window.getComputedStyle(el);
        const headingEl = el.querySelector('h1, h2, h3');
        const headingComp = headingEl ? window.getComputedStyle(headingEl) : null;
        const paraEl = el.querySelector('p');
        const paraComp = paraEl ? window.getComputedStyle(paraEl) : null;
        const btnEl = el.querySelector('button, a.btn, a[style*="background"]');
        const btnComp = btnEl ? window.getComputedStyle(btnEl) : null;
        const badgeEl = el.querySelector('span[style*="border-radius"], div[style*="border-radius"]');
        const badgeComp = badgeEl ? window.getComputedStyle(badgeEl) : null;

        const effectiveBg = comp.backgroundColor === 'rgba(0, 0, 0, 0)' ? 'rgb(9, 14, 26)' : comp.backgroundColor;

        const headingContrast = headingComp ? contrastRatio(headingComp.color, effectiveBg) : null;
        const textContrast = paraComp ? contrastRatio(paraComp.color, effectiveBg) : null;

        details.push({
          index,
          id: el.id || el.getAttribute('data-section') || `section-${index}`,
          tag: el.tagName.toLowerCase(),
          titleText: headingEl ? headingEl.innerText.trim().slice(0, 60) : (el.id || `Section ${index}`),
          heightPx: Math.round(rect.height),
          bgColor: comp.backgroundColor,
          textColor: comp.color,
          heading: headingEl ? {
            text: headingEl.innerText.trim().slice(0, 80),
            color: headingComp.color,
            fontSize: headingComp.fontSize,
            contrast: headingContrast,
            wcagPass: parseFloat(headingContrast) >= 3.0 // Large text pass threshold
          } : null,
          bodyText: paraEl ? {
            sample: paraEl.innerText.trim().slice(0, 100),
            color: paraComp.color,
            fontSize: paraComp.fontSize,
            contrast: textContrast,
            wcagPass: parseFloat(textContrast) >= 4.5 // Normal text AA pass threshold
          } : null,
          button: btnEl ? {
            text: btnEl.innerText.trim().slice(0, 40),
            bg: btnComp.backgroundColor,
            color: btnComp.color,
            contrast: contrastRatio(btnComp.color, btnComp.backgroundColor)
          } : null,
          cardsCount: el.querySelectorAll('div[style*="border"], div[style*="background"], div.card').length
        });
      });

      return {
        pageTitle: document.title,
        navBarVisible: !!document.querySelector('header'),
        footerVisible: !!document.querySelector('footer'),
        sectionCount: details.length,
        sections: details
      };
    });

    fullReport.push({
      target: target.name,
      id: target.id,
      theme: target.theme,
      url: target.url,
      analysis: sectionAnalysis
    });
  }

  // Generate HTML Audit Dashboard for direct viewing
  let htmlDashboard = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Custom Auto Gates - Visual & Color Audit Report</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; margin: 0; padding: 24px; }
    h1, h2, h3 { color: #f8fafc; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; margin-right: 6px; }
    .badge-pass { background: #065f46; color: #34d399; }
    .badge-warn { background: #92400e; color: #fbbf24; }
    .badge-theme { background: #1e293b; color: #94a3b8; }
    .card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    th, td { text-align: left; padding: 10px 14px; border-bottom: 1px solid #334155; font-size: 14px; }
    th { background: #0f172a; color: #94a3b8; }
    .swatch { display: inline-block; width: 14px; height: 14px; border-radius: 3px; vertical-align: middle; margin-right: 6px; border: 1px solid #64748b; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; }
  </style>
</head>
<body>
  <h1>🎨 Custom Auto Gates & Fencing - Visual & Color Audit</h1>
  <p style="color: #94a3b8;">Comprehensive visual verification of all pages, color tokens, contrast ratios, and UI sections.</p>
`;

  for (const pageItem of fullReport) {
    htmlDashboard += `
  <div class="card">
    <h2>${pageItem.target} <span class="badge badge-theme">${pageItem.theme.toUpperCase()}</span></h2>
    <p><strong>Page Title:</strong> ${pageItem.analysis.pageTitle}</p>
    <p><strong>Total Detected Sections:</strong> ${pageItem.analysis.sectionCount} | <strong>Navigation Header:</strong> ${pageItem.analysis.navBarVisible ? '✅ Visible' : '❌ Missing'} | <strong>Footer:</strong> ${pageItem.analysis.footerVisible ? '✅ Visible' : '❌ Missing'}</p>
    
    <table>
      <thead>
        <tr>
          <th>Section Name / ID</th>
          <th>Background Color</th>
          <th>Heading & Contrast</th>
          <th>Body Text & Contrast</th>
          <th>CTA Button</th>
          <th>WCAG Status</th>
        </tr>
      </thead>
      <tbody>`;

    for (const sec of pageItem.analysis.sections) {
      const headingPass = sec.heading ? (sec.heading.wcagPass ? '<span class="badge badge-pass">PASS (' + sec.heading.contrast + ':1)</span>' : '<span class="badge badge-warn">WARN (' + sec.heading.contrast + ':1)</span>') : '-';
      const textPass = sec.bodyText ? (sec.bodyText.wcagPass ? '<span class="badge badge-pass">PASS (' + sec.bodyText.contrast + ':1)</span>' : '<span class="badge badge-warn">WARN (' + sec.bodyText.contrast + ':1)</span>') : '-';
      const btnInfo = sec.button ? `<span class="swatch" style="background:${sec.button.bg}"></span>${sec.button.text} (${sec.button.contrast}:1)` : '-';

      htmlDashboard += `
        <tr>
          <td><strong>${sec.titleText}</strong><br><small style="color:#64748b">${sec.id} (${sec.heightPx}px)</small></td>
          <td><span class="swatch" style="background:${sec.bgColor}"></span>${sec.bgColor}</td>
          <td>${sec.heading ? `<span class="swatch" style="background:${sec.heading.color}"></span>${sec.heading.fontSize} ${headingPass}` : '-'}</td>
          <td>${sec.bodyText ? `<span class="swatch" style="background:${sec.bodyText.color}"></span>${sec.bodyText.fontSize} ${textPass}` : '-'}</td>
          <td>${btnInfo}</td>
          <td>${(sec.heading?.wcagPass !== false && sec.bodyText?.wcagPass !== false) ? '<span class="badge badge-pass">AA Compliant</span>' : '<span class="badge badge-warn">Review</span>'}</td>
        </tr>`;
    }

    htmlDashboard += `
      </tbody>
    </table>
  </div>`;
  }

  htmlDashboard += `
</body>
</html>`;

  const dashboardPath = path.join(outputDir, 'visual_audit_dashboard.html');
  fs.writeFileSync(dashboardPath, htmlDashboard);
  console.log(`\n🎉 Visual Audit Dashboard generated at: ${dashboardPath}`);

  const reportJsonPath = path.join(outputDir, 'detailed_report.json');
  fs.writeFileSync(reportJsonPath, JSON.stringify(fullReport, null, 2));

  await browser.close();
}

runDetailedAudit().catch(err => {
  console.error('Audit run failed:', err);
  process.exit(1);
});
