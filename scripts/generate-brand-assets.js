import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = 'C:\\Users\\PC\\.gemini\\antigravity-ide\\brain\\45451473-e77b-4f0b-8660-18264638abae\\.user_uploaded\\media_1787179454303.png';
const outputDir = 'C:\\Users\\PC\\.gemini\\antigravity-ide\\scratch\\custom-auto-gates\\public\\images';
const publicDir = 'C:\\Users\\PC\\.gemini\\antigravity-ide\\scratch\\custom-auto-gates\\public';

async function generateAssets() {
  console.log('Reading uploaded logo from:', inputPath);
  const image = sharp(inputPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;

  // 1. Find tight bounding box of content
  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * info.channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      if (r < 240 || g < 240 || b < 240) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const padding = 16;
  const cropLeft = Math.max(0, minX - padding);
  const cropTop = Math.max(0, minY - padding);
  const cropWidth = Math.min(width - cropLeft, (maxX - minX) + padding * 2);
  const cropHeight = Math.min(height - cropTop, (maxY - minY) + padding * 2);

  console.log(`Cropping logo: ${cropWidth}x${cropHeight} at (${cropLeft}, ${cropTop})`);

  // 2. Generate Cropped Original on White Background
  const croppedOriginal = sharp(inputPath).extract({
    left: cropLeft,
    top: cropTop,
    width: cropWidth,
    height: cropHeight
  });
  await croppedOriginal.clone().png().toFile(path.join(outputDir, 'custom-auto-gates-logo-white-bg.png'));
  await croppedOriginal.clone().png().toFile(path.join(outputDir, 'custom-auto-gates-logo-original.png'));

  // 3. Generate Transparent Light Mode Logo & Dark Mode Logo
  const lightRgba = Buffer.alloc(width * height * 4);
  const darkRgba = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * info.channels;
      const dstIdx = (y * width + x) * 4;

      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];

      const maxVal = Math.max(r, g, b);
      const minVal = Math.min(r, g, b);
      // Detect orange gear / orange accent line
      const isOrange = (r > 175 && g > 60 && g < 185 && b < 110 && (r - g > 45));
      const brightness = (r + g + b) / 3;

      if (brightness > 248 && (maxVal - minVal < 15)) {
        // Pure transparent for white background
        lightRgba[dstIdx] = 255;
        lightRgba[dstIdx + 1] = 255;
        lightRgba[dstIdx + 2] = 255;
        lightRgba[dstIdx + 3] = 0;

        darkRgba[dstIdx] = 255;
        darkRgba[dstIdx + 1] = 255;
        darkRgba[dstIdx + 2] = 255;
        darkRgba[dstIdx + 3] = 0;
      } else if (brightness > 230 && (maxVal - minVal < 20)) {
        // Edge anti-aliasing feathering
        const alpha = Math.max(0, Math.min(255, Math.round((255 - brightness) * (255 / 25))));
        lightRgba[dstIdx] = r;
        lightRgba[dstIdx + 1] = g;
        lightRgba[dstIdx + 2] = b;
        lightRgba[dstIdx + 3] = alpha;

        if (isOrange) {
          darkRgba[dstIdx] = Math.min(255, Math.round(r * 1.05));
          darkRgba[dstIdx + 1] = Math.min(255, Math.round(g * 1.1));
          darkRgba[dstIdx + 2] = b;
          darkRgba[dstIdx + 3] = alpha;
        } else {
          // Dark parts inverted to crisp bright white #F8FAFC
          darkRgba[dstIdx] = 248;
          darkRgba[dstIdx + 1] = 250;
          darkRgba[dstIdx + 2] = 252;
          darkRgba[dstIdx + 3] = alpha;
        }
      } else {
        // Content pixel
        lightRgba[dstIdx] = r;
        lightRgba[dstIdx + 1] = g;
        lightRgba[dstIdx + 2] = b;
        lightRgba[dstIdx + 3] = 255;

        if (isOrange) {
          // Keep orange gear vibrant in dark mode
          darkRgba[dstIdx] = Math.min(255, Math.round(r * 1.05));
          darkRgba[dstIdx + 1] = Math.min(255, Math.round(g * 1.1));
          darkRgba[dstIdx + 2] = b;
          darkRgba[dstIdx + 3] = 255;
        } else {
          // Invert black gate/text to bright clean white/slate #F8FAFC
          const darkTone = (255 - brightness) / 255;
          const targetLight = Math.round(230 + darkTone * 25);
          darkRgba[dstIdx] = targetLight;
          darkRgba[dstIdx + 1] = targetLight;
          darkRgba[dstIdx + 2] = targetLight;
          darkRgba[dstIdx + 3] = 255;
        }
      }
    }
  }

  // Create sharp instance from raw buffers
  const lightImg = sharp(lightRgba, { raw: { width, height, channels: 4 } }).extract({
    left: cropLeft,
    top: cropTop,
    width: cropWidth,
    height: cropHeight
  });

  const darkImg = sharp(darkRgba, { raw: { width, height, channels: 4 } }).extract({
    left: cropLeft,
    top: cropTop,
    width: cropWidth,
    height: cropHeight
  });

  // Save transparent light logo
  await lightImg.clone().png().toFile(path.join(outputDir, 'custom-auto-gates-logo-light.png'));
  // Save transparent dark logo
  await darkImg.clone().png().toFile(path.join(outputDir, 'custom-auto-gates-logo-dark.png'));

  // Main primary logo: default to dark-mode transparent version
  await darkImg.clone().png().toFile(path.join(outputDir, 'custom-auto-gates-logo.png'));
  // Also save light version to standard transparent path
  await lightImg.clone().png().toFile(path.join(outputDir, 'custom-auto-gates-logo-transparent.png'));

  // 4. Generate Square App Icon & Favicon variants from the emblem (gears + gate)
  let emblemMinY = minY, emblemMaxY = 0;
  for (let y = minY; y < minY + 340; y++) {
    for (let x = minX; x <= maxX; x++) {
      const idx = (y * width + x) * info.channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      if (r < 240 || g < 240 || b < 240) {
        if (y > emblemMaxY) emblemMaxY = y;
      }
    }
  }

  const emblemWidth = (maxX - minX) + 20;
  const emblemHeight = (emblemMaxY - minY) + 20;
  const emblemLeft = Math.max(0, minX - 10);
  const emblemTop = Math.max(0, minY - 10);

  console.log(`Generating icons from emblem: ${emblemWidth}x${emblemHeight}`);

  const emblemSquare = sharp(darkRgba, { raw: { width, height, channels: 4 } })
    .extract({
      left: emblemLeft,
      top: emblemTop,
      width: Math.min(width - emblemLeft, emblemWidth),
      height: Math.min(height - emblemTop, emblemHeight)
    })
    .resize(440, 440, {
      fit: 'contain',
      background: { r: 9, g: 14, b: 26, alpha: 1 }
    })
    .extend({
      top: 36,
      bottom: 36,
      left: 36,
      right: 36,
      background: { r: 9, g: 14, b: 26, alpha: 1 }
    });

  await emblemSquare.clone().resize(512, 512).png().toFile(path.join(publicDir, 'site-icon-512x512.png'));
  await emblemSquare.clone().resize(192, 192).png().toFile(path.join(publicDir, 'icon-192x192.png'));
  await emblemSquare.clone().resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  await emblemSquare.clone().resize(32, 32).png().toFile(path.join(publicDir, 'favicon-32x32.png'));
  await emblemSquare.clone().resize(16, 16).png().toFile(path.join(publicDir, 'favicon-16x16.png'));

  console.log('✅ All logo and icon assets successfully generated!');
}

generateAssets().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
