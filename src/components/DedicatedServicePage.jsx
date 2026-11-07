import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Sun, 
  Sliders, 
  Wrench, 
  Building2, 
  Phone, 
  Calculator, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  ArrowRight,
  Zap,
  Clock,
  Compass,
  FileText,
  Star
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export const SERVICE_PAGES_DATA = {
  'driveway-gates': {
    id: 'driveway-gates',
    slug: 'driveway-gates',
    categoryName: 'Driveway Gates',
    badge: 'Brisbane & SEQ #1 Driveway Choice',
    h1: 'Automatic Driveway Gates Brisbane | Custom Electric Driveway Gates',
    subtitle: 'Custom designed, manufactured and automated electric driveway gates for Brisbane, Ipswich and Gold Coast homes. Sliding, double swing, and space-saving telescopic designs engineered with a 10-year structural warranty.',
    metaTitle: 'Automatic Driveway Gates Brisbane | Custom Electric Driveway Gates',
    metaDescription: 'Custom automatic driveway gates Brisbane. Custom aluminium electric sliding & swing driveway gates. Centurion & Nice smart motors, 10-year warranty. Free quote: (07) 3102 1801.',
    heroImage: '/images/custom-automated-sliding-gate-brisbane.jpg',
    galleryImages: [
      { src: '/images/custom-automated-sliding-gate-brisbane.jpg', alt: 'Automatic driveway gate installation Brisbane' },
      { src: '/images/Sliding-Gates.jpg', alt: 'Custom aluminium electric driveway gate' },
      { src: '/images/Swinging-Gates.jpg', alt: 'Grand double swing driveway gate entrance' },
      { src: '/images/Dayboro-Design-Slide.webp', alt: 'Architectural residential driveway gate' }
    ],
    overviewHeading: 'Factory-Direct Electric Driveway Gates Tailored to Your Property & Gradient',
    overviewParagraphs: [
      'Your driveway gate is both the primary security perimeter and the architectural focal point of your property. At Custom Auto Gates, we engineer custom electric driveway gates specifically designed to handle South East Queensland conditions—from high-wind bayside properties and sloping Brisbane driveways to wide acreage entrances.',
      'Every driveway gate is fabricated in-house at our Yamanto workshop from heavy-wall, marine-grade structural aluminium. Unlike cheap imported kit gates, our gates never rust, sag, or warp under Queensland summer heat. Whether you need an ultra-fast ground-track sliding gate, a trackless cantilever gate, an elegant double swing gate, or a space-saving telescopic gate, we build and automate your gate to exact millimeter tolerances backed by a 10-year structural warranty.'
    ],
    configurationTypes: [
      {
        title: 'Automatic Sliding Driveway Gates',
        bestFor: 'Driveways with shallow depth, street-facing slopes, or maximum parking requirements',
        features: 'Runs smoothly along a flush ground track or suspended trackless cantilever system. Opens parallel to your boundary, maximizing 100% of usable driveway parking space.'
      },
      {
        title: 'Double & Single Swing Driveway Gates',
        bestFor: 'Level to sloping driveways with ample yard depth and architectural homes',
        features: 'Classic grand aesthetic powered by Italian linear rams or articulated arms. Engineered with reinforced hinge stiles and optional 500kg electromagnetic shear locks.'
      },
      {
        title: 'Telescopic Space-Saving Driveway Gates',
        bestFor: 'Wide driveway openings with limited slide-back boundary wall space',
        features: 'Two or three interlocking panels that slide simultaneously via synchronous cable drives. Requires only half the slide-back clearance of a traditional single-leaf sliding gate.'
      },
      {
        title: 'Off-Grid Solar Powered Driveway Gates',
        bestFor: 'Rural, acreage, and long private driveways where 240V power trenching is costly',
        features: 'Equipped with heavy-duty monocrystalline solar panels and deep-cycle battery banks providing 5 to 7 days of reserve battery backup during stormy weather.'
      }
    ],
    specifications: [
      { label: 'Frame Construction', value: 'Heavy-duty 50x50mm, 65x65mm or 100x50mm structural marine aluminium' },
      { label: 'Infill Finishes', value: 'Horizontal/vertical slats, 3D battens, laser cut architectural screens, louvres' },
      { label: 'Driveway Automation', value: 'Centurion D5/D10 Smart, Nice Robus, BFT & FAAC high-speed motors' },
      { label: 'Opening Speed', value: 'Up to 400mm/sec with soft-start & soft-stop obstruction sensing' },
      { label: 'Smart Access Control', value: 'Smartphone app (iOS/Android), Apple CarPlay, wireless 4G intercom & keypads' },
      { label: 'Safety Systems', value: 'Dual infrared safety beams, auto-reverse obstruction detection, manual release key' }
    ],
    faqs: [
      {
        q: 'What is the best automatic gate design for a wide driveway?',
        a: 'For driveway openings wider than 5 to 6 metres, a telescopic sliding gate or a cantilever trackless sliding gate is typically best. Telescopic gates split the span across two or three overlapping panels, cutting required slide-back clearance in half. For rural properties, double swing gates spanning up to 8 metres provide a grand entrance without ground tracks.'
      },
      {
        q: 'Can an electric driveway gate be installed on a steep incline?',
        a: 'Yes. For sideways driveway crossfalls, we fabricate raked sliding gates where the bottom rail matches the exact slope of your driveway. For upward inclines, we engineer outward-swinging double gates (where legal), bi-fold folding gates, or trackless cantilever sliding systems.'
      },
      {
        q: 'How much does a custom automatic driveway gate cost in Brisbane?',
        a: 'Fully installed custom automatic driveway gates in Brisbane typically range from $3,800 to $7,500 for standard 4m–5m sliding gates, and $4,500 to $9,000 for automated double swing gates. Buying factory-direct from our Yamanto workshop eliminates middleman reseller markups, saving homeowners between $1,200 and $2,500.'
      },
      {
        q: 'What happens to my electric driveway gate during a power outage?',
        a: 'All our electric gate motors are equipped with internal 12V or 24V rechargeable battery backups that seamlessly power the gate for 30 to 50 cycles during blackouts. Every motor also includes a mechanical keyed override for instant manual release.'
      }
    ]
  },
  'automatic-sliding-gates': {
    id: 'automatic-sliding-gates',
    slug: 'automatic-sliding-gates',
    categoryName: 'Sliding Gates',
    badge: 'Brisbane & SEQ #1 Most Popular',
    h1: 'Automatic Sliding Gates Brisbane',
    subtitle: 'Factory direct custom-built automatic sliding gates engineered for Brisbane homes and commercial properties. Space-saving, smooth-glide rack & pinion smart automation with a 10-year structural warranty.',
    metaTitle: 'Automatic Sliding Gates Brisbane | Factory Direct Sliding Driveway Gates',
    metaDescription: 'Custom automatic sliding gates Brisbane. Premium aluminium track & trackless cantilever systems. High-speed Centurion & Nice motors. Free on-site measure: (07) 3102 1801.',
    heroImage: '/images/Sliding-Gates.jpg',
    galleryImages: [
      { src: '/images/Sliding-Gates.jpg', alt: 'Monument aluminium sliding driveway gate Brisbane' },
      { src: '/images/Dayboro-Design-Slide.webp', alt: 'Dayboro custom automatic sliding gate' },
      { src: '/images/custom-automated-sliding-gate-brisbane.jpg', alt: 'Architectural custom sliding gate installation Brisbane' },
      { src: '/images/Bundamba-Aluminium-Sliding-Gate.webp', alt: 'Bundamba horizontal slat sliding gate' }
    ],
    overviewHeading: 'Engineered For Space Efficiency, Extreme Security & South East Queensland Climates',
    overviewParagraphs: [
      'Automatic sliding gates are the premier choice for South East Queensland homeowners with sloped front yards, shallow driveway setbacks, or limited turning room. Unlike swing gates that require metres of clear inward or outward clearance, a sliding gate travels seamlessly parallel along your boundary fence line, maximizing 100% of your usable driveway parking space.',
      'Every sliding gate is manufactured factory-direct in our Yamanto workshop from heavy-wall structural aluminium. We precision TIG-weld each frame to eliminate sagging, rust, and thermal distortion, finishing each gate in architectural-grade Dulux powdercoating (including Monument, Surfmist, Basalt, and Woodland Grey) backed by our ironclad 10-year structural warranty.'
    ],
    configurationTypes: [
      {
        title: 'Ground Track Sliding Gates',
        bestFor: 'Flat to gently undulating concrete or bitumen driveways',
        features: 'Heavy-duty galvanised steel ground track with dual precision-sealed bearing steel rollers. Provides the smoothest, quietest glide across driveways up to 12 metres wide.'
      },
      {
        title: 'Cantilever (Trackless) Sliding Gates',
        bestFor: 'Sloping driveways, gravel, pavers, or high-debris acreage',
        features: 'Zero ground track required. The gate is suspended completely in mid-air using an extended counterbalance tail and internal roller carriages, completely unaffected by gravel, rocks, or slope.'
      },
      {
        title: 'Telescopic Space-Saving Sliding Gates',
        bestFor: 'Short slide-back boundary walls (e.g. New Farm, Paddington, Ascot)',
        features: 'Two or three interlocking panels that slide simultaneously via cable synchronisation. Requires only half the slide-back space of a traditional single-leaf sliding gate.'
      }
    ],
    specifications: [
      { label: 'Frame Construction', value: 'Heavy-duty 50x50mm or 100x50mm marine-grade structural aluminium' },
      { label: 'Infill Styles', value: '65mm / 90mm horizontal slats, 3D louvres, laser cut decorative screens, 3D battens' },
      { label: 'Automation Motors', value: 'Centurion D5 Smart / D10 Smart, Nice Robus, BFT Deimos (Battery backup standard)' },
      { label: 'Speed & Cycle Rate', value: 'High-speed 400mm/sec opening speed; up to 150 cycles/day' },
      { label: 'Access Control', value: 'Smartphone app (iOS/Android), Apple CarPlay, 4G wireless intercom, long-range remotes' },
      { label: 'Safety Protection', value: 'Dual infrared safety beams, auto-reverse obstruction sensing, manual override key' }
    ],
    faqs: [
      {
        q: 'Can a sliding gate be installed on a driveway that slopes sideways?',
        a: 'Yes! We custom design "raked" sliding gates where the bottom rail is welded at the exact angle of your driveway crossfall, while keeping the top rail perfectly horizontal. For severe inclines, a cantilever trackless system is the ideal engineering solution.'
      },
      {
        q: 'What happens to my automatic sliding gate during a power outage or storm?',
        a: 'All our automated sliding gate motors include internal rechargeable 12V/24V battery backups. Your gate will continue opening and closing normally for 30 to 50 cycles during a blackout. Every gate also includes an emergency manual release key.'
      },
      {
        q: 'How much slide-back clearance do I need beside the driveway?',
        a: 'A standard track sliding gate requires the width of the driveway opening plus 400mm for the motor tail. If your boundary wall is shorter than this, our telescopic sliding gate system splits the gate into 2 overlapping leaves, cutting required clearance almost in half.'
      }
    ]
  },
  'swing-gates': {
    id: 'swing-gates',
    slug: 'swing-gates',
    categoryName: 'Swing Gates',
    badge: 'Grand Architectural Entrance',
    h1: 'Automatic Swing Gates Brisbane & Gold Coast',
    subtitle: 'Custom single, double swing & bi-fold automatic gates factory fabricated in Yamanto. Architectural beauty, whisper-quiet high-torque motors, and premium magnetic security locks.',
    metaTitle: 'Automatic Swing Gates Brisbane | Custom Double Swing & Bi-Fold Electric Gates',
    metaDescription: 'Automatic swing gates Brisbane & Gold Coast. Single leaf, double swing & fast bi-fold folding gates. 10-Year Structural Warranty. Free on-site measure: (07) 3102 1801.',
    heroImage: '/images/Swinging-Gates.jpg',
    galleryImages: [
      { src: '/images/Swinging-Gates.jpg', alt: 'Double swing automated entrance gate Brisbane' },
      { src: '/images/swing-gates8.jpg', alt: 'Custom aluminium swing gates with matching boundary fence' },
      { src: '/images/swing-gates7.jpg', alt: 'Black dual swing driveway gates Gold Coast' },
      { src: '/images/swing-gates13.jpg', alt: 'Prestige Hamptons swing gates Ascot Brisbane' }
    ],
    overviewHeading: 'Timeless Elegance Engineered With Modern Commercial Automation',
    overviewParagraphs: [
      'Automatic swing gates provide the ultimate grand entrance for Queensland homes, estates, and rural properties. Opening gracefully either inward or outward, a precision-fabricated double swing gate creates an imposing architectural statement that enhances both property value and street curb appeal.',
      'Unlike light mass-market kit gates that flex in the wind, our swing gates are crafted from structural aluminium box sections with reinforced hinge stiles and stainless steel ball-bearing hinges. Powered by Italian-engineered linear ram or articulated arm motors, they open smoothly and lock rigidly against forced entry with optional 500kg electromagnetic shear locks.'
    ],
    configurationTypes: [
      {
        title: 'Double Swing Automatic Gates',
        bestFor: 'Level to sloping driveways with ample yard depth',
        features: 'Two mirrored gate leaves meeting in the centre. Opening speed is fast because each leaf only traverses half the driveway width. Features mechanical ground stops and centre magnetic locking.'
      },
      {
        title: 'Single Leaf Swing Gates',
        bestFor: 'Driveways up to 4 metres wide with side clear space',
        features: 'A single sweeping panel ideal for narrow frontages or side vehicle access. Cost-effective automation requiring only one heavy-duty linear ram motor.'
      },
      {
        title: 'Bi-Fold High-Speed Folding Gates',
        bestFor: 'Short driveway depths where cars would be hit by standard swing gates',
        features: 'Panels fold inward in a concertina accordion motion. Requires only 25% of the sweep radius of a conventional swing gate while opening at twice the speed.'
      }
    ],
    specifications: [
      { label: 'Hinge System', value: 'Heavy-duty stainless steel ball-bearing pivot hinges (rated to 800kg load)' },
      { label: 'Motor Actuators', value: 'Linear worm-drive rams, articulated arms, or concealed underground in-ground motors' },
      { label: 'Locking Strength', value: 'Mechanical self-locking gearboxes + optional 500kg magnetic lock' },
      { label: 'Power Options', value: '240V mains with battery backup OR 100% off-grid high-capacity solar kit' },
      { label: 'Finish', value: 'Dulux architectural powdercoat (Monument, Surfmist, Dune, White) or DecoWood timber finish' },
      { label: 'Warranty', value: '10-Year Factory Structural Warranty on fabrication; 2-3 Year motor manufacturer warranty' }
    ],
    faqs: [
      {
        q: 'Can swing gates open outwards towards the road?',
        a: 'Yes, swing gates can be engineered to open outwards if your driveway slopes steeply upwards into your property. However, Queensland council regulations strictly forbid gates from swinging over council footpaths or road reserves, so your boundary must be set back adequately.'
      },
      {
        q: 'Can swing gates handle strong Brisbane summer storm winds?',
        a: 'Yes. For windy areas (like Brisbane riverfronts, bayside, or open acreage), we engineer the gates with 50% open slat permeability to let wind pass through, and pair them with heavy-duty commercial linear ram motors with hydraulic or worm-drive locking.'
      },
      {
        q: 'How fast do automatic double swing gates open?',
        a: 'High-speed smart actuators typically open 90 degrees in approximately 12 to 16 seconds. Bi-fold gates open in as little as 7 to 9 seconds.'
      }
    ]
  },
  'solar-gates': {
    id: 'solar-gates',
    slug: 'solar-gates',
    categoryName: 'Solar Gates',
    badge: '100% Off-Grid Acreage Specialist',
    h1: 'Solar Powered Automatic Gates Brisbane & Ipswich',
    subtitle: 'Reliable, off-grid solar automatic gates engineered for acreage, rural properties, and long driveways across South East Queensland. Zero electrical trenching required.',
    metaTitle: 'Solar Automatic Gates Brisbane | Off-Grid Electric Solar Powered Gates QLD',
    metaDescription: 'Solar powered automatic gates Brisbane & Ipswich. 100% off-grid solar kits with deep cycle battery banks. Zero trenching costs. Free on-site visit: (07) 3102 1801.',
    heroImage: '/images/solar-gate-installation-1.jpg',
    galleryImages: [
      { src: '/images/solar-gate-installation-1.jpg', alt: 'Acreage solar powered double swing gate installation' },
      { src: '/images/solar-gate-installation-2.jpg', alt: 'Heavy duty solar panel and battery enclosure for automatic gate' },
      { src: '/images/solar-gate-installation-3.jpg', alt: 'Pullenvale rural solar electric gate' }
    ],
    overviewHeading: 'Zero Trenching Costs, Infinite Power & 100% Storm Blackout Immunity',
    overviewParagraphs: [
      'Trenching 240V mains power 50 to 500 metres down a long rural driveway can easily cost between $4,000 and $12,000 in electrical contractor fees, conduit excavation, and council permits. Our solar automatic gates eliminate these trenching costs entirely, providing a self-sufficient, high-torque entrance gate powered 100% by the Queensland sun.',
      'Unlike cheap DIY solar kits that go flat after two rainy days, Custom Auto Gates designs industrial-grade solar power systems. We calculate your exact daily duty cycles, combining oversized high-efficiency monocrystalline solar panels with weatherproof lockable battery enclosures and deep-cycle AGM or lithium battery banks that provide 5 to 7 days of continuous reserve power.'
    ],
    configurationTypes: [
      {
        title: 'Acreage Dual Swing Solar Gates',
        bestFor: 'Rural entrances, horse properties, and private estate driveways',
        features: 'Wide 4m to 6m gateways with high-torque 24V linear actuators. Paired with long-range 100m radio remotes and animal containment sensors.'
      },
      {
        title: 'Solar Sliding Driveway Gates',
        bestFor: 'Acreage properties with livestock fences or restricted swing space',
        features: 'Low-friction ground track or cantilever systems driven by low-current high-efficiency 12V/24V DC sliding motors with intelligent soft-start and soft-stop.'
      },
      {
        title: 'Cellular 4G Solar Gate Packages',
        bestFor: 'Properties where the gate is far away from home Wi-Fi',
        features: 'Includes a 4G wireless intercom and camera powered by the same solar system. Call visitors to your mobile phone and open the gate remotely from anywhere in the world.'
      }
    ],
    specifications: [
      { label: 'Solar Collector', value: '40W to 80W high-efficiency tier-1 monocrystalline solar panel on galvanised pole mount' },
      { label: 'Battery Bank', value: 'Dual 12V 18Ah – 35Ah deep-cycle AGM batteries in weatherproof lockable steel enclosure' },
      { label: 'Autonomous Reserve', value: '5 to 7 days of operation without direct sunlight (cloudy/rainy weather buffer)' },
      { label: 'Motor Voltage', value: 'Ultra-low standby drain 12V or 24V DC commercial-grade motors' },
      { label: 'Remote Control Range', value: 'Extended-range encrypted remote keyfobs (up to 80m – 100m line of sight)' },
      { label: 'Accessories', value: 'Solar wireless push-button exit wands, keypads, 4G cellular intercoms, and safety beams' }
    ],
    faqs: [
      {
        q: 'Will my solar gate stop working during extended cloudy or rainy periods?',
        a: 'No. We deliberately oversize our solar collectors and battery banks for South East Queensland weather patterns. The battery system stores enough reserve power to operate the gate for 5 to 7 days of normal daily use (up to 30 cycles per day) even with zero sunlight.'
      },
      {
        q: 'How far away can the solar panel be placed from the gate?',
        a: 'If your gate is located in a heavily shaded tree canopy, we can mount the solar panel up to 25 metres away in a sunny location using heavy-gauge low-voltage UV-stabilized cabling.'
      },
      {
        q: 'Can visitors still buzz me if the gate is 200m from my house?',
        a: 'Yes! We install 4G cellular wireless intercoms directly into the solar gate pillar. When a visitor presses the intercom, it dials your mobile phone or landline directly. You can speak with them and press a button on your phone to open the gate.'
      }
    ]
  },
  'commercial-gates': {
    id: 'commercial-gates',
    slug: 'commercial-gates',
    categoryName: 'Commercial Gates',
    badge: 'Industrial & High-Cycle Security',
    h1: 'Commercial Gates Brisbane & Ipswich | Industrial Security & Cantilever Gates',
    subtitle: 'Heavy-duty commercial cantilever gates, automated boom gates, high-cycle sliding gates and industrial access control. Custom engineered and fabricated in Yamanto for logistics depots, commercial properties, and industrial sites across Brisbane, Ipswich & Logan.',
    metaTitle: 'Commercial Gates Brisbane & Ipswich | Industrial Security Cantilever Gates',
    metaDescription: 'Commercial automatic gates Brisbane, Ipswich & Logan. Heavy-duty cantilever sliding gates, high-cycle boom gates & strata access control. QBCC licensed: (07) 3102 1801.',
    heroImage: '/images/Sliding-Gates.jpg',
    galleryImages: [
      { src: '/images/Sliding-Gates.jpg', alt: 'Heavy duty commercial cantilever sliding gate' },
      { src: '/images/custom-automated-sliding-gate-brisbane.jpg', alt: 'Commercial security perimeter gate Brisbane' },
      { src: '/images/Swinging-Gates.jpg', alt: 'Industrial security double swing gates' },
      { src: '/images/Dayboro-Design-Slide.webp', alt: 'Strata complex automatic access gate' }
    ],
    overviewHeading: 'AS 1725 Engineered Commercial Gates for Continuous Duty & Maximum Site Security',
    overviewParagraphs: [
      'Commercial logistics depots, body corporate car parks, and industrial facilities require automated gates engineered for continuous duty cycles, heavy vehicle impacts, and unyielding perimeter protection. At Custom Auto Gates, we fabricate and install heavy-duty trackless cantilever sliding gates, industrial automated boom barriers, high-speed track sliding gates, and commercial double swing gates tailored for commercial clients across Brisbane, Ipswich, and Logan.',
      'Unlike lightweight residential systems, our commercial installations are crafted from oversized Australian structural aluminium box sections and hot-dip galvanised structural steel. Powered by 100% continuous duty Italian and South African industrial drive systems (rated up to 1,000+ opening cycles per day), our gates feature multi-layer safety beam photocells, pneumatic resistive edges, ground vehicle induction loops, and seamless integration with RFID access control, ANPR number plate recognition, and emergency fire alarm overrides.'
    ],
    configurationTypes: [
      {
        title: 'Cantilever (Trackless) Commercial Gates',
        bestFor: 'Heavy vehicle depots, transport hubs, gravel yards, and high-security distribution centres',
        features: 'Zero ground track across the driveway opening. The gate leaf is suspended in mid-air using heavy-duty internal sealed bearing carriages and an extended counterbalance tail. Completely immune to rocks, asphalt deformities, dirt, and heavy B-double semi-trailers, spanning openings up to 15 metres.'
      },
      {
        title: 'Commercial Boom Gates & Traffic Barriers',
        bestFor: 'Commercial parking facilities, strata developments, corporate offices, and transport checkpoints',
        features: 'High-speed 1.5 to 3.0 second opening cycles with continuous 100% duty cycle 24V brushless drive units. Includes ground loop detectors, LED boom lighting, break-away arm joints, and integration with ticketing or RFID access readers.'
      },
      {
        title: 'High-Cycle Track Sliding Security Gates',
        bestFor: 'Factory perimeters, council depots, equipment yards, and commercial business parks',
        features: 'Reinforced ground track set in heavy concrete footings. Powered by continuous-rated commercial drive units (such as Centurion D20 Smart and Nice Run 2500) capable of smoothly moving gates weighing up to 2,000kg with intelligent speed ramping.'
      },
      {
        title: 'Strata & Car Park Security Gates',
        bestFor: 'Apartment complexes, multi-unit developments, basement carparks, and gated communities',
        features: 'Engineered with acoustic vibration dampening, fire alarm dry-contact auto-open triggers, 24V storm battery backup, and cloud-managed 4G mobile intercom systems for building managers and residents.'
      }
    ],
    specifications: [
      { label: 'Structural Fabrication', value: 'Heavy structural marine-grade aluminium (up to 150x100mm) or hot-dip galvanised steel' },
      { label: 'Industrial Motors', value: 'Centurion D10/D20 Smart (2000kg rating), Nice Run 2500, FAAC C851 high-speed industrial' },
      { label: 'Duty Cycle Rating', value: '100% continuous duty (engineered for 500 to 1,500+ daily vehicle movements)' },
      { label: 'Access Control Systems', value: 'RFID card readers, dual vehicle induction ground loops, ANPR number plate recognition, 4G GSM' },
      { label: 'WHS Safety Features', value: 'Dual through-beam photocells, pneumatic resistive safety edges, warning strobe & audible chime' },
      { label: 'Compliance & Licensing', value: 'AS 1725 security fencing standards, AS/NZS 3000 electrical compliance, QBCC Licensed (#15579753)' }
    ],
    faqs: [
      {
        q: 'Why is a cantilever gate preferred over a ground track gate for commercial sites?',
        a: 'Commercial distribution facilities and transport yards frequently see heavy semi-trailers, excavators, and forklifts crossing the entryway. Ground tracks can collect rocks, gravel, and mud, or bend under heavy axle loads. A cantilever gate requires zero ground track across the driveway—the entire gate is suspended in mid-air, guaranteeing reliable operation regardless of gravel, surface water, or heavy truck traffic.'
      },
      {
        q: 'How fast do commercial automatic gates open and close?',
        a: 'Standard commercial sliding gates operate at 200mm to 300mm per second. For high-traffic commercial sites, our high-speed inverter drive systems open at up to 450mm to 500mm per second with soft-start acceleration, minimizing vehicle queue times during morning and afternoon shift changes.'
      },
      {
        q: 'Can your commercial gates integrate with building fire alarms and emergency services?',
        a: 'Yes. All our commercial control systems include emergency dry-contact fire alarm trigger inputs. Upon receiving a signal from the building fire system, the gate automatically opens and locks in the open position until cleared. We also install Queensland Fire & Emergency Services (QFES) 000 keyed override switches.'
      },
      {
        q: 'Do you offer scheduled preventative maintenance for commercial and strata gates in Brisbane?',
        a: 'Yes. We provide scheduled quarterly, bi-annual, and annual commercial maintenance service agreements across Greater Brisbane, Ipswich, and Logan. This includes safety photocell testing, ground loop calibration, mechanical roller inspection, battery load testing, and WHS compliance logging.'
      }
    ]
  }
};

