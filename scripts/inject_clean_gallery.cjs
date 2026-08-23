const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 1. Get original content from git commit
const originalContent = execSync('git show eacf2b0:src/data/siteData.js').toString();

// 2. Load the 225 clean reorganized gallery items
const reorganizedGallery = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'reorganized_gallery.json'), 'utf8'));

// Format each item with all expected properties
const formattedItems = reorganizedGallery.map((item, idx) => ({
  id: item.id,
  url: item.image,
  image: item.image,
  title: item.title,
  category: item.category,
  location: `${item.suburb}, QLD`,
  finish: 'Satin Black Powdercoat (Dulux)',
  motor: 'Centurion D5 Smart Hi-Speed',
  description: item.desc,
  gateType: item.caption.split(',')[0],
  suburb: item.suburb,
  caption: item.caption
}));

// Find the start of GALLERY_ITEMS and start of WHY_US_POINTS
const startMarker = 'export const GALLERY_ITEMS =';
const endMarker = 'export const WHY_US_POINTS =';

const startIndex = originalContent.indexOf(startMarker);
const endIndex = originalContent.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Markers not found!');
  process.exit(1);
}

const before = originalContent.substring(0, startIndex);
const after = originalContent.substring(endIndex);

const newContent = `${before}export const GALLERY_ITEMS = ${JSON.stringify(formattedItems, null, 2)};\n\n${after}`;

fs.writeFileSync(path.resolve(__dirname, '../src/data/siteData.js'), newContent, 'utf8');
console.log('Successfully injected clean GALLERY_ITEMS preserving all exports!');
