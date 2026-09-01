import re

files_to_clean = [
    'src/components/ServiceRepairs.jsx',
    'src/components/SuburbLandingPage.jsx',
    'src/components/Testimonials.jsx',
    'src/components/TradeBuilders.jsx',
    'src/components/TroubleshooterModal.jsx'
]

replacements = [
    (r'Centurion D5 Smart Hi-Speed with Smartphone Module', r'Premium Smart Hi-Speed Motor with Smartphone Module'),
    (r'Centurion D5 Smart Hi-Speed', r'Premium Smart High-Speed Motor'),
    (r'Centurion D5 Smart with In-Ground Track System', r'Premium Smart Motor with In-Ground Track System'),
    (r'Centurion D5 Smart with Stainless Steel Marine Hardware', r'Premium Smart Motor with Stainless Steel Marine Hardware'),
    (r'Centurion D5 Smart with Keypad & Video Doorbell', r'Premium Smart Motor with Keypad & Video Doorbell'),
    (r'Centurion D5 Smart with Video Intercom Integration', r'Premium Smart Motor with Video Intercom Integration'),
    (r'Centurion D5 Smart Marine Finish', r'Premium Smart Motor Marine Finish'),
    (r'Centurion D5 Smart ready', r'Smart automation ready'),
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
    (r'Centurion D5 / D10 / D20 Smart or Vantage Linear Electro-Mechanical Actuators', r'Standard, Smart, Solar or Commercial Inverter Actuators'),
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
    (r'Centurion Smart Automation Pre-Wire & Electrical Schedule', r'Gate Automation Pre-Wire & Electrical Schedule'),
    (r'CAG-Centurion-Automation-Prewire-Schedule\.pdf', r'CAG-Gate-Automation-Prewire-Schedule.pdf'),
    (r'centurion-wiring-conduits', r'gate-wiring-conduits'),
    (r'Centurion Motor Hardware at Trade Pricing', r'Gate Automation Hardware at Trade Pricing'),
    (r'motor preferences \(Centurion Smart\)', r'motor preferences (Standard / Smart / Solar / Commercial)'),
    (r'Centurion Smart automation motors and control boards', r'automation motors and control boards'),
    (r'Centurion Smart automation', r'smart gate automation'),
    (r'Centurion Smart motors', r'smart automated motors'),
    (r'Centurion Smart motor', r'smart automated motor'),
    (r'Centurion Smart', r'Smart Gate Automation'),
    (r'Centurion Hi-Speed motor', r'high-speed automated motor'),
    (r'Centurion high-torque arms', r'high-torque automated arms'),
    (r'Centurion high-speed automation', r'high-speed automation'),
    (r'Centurion safety infrared beams', r'safety infrared beams'),
    (r'Centurion or automated motor housing', r'automated motor housing'),
    (r'Centurion motor', r'automated gate motor'),
    (r'Centurion motors', r'automated gate motors'),
    (r'Centurion', r'Commercial-Grade')
]

for filepath in files_to_clean:
    with open(filepath, 'r', encoding='utf-8') as f:
        txt = f.read()
    for pattern, repl in replacements:
        txt = re.sub(pattern, repl, txt)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(txt)
    print(f"Cleaned {filepath}")
