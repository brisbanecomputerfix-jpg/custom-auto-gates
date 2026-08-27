const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const ALBUM_HASH = 'hreyrAi';
const CLIENT_ID = '546c25a59c58ad7';
const PUBLIC_GALLERY_DIR = path.resolve(__dirname, '../public/images/gallery');
const SITE_DATA_PATH = path.resolve(__dirname, '../src/data/siteData.js');

if (!fs.existsSync(PUBLIC_GALLERY_DIR)) {
  fs.mkdirSync(PUBLIC_GALLERY_DIR, { recursive: true });
}

function fetchJson(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        ...headers
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(new Error(`Failed to parse JSON: ${err.message}`));
        }
      });
    });
    req.on('error', reject);
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function getAlbumMedia() {
  console.log(`📡 Fetching Imgur album data for ${ALBUM_HASH}...`);
  try {
    const res = await fetchJson(`https://api.imgur.com/post/v1/albums/${ALBUM_HASH}?client_id=${CLIENT_ID}&include=media`);
    if (res && res.media && Array.isArray(res.media)) {
      console.log(`✅ Fetched ${res.media.length} media items from live Imgur API.`);
      return res.media;
    }
  } catch (err) {
    console.warn(`⚠️ Live Imgur API failed (${err.message}). Checking backup cache...`);
  }

  // Backup cache path
  const backupPaths = [
    path.resolve(__dirname, '../../../../brain/a8cf77b5-9e4c-4434-b26a-1807563426ea/scratch/imgur_api.json'),
    path.resolve(__dirname, 'imgur_backup.json')
  ];

  for (const bp of backupPaths) {
    if (fs.existsSync(bp)) {
      console.log(`📦 Loaded backup media pool from ${bp}`);
      const data = JSON.parse(fs.readFileSync(bp, 'utf-8'));
      return data.media || [];
    }
  }

  throw new Error('No Imgur media found.');
}

function parseItemMetadata(item, index) {
  const rawName = item.name || '';
  const cleanName = rawName.replace(/\.jpe?g|\.png|\.webp/gi, '').trim();

  // Suburb detection
  const suburbPatterns = [
    { name: 'The Gap', regex: /the\s*gap/i },
    { name: 'Bellbowrie', regex: /bellbowrie/i },
    { name: 'Fernvale', regex: /fernvale/i },
    { name: 'Acacia Ridge', regex: /acacia\s*ridge/i },
    { name: 'Chapel Hill', regex: /chapel\s*hill/i },
    { name: 'Dutton Park', regex: /dutton\s*p(ark)?/i },
    { name: 'Camira', regex: /camira/i },
    { name: 'Goodna', regex: /goodna/i },
    { name: 'Mount Ommaney', regex: /mount\s*(ommaney|gravatt)?/i },
    { name: 'Kenmore', regex: /kenmore/i },
    { name: 'Springfield', regex: /springfield/i },
    { name: 'Sherwood', regex: /sherwood/i },
    { name: 'Bulimba', regex: /bulimba/i },
    { name: 'New Farm', regex: /new\s*farm/i },
    { name: 'Ascot', regex: /ascot/i },
    { name: 'Hamilton', regex: /hamilton/i },
    { name: 'Brookfield', regex: /brookfield/i },
    { name: 'Indooroopilly', regex: /indooroopilly/i },
    { name: 'Yamanto', regex: /yamanto/i }
  ];

  let suburb = 'Brisbane';
  for (const s of suburbPatterns) {
    if (s.regex.test(cleanName)) {
      suburb = s.name;
      break;
    }
  }

  // Design name
  let design = '';
  const designMatch = cleanName.match(/([a-zA-Z0-9\s]+)\s+Design/i);
  if (designMatch) {
    design = designMatch[1].trim();
  } else if (/kenmore/i.test(cleanName)) {
    design = 'Kenmore';
  } else if (/coomera/i.test(cleanName)) {
    design = 'Coomera';
  } else if (/springfield/i.test(cleanName)) {
    design = 'Springfield';
  } else if (/hamilton/i.test(cleanName)) {
    design = 'Hamilton';
  } else if (/greenslopes/i.test(cleanName)) {
    design = 'Greenslopes';
  } else if (/sherwood/i.test(cleanName)) {
    design = 'Sherwood';
  } else if (/archerfield/i.test(cleanName)) {
    design = 'Archerfield';
  } else if (/horizon/i.test(cleanName)) {
    design = 'Horizon';
  } else {
    design = 'Architectural Slat';
  }

  // Color / Finish
  let finish = 'Monument Matte (Colorbond)';
  if (/night\s*s(ky)?/i.test(cleanName)) finish = 'Night Sky (Colorbond)';
  else if (/satin\s*black/i.test(cleanName)) finish = 'Satin Black Powdercoat (Dulux)';
  else if (/monument/i.test(cleanName)) finish = 'Monument Matte (Colorbond)';
  else if (/charcoal/i.test(cleanName)) finish = 'Charcoal Textured Powdercoat';
  else if (/woodland\s*grey/i.test(cleanName)) finish = 'Woodland Grey (Colorbond)';
  else if (/pale\s*eucalypt/i.test(cleanName)) finish = 'Pale Eucalypt (Colorbond)';
  else if (/classic\s*cream/i.test(cleanName)) finish = 'Classic Cream (Colorbond)';
  else if (/bushland/i.test(cleanName)) finish = 'Bushland (Colorbond)';
  else if (/jasper/i.test(cleanName)) finish = 'Jasper & Paperbark Two-Tone (Colorbond)';

  // Category & Gate Type
  let category = 'sliding';
  let gateType = 'Automatic Sliding Gate';
  let motor = 'Centurion D5 Smart Hi-Speed';

  if (/dual\s*swing|double\s*swing/i.test(cleanName)) {
    category = 'swing';
    gateType = 'Automatic Dual Swing Gate';
    motor = 'Centurion Vantage 400 Linear Swing System';
  } else if (/single\s*swing/i.test(cleanName)) {
    category = 'swing';
    gateType = 'Automatic Single Swing Gate';
    motor = 'Centurion Vantage 400 Linear Swing';
  } else if (/slide|sliding/i.test(cleanName)) {
    category = 'sliding';
    gateType = 'Automatic Sliding Gate';
    motor = 'Centurion D5 Smart Hi-Speed';
  }

  if (/fencing|infill|pa\s*gate|slat/i.test(cleanName)) {
    if (category === 'sliding') gateType += ' & Matching Pedestrian Gate / Slat Fencing';
    if (category === 'swing') gateType += ' & Integrated Infill Slat Panels';
  }

  const title = `${design} ${gateType.includes('Swing') ? 'Dual Swing Gate' : 'Sliding Gate'} — ${suburb}`;
  const slug = `imgur-${index + 1}-${suburb.toLowerCase().replace(/\s+/g, '-')}-${design.toLowerCase().replace(/\s+/g, '-')}-${item.id}`;

  return {
    id: `project-${slug}`,
    suburb,
    design,
    finish,
    category,
    gateType,
    motor,
    title,
    caption: `${design} Design, ${suburb} (${finish.split(' ')[0]})`,
    location: `${suburb}, QLD`,
    description: `Custom engineered and fabricated in our Yamanto workshop for a client in ${suburb}, QLD. Features ${design} styling in ${finish} with ${motor} automation and our 10-year structural warranty.`,
    slug
  };
}

