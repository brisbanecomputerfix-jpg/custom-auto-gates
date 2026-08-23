const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/siteData.js');
let content = fs.readFileSync(filePath, 'utf8');

const match = content.match(/export const GALLERY_ITEMS = (\[[\s\S]*?\]);/);
if (!match) {
  console.error('Could not find GALLERY_ITEMS array');
  process.exit(1);
}

const items = JSON.parse(match[1]);

const QLD_SUBURBS = [
  'Bulimba', 'New Farm', 'Ascot', 'Hawthorne', 'Paddington', 'Chelmer', 
  'Indooroopilly', 'Graceville', 'Hamilton', 'Teneriffe', 'St Lucia', 
  'Pullenvale', 'Brookfield', 'Red Hill', 'Ashgrove', 'Kangaroo Point', 
  'Camp Hill', 'Yamanto', 'Karalee', 'Brookwater', 'Springfield Lakes', 
  'Berrinba', 'Hope Island', 'Sanctuary Cove', 'Coomera', 'Southport', 
  'Kenmore', 'Chapel Hill', 'Fig Tree Pocket', 'Sherwood', 'Corinda', 
  'Tarragindi', 'Holland Park', 'Carindale', 'Manly', 'Wynnum', 
  'Cleveland', 'Thornlands', 'Victoria Point', 'Redland Bay', 'Rochedale', 
  'Sunnybank', 'Springwood', 'Daisy Hill', 'Shailer Park', 'Greenbank', 
  'Jimboomba', 'Tamborine Mountain', 'Helensvale', 'Robina', 'Broadbeach Waters', 
  'Surfers Paradise', 'Burleigh Waters', 'Palm Beach', 'Currumbin', 'Brassall', 
  'Booval', 'Silkstone', 'Flinders View', 'Ripley', 'Deebing Heights', 
  'Rosewood', 'Marburg', 'Plainland', 'Fernvale', 'Lowood', 'Esk', 
  'Samford Valley', 'Dayboro', 'Bridgeman Downs', 'Albany Creek', 'Eatons Hill', 
  'Warner', 'North Lakes', 'Redcliffe', 'Scarborough', 'Sandgate', 
  'Brighton', 'Nundah', 'Clayfield', 'Hendra', 'Wooloowin', 'Wilston', 
  'Windsor', 'Grange', 'Alderley', 'Newmarket', 'Kelvin Grove', 'Bardon', 
  'Toowong', 'Taringa', 'Morningside', 'Norman Park', 'Coorparoo', 
  'Greenslopes', 'Annerley', 'Yeronga', 'Yeerongpilly', 'Tennyson'
];

const SLIDING_TYPES = [
  'Horizontal Slat Sliding Gate',
  'Architectural 3D Batten Sliding Gate',
  'Monument Black Electric Sliding Gate',
  'Centurion Smart High-Speed Sliding Gate',
  'Telescopic Space-Saver Sliding Gate',
  'DecoWood Timber-Grain Sliding Gate',
  'Laser-Cut Decorative Screen Sliding Gate',
  'Modern Louvered Privacy Sliding Gate',
  'Surfmist White Modern Sliding Gate',
  'Custom Colorbond Sliding Driveway Gate'
];

const SWING_TYPES = [
  'Architectural Double Swing Gate',
  'Automated Bi-Fold Swing Gate',
  'Heavy-Duty Double Swing Gate',
  'Centurion Vantage Linear Ram Swing Gate',
  'Modern Slat Double Swing Gate',
  'DecoWood Cedar Look Swing Gate',
  'Louvered Privacy Swing Gate',
  'Classic Wrought-Alloy Double Swing Gate'
];

const SOLAR_TYPES = [
  'Off-Grid Solar Double Swing Gate',
  'Solar Powered Acreage Sliding Gate',
  'Heavy-Duty Farm Entrance Solar Gate',
  'Remote Acreage Solar Swing Gate',
  'Centurion Smart Solar Automated Gate'
];

const COMMERCIAL_TYPES = [
  'Commercial Cantilever Security Gate',
  'Industrial Heavy-Duty Tracked Gate',
  'Commercial Boom Barrier System',
  'High-Cycle Industrial Sliding Gate',
  'Strata Gated Community Entrance Gate',
  'Anti-Climb Security Cantilever Gate'
];

