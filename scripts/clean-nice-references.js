import fs from 'fs';
import path from 'path';

const siteDataPath = path.resolve('src/data/siteData.js');
let content = fs.readFileSync(siteDataPath, 'utf8');

// 1. Specific string replacements
content = content.replace(/Italian Nice & Centurion high-speed rack-and-pinion motors/g, 'Centurion D5/D10 Smart high-speed rack-and-pinion motors');
content = content.replace(/Linear ram & articulated arm Italian automation motors/g, 'Linear ram & articulated arm commercial automation motors');
content = content.replace(/Ultra-low standby power draw Italian & Centurion 12V\/24V motors/g, 'Ultra-low standby power draw Centurion 12V/24V solar motors');
content = content.replace(/Repair of Italian Nice, Centurion, BFT, ATA, FAAC, and Merlin gate motors/g, 'Repair of Centurion, BFT, ATA, Centsys, FAAC, and Merlin gate motors');

content = content.replace(/Italian Nice Robus 500 Hi-Speed/g, 'Centurion D5 Smart Hi-Speed');
content = content.replace(/Nice Toona \/ Centurion Linear Ram/g, 'Centurion Vantage 500 Linear Ram');
content = content.replace(/Nice Wingo 3524 Linear Actuators/g, 'Centurion Vantage 400 Linear Actuators');
content = content.replace(/Italian Nice \/ Centurion Smart Automation/g, 'Centurion Smart Gate Automation');
content = content.replace(/Italian Nice Robus 600/g, 'Centurion D10 Smart 600');
content = content.replace(/Nice Robus 500/g, 'Centurion D5 Smart');
content = content.replace(/Nice Robus 600/g, 'Centurion D10 Smart');
content = content.replace(/Nice Toona 5024/g, 'Centurion Vantage 500');
content = content.replace(/Nice Run 2500/g, 'Centurion D10 Smart');
content = content.replace(/Nice Tub 3500/g, 'Centurion D20 Smart');
content = content.replace(/Nice Hyke/g, 'Centurion Vector');

content = content.replace(/title: "Premium Italian & High-Speed Motors"/g, 'title: "Commercial-Grade High-Speed Motors"');
content = content.replace(/Authorized installers for industry-leading Nice, Centurion, and BFT automation systems with manufacturer warranties\./g, 'Authorized installers for industry-leading Centurion, BFT, and commercial automation systems with manufacturer warranties.');

content = content.replace(/name: "Nice Italy Automation"[\s\S]*?features: \["BlueBUS 2-wire technology", "Obstacle detection", "Battery backup ready", "Smartphone integration"\]\n  \},/g, `name: "Centurion Vantage Swing Series",
    badge: "Linear Ram Precision",
    desc: "Heavy-duty linear arm automation designed for robust double and single swing gates with soft-stop control.",
    speed: "14-18 sec opening",
    warranty: "3 Years",
    bestFor: "Residential & acreage architectural swing gates",
    features: ["Heavy-duty stainless shaft", "Internal limit switches", "Solar & battery backup ready", "Smartphone control"]
  },`);

content = content.replace(/The Nice motor is whisper-quiet/g, 'The Centurion motor is whisper-quiet');
content = content.replace(/most of our Nice and Centurion motor systems/g, 'most of our Centurion motor systems');

// Catch any remaining variations
content = content.replace(/Italian Nice/g, 'Centurion Smart');
content = content.replace(/Nice motor/g, 'Centurion motor');
content = content.replace(/Nice motors/g, 'Centurion motors');
content = content.replace(/Italian automation/g, 'commercial-grade automation');

fs.writeFileSync(siteDataPath, content, 'utf8');

// Check remaining
const lines = fs.readFileSync(siteDataPath, 'utf8').split('\n');
let count = 0;
lines.forEach((l, i) => {
  if (/nice|italian|italy/i.test(l)) {
    console.log('Remaining line ' + (i+1) + ': ' + l.trim());
    count++;
  }
});
console.log('Total remaining in siteData.js: ' + count);
