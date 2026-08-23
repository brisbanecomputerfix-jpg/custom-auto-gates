const fs = require('fs');
const path = require('path');

const siteData = fs.readFileSync('src/data/siteData.js', 'utf8');
const regex = /['"](\/images\/[^'"]+)['"]/g;
let match;
const images = new Set();
while ((match = regex.exec(siteData)) !== null) {
  images.add(match[1]);
}

console.log('Total unique images referenced in siteData.js:', images.size);

const missing = [];
const existing = [];

for (const img of images) {
  const relPath = path.join('public', img.replace(/^\//, ''));
  if (!fs.existsSync(relPath)) {
    missing.push(img);
  } else {
    existing.push(img);
  }
}

console.log('Existing images:', existing.length);
console.log('Missing images:', missing.length);

if (missing.length > 0) {
  console.log('\nMissing images list:');
  missing.forEach(m => console.log('  -', m));
}