async function processGallery() {
  const media = await getAlbumMedia();
  console.log(`🖼️ Processing ${media.length} images from pool...`);

  const poolItems = [];

  for (let i = 0; i < media.length; i++) {
    const item = media[i];
    const meta = parseItemMetadata(item, i);
    const filename = `${meta.slug}.webp`;
    const destWebpPath = path.join(PUBLIC_GALLERY_DIR, filename);
    const publicUrl = `/images/gallery/${filename}`;

    const tempDownloadPath = path.join(PUBLIC_GALLERY_DIR, `temp_${item.id}.${item.ext || 'jpg'}`);

    if (!fs.existsSync(destWebpPath)) {
      console.log(`⬇️ Downloading [${i + 1}/${media.length}] ${item.url}...`);
      await downloadFile(item.url, tempDownloadPath);

      console.log(`⚙️ Converting & optimizing ${filename} to WebP...`);
      await sharp(tempDownloadPath)
        .rotate() // auto-orient
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 85, effort: 4 })
        .toFile(destWebpPath);

      try { fs.unlinkSync(tempDownloadPath); } catch (_) {}
    } else {
      console.log(`✓ [${i + 1}/${media.length}] Cached: ${filename}`);
    }

    poolItems.push({
      id: meta.id,
      url: publicUrl,
      image: publicUrl,
      fallbackUrl: item.url,
      title: meta.title,
      category: meta.category,
      location: meta.location,
      finish: meta.finish,
      motor: meta.motor,
      description: meta.description,
      gateType: meta.gateType,
      suburb: meta.suburb,
      caption: meta.caption
    });
  }

  console.log(`\n🎉 Generated ${poolItems.length} optimized gallery pool items!`);

  // Now update siteData.js
  console.log(`📝 Updating GALLERY_ITEMS in ${SITE_DATA_PATH}...`);
  let content = fs.readFileSync(SITE_DATA_PATH, 'utf-8');

  // Read existing GALLERY_ITEMS
  const match = content.match(/export const GALLERY_ITEMS = (\[[\s\S]*?\]);/);
  if (!match) {
    throw new Error('Could not find GALLERY_ITEMS in siteData.js');
  }

  let existing = [];
  try {
    existing = eval(match[1]);
  } catch (e) {
    console.warn('eval failed, regex parsing fallback');
  }

  // Filter out bad/low-quality items from existing (like 10-Year warranty badge, duplicate 1.webp)
  const cleanedExisting = existing.filter(item => {
    if (!item.image) return false;
    if (item.image.includes('10-Year-Structural-Warranty')) return false;
    if (item.id && item.id.startsWith('project-imgur-')) return false; // remove old imgur pool items to avoid duplicates
    return true;
  });

  // Combine: New Imgur pool items at the top, followed by existing items
  const combined = [...poolItems, ...cleanedExisting];
  console.log(`Total gallery items after merge: ${combined.length}`);

  const newGalleryCode = `export const GALLERY_ITEMS = ${JSON.stringify(combined, null, 2)};`;
  const updatedContent = content.replace(/export const GALLERY_ITEMS = \[[\s\S]*?\];/, newGalleryCode);

  fs.writeFileSync(SITE_DATA_PATH, updatedContent, 'utf-8');
  console.log(`✅ siteData.js successfully updated with ${combined.length} gallery items!`);
}

processGallery().catch(err => {
  console.error('❌ Error processing gallery:', err);
  process.exit(1);
});
