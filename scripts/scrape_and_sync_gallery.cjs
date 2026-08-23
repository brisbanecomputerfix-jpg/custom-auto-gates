const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Helper to fetch URL content
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = new URL(redirectUrl, url).toString();
        }
        return resolve(fetchUrl(redirectUrl));
      }
      
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

// Helper to download image file if missing
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
        file.on('finish', () => {
          file.close(() => resolve(true));
        });
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

async function run() {
  console.log('Fetching https://customautogates.com.au/gates/gallery-gates/...');
  const page = await fetchUrl('https://customautogates.com.au/gates/gallery-gates/');
  const html = page.body;

  // Extract all images and lightbox anchors
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  const aRegex = /<a[^>]+href=["']([^"']+\.(?:jpg|jpeg|png|webp))["'][^>]*>/gi;
  
  const foundUrls = new Set();
  let m;
  while ((m = imgRegex.exec(html)) !== null) {
    if (m[1].includes('/wp-content/uploads/')) {
      foundUrls.add(m[1]);
    }
  }
  while ((m = aRegex.exec(html)) !== null) {
    if (m[1].includes('/wp-content/uploads/')) {
      foundUrls.add(m[1]);
    }
  }

  console.log(`Found ${foundUrls.size} unique image URLs on the gallery page.`);

  const imagesDir = path.resolve(__dirname, '../public/images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  const items = [];
  let downloadedCount = 0;

  for (const rawUrl of Array.from(foundUrls)) {
    // Remove query params or resize dimensions if full resolution exists
    let cleanUrl = rawUrl.split('?')[0];
    const basename = path.basename(cleanUrl);
    const localPath = path.join(imagesDir, basename);
    
    const downloaded = await downloadImage(cleanUrl, localPath);
    if (downloaded) downloadedCount++;

    // Generate human-friendly title, suburb, and category
    let cleanName = basename.replace(/\.[^/.]+$/, '').replace(/-\d+x\d+$/, '');
    let title = cleanName.replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    
    let category = 'sliding-gates';
    if (/swing/i.test(cleanName)) category = 'swing-gates';
    else if (/solar/i.test(cleanName)) category = 'solar-gates';
    else if (/commercial|security/i.test(cleanName)) category = 'commercial-gates';
    else if (/fence|fencing|slat/i.test(cleanName)) category = 'fencing';
    else if (/boom/i.test(cleanName)) category = 'boom-gates';

    // Suburb detection
    const suburbMatches = ['Bulimba', 'New Farm', 'Ascot', 'Indooroopilly', 'Hamilton', 'Brookfield', 'Taringa', 'Kenmore', 'Yamanto', 'Ipswich', 'Springfield', 'Cleveland', 'Redcliffe', 'Chermside', 'Carindale', 'Paddington', 'Graceville', 'Sherwood', 'The Gap', 'Sunnybank', 'Jimboomba', 'Samford', 'Dayboro', 'Pullenvale', 'Moggill', 'Belmont', 'Camp Hill', 'Bundamba'];
    let detectedSuburb = 'Brisbane';
    for (const sub of suburbMatches) {
      if (new RegExp(sub, 'i').test(cleanName)) {
        detectedSuburb = sub;
        break;
      }
    }

    items.push({
      id: `gal-${cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      title: title,
      category: category,
      suburb: detectedSuburb,
      image: `/images/${basename}`,
      caption: `${title}, ${detectedSuburb}`,
      desc: `Custom fabricated in our Yamanto workshop with architectural powdercoated aluminium.`
    });
  }

  console.log(`Downloaded / verified ${items.length} gallery images.`);
  fs.writeFileSync(path.resolve(__dirname, 'scraped_gallery_items.json'), JSON.stringify(items, null, 2));
  console.log('Saved scraped_gallery_items.json successfully.');
}

run().catch(console.error);
