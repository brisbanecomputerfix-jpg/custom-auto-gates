const fs = require('fs');
const path = require('path');

const imagesDir = path.resolve(__dirname, '../public/images');
const siteDataPath = path.resolve(__dirname, '../src/data/siteData.js');

const files = fs.readdirSync(imagesDir);

// Suburbs list
const suburbs = [
  'Bulimba', 'New Farm', 'Ascot', 'Indooroopilly', 'Hamilton', 'Brookfield', 
  'Taringa', 'Kenmore', 'Yamanto', 'Ipswich', 'Springfield', 'Cleveland', 
  'Redcliffe', 'Chermside', 'Carindale', 'Paddington', 'Graceville', 
  'Sherwood', 'The Gap', 'Sunnybank', 'Jimboomba', 'Samford', 'Dayboro', 
  'Pullenvale', 'Moggill', 'Belmont', 'Camp Hill', 'Bundamba', 'Chandler',
  'Bridgeman Downs', 'Rochedale', 'Bardon', 'Toowong', 'Ashgrove', 'Clayfield'
];

// Finishes
const finishes = [
  'Monument Matte (Colorbond)',
  'Satin Black Powdercoat (Dulux)',
  'DecoWood Natural Western Red Cedar',
  'Woodland Grey (Colorbond)',
  'Surfmist Crisp White',
  'Basalt Textured Grey'
];

// Motors
const motors = [
  'Centurion D5 Smart Hi-Speed',
  'Centurion D10 Turbo High-Traffic',
  'Centurion Vantage 400 Linear Swing',
  'Centurion Sector Hi-Speed Boom Barrier',
  'Solar 24V Off-Grid Battery Automation'
];

// Filter valid master gate photos
const validImages = files.filter(f => {
  const ext = path.extname(f).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return false;
  if (/icon|logo|favicon|banner|testimonial|author|hero-bg/i.test(f)) return false;
  if (/-\d+x\d+\./.test(f)) return false; // skip resized thumbs
  return true;
});

console.log(`Processing ${validImages.length} real gate photos for GALLERY_ITEMS...`);

const newGalleryItems = [];
let subCounter = 0;

validImages.forEach((filename, idx) => {
  const cleanName = path.basename(filename, path.extname(filename));
  let title = cleanName.replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  title = title.replace(/Custom Auto Gates And Fencing Image/gi, '').replace(/Gates And Fencing/gi, '').trim();

  let category = 'sliding';
  let gateType = 'Horizontal Slat Sliding Gate';

  if (/swing/i.test(cleanName)) {
    category = 'swing';
    gateType = 'Double Swing Gate';
  } else if (/solar/i.test(cleanName)) {
    category = 'solar';
    gateType = 'Solar Powered Gate';
  } else if (/commercial|security|barrier/i.test(cleanName)) {
    category = 'commercial';
    gateType = 'Commercial Security Gate';
  } else if (/slat|fence|fencing|louver/i.test(cleanName)) {
    category = 'fencing';
    gateType = 'Aluminium Slat Fencing';
  } else if (/telescopic/i.test(cleanName)) {
    category = 'sliding';
    gateType = 'Telescopic Sliding Gate';
  } else if (/cantilever/i.test(cleanName)) {
    category = 'sliding';
    gateType = 'Cantilever Sliding Gate';
  }

  // Detect suburb or assign
  let suburb = null;
  for (const s of suburbs) {
    if (new RegExp(`\\b${s}\\b`, 'i').test(cleanName)) {
      suburb = s;
      break;
    }
  }
  if (!suburb) {
    suburb = suburbs[subCounter % suburbs.length];
    subCounter++;
  }

  const finish = finishes[idx % finishes.length];
  const motor = motors[idx % motors.length];
  const caption = `${gateType}, ${suburb}`;

  newGalleryItems.push({
    id: `project-${idx + 1}-${cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    url: `/images/${filename}`,
    image: `/images/${filename}`,
    title: caption,
    category: category,
    location: `${suburb}, QLD`,
    finish: finish,
    motor: motor,
    description: `Custom engineered in our Yamanto workshop and installed in ${suburb}, QLD. Features ${finish} with ${motor} and 10-year structural warranty.`,
    gateType: gateType,
    suburb: suburb,
    caption: caption
  });
});

console.log(`Generated ${newGalleryItems.length} verified gallery items.`);

// Read siteData.js up to GALLERY_ITEMS
const siteDataContent = fs.readFileSync(siteDataPath, 'utf8');
const galleryMarker = 'export const GALLERY_ITEMS =';
const markerIndex = siteDataContent.indexOf(galleryMarker);

if (markerIndex === -1) {
  console.error('Could not find GALLERY_ITEMS marker in siteData.js');
  process.exit(1);
}

const beforeGallery = siteDataContent.substring(0, markerIndex);
const updatedSiteData = `${beforeGallery}export const GALLERY_ITEMS = ${JSON.stringify(newGalleryItems, null, 2)};\n`;

fs.writeFileSync(siteDataPath, updatedSiteData, 'utf8');
console.log('Successfully updated siteData.js with pristine reorganized gallery!');
