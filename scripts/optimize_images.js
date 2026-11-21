import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imagesDir = path.resolve('public/images');

async function optimizeImages() {
  console.log('Optimizing images in:', imagesDir);

  // 1. Mobile hero images (768px width, WebP quality 75)
  const heroImages = [
    'hero-monument-sliding.webp',
    'hero-decowood-slat.webp',
    'hero-solar-entry.webp',
    'hero-factory-slat.webp',
    'hero-swing-gates.webp'
  ];

  for (const file of heroImages) {
    const inputPath = path.join(imagesDir, file);
    if (!fs.existsSync(inputPath)) continue;

    const baseName = path.basename(file, '.webp');
    const mobilePath = path.join(imagesDir, `${baseName}-mobile.webp`);

    const inputBuffer = fs.readFileSync(inputPath);

    // Generate mobile version (max width 768)
    const mobileBuffer = await sharp(inputBuffer)
      .resize({ width: 768, withoutEnlargement: true })
      .webp({ quality: 75, effort: 6 })
      .toBuffer();
    fs.writeFileSync(mobilePath, mobileBuffer);

    console.log(`[MOBILE HERO] ${file}: ${inputBuffer.length} B -> ${baseName}-mobile.webp: ${mobileBuffer.length} B (-${Math.round((1 - mobileBuffer.length/inputBuffer.length)*100)}%)`);

    // Optimize desktop version too (max width 1920)
    const deskBuffer = await sharp(inputBuffer)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toBuffer();
    if (deskBuffer.length < inputBuffer.length) {
      fs.writeFileSync(inputPath, deskBuffer);
      console.log(`[DESKTOP HERO OPT] ${file}: ${inputBuffer.length} B -> ${deskBuffer.length} B (-${Math.round((1 - deskBuffer.length/inputBuffer.length)*100)}%)`);
    }
  }

  // 2. Compress heavy raw JPEGs/PNGs over 500KB
  const files = fs.readdirSync(imagesDir);
  for (const f of files) {
    if (f.endsWith('-mobile.webp') || f.endsWith('-temp.jpg') || f.endsWith('-desk-opt.webp')) {
      const p = path.join(imagesDir, f);
      if (f.includes('desk-opt') || f.includes('-temp')) {
        try { fs.unlinkSync(p); } catch(e){}
      }
      continue;
    }

    const filePath = path.join(imagesDir, f);
    const stat = fs.statSync(filePath);

    if (stat.size > 400 * 1024 && (f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'))) {
      const ext = path.extname(f).toLowerCase();

      try {
        const buf = fs.readFileSync(filePath);
        let outBuf;

        if (ext === '.jpg' || ext === '.jpeg') {
          outBuf = await sharp(buf)
            .resize({ width: 1400, withoutEnlargement: true })
            .jpeg({ quality: 78, mozjpeg: true })
            .toBuffer();
        } else if (ext === '.png') {
          outBuf = await sharp(buf)
            .resize({ width: 1400, withoutEnlargement: true })
            .png({ compressionLevel: 9, quality: 80 })
            .toBuffer();
        }

        if (outBuf && outBuf.length < stat.size) {
          fs.writeFileSync(filePath, outBuf);
          console.log(`[COMPRESSED] ${f}: ${stat.size} B -> ${outBuf.length} B (-${Math.round((1 - outBuf.length/stat.size)*100)}%)`);
        }
      } catch (err) {
        console.error(`Failed to optimize ${f}:`, err.message);
      }
    }
  }

  console.log('Image optimization finished successfully.');
}

optimizeImages().catch(console.error);
