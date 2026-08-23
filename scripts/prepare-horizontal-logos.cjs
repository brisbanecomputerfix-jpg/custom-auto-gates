const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const publicImages = path.join(__dirname, '..', 'public', 'images');

async function processHorizontalLogos() {
  console.log('Processing horizontal header logos...');
  
  // 1. Process Day / Light mode logo from logo-for-web-site-1.png
  const lightSource = path.join(publicImages, 'logo-for-web-site-1.png');
  const lightTrimmed = await sharp(lightSource)
    .trim()
    .toBuffer();

  const lightMeta = await sharp(lightTrimmed).metadata();
  console.log('Light trimmed:', lightMeta.width, 'x', lightMeta.height);

  // Save light mode horizontal logo
  await sharp(lightTrimmed)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(publicImages, 'custom-auto-gates-logo-horizontal-light.png'));

  // 2. Process Dark mode logo from custom-auto-gates-logo-white-2.png
  const darkSource = path.join(publicImages, 'custom-auto-gates-logo-white-2.png');
  const darkTrimmed = await sharp(darkSource)
    .trim()
    .toBuffer();

  const darkMeta = await sharp(darkTrimmed).metadata();
  console.log('Dark trimmed:', darkMeta.width, 'x', darkMeta.height);

  // Save dark mode horizontal logo
  await sharp(darkTrimmed)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(publicImages, 'custom-auto-gates-logo-horizontal-dark.png'));

  // Also create @2x high resolution scaled versions for ultra-sharp Retina/mobile displays
  await sharp(lightTrimmed)
    .resize(Math.round(lightMeta.width * 1.5), Math.round(lightMeta.height * 1.5), { fit: 'inside' })
    .png({ quality: 100 })
    .toFile(path.join(publicImages, 'custom-auto-gates-logo-horizontal-light@2x.png'));

  await sharp(darkTrimmed)
    .resize(Math.round(darkMeta.width * 1.5), Math.round(darkMeta.height * 1.5), { fit: 'inside' })
    .png({ quality: 100 })
    .toFile(path.join(publicImages, 'custom-auto-gates-logo-horizontal-dark@2x.png'));

  console.log('Horizontal logos generated successfully!');
}

processHorizontalLogos().catch(console.error);
