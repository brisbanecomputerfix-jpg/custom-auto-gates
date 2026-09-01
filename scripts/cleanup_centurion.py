import re

# 1. Update siteData.js
with open('src/data/siteData.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Specific phrase replacements
replacements = [
    (r'"Centurion D5/D10 Smart high-speed rack-and-pinion motors"', r'"High-speed rack-and-pinion automated sliding gate motors"'),
    (r'"Ultra-low standby power draw Centurion 12V/24V solar motors"', r'"Ultra-low standby power draw 12V/24V solar automated motors"'),
    (r'"Repair of Centurion, BFT, ATA, Centsys, FAAC, and Merlin gate motors"', r'"Diagnostics and repairs for all major residential, solar & commercial gate motors"'),
    (r'Centurion D5 Smart Hi-Speed with Smartphone Module', r'Premium Smart Hi-Speed Motor with Smartphone Module'),
    (r'Centurion D5 Smart Hi-Speed', r'Premium Smart High-Speed Motor'),
    (r'Centurion D5 Smart with In-Ground Track System', r'Premium Smart Motor with In-Ground Track System'),
    (r'Centurion D5 Smart with Stainless Steel Marine Hardware', r'Premium Smart Motor with Stainless Steel Marine Hardware'),
    (r'Centurion D5 Smart with Keypad & Video Doorbell', r'Premium Smart Motor with Keypad & Video Doorbell'),
    (r'Centurion D5 Smart with Video Intercom Integration', r'Premium Smart Motor with Video Intercom Integration'),
    (r'Centurion D5 Smart', r'Premium Smart Motor'),
    (r'Centurion D5-Evo Sliding Gate Motor', r'Standard Automatic Sliding Gate Motor'),
    (r'Centurion D5-Evo Slide', r'Standard Automatic Sliding Motor'),
    (r'Centurion D5-Evo Smart', r'Standard Automatic Sliding Motor'),
    (r'Centurion D5-Evo', r'Standard Automatic Sliding Motor'),
    (r'Centurion D10 Smart 600 Hi-Speed', r'Premium High-Speed Sliding Motor'),
    (r'Centurion D10 Smart 600', r'Premium High-Speed Sliding Motor'),
    (r'Centurion D10 Smart Heavy-Duty', r'Commercial Heavy-Duty Motor'),
    (r'Centurion D10 Smart with Video Intercom Integration', r'Premium Smart Motor with Video Intercom Integration'),
    (r'Centurion D10 Smart', r'Premium High-Speed Motor'),
    (r'Centurion D10 Turbo High-Traffic', r'Commercial High-Traffic Motor'),
    (r'Centurion D20 Smart Commercial Inverter Motors', r'Commercial Inverter Motors'),
    (r'Centurion D20 Smart Commercial Inverter Drive \+ Magnetic Barrier', r'Commercial Inverter Drive + Magnetic Barrier'),
    (r'Centurion D20 Smart Commercial Inverter', r'Commercial Inverter Motor'),
    (r'Centurion Vantage 400 Linear Swing System', r'Heavy-Duty Linear Swing System'),
    (r'Centurion Vantage 400 Linear Swing', r'Heavy-Duty Linear Swing Motor'),
    (r'Centurion Vantage 500 Double Swing with Dual 40W Solar Panels', r'Solar Double Swing Motor with Dual 40W Solar Panels'),
    (r'Centurion Vantage 500 High-Speed Double Swing Solar Setup', r'High-Speed Solar Double Swing Motor Setup'),
    (r'Centurion Vantage 500 Double Swing', r'Solar Double Swing Motor'),
    (r'Centurion Vantage 500 Double', r'Solar Double Swing Motor'),
    (r'Centurion Vantage 500 Solar', r'Solar Powered Swing Motor'),
    (r'Centurion Vantage 500 Swing', r'Heavy-Duty Linear Swing Motor'),
    (r'Centurion Vantage Double Swing', r'Heavy-Duty Double Swing Motor'),
    (r'Centurion Vantage Linear Electro-Mechanical Actuators', r'Heavy-Duty Linear Electro-Mechanical Actuators'),
    (r'Centurion Vector Articulated Arm Automation with Keypad', r'Articulated Swing Gate Motor with Keypad'),
    (r'Centurion Vector Articulated', r'Articulated Swing Gate Motor'),
    (r'Centurion Sector High-Speed Swing Automation', r'Commercial High-Speed Barrier System'),
    (r'Centurion Smart automation', r'smart gate automation'),
    (r'Centurion Smart motors', r'smart automated motors'),
    (r'Centurion Smart motor', r'smart automated motor'),
    (r'Centurion Hi-Speed motor', r'high-speed automated motor'),
    (r'Centurion motor', r'automated gate motor'),
    (r'Centurion motors', r'automated gate motors'),
    (r'Centurion', r'Commercial-Grade')
]

for pattern, repl in replacements:
    content = re.sub(pattern, repl, content)

# Update MOTOR_BRANDS in siteData.js to the 4 categories
new_motor_brands = '''export const MOTOR_BRANDS = [
  {
    name: "Standard Motor",
    badge: "Reliable Daily Automation",
    desc: "Smooth, durable automation designed for residential sliding and swing gates with soft-start and soft-stop control.",
    speed: "Standard 12–16 sec opening",
    warranty: "3 Years",
    bestFor: "Standard residential sliding & swing driveways",
    features: ["Heavy-duty gear assembly", "Integrated battery backup", "Obstruction detection sensors", "Includes 2 long-range remotes"]
  },
  {
    name: "Premium Motor",
    badge: "High-Speed & Smart App",
    desc: "Whisper-quiet, high-speed intelligent automation with smartphone app control, real-time diagnostics, and rapid opening.",
    speed: "Ultra-fast high speed opening",
    warranty: "3 Years",
    bestFor: "Busy families, prestige homes, and high-security access",
    features: ["Smartphone iOS & Android app control", "Ultra-fast whisper-quiet operation", "Multi-user access management", "Dual battery backup system"]
  },
  {
    name: "Solar Motor",
    badge: "100% Off-Grid Solar",
    desc: "Engineered specifically for Australian rural and acreage conditions with high-efficiency solar panels and deep-cycle battery storage.",
    speed: "Smooth solar powered opening",
    warranty: "3 Years",
    bestFor: "Acreage, farms, rural gates & long driveways without mains power",
    features: ["Zero grid electricity bills", "High-capacity deep-cycle battery bank", "Ultra-low standby power draw", "Long-range 100m+ encrypted remotes"]
  },
  {
    name: "Commercial Motor",
    badge: "Continuous Duty",
    desc: "High-torque continuous-duty commercial automation capable of operating heavy gates and high-frequency multi-vehicle traffic 24/7.",
    speed: "Adjustable commercial speed",
    warranty: "5 Years",
    bestFor: "Commercial business parks, strata complexes, and industrial sites",
    features: ["100% continuous duty cycle", "Anti-tailgating loop detector support", "Emergency manual release & fire switch", "Access control & intercom integration"]
  }
];'''

content = re.sub(r'export const MOTOR_BRANDS = \[[\s\S]*?\n\];', new_motor_brands, content)

with open('src/data/siteData.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("siteData.js successfully updated!")
