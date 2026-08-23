const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = new URL(redirectUrl, url).toString();
        }
        return resolve(fetchUrl(redirectUrl));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

function downloadImage(url, destPath) {
  return new Promise((resolve) => {
    if (fs.existsSync(destPath)) {
      return resolve(true);
    }
    const client = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(destPath);
    client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    }, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => file.close(() => resolve(true)));
      } else {
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        resolve(false);
      }
    }).on('error', () => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      resolve(false);
    });
  });
}

async function scrapeAllGatePages() {
  const pagesToScrape = [
    'https://customautogates.com.au/gates/gallery-gates/',
    'https://customautogates.com.au/gates/sliding-gates/',
    'https://customautogates.com.au/gates/swing-gates/',
    'https://customautogates.com.au/gates/solar-gates/',
    'https://customautogates.com.au/gates/commercial-gates/',
    'https://customautogates.com.au/gates/boom-gates/',
    'https://customautogates.com.au/gates/aluminum-fencing/',
    'https://customautogates.com.au/gates/security-fencing/',
    'https://customautogates.com.au/gates/gate-motors/',
    'https://customautogates.com.au/gates/gate-automation/',
    'https://customautogates.com.au/gates/custom-gates-and-fencing/'
  ];

  const allFoundUrls = new Set();
  const imagesDir = path.resolve(__dirname, '../public/images');
  if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

  for (const pageUrl of pagesToScrape) {
    try {
      console.log(`Scraping ${pageUrl}...`);
      const res = await fetchUrl(pageUrl);
      const html = res.body;

      const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
      const aRegex = /<a[^>]+href=["']([^"']+\.(?:jpg|jpeg|png|webp))["'][^>]*>/gi;
      
      let m;
      while ((m = imgRegex.exec(html)) !== null) {
        if (m[1].includes('/wp-content/uploads/')) allFoundUrls.add(m[1]);
      }
      while ((m = aRegex.exec(html)) !== null) {
        if (m[1].includes('/wp-content/uploads/')) allFoundUrls.add(m[1]);
      }
    } catch (e) {
      console.warn(`Failed to fetch ${pageUrl}:`, e.message);
    }
  }

  console.log(`Total unique image URLs found across all gate pages: ${allFoundUrls.size}`);

  let downloadedCount = 0;
  for (const rawUrl of Array.from(allFoundUrls)) {
    const cleanUrl = rawUrl.split('?')[0];
    const basename = path.basename(cleanUrl);
    const localPath = path.join(imagesDir, basename);
    const ok = await downloadImage(cleanUrl, localPath);
    if (ok) downloadedCount++;
  }

  console.log(`Total verified/downloaded local images: ${downloadedCount}`);
}

scrapeAllGatePages().catch(console.error);
