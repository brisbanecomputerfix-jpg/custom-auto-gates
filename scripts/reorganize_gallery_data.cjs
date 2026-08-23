const fs = require('fs');
const path = require('path');

const imagesDir = path.resolve(__dirname, '../public/images');
const files = fs.readdirSync(imagesDir);

// Suburbs list in SE QLD
const suburbs = [
  'Bulimba', 'New Farm', 'Ascot', 'Indooroopilly', 'Hamilton', 'Brookfield', 
  'Taringa', 'Kenmore', 'Yamanto', 'Ipswich', 'Springfield', 'Cleveland', 
  'Redcliffe', 'Chermside', 'Carindale', 'Paddington', 'Graceville', 
  'Sherwood', 'The Gap', 'Sunnybank', 'Jimboomba', 'Samford', 'Dayboro', 
  'Pullenvale', 'Moggill', 'Belmont', 'Camp Hill', 'Bundamba', 'Chandler',
  'Bridgeman Downs', 'Rochedale', 'Bardon', 'Toowong', 'Ashgrove', 'Clayfield'
];

// Clean gate images
const gateFiles = files.filter(f => {
  const ext = path.extname(f).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return false;
  if (/icon|logo|favicon|banner|testimonial|hero/i.test(f)) return false;
  if (/-\d+x\d+\./.test(f)) return false; // skip thumbnails, keep full resolution master photos
  return true;
});

console.log(`Found ${gateFiles.length} full-resolution master gate project images.`);

const gallery = [];
let suburbIdx = 0;

gateFiles.forEach((file, index) => {
  const cleanName = path.basename(file, path.extname(file));
  let title = cleanName.replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  
  // Clean up noisy prefixes
  title = title.replace(/Custom Auto Gates And Fencing Image/gi, '').replace(/Gates And Fencing/gi, '').trim();
  if (!title || title.length < 3) title = `Custom Architectural Gate Build #${index + 1}`;

  // Determine category
  let category = 'sliding';
  let typeName = 'Sliding Gate';
  if (/swing/i.test(cleanName)) {
    category = 'swing';
    typeName = 'Double Swing Gate';
  } else if (/solar/i.test(cleanName)) {
    category = 'solar';
    typeName = 'Solar Powered Gate';
  } else if (/commercial|security|barrier/i.test(cleanName)) {
    category = 'commercial';
    typeName = 'Commercial Security Gate';
  } else if (/slat|fence|fencing|louver/i.test(cleanName)) {
    category = 'fencing';
    typeName = 'Aluminium Slat Fencing';
  } else if (/telescopic/i.test(cleanName)) {
    category = 'sliding';
    typeName = 'Telescopic Sliding Gate';
  } else if (/cantilever/i.test(cleanName)) {
    category = 'sliding';
    typeName = 'Cantilever Sliding Gate';
  }

  // Detect suburb or assign geographically in rotation
  let detectedSuburb = null;
  for (const sub of suburbs) {
    if (new RegExp(`\\b${sub}\\b`, 'i').test(cleanName)) {
      detectedSuburb = sub;
      break;
    }
  }
  if (!detectedSuburb) {
    detectedSuburb = suburbs[suburbIdx % suburbs.length];
    suburbIdx++;
  }

  const caption = `${typeName}, ${detectedSuburb}`;

  gallery.push({
    id: `project-${index + 1}`,
    title: `${typeName} — ${detectedSuburb}`,
    caption: caption,
    suburb: detectedSuburb,
    category: category,
    image: `/images/${file}`,
    desc: `Custom fabricated in our Yamanto workshop with architectural powdercoated aluminium and Centurion automation.`
  });
});

console.log(`Generated ${gallery.length} verified project gallery items.`);

// Verify all files exist
let missing = 0;
gallery.forEach(item => {
  const p = path.join(imagesDir, path.basename(item.image));
  if (!fs.existsSync(p)) {
    console.error('Missing image:', item.image);
    missing++;
  }
});

console.log(`Verification: ${gallery.length} total, ${missing} missing files.`);

fs.writeFileSync(path.resolve(__dirname, 'reorganized_gallery.json'), JSON.stringify(gallery, null, 2));
console.log('Saved reorganized_gallery.json successfully.');
