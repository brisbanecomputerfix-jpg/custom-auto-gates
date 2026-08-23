const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('C:/Users/PC/.gemini/antigravity-ide/brain/fda705ff-5694-4d70-84ca-6c00aaf2c428/.system_generated/steps/874/content.md', 'utf8');

// Regex to find gallery items or images with captions/titles
const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
let match;
const foundImages = [];

while ((match = imgRegex.exec(content)) !== null) {
  const fullTag = match[0];
  const src = match[1];
  const altMatch = fullTag.match(/alt=["']([^"']*)["']/i);
  const titleMatch = fullTag.match(/title=["']([^"']*)["']/i);
  const alt = altMatch ? altMatch[1] : '';
  const title = titleMatch ? titleMatch[1] : '';
  
  if (src.includes('/wp-content/uploads/') || src.includes('customautogates.com.au')) {
    foundImages.push({
      src,
      alt,
      title,
      tag: fullTag
    });
  }
}

console.log('Total gallery images found:', foundImages.length);

// Also look for Elementor or Royal Addons gallery structures
const galleryItemRegex = /<div[^>]*class=["'][^"']*wpr-grid-item[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi;
let gMatch;
const galleryItems = [];

while ((gMatch = galleryItemRegex.exec(content)) !== null) {
  const itemHtml = gMatch[1];
  const srcM = itemHtml.match(/src=["']([^"']+)["']/i);
  const titleM = itemHtml.match(/<h[2-6][^>]*class=["'][^"']*wpr-grid-item-title[^"']*["'][^>]*>([\s\S]*?)<\/h[2-6]>/i) || itemHtml.match(/class=["'][^"']*title[^"']*["'][^>]*>([\s\S]*?)<\//i);
  const descM = itemHtml.match(/<div[^>]*class=["'][^"']*wpr-grid-item-description[^"']*["'][^>]*>([\s\S]*?)<\/div>/i) || itemHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  
  if (srcM) {
    galleryItems.push({
      src: srcM[1],
      title: titleM ? titleM[1].replace(/<[^>]+>/g, '').trim() : '',
      desc: descM ? descM[1].replace(/<[^>]+>/g, '').trim() : ''
    });
  }
}

console.log('Detailed grid items found:', galleryItems.length);
if (galleryItems.length > 0) {
  console.log('Sample gallery items:');
  console.log(galleryItems.slice(0, 10));
} else {
  console.log('Sample found images:');
  console.log(foundImages.slice(0, 10));
}
