import fs from 'fs';
import path from 'path';

function cleanFile(filePath, replacements) {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');
  for (const [pattern, replacement] of replacements) {
    content = content.replace(pattern, replacement);
  }
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Cleaned: ${filePath}`);
}

// 1. siteData.js
cleanFile('src/data/siteData.js', [
  [/Italian Nice & Centurion high-speed rack-and-pinion motors/g, 'Centurion D5/D10 Smart high-speed rack-and-pinion motors'],
  [/Linear ram & articulated arm Italian automation motors/g, 'Linear ram & articulated arm commercial automation motors'],
  [/Ultra-low standby power draw Italian & Centurion 12V\/24V motors/g, 'Ultra-low standby power draw Centurion 12V/24V solar motors'],
  [/Repair of Italian Nice, Centurion, BFT, ATA, FAAC, and Merlin gate motors/g, 'Repair of Centurion, BFT, ATA, Centsys, FAAC, and Merlin gate motors'],
  [/Italian Nice Robus 500 Hi-Speed/g, 'Centurion D5 Smart Hi-Speed'],
  [/Nice Toona \/ Centurion Linear Ram/g, 'Centurion Vantage 500 Linear Ram'],
  [/Nice Wingo 3524 Linear Actuators/g, 'Centurion Vantage 400 Linear Actuators'],
  [/Italian Nice \/ Centurion Smart Automation/g, 'Centurion Smart Gate Automation'],
  [/Italian Nice Robus 600/g, 'Centurion D10 Smart 600'],
  [/Nice Robus 500/g, 'Centurion D5 Smart'],
  [/Nice Robus 600/g, 'Centurion D10 Smart'],
  [/Nice Toona 5024/g, 'Centurion Vantage 500'],
  [/Nice Run 2500/g, 'Centurion D10 Smart'],
  [/Nice Tub 3500/g, 'Centurion D20 Smart'],
  [/Nice Hyke/g, 'Centurion Vector'],
  [/title: "Premium Italian & High-Speed Motors"/g, 'title: "Commercial-Grade High-Speed Motors"'],
  [/Authorized installers for industry-leading Nice, Centurion, and BFT automation systems with manufacturer warranties\./g, 'Authorized installers for industry-leading Centurion, BFT, and commercial automation systems with manufacturer warranties.'],
  [/name: "Nice Italy Automation"[\s\S]*?features: \[[^\]]*?\]\r?\n\s*\},/g, `name: "Centurion Vantage Swing Series",
    badge: "Linear Ram Precision",
    desc: "Heavy-duty linear arm automation designed for robust double and single swing gates with soft-stop control.",
    speed: "14-18 sec opening",
    warranty: "3 Years",
    bestFor: "Residential & acreage architectural swing gates",
    features: ["Heavy-duty stainless shaft", "Internal limit switches", "Solar & battery backup ready", "Smartphone control"]
  },`],
  [/The Nice motor is whisper-quiet/g, 'The Centurion motor is whisper-quiet'],
  [/most of our Nice and Centurion motor systems/g, 'most of our Centurion motor systems'],
  [/Italian Nice/g, 'Centurion Smart'],
  [/Nice motor/g, 'Centurion motor'],
  [/Nice motors/g, 'Centurion motors'],
  [/Italian automation/g, 'commercial-grade automation']
]);

// 2. seoManager.js
cleanFile('src/utils/seoManager.js', [
  [/Italian Nice, Centurion, BFT, and FAAC specialists\./g, 'Centurion, BFT, Centsys, and FAAC specialists.']
]);

// 3. Hero.jsx
cleanFile('src/components/Hero.jsx', [
  [/installed with genuine Italian automation\./g, 'installed with commercial-grade automation systems.'],
  [/<span>Italian Nice & Centurion Motors<\/span>/g, '<span>Centurion Smart Gate Automation</span>'],
  [/<div style=\{\{ fontSize: '0.8rem', fontWeight: '800', color: 'var\(--text-heading\)' \}\}>Nice \/ Centurion<\/div>/g, `<div style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-heading)' }}>Centurion Smart Series</div>`]
]);

// 4. ContactUs.jsx
cleanFile('src/components/ContactUs.jsx', [
  [/Nice® Italian 24V automation system/g, 'Centurion® Smart 24V automation system'],
  [/Nice Motor Box at Base/g, 'Centurion Motor Box at Base'],
  [/Travel Position: \{gateProgress\}% • Italian Nice 24V Drive System/g, 'Travel Position: {gateProgress}% • Centurion Smart 24V Drive System'],
  [/heavy-duty Italian automation motors/g, 'heavy-duty commercial automation systems']
]);

// 5. GateVisualizerQuote.jsx
cleanFile('src/components/GateVisualizerQuote.jsx', [
  [/const \[motor, setMotor\] = useState\('nice-240v'\);/g, `const [motor, setMotor] = useState('centurion-d5');`],
  [/\{ id: 'nice-240v', name: 'Italian Nice 240V Automation', cost: 1200, desc: 'Whisper quiet Italian reliability with 2 remotes' \},/g, `{ id: 'centurion-d5', name: 'Centurion D5 Smart Automation', cost: 1200, desc: 'Ultra-fast smartphone app control & battery backup with 2 remotes' },`],
  [/Nice Automation/g, 'Centurion Automation']
]);