const SLAT_FENCING_TYPES = [
  'Aluminium Slat Infill Fencing & Gate',
  'Horizontal Privacy Slat Boundary Fence',
  'Architectural 3D Batten Slat Screen',
  'DecoWood Timber-Alternative Slat Fence',
  'Pedestrian Gate & Slat Infill Panel Set'
];

const DECOWOOD_TYPES = [
  'DecoWood Western Red Cedar Sliding Gate',
  'DecoWood Natural Casuarina Swing Gate',
  'DecoWood Timber-Grain Privacy Slat Gate',
  'DecoWood Jarrah Finish Driveway Gate',
  'DecoWood Bush Cherry Slat Gate'
];

const FINISHES = [
  'Satin Black Powdercoat (Dulux)',
  'Colorbond Monument Matt Powdercoat',
  'Colorbond Surfmist White Powdercoat',
  'Colorbond Woodland Grey Powdercoat',
  'DecoWood Western Red Cedar Natural Grain',
  'Interpon Textura Deep Ocean Blue',
  'Custom Charcoal Metallic Powdercoat',
  'Dulux Duralloy Matt Black'
];

const MOTORS = [
  'Centurion D5 Smart Hi-Speed (900kg)',
  'Centurion D10 Smart Commercial (1000kg)',
  'Centurion Vantage 400 Linear Actuators',
  'Centurion Vantage 500 Heavy-Duty Arms',
  'Centurion Sector II High-Speed Boom Barrier',
  'Centurion D5 Smart Solar Off-Grid System'
];

// Helper to extract suburb from filename or existing title if present
function extractExistingSuburb(item) {
  const text = (item.id + ' ' + item.title + ' ' + item.location).toLowerCase();
  for (const sub of QLD_SUBURBS) {
    if (text.includes(sub.toLowerCase())) {
      return sub;
    }
  }
  return null;
}

const updatedItems = items.map((item, idx) => {
  const existingSub = extractExistingSuburb(item);
  const suburb = existingSub || QLD_SUBURBS[idx % QLD_SUBURBS.length];
  
  let gateType = '';
  const cat = item.category || 'sliding';
  
  if (cat === 'solar') {
    gateType = SOLAR_TYPES[idx % SOLAR_TYPES.length];
  } else if (cat === 'commercial') {
    gateType = COMMERCIAL_TYPES[idx % COMMERCIAL_TYPES.length];
  } else if (cat === 'slat-fencing') {
    gateType = SLAT_FENCING_TYPES[idx % SLAT_FENCING_TYPES.length];
  } else if (cat === 'decowood') {
    gateType = DECOWOOD_TYPES[idx % DECOWOOD_TYPES.length];
  } else if (cat === 'swing') {
    gateType = SWING_TYPES[idx % SWING_TYPES.length];
  } else {
    gateType = SLIDING_TYPES[idx % SLIDING_TYPES.length];
  }

  // Format title as strictly "[Gate Type], [Suburb]"
  const formattedTitle = `${gateType}, ${suburb}`;
  const finish = item.finish || FINISHES[idx % FINISHES.length];
  const motor = item.motor || (cat === 'swing' ? MOTORS[2] : cat === 'solar' ? MOTORS[5] : MOTORS[0]);

  return {
    ...item,
    gateType: gateType,
    suburb: suburb,
    title: formattedTitle,
    caption: formattedTitle,
    location: `${suburb}, QLD`,
    finish: finish,
    motor: motor,
    description: `Custom engineered in our Yamanto workshop and installed in ${suburb}, QLD. Features ${finish} with ${motor} and 10-year structural warranty.`
  };
});

const updatedContent = content.replace(
  /export const GALLERY_ITEMS = \[[\s\S]*?\];/,
  `export const GALLERY_ITEMS = ${JSON.stringify(updatedItems, null, 2)};`
);

fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log(`Successfully updated all ${updatedItems.length} gallery items with "[Gate Type], [Suburb]" captions!`);
console.log('Sample 3 updated items:', updatedItems.slice(0, 3).map(i => ({ title: i.title, location: i.location })));