export default function DedicatedServicePage({ 
  serviceKey = 'automatic-sliding-gates', 
  onOpenQuote, 
  onOpenContact, 
  onNavigateHome,
  onNavigateService
}) {
  const [activeTab, setActiveTab] = useState(serviceKey);

  useEffect(() => {
    if (serviceKey && SERVICE_PAGES_DATA[serviceKey]) {
      setActiveTab(serviceKey);
    }
  }, [serviceKey]);

  const service = SERVICE_PAGES_DATA[activeTab] || SERVICE_PAGES_DATA['automatic-sliding-gates'];

  return (
    <div style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh', color: 'var(--text-main)' }}>
      {/* 1. HERO BANNER */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #090e1a 0%, #0f172a 50%, #1e293b 100%)',
        color: '#ffffff',
        padding: '5rem 0 4rem 0',
        overflow: 'hidden'
      }}>
        {/* Glow backdrop */}
        <div style={{
          position: 'absolute',
          top: '-15%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(212, 163, 89, 0.18) 0%, rgba(15, 23, 42, 0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a>
            <span>/</span>
            <span>Services</span>
            <span>/</span>
            <span style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>{service.categoryName}</span>
          </div>

          {/* Service Switcher Tabs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.75rem',
            marginBottom: '2rem',
            scrollbarWidth: 'none'
          }}>
            <span style={{ fontSize: '0.78rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginRight: '0.4rem', flexShrink: 0 }}>
              Gate Categories:
            </span>
            {[
              { id: 'commercial-gates', label: 'Commercial & Cantilever' },
              { id: 'driveway-gates', label: 'Driveway Gates' },
              { id: 'automatic-sliding-gates', label: 'Sliding Gates' },
              { id: 'swing-gates', label: 'Swing & Bi-Fold' },
              { id: 'solar-gates', label: 'Solar Acreage' }
            ].map((cat) => (
              <a
                key={cat.id}
                href={`/${cat.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(cat.id);
                  window.location.hash = cat.id;
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  padding: '0.55rem 1.15rem',
                  borderRadius: '10px',
                  fontSize: '0.86rem',
                  fontWeight: '800',
                  textDecoration: 'none',
                  background: activeTab === cat.id ? '#fbbf24' : 'rgba(255, 255, 255, 0.1)',
                  color: activeTab === cat.id ? '#0f172a' : '#ffffff',
                  border: activeTab === cat.id ? 'none' : '1px solid rgba(255, 255, 255, 0.15)',
                  flexShrink: 0,
                  transition: 'all 0.18s ease'
                }}
              >
                {cat.label}
              </a>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }} className="hero-grid-responsive">
            <div>
              <span className="badge-tag badge-gold" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={14} />
                {service.badge}
              </span>
              <h1 style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
                fontWeight: '900',
                lineHeight: 1.15,
                color: '#ffffff',
                marginBottom: '1.2rem',
                fontFamily: 'Outfit, sans-serif'
              }}>
                {service.h1}
              </h1>
              <p style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                lineHeight: 1.6,
                color: '#cbd5e1',
                marginBottom: '2rem'
              }}>
                {service.subtitle}
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={onOpenQuote}
                  className="btn btn-gold btn-lg btn-pulse"
                  style={{ fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
                >
                  <Calculator size={18} />
                  <span>Get Instant Online Quote</span>
                </button>
                <a
                  href={COMPANY_INFO.tel}
                  className="btn btn-outline-light btn-lg"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}
                >
                  <Phone size={18} />
                  <span>Call (07) 3102 1801</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', flexWrap: 'wrap', fontSize: '0.85rem', color: '#94a3b8' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={16} style={{ color: '#10b981' }} />
                  <span>10-Yr Structural Warranty</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Building2 size={16} style={{ color: '#60a5fa' }} />
                  <span>Yamanto Workshop Direct</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Star size={16} style={{ color: '#f59e0b' }} />
                  <span>4.9★ Over 180 Reviews</span>
                </div>
              </div>
            </div>

            {/* Hero Image Showcase */}
            <div>
              <div style={{
                borderRadius: '18px',
                overflow: 'hidden',
                border: '2px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}>
                <img 
                  src={service.heroImage} 
                  alt={service.h1}
                  style={{ width: '100%', height: 'auto', maxHeight: '380px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. IN-DEPTH TECHNICAL GUIDE (800+ Words SEO Grounding) */}
      <section className="section" style={{ padding: '4.5rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <span className="badge-tag badge-blue" style={{ marginBottom: '0.75rem' }}>
              <FileText size={14} /> Comprehensive Gate Engineering Guide
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)', fontWeight: '800', marginBottom: '1.25rem', fontFamily: 'Outfit, sans-serif' }}>
              {service.overviewHeading}
            </h2>
            {service.overviewParagraphs.map((p, idx) => (
              <p key={idx} style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                {p}
              </p>
            ))}
          </div>

          {/* Configuration Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '3rem',
            marginBottom: '3.5rem'
          }}>
            {service.configurationTypes.map((config, i) => (
              <div 
                key={i}
                style={{
                  background: 'var(--bg-card)',
                  border: '1.5px solid var(--border-subtle)',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }}
              >
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(212, 163, 89, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)', marginBottom: '1rem', fontWeight: '800' }}>
                  {i + 1}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-heading)' }}>
                  {config.title}
                </h3>
                <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--accent-blue)', marginBottom: '0.85rem' }}>
                  Best suited for: {config.bestFor}
                </div>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>
                  {config.features}
                </p>
              </div>
            ))}
          </div>

          {/* 3. TECHNICAL SPECIFICATIONS TABLE */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1.5px solid var(--border-subtle)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: 'var(--shadow-lg)',
            marginBottom: '4rem'
          }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sliders size={20} style={{ color: 'var(--accent-gold)' }} />
              Engineering Specifications & Capabilities
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {service.specifications.map((spec, sidx) => (
                <div key={sidx} style={{ padding: '0.85rem', background: 'var(--bg-body)', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                  <span style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    {spec.label}
                  </span>
                  <span style={{ fontSize: '0.94rem', fontWeight: '600', color: 'var(--text-heading)' }}>
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. GALLERY SHOWCASE */}
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="badge-tag badge-gold" style={{ marginBottom: '0.5rem' }}>Completed Installations</span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'Outfit, sans-serif' }}>
                Recent {service.categoryName} Builds in South East QLD
              </h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              {service.galleryImages.map((img, gidx) => (
                <div key={gidx} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
                  <img src={img.src} alt={img.alt} style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
                  <div style={{ padding: '0.65rem 0.85rem', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', background: 'var(--bg-card)' }}>
                    {img.alt}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. FAQS & ANSWERS */}
          <div style={{ maxWidth: '840px', margin: '0 auto', marginBottom: '4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '800', fontFamily: 'Outfit, sans-serif' }}>
                Frequently Asked Questions About {service.categoryName}
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {service.faqs.map((faq, fidx) => (
                <div 
                  key={fidx} 
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '1.5rem'
                  }}
                >
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
                    {faq.q}
                  </h4>
                  <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--text-muted)', margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. CALL TO ACTION BANNER */}
          <div style={{
            background: 'linear-gradient(135deg, #090e1a 0%, #1e293b 100%)',
            borderRadius: '20px',
            padding: '3.5rem 2rem',
            textAlign: 'center',
            color: '#ffffff',
            border: '1.5px solid rgba(212, 163, 89, 0.3)',
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)'
          }}>
            <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: '900', marginBottom: '1rem', fontFamily: 'Outfit, sans-serif' }}>
              Ready To Design Your Custom {service.categoryName}?
            </h3>
            <p style={{ maxWidth: '640px', margin: '0 auto 2rem auto', color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Buy factory direct from our Yamanto workshop. No salespeople or middleman markups. Book a free on-site measure across Brisbane, Ipswich, Logan, or Gold Coast.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={onOpenQuote}
                className="btn btn-gold btn-lg btn-pulse"
                style={{ fontWeight: '800' }}
              >
                <Calculator size={18} />
                <span>Configure & Price Online</span>
              </button>
              <button
                onClick={onOpenContact}
                className="btn btn-outline-light btn-lg"
              >
                <Calendar size={18} />
                <span>Book Free On-Site Measure</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
