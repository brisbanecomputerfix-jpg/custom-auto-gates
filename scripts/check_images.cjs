const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'public', 'images');
const availableImages = new Set(fs.readdirSync(imgDir));
console.log('Total local image files in public/images:', availableImages.size);

const siteDataPath = path.join(__dirname, '..', 'src', 'data', 'siteData.js');
const siteData = fs.readFileSync(siteDataPath, 'utf8');

const regex = /\/images\/([^"'`\s\)]+)/g;
let match;
const missing = new Set();
const found = new Set();

while ((match = regex.exec(siteData)) !== null) {
  let file = match[1].replace(/[,;]$/, '');
  if (availableImages.has(file)) {
    found.add(file);
  } else {
    // Check if case insensitive match exists or if a similar file exists
    const lower = file.toLowerCase();
    const matchFound = Array.from(availableImages).find(f => f.toLowerCase() === lower);
    if (matchFound) {
      found.add(file + ` -> (case diff: ${matchFound})`);
    } else {
      missing.add(file);
    }
  }
}

console.log('Found matches:', found.size);
console.log('Missing files count:', missing.size);
console.log('Missing list:', Array.from(missing).slice(0, 30));
