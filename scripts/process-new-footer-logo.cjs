const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = 'C:/Users/PC/.gemini/antigravity-ide/brain/e28e8c42-39df-4e2a-9223-5ac2a606d3ce/.user_uploaded/media_1787641988248.png';
const publicImages = path.join(__dirname, '..', 'public', 'images');

async function main() {
  console.log('Loading input image...');
  
  // 1. Get raw pixel buffer
  const { data, info } = await sharp(inputPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;
  console.log(`Dimensions: ${width}x${height}, channels: ${channels}`);

  // Create buffers for:
  // - Transparent original (dark text/gate, orange gear, transparent BG)
  // - Dark-mode optimized (white text/gate, vibrant orange gear, transparent BG for dark footer)
  
  const transBuffer = Buffer.alloc(width * height * 4);
  const darkModeBuffer = Buffer.alloc(width * height * 4);

  // Analyze bounds
  let minX = width, maxX = 0, minY = height, maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = channels === 4 ? data[idx + 3] : 255;

      const outIdx = (y * width + x) * 4;

      // Check lightness to determine if pixel is background (white/off-white)
      const lightness = (r + g + b) / 3.0;

      // Orange detection: high R, medium G, low B (R > 150, G > 40, B < 120, R - B > 60)
      const isOrange = (r > 150 && g > 40 && b < 120 && (r - b) > 60);

      let alphaVal = 255;
      if (lightness > 248) {
        alphaVal = 0;
      } else if (lightness > 220) {
        // Feather edge
        alphaVal = Math.round(255 * (248 - lightness) / (248 - 220));
      }

      if (alphaVal > 10) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }

      // 1. Transparent original (light background version)
      transBuffer[outIdx] = r;
      transBuffer[outIdx + 1] = g;
      transBuffer[outIdx + 2] = b;
      transBuffer[outIdx + 3] = alphaVal;

      // 2. Dark-mode version (for dark footer / navbar)
      if (alphaVal === 0) {
        darkModeBuffer[outIdx] = 0;
        darkModeBuffer[outIdx + 1] = 0;
        darkModeBuffer[outIdx + 2] = 0;
        darkModeBuffer[outIdx + 3] = 0;
      } else if (isOrange) {
        // Vibrant orange accents (gear, motor light, divider line)
        darkModeBuffer[outIdx] = r;
        darkModeBuffer[outIdx + 1] = g;
        darkModeBuffer[outIdx + 2] = b;
        darkModeBuffer[outIdx + 3] = alphaVal;
      } else {
        // Dark gate & dark text converted to crisp white (#FFFFFF) with smooth anti-aliasing
        const factor = (255 - lightness) / 255.0;
        const darkAlpha = Math.min(255, Math.round(alphaVal * (factor > 0.3 ? 1.0 : factor * 2.5)));
        darkModeBuffer[outIdx] = 255;
        darkModeBuffer[outIdx + 1] = 255;
        darkModeBuffer[outIdx + 2] = 255;
        darkModeBuffer[outIdx + 3] = darkAlpha;
      }
    }
  }

  console.log(`Bounding box: minX=${minX}, minY=${minY}, maxX=${maxX}, maxY=${maxY}`);
  const cropW = Math.max(1, maxX - minX + 1);
  const cropH = Math.max(1, maxY - minY + 1);
  console.log(`Crop dimensions: ${cropW} x ${cropH}`);

  // Create sharp instances and crop to bounding box + padding
  const padding = 6;
  const extractX = Math.max(0, minX - padding);
  const extractY = Math.max(0, minY - padding);
  const extractW = Math.min(width - extractX, cropW + padding * 2);
  const extractH = Math.min(height - extractY, cropH + padding * 2);

  // Save full original uploaded copy
  fs.copyFileSync(inputPath, path.join(publicImages, 'custom-auto-gates-footer-logo-original.png'));

  // Save cropped transparent version (light mode / dark text)
  const croppedLight = await sharp(transBuffer, { raw: { width, height, channels: 4 } })
    .extract({ left: extractX, top: extractY, width: extractW, height: extractH })
    .png({ quality: 100 })
    .toBuffer();

  await sharp(croppedLight).toFile(path.join(publicImages, 'custom-auto-gates-footer-logo-light.png'));
  await sharp(croppedLight).toFile(path.join(publicImages, 'custom-auto-gates-logo-horizontal-light.png'));

  // Save cropped dark mode version (dark background / white text & gate, orange gear)
  const croppedDark = await sharp(darkModeBuffer, { raw: { width, height, channels: 4 } })
    .extract({ left: extractX, top: extractY, width: extractW, height: extractH })
    .png({ quality: 100 })
    .toBuffer();

  await sharp(croppedDark).toFile(path.join(publicImages, 'custom-auto-gates-footer-logo-dark.png'));
  await sharp(croppedDark).toFile(path.join(publicImages, 'custom-auto-gates-logo-horizontal-dark.png'));
  await sharp(croppedDark).toFile(path.join(publicImages, 'custom-auto-gates-footer-logo.png'));

  // Create 2x high resolution scaled versions for Retina displays
  await sharp(croppedDark)
    .resize(Math.round(extractW * 2), Math.round(extractH * 2), { kernel: 'lanczos3' })
    .png({ quality: 100 })
    .toFile(path.join(publicImages, 'custom-auto-gates-footer-logo@2x.png'));
  
  await sharp(croppedDark)
    .resize(Math.round(extractW * 2), Math.round(extractH * 2), { kernel: 'lanczos3' })
    .png({ quality: 100 })
    .toFile(path.join(publicImages, 'custom-auto-gates-logo-horizontal-dark@2x.png'));

  console.log('Successfully generated all footer logo variants!');
}

main().catch(console.error);