// 6. MotorShowcase.jsx
cleanFile('src/components/MotorShowcase.jsx', [
  [/Italian Nice & Centurion Motors <br \/>/g, 'Centurion Smart & Commercial Motors <br />']
]);

// 7. Navbar.jsx
cleanFile('src/components/Navbar.jsx', [
  [/<span style=\{\{ fontSize: '0.92rem' \}\}>Italian Nice & Centurion Motors<\/span>/g, `<span style={{ fontSize: '0.92rem' }}>Centurion Smart Motors</span>`]
]);

// 8. ServiceRepairs.jsx
cleanFile('src/components/ServiceRepairs.jsx', [
  [/motorBrand: 'Nice \(Italian\)',/g, `motorBrand: 'Centurion Smart',`]
]);

// 9. SuburbLandingPage.jsx
cleanFile('src/components/SuburbLandingPage.jsx', [
  [/underground Nice motors/g, 'underground Centurion motors'],
  [/Nice Robus 500 Hi-Speed/g, 'Centurion D5 Smart Hi-Speed'],
  [/Nice Toona 5024 Swing/g, 'Centurion Vantage 500 Swing'],
  [/Nice Hyke Articulated/g, 'Centurion Vector Articulated'],
  [/Nice Robus 600/g, 'Centurion D10 Smart 600'],
  [/Italian Nice Robus 600/g, 'Centurion D10 Smart 600'],
  [/Nice Run 2500 Heavy-Duty/g, 'Centurion D10 Smart Heavy-Duty'],
  [/Nice Robus 500 Marine Finish/g, 'Centurion D5 Smart Marine Finish'],
  [/high-speed Italian Nice automation/g, 'high-speed Centurion Smart automation'],
  [/Nice Robus 600 Hi-Speed/g, 'Centurion D10 Smart Hi-Speed'],
  [/Nice Tub 3500 Commercial Inverter/g, 'Centurion D20 Smart Commercial Inverter'],
  [/whisper-quiet Nice motors/g, 'whisper-quiet Centurion motors']
]);

// 10. Testimonials.jsx
cleanFile('src/components/Testimonials.jsx', [
  [/Italian Nice Robus 500 Hi-Speed with WiFi Module/g, 'Centurion D5 Smart Hi-Speed with Smartphone Module'],
  [/The Italian Nice motor is whisper-quiet/g, 'The Centurion Smart motor is whisper-quiet'],
  [/Nice Run 2500 Industrial 3-Phase Inverter Drive \+ Magnetic Barrier/g, 'Centurion D20 Smart Commercial Inverter Drive + Magnetic Barrier'],
  [/Nice Hyke Articulated Arm Automation with Keypad/g, 'Centurion Vector Articulated Arm Automation with Keypad'],
  [/Italian Nice Robus 600 with Video Intercom Integration/g, 'Centurion D10 Smart with Video Intercom Integration'],
  [/The Nice Hi-Speed motor/g, 'The Centurion Hi-Speed motor'],
  [/Installed Nice BlueBUS safety infrared beams/g, 'Installed Centurion safety infrared beams'],
  [/Nice Tub 3500 Commercial Inverter Motors/g, 'Centurion D20 Smart Commercial Inverter Motors'],
  [/commercial Italian Nice Tub motors/g, 'commercial Centurion Smart inverter motors'],
  [/Nice Robus 500 with Keypad & Video Doorbell/g, 'Centurion D5 Smart with Keypad & Video Doorbell'],
  [/Nice Robus 500 with In-Ground Track System/g, 'Centurion D5 Smart with In-Ground Track System'],
  [/Nice Toona 5024 High-Speed Double Swing Solar Setup/g, 'Centurion Vantage 500 High-Speed Double Swing Solar Setup'],
  [/Nice Robus 500 with Stainless Steel Marine Hardware/g, 'Centurion D5 Smart with Stainless Steel Marine Hardware'],
  [/Nice motor is whisper quiet/g, 'Centurion motor is whisper quiet'],
  [/Incredibly fast Nice motor/g, 'Incredibly fast Centurion motor']
]);

// 11. TroubleshooterModal.jsx
cleanFile('src/components/TroubleshooterModal.jsx', [
  [/on the side of the Nice or Centurion motor housing\./g, 'on the side of the Centurion or automated motor housing.']
]);

// 12. AboutUs.jsx
cleanFile('src/components/AboutUs.jsx', [
  [/premium Italian Nice & Centurion automation motors\./g, 'premium Centurion smart automation systems.'],
  [/Every Nice and Centurion motor and control board/g, 'Every Centurion motor and control board']
]);

// 13. index.html
cleanFile('index.html', [
  [/nice gate motors, /g, ''],
  [/with Italian Nice and Centurion high-speed motors\./g, 'with Centurion high-speed smart automation.']
]);

// 14. README.md
cleanFile('README.md', [
  [/Italian Nice \(Robus 500HS, Run 1800\), Centurion D5\/D10 Smart/g, 'Centurion D5/D10/D20 Smart, Vantage Series'],
  [/Italian Nice & Centurion automation specs/g, 'Centurion & Smart automation specs']
]);

console.log('✅ Cleaning script execution completed.');
