import { Product, SolarKit, SizingAppliance } from '../types';

export const STORE_INFO = {
  name: 'Themes Electricals',
  legalName: 'Themes Electricals & Solar Engineering Ltd',
  tagline: '15 Years of Professional Excellence in Solar, Power & Electrical Engineering',
  location: 'Utawala, Jowin Business Arcade, Nairobi, Kenya',
  phone: '+254742844354',
  phoneDisplay: '+254742844354',
  phoneInternational: '+254742844354',
  email: 'themeselectricals@gmail.com',
  experience: '15 Years Experience',
  hours: 'Mon - Sat: 7:30 AM - 6:30 PM | Sunday: 9:00 AM - 4:00 PM',
  deliveryNote: 'FREE Delivery in Nairobi CBD • Subsidized Low Rates Outside Nairobi / Countrywide',
  socialLinks: {
    tiktok: 'https://www.tiktok.com/@themeselectricals',
    instagram: 'https://www.instagram.com/themeselectricals',
    facebook: 'https://www.facebook.com/themeselectricals',
    email: 'mailto:themeselectricals@gmail.com',
    phone: 'tel:+254742844354',
    whatsapp: 'https://wa.me/254742844354?text=Hello%20Themes%20Electricals,%20I%20am%20inquiring%20about%20your%20products%20and%20installation%20services.'
  },
  deliveryRegions: [
    'Nairobi CBD (FREE Delivery Guaranteed)',
    'Utawala, Ruai, Embakasi, Fedha & Eastlands',
    'Westlands, Kilimani, Karen, Langata, Kasarani, Kiambu Rd',
    'Thika, Ruiru, Juja, Machakos, Athi River',
    'Nakuru, Naivasha, Eldoret, Kisumu, Kakamega',
    'Mombasa, Kilifi, Diani & Coastal Region',
    'Nyeri, Meru, Embu, Kirinyaga & Mount Kenya'
  ]
};

export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'LayoutGrid', count: 24 },
  { id: 'solar_systems', name: 'Solar Systems', icon: 'Sun', count: 8, badge: 'Core Specialty' },
  { id: 'lighting_systems', name: 'Lighting System', icon: 'Lightbulb', count: 4, badge: 'Energy Efficient' },
  { id: 'solar_water_pumps', name: 'Solar Water Pump', icon: 'Droplets', count: 4, badge: 'Zero Fuel Cost' },
  { id: 'solar_street_lights', name: 'Solar Street Light', icon: 'LampCeiling', count: 4, badge: 'All-In-One' },
  { id: 'generators', name: 'Power Back Up Generators', icon: 'Zap', count: 3, badge: 'Heavy Duty' },
  { id: 'heat_pumps', name: 'Heat Pump', icon: 'Flame', count: 3, badge: '75% Energy Cut' },
];

export const POPULAR_BRANDS = [
  'Themes Professional',
  'Jinko Solar',
  'Growatt',
  'Deye',
  'Felicity Solar',
  'Eastman Power',
  'Philips LED',
  'Hober Solar Pump',
  'Dayliff',
  'Cummins Power',
  'Perkins Silent',
  'Midea Commercial',
  'Sunmaster Solar'
];

export const PRODUCTS: Product[] = [
  // 1. SOLAR SYSTEMS (Panels, Inverters, Batteries, Turnkey)
  {
    id: 'jinko-550w-n-type',
    name: 'Jinko Solar 550W Tiger Pro N-Type Monocrystalline Solar Panel',
    brand: 'Jinko Solar',
    category: 'solar_systems',
    priceKES: 13200,
    originalPriceKES: 15500,
    rating: 4.9,
    reviewCount: 56,
    inStock: true,
    stockCount: 120,
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    badge: 'Tier-1 TOPCon',
    shortDesc: 'Ultra-high efficiency SMBB Half-Cell monocrystalline panel optimized for Kenyan UV conditions and roof mounting.',
    description: 'The Jinko Tiger Pro 550W Module adopts N-Type TOPCon technology delivering up to 21.5% efficiency. Tested with anti-PID protection and high mechanical wind/snow load rating for 15+ year installations.',
    specs: {
      'Rated Maximum Power (Pmax)': '550 W',
      'Module Efficiency': '21.5%',
      'Open Circuit Voltage (Voc)': '49.80 V',
      'Short Circuit Current (Isc)': '14.05 A',
      'Maximum Power Voltage (Vmp)': '41.95 V',
      'Cell Technology': 'N-Type TOPCon Multi-Busbar',
      'Dimensions': '2278 × 1134 × 35 mm',
      'Weight': '28.0 kg'
    },
    warranty: '12-Year Product Warranty | 30-Year Performance Guarantee',
    features: [
      'N-Type TOPCon cell architecture with lower thermal coefficient',
      'High power generation during morning and late evening low light',
      'Certified resistance against dust, salt mist, and ammonia',
      'Supplied with original MC4 waterproof connectors'
    ]
  },
  {
    id: 'growatt-5kw-hybrid-inverter',
    name: 'Growatt SPF 5000 ES 5kW 48V Off-Grid / Hybrid Solar Inverter',
    brand: 'Growatt',
    category: 'solar_systems',
    priceKES: 86000,
    originalPriceKES: 98000,
    rating: 5.0,
    reviewCount: 48,
    inStock: true,
    stockCount: 25,
    image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Seller Inverter',
    shortDesc: 'Pure sine wave 5000W hybrid inverter with 100A MPPT solar charge controller, battery-less mode, and Wi-Fi monitoring.',
    description: 'Growatt SPF 5000 ES operates with or without batteries. Integrates high-voltage 450VDC MPPT charge controller (up to 6000W PV array), seamless automatic transfer switch (ATS) under 10ms for computers, and generator remote start contact.',
    specs: {
      'Rated Power Output': '5000 W / 5000 VA',
      'Surge Peak Power': '10,000 VA (Motor Startup)',
      'Nominal Battery Voltage': '48 VDC (Supports LiFePO4 & Gel)',
      'Max Solar Array Power': '6,000 Wp',
      'MPPT Voltage Range': '120 VDC ~ 430 VDC',
      'Max Solar Charging Current': '100 A',
      'Parallel Capability': 'Up to 6 units (30kW Single/3-Phase)',
      'Monitoring': 'Wi-Fi / GPRS Smart Mobile App'
    },
    warranty: '3-Year Manufacturer Warranty with Local Themes Technical Support',
    features: [
      'Can run loads directly from solar without batteries during the day',
      'BMS communication port for Lithium LiFePO4 battery synchronization',
      'Overload, short circuit, and reverse polarity protection',
      'Seamless generator autostart contact'
    ]
  },
  {
    id: 'deye-8kw-hybrid-inverter',
    name: 'Deye 8kW Low Voltage Smart Hybrid Inverter (SUN-8K-SG01LP1-EU)',
    brand: 'Deye',
    category: 'solar_systems',
    priceKES: 175000,
    originalPriceKES: 195000,
    rating: 4.9,
    reviewCount: 22,
    inStock: true,
    stockCount: 14,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    badge: 'Heavy Duty Hybrid',
    shortDesc: 'Dual MPPT smart bi-directional hybrid inverter with color touchscreen, generator integration, and smart load management.',
    description: 'Deye 8kW is engineered for large homes, hospitals, and commercial buildings requiring zero-export, battery backup, solar self-consumption, and automatic diesel generator synchronization.',
    specs: {
      'Rated AC Output': '8,000 W',
      'Max PV Input Power': '10,400 Wp',
      'Battery Voltage': '48V (40V - 60V DC)',
      'MPPT Trackers': '2 MPPTs / 2 Strings',
      'Max Charge / Discharge': '190 A',
      'Touchscreen UI': 'Color LCD with Real-time Energy Flow Diagram'
    },
    warranty: '5-Year Manufacturer Warranty',
    features: [
      'Dual MPPT with 97.6% peak efficiency',
      'Smart load port for air conditioners, water heaters or EV chargers',
      'Can store energy from diesel generator to batteries',
      'IP65 rated for indoor and outdoor installation'
    ]
  },
  {
    id: 'felicity-5.12kwh-lithium',
    name: 'Felicity Solar 5.12kWh 48V 100Ah LiFePO4 Wall-Mounted Lithium Battery',
    brand: 'Felicity Solar',
    category: 'solar_systems',
    priceKES: 138000,
    originalPriceKES: 158000,
    rating: 5.0,
    reviewCount: 39,
    inStock: true,
    stockCount: 30,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    badge: '6000+ Cycles',
    shortDesc: 'Grade-A prismatic LiFePO4 cells with built-in smart BMS and CAN/RS485 communication for Growatt and Deye inverters.',
    description: 'The Felicity 5.12kWh lithium iron phosphate battery provides ultra-safe deep cycling with 90% Depth of Discharge (DoD). Wall mount design with high thermal stability and 15-year design lifespan.',
    specs: {
      'Usable Energy Capacity': '5.12 kWh (5120 Wh)',
      'Nominal Voltage': '51.2 V',
      'Capacity Rating': '100 Ah',
      'Cycle Life': '≥ 6,000 Cycles @ 80% DoD (25°C)',
      'Standard Charge/Discharge': '50 A / Max 100 A',
      'BMS Protection': 'Over-voltage, under-voltage, over-current, short circuit, temp',
      'Weight': '46 kg'
    },
    warranty: '5-Year Full Replacement Warranty | 15-Year Design Lifespan',
    features: [
      'Plug-and-play RS485 / CAN communication with Growatt, Deye, MUST',
      'Parallel expansion up to 15 units (76.8kWh total capacity)',
      'Zero maintenance, non-toxic, and no toxic acid fumes'
    ]
  },
  {
    id: 'eastman-200ah-tubular-gel',
    name: 'Eastman 200Ah 12V Tall Tubular Deep Cycle Solar Battery',
    brand: 'Eastman Power',
    category: 'solar_systems',
    priceKES: 34000,
    originalPriceKES: 38500,
    rating: 4.8,
    reviewCount: 31,
    inStock: true,
    stockCount: 45,
    image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=800&q=80',
    badge: 'Heavy Duty Tubular',
    shortDesc: 'Rugged spine tall tubular plate battery engineered for frequent deep discharges in Kenya power outages.',
    description: 'Eastman Tall Tubular 200Ah 12V battery uses high pressure die-cast spine tubes with low antimony alloy ensuring prolonged charge retention and superior deep cycle recovery.',
    specs: {
      'Nominal Voltage': '12 V',
      'Rated Capacity': '200 Ah @ C20',
      'Plate Technology': 'High Pressure Die-Cast Tall Tubular',
      'Electrolyte': 'Pure Lead Antimony with Micro-porous separators',
      'Weight': '62.5 kg'
    },
    warranty: '24-Month Full Replacement Warranty',
    features: [
      'High acid volume per ampere-hour for cooler running temperature',
      'Resistant to thermal runaway during high ambient temperatures',
      'Ideal for backup inverters and rural off-grid solar kits'
    ]
  },
  {
    id: 'themes-complete-home-solar-kit-3kva',
    name: 'Themes 3.2kVA / 2.56kWh Executive Home Solar & Backup Kit',
    brand: 'Themes Professional',
    category: 'solar_systems',
    priceKES: 165000,
    originalPriceKES: 195000,
    rating: 5.0,
    reviewCount: 41,
    inStock: true,
    stockCount: 18,
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=800&q=80',
    badge: 'Turnkey Solution',
    shortDesc: 'Complete 3.2kVA hybrid inverter, 4x 550W Jinko mono panels (2.2kWp), 2.56kWh LiFePO4 battery, and pre-wired protection box.',
    description: 'Designed by Themes Electricals engineers with 15 years of Kenyan solar expertise. Powers full house lighting, double-door fridge, 55" TV, computers, CCTV, and water booster pump with zero blackout interruptions.',
    specs: {
      'Inverter Rating': '3200 VA / 3000 W Pure Sine Wave 24V',
      'Solar Array': '4x 550W N-Type Jinko Solar Panels (2,200 Wp)',
      'Battery Storage': '2.56 kWh 24V 100Ah LiFePO4 Lithium Battery',
      'Combiner Box': 'Pre-wired IP65 DC DB with 600V Surge Arrestor + DC Breakers'
    },
    warranty: '5-Year Comprehensive Warranty & Free Nairobi CBD Delivery',
    features: [
      'Eliminates 70-85% of your monthly KPLC electricity bill',
      'Automatic instant transfer (0.01 sec) when Kenya Power goes off',
      'Includes aluminum roof rails, 30m solar cables, and MC4 connectors'
    ]
  },

  // 2. LIGHTING SYSTEMS (Commercial, Industrial, Indoor/Outdoor LED)
  {
    id: 'industrial-led-highbay-200w',
    name: 'Themes UFO 200W Industrial LED High Bay Light (28,000 Lumens)',
    brand: 'Themes Professional',
    category: 'lighting_systems',
    priceKES: 7500,
    originalPriceKES: 9200,
    rating: 4.9,
    reviewCount: 27,
    inStock: true,
    stockCount: 85,
    image: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&w=800&q=80',
    badge: 'Industrial Grade',
    shortDesc: 'Ultra-bright 140 lm/W Philips Lumileds LED high bay for warehouses, factories, church auditoriums, and gymnasiums.',
    description: 'Forged die-cast aluminum heat sink with MeanWell constant current driver. IP65 waterproof rating with 120-degree optical glass lens, providing 50,000+ hours of glare-free commercial illumination.',
    specs: {
      'Power Wattage': '200 W (Replaces 600W Metal Halide)',
      'Luminous Flux': '28,000 Lumens (140 lm/W)',
      'Color Temperature': '6500K Daylight White',
      'Input Voltage': 'AC 85V - 265V 50/60Hz',
      'Protection Rating': 'IP65 Waterproof & Dustproof',
      'Lifespan': '50,000 Hours'
    },
    warranty: '3-Year Replacement Warranty',
    features: [
      '80% energy savings compared to traditional sodium/metal halide lamps',
      'Die-cast aluminum fins for rapid heat dissipation',
      'Supplied with heavy-duty steel safety hanging ring'
    ]
  },
  {
    id: 'commercial-led-floodlight-300w',
    name: 'Themes Titan 300W IP66 Outdoor Commercial LED Floodlight',
    brand: 'Themes Professional',
    category: 'lighting_systems',
    priceKES: 6800,
    originalPriceKES: 8500,
    rating: 4.8,
    reviewCount: 34,
    inStock: true,
    stockCount: 60,
    image: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80',
    badge: 'High Lumen Flood',
    shortDesc: 'Heavy-duty exterior security and perimeter floodlight for compound perimeters, sports arenas, and parking lots.',
    description: 'Constructed with tempered safety glass and anti-corrosion powder-coated aluminum housing. Built-in 4kV surge suppression to safeguard against Kenyan electrical grid power spikes.',
    specs: {
      'Power Wattage': '300 W',
      'Luminous Output': '36,000 Lumens',
      'Beam Angle': '120° Wide Angle Flood',
      'Waterproof Standard': 'IP66 Rated',
      'Housing': 'Die-cast Aeronautical Aluminum'
    },
    warranty: '2-Year Warranty',
    features: [
      'Wide area illumination up to 80 meters throw',
      'Adjustable 180° mounting bracket for walls, poles, or roofs',
      'Surge protected against lightning and grid spikes'
    ]
  },
  {
    id: 'architectural-led-panel-60x60',
    name: 'Themes 48W 60x60cm Slim Architectural Office LED Panel Light (Pack of 4)',
    brand: 'Philips LED',
    category: 'lighting_systems',
    priceKES: 7800,
    originalPriceKES: 9500,
    rating: 4.9,
    reviewCount: 19,
    inStock: true,
    stockCount: 110,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    badge: 'Office Pack',
    shortDesc: 'Flicker-free edge-lit LED ceiling panel light for commercial offices, clinics, schools, and modern residential gypsum ceilings.',
    description: 'Ultra-thin 9mm aluminum frame with optical PMMA diffuser that eliminates harsh glare (UGR<19). Isolated constant current driver ensures eye comfort and zero buzzing.',
    specs: {
      'Dimensions': '595 × 595 × 9 mm (60x60 cm standard)',
      'Wattage': '48 W per panel',
      'Color Temp': '4000K Natural Cool / 6500K Daylight',
      'Quantity': 'Box of 4 Panels with Independent Drivers'
    },
    warranty: '2-Year Warranty',
    features: [
      'Flicker-free driver protects eyesight in workstations',
      'Even light distribution with no dark edges',
      'Fits standard T-grid false ceilings or surface gypsum brackets'
    ]
  },
  {
    id: 'magnetic-track-lighting-system',
    name: 'Themes Modern Magnetic Track Light System (2M Rail + 4 Spotlights + Linear Light)',
    brand: 'Themes Professional',
    category: 'lighting_systems',
    priceKES: 14500,
    originalPriceKES: 17500,
    rating: 5.0,
    reviewCount: 15,
    inStock: true,
    stockCount: 22,
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
    badge: 'Modern Luxury',
    shortDesc: '24V DC safe low-voltage magnetic architectural track system for luxury homes, boutiques, lounges, and hotels.',
    description: 'Allows instant snapping, sliding, and repositioning of spotlight modules anywhere along the recessed or surface aluminum track. Safe 24V magnetic contact with smart dimming capabilities.',
    specs: {
      'Track Length': '2.0 Meters Recessed / Surface Extrusion',
      'Voltage': '24V DC Safe Low Voltage',
      'Included Modules': '2x 10W Accent Spotlights + 2x 12W Grille Lights + 1x 20W Linear Flood',
      'CRI': 'Ra > 90 High Color Rendering'
    },
    warranty: '3-Year Warranty',
    features: [
      'Modular magnetic snap-on without any tools required',
      'High CRI >90 brings out true vibrant interior colors',
      'Includes 24V MeanWell power transformer driver'
    ]
  },

  // 3. SOLAR WATER PUMPS (Borehole Submersibles, Surface Pumps, Solar Inverters)
  {
    id: 'hober-3hp-solar-pump-inverter',
    name: 'Hober 2.2kW (3.0HP) MPPT Hybrid Solar Borehole Pump Inverter',
    brand: 'Hober Solar Pump',
    category: 'solar_water_pumps',
    priceKES: 58000,
    originalPriceKES: 66000,
    rating: 5.0,
    reviewCount: 38,
    inStock: true,
    stockCount: 18,
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    badge: 'Zero Battery Solar',
    shortDesc: 'Drives any 3-phase 220V/380V or single-phase borehole pump directly from solar panels without needing expensive batteries.',
    description: 'Hober MPPT Pump Inverter features 99% MPPT efficiency to automatically adjust pump speed according to sun intensity. Includes dry-run well sensor, water tank full float switch, and hybrid grid/generator bypass input.',
    specs: {
      'Rated Output Power': '2.2 kW / 3.0 HP',
      'Max DC Solar Input': '450 VDC (3,300 Wp PV Array)',
      'MPPT Tracking Voltage': '150 VDC - 400 VDC',
      'Pump Compatibility': '3-Phase 220V or Single Phase 220V Submersible/Surface',
      'Enclosure': 'IP65 Waterproof Aluminum Casing with Cooling Fans'
    },
    warranty: '2-Year Warranty with Full Technical Support',
    features: [
      'Operates completely without batteries - 100% direct solar drive',
      'Automatic dry-run protection prevents motor burnout when water level drops',
      'Tank-full automatic shutdown and morning auto-restart'
    ]
  },
  {
    id: 'dayliff-sunflo-submersible-kit',
    name: 'Dayliff Sunflo-S 1.5HP Complete Solar Submersible Borehole Pump Kit',
    brand: 'Dayliff',
    category: 'solar_water_pumps',
    priceKES: 115000,
    originalPriceKES: 132000,
    rating: 4.9,
    reviewCount: 29,
    inStock: true,
    stockCount: 12,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    badge: 'Complete Well Kit',
    shortDesc: 'Complete deep-well borehole solar pumping kit including 1.5HP stainless steel pump, MPPT controller, and 4x 550W panels.',
    description: 'Engineered for borehole depths up to 120 meters delivering up to 3,500 liters/hour. Built with AISI 304 stainless steel pump casing, floating sand-resistant impellers, and brushless permanent magnet DC motor.',
    specs: {
      'Max Head (Depth)': '120 Meters',
      'Max Flow Rate': '3.5 m³/hour (3,500 L/hr)',
      'Motor Power': '1100 W (1.5 HP) Brushless DC',
      'PV Array Included': '4x 550W Mono Solar Panels (2,200 Wp)',
      'Pump Diameter': '3 Inch (fits 4" or larger borehole casing)'
    },
    warranty: '2-Year Manufacturer Warranty',
    features: [
      'Delivers up to 20,000 liters of water per sunny day for zero fuel expense',
      'Sand handling impellers withstand tough Kenyan borehole conditions',
      'Includes 50m submersible drop cable and water level probe sensors'
    ]
  },
  {
    id: 'solar-surface-booster-pump-1hp',
    name: 'Themes 750W (1.0HP) Solar Surface Centrifugal Irrigation Pump',
    brand: 'Themes Professional',
    category: 'solar_water_pumps',
    priceKES: 38500,
    originalPriceKES: 45000,
    rating: 4.8,
    reviewCount: 21,
    inStock: true,
    stockCount: 20,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    badge: 'Farm Irrigation',
    shortDesc: 'Direct solar powered surface booster pump for drip irrigation, dam water lifting, and overhead sprinklers.',
    description: 'High flow centrifugal pump with copper winding and brass impeller. Connects directly to 2x or 3x solar panels to push water from rivers, water pans, or underground storage tanks to elevated farm tanks.',
    specs: {
      'Motor Rating': '750 W (1.0 HP) DC Solar',
      'Max Head Lift': '35 Meters',
      'Max Flow Capacity': '6.0 m³/hour (6,000 Liters/hour)',
      'Inlet / Outlet Size': '1.0 Inch (25mm)',
      'Required Solar Panels': '2x 450W or 2x 550W Solar Panels'
    },
    warranty: '2-Year Warranty',
    features: [
      'Ideal for smallholder avocado, tomato, vegetable, and dairy farming in Kenya',
      'Zero diesel cost and zero electricity bills for irrigation',
      'Integrated MPPT controller with digital status display'
    ]
  },
  {
    id: 'hober-7.5kw-commercial-pump-inverter',
    name: 'Hober 7.5kW (10.0HP) 3-Phase Commercial Solar Pumping Inverter',
    brand: 'Hober Solar Pump',
    category: 'solar_water_pumps',
    priceKES: 118000,
    originalPriceKES: 135000,
    rating: 5.0,
    reviewCount: 14,
    inStock: true,
    stockCount: 8,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    badge: 'Agricultural Scale',
    shortDesc: 'Powers heavy 7.5kW / 10HP commercial 380V borehole pumps for community water projects, schools, and large farms.',
    description: 'Capable of running large multi-stage submersible pumps for heads up to 300 meters. Features dual power input supporting solar PV array + backup generator/grid auto-switching.',
    specs: {
      'Power Rating': '7.5 kW / 10.0 HP',
      'Input Voltage (DC)': '400V - 800V DC (Recommended 10kWp PV array)',
      'Output Voltage (AC)': '3-Phase 380V / 415V AC 50Hz',
      'Protection': 'IP65 Weatherproof for outdoor pole mounting'
    },
    warranty: '2-Year Replacement Warranty',
    features: [
      'GPRS remote monitoring module included (track water flow on your phone)',
      'Over-voltage, under-voltage, phase loss, and motor stall protection',
      'Seamless hybrid generator blending for cloudy days'
    ]
  },

  // 4. SOLAR STREET LIGHTS (All-In-One, Commercial Poles, Radar Motion)
  {
    id: 'all-in-one-solar-streetlight-300w',
    name: 'Themes SuperNova 300W All-In-One Integrated Solar Street Light',
    brand: 'Sunmaster Solar',
    category: 'solar_street_lights',
    priceKES: 12500,
    originalPriceKES: 14800,
    rating: 4.9,
    reviewCount: 64,
    inStock: true,
    stockCount: 90,
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=800&q=80',
    badge: 'Top Seller Streetlight',
    shortDesc: 'Integrated high-efficiency solar panel, LiFePO4 battery, Bridgelux LEDs, radar motion sensor, and remote control.',
    description: 'The Themes 300W All-In-One Solar Street Light requires zero wiring. Simply mount on a pole or wall. Automatically turns on at dusk at 30% brightness, switches to 100% full brightness when motion is detected, and recharges during the day.',
    specs: {
      'Rated Power': '300 W High Lumen Bridgelux LED (4,800 Lumens)',
      'Solar Panel': '6V 30W Monocrystalline High-Gain Panel',
      'Battery Chemistry': '3.2V 36Ah LiFePO4 Deep Cycle Battery',
      'Lighting Time': '12 - 14 Hours (2 - 3 Rainy Days Backup Autonomy)',
      'Sensor Type': 'PIR Radar Motion Sensor (10-12m detection radius)',
      'Housing': 'Heavy Duty Die-Cast ABS + Aluminum (IP67)'
    },
    warranty: '3-Year Warranty & Free Delivery in Nairobi CBD',
    features: [
      '100% solar powered - zero electricity bills forever',
      'Supplied with wireless remote control for brightness & timer adjustments',
      'Supplied with galvanized mounting pole bracket & expansion bolts'
    ]
  },
  {
    id: 'commercial-split-solar-streetlight-500w',
    name: 'Themes Commercial 500W Split Solar Street Light with Separate Heavy Panel',
    brand: 'Themes Professional',
    category: 'solar_street_lights',
    priceKES: 24500,
    originalPriceKES: 28500,
    rating: 5.0,
    reviewCount: 33,
    inStock: true,
    stockCount: 40,
    image: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&w=800&q=80',
    badge: 'Municipal & Estate',
    shortDesc: 'Heavy-duty 500W municipal-grade split solar street light for estate roads, commercial plazas, hotels, and highway perimeters.',
    description: 'Features a large standalone 18V 60W monocrystalline solar panel and massive 12.8V 30Ah LiFePO4 battery pack inside the aluminum luminaire. Delivers continuous ultra-bright illumination all night even in overcast Kenyan rainy seasons.',
    specs: {
      'LED Output': '500 W (8,500 Lumens Philips 5050 Chips)',
      'Solar Panel': '18V 60W High-Efficiency Monocrystalline',
      'Battery Storage': '12.8V 30Ah (384Wh) LiFePO4 Battery Pack',
      'Recommended Height': '6 to 9 Meters Pole Mounting',
      'Illumination Area': 'Up to 250 Square Meters'
    },
    warranty: '3-Year Comprehensive Warranty',
    features: [
      'Split design allows angling panel precisely toward Kenya equatorial sun',
      'Intelligent MPPT controller prevents battery overcharging & deep discharge',
      'IP67 waterproof aluminum alloy body resistant to heavy rains and dust'
    ]
  },
  {
    id: 'solar-courtyard-gate-pillar-light',
    name: 'Themes Solar Gate Pillar & Garden Post Light (Die-Cast Brass / Glass)',
    brand: 'Themes Professional',
    category: 'solar_street_lights',
    priceKES: 5800,
    originalPriceKES: 7200,
    rating: 4.8,
    reviewCount: 28,
    inStock: true,
    stockCount: 50,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    badge: 'Elegance & Security',
    shortDesc: 'Luxury solar post top light with warm white/cool white 3-color switch for compound gate pillars, walkways, and perimeter walls.',
    description: 'Crafted from rust-proof die-cast aluminum with frosted glass panels. Built-in top solar panel charges a 3.7V 4400mAh lithium battery to illuminate your compound automatically every evening.',
    specs: {
      'Material': 'Die-Cast Aluminum + Water-Ripple Toughened Glass',
      'Colors': '3-Color Switchable (3000K Warm / 4000K Neutral / 6500K White)',
      'Solar Panel': '5V 5W Monocrystalline Top Glass',
      'Runtime': '10 - 12 Hours continuous lighting per night'
    },
    warranty: '2-Year Warranty',
    features: [
      'Automatic dusk-to-dawn day/night light sensor',
      'Adds immense aesthetic curb appeal and security to your home gate',
      'IP65 water resistant against heavy downpours'
    ]
  },
  {
    id: 'solar-flood-security-camera-light',
    name: 'Themes 200W Solar Security Floodlight with Built-in 1080p Wi-Fi CCTV Camera',
    brand: 'Themes Professional',
    category: 'solar_street_lights',
    priceKES: 14500,
    originalPriceKES: 17000,
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    stockCount: 35,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
    badge: 'Security + CCTV',
    shortDesc: '2-in-1 200W solar floodlight with integrated high-definition CCTV security camera, 2-way audio, and mobile app live view.',
    description: 'Keep your property safe with zero monthly electricity and zero wiring. Connects to your home Wi-Fi to send instant motion alerts to your phone, record video to SD card/cloud, and flood your yard with light.',
    specs: {
      'Floodlight Power': '200 W (3,200 Lumens)',
      'Camera Resolution': '1080P Full HD with Color Night Vision',
      'Connectivity': '2.4GHz Wi-Fi / Remote Mobile Phone App (iOS & Android)',
      'Battery': '3.2V 25Ah LiFePO4 Battery with Large 30W Solar Panel',
      'Audio': '2-Way Voice Intercom (Listen & Speak via Phone)'
    },
    warranty: '2-Year Warranty',
    features: [
      'Watch live video on your smartphone from anywhere in the world',
      'Dual PIR human detection triggers recording and sirens',
      'Completely standalone solar security system'
    ]
  },

  // 5. POWER BACK UP GENERATORS (Diesel, Petrol, Silent Hybrid & ATS)
  {
    id: 'perkins-silent-diesel-generator-10kva',
    name: 'Themes Silent 10kVA (8.0kW) Single/3-Phase Diesel Backup Generator with Auto-ATS',
    brand: 'Perkins Silent',
    category: 'generators',
    priceKES: 245000,
    originalPriceKES: 275000,
    rating: 5.0,
    reviewCount: 18,
    inStock: true,
    stockCount: 6,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    badge: 'Silent Heavy Duty',
    shortDesc: 'Super-silent soundproof canopied diesel generator (<68dB) with automatic mains failure transfer switch (ATS).',
    description: 'Engineered for commercial offices, clinics, residential mansions, and solar hybrid integration. Starts automatically within 5 seconds of a Kenya Power outage and shuts down smoothly when grid restores.',
    specs: {
      'Prime Power Output': '10 kVA / 8.0 kW',
      'Engine Type': 'Single Cylinder 4-Stroke Direct Injection Air/Water-Cooled Diesel',
      'Fuel Consumption': 'Approx. 1.8 Liters/Hour @ 75% Load',
      'Fuel Tank Capacity': '16 Liters (8-10 Hours continuous runtime)',
      'Noise Level': '68 dB @ 7 meters (Super Silent Acoustic Canopy)',
      'ATS Panel': 'External Automatic Transfer Switch Included'
    },
    warranty: '2-Year / 1500 Hours Warranty with Themes Full Servicing Parts Support',
    features: [
      'Automatic transfer switch (ATS) starts engine automatically on grid failure',
      'Digital smart controller with voltage, frequency, oil level, and runtime meter',
      'Equipped with 4 heavy-duty castor wheels for easy mobility'
    ]
  },
  {
    id: 'cummins-silent-diesel-generator-20kva',
    name: 'Cummins Powered 20kVA 3-Phase Silent Canopy Commercial Diesel Generator',
    brand: 'Cummins Power',
    category: 'generators',
    priceKES: 680000,
    originalPriceKES: 750000,
    rating: 5.0,
    reviewCount: 11,
    inStock: true,
    stockCount: 4,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    badge: 'Industrial Commercial',
    shortDesc: 'Water-cooled 4-cylinder Cummins engine generator for petrol stations, manufacturing plants, hospitals, and apartment complexes.',
    description: 'Heavy duty 1500 RPM 4-cylinder water-cooled engine with brushless Stamford alternator and DeepSea DSE6120 digital auto controller. Provides dependable uninterrupted standby and prime electrical power.',
    specs: {
      'Standby Power': '22 kVA / 17.6 kW | Prime: 20 kVA / 16 kW',
      'Voltage': '415V / 240V 3-Phase 4-Wire 50Hz',
      'Engine': 'Cummins 4B3.9-G2 Series 4-Cylinder Turbocharged',
      'Alternator': 'Brushless 100% Copper Stamford Alternator with AVR',
      'Fuel Tank': 'Base Fuel Tank with 12 Hours Runtime'
    },
    warranty: '2-Year Manufacturer Warranty with On-Site Installation',
    features: [
      'DeepSea digital auto start & protection module',
      'Low fuel consumption and ultra-low vibration design',
      'Engineered for 24/7 continuous operation during prolonged power cuts'
    ]
  },
  {
    id: 'digital-inverter-petrol-generator-3.5kva',
    name: 'Themes 3.5kVA Ultra-Quiet Digital Inverter Petrol Generator (Pure Sine Wave)',
    brand: 'Themes Professional',
    category: 'generators',
    priceKES: 62000,
    originalPriceKES: 72000,
    rating: 4.8,
    reviewCount: 25,
    inStock: true,
    stockCount: 15,
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    badge: 'Clean Pure Sine',
    shortDesc: 'Compact suitcase portable inverter generator with ultra-clean pure sine electricity for sensitive medical, IT, and home electronics.',
    description: 'Produces THD < 2.5% ultra-clean electricity, making it 100% safe for laptops, laboratory equipment, and smart TVs. Features smart throttle eco-mode for 40% fuel economy and whisper-quiet 58dB operation.',
    specs: {
      'Max Output': '3,500 W (3.5 kVA) | Rated: 3,000 W',
      'Voltage': '230V 50Hz Pure Sine Wave (THD < 2.5%)',
      'Starting System': 'Electric Push Button Start + Wireless Remote + Recoil Backup',
      'Noise Level': '58 dB (Whisper Quiet Suitcase Casing)',
      'Weight': '28 kg (Lightweight Portable Design)'
    },
    warranty: '18-Month Warranty',
    features: [
      'Pure sine wave safe for sensitive electronics and inverter battery charging',
      'Eco-mode automatically adjusts engine speed to load for maximum fuel savings',
      'Includes dual USB fast charging ports and 12V DC outlet'
    ]
  },

  // 6. HEAT PUMPS (Air Source Energy Saving Water Heaters)
  {
    id: 'domestic-air-source-heat-pump-200l',
    name: 'Midea 200L All-In-One Energy-Saving Domestic Heat Pump Water Heater',
    brand: 'Midea Commercial',
    category: 'heat_pumps',
    priceKES: 145000,
    originalPriceKES: 168000,
    rating: 4.9,
    reviewCount: 26,
    inStock: true,
    stockCount: 10,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    badge: '75% Power Cut',
    shortDesc: 'Consumes only 1 part electrical energy to produce 4 parts heat energy (COP 4.2), cutting water heating electricity bills by 75%.',
    description: 'Thermodynamic heat pump absorbs ambient warmth from the surrounding Kenyan air to heat water up to 65°C without relying on high-wattage immersion elements. Works day and night, rain or shine, unlike standard solar water heaters that struggle in heavy clouds.',
    specs: {
      'Tank Volume': '200 Liters Enamel Stainless Steel Inner Tank',
      'Coefficient of Performance (COP)': 'Up to 4.2 (Generates 4.2kW heat for every 1kW input)',
      'Rated Power Input': 'Only 550 Watts (Delivers 2,300W heating capacity)',
      'Max Water Temp': '65°C Heat Pump mode / 75°C with backup element',
      'Smart Features': 'Wi-Fi Smart Mobile App with Weekly Timer Schedule'
    },
    warranty: '5-Year Tank Warranty | 3-Year Compressor Warranty',
    features: [
      'Cuts water heating electricity cost by up to 75% compared to regular geysers',
      'Works 24/7 day and night regardless of rainy or cold weather conditions',
      'Pressurized system suitable for booster pump high-flow luxury rain showers'
    ]
  },
  {
    id: 'domestic-air-source-heat-pump-300l',
    name: 'Themes 300L Villa High-Capacity Thermodynamic Heat Pump System',
    brand: 'Themes Professional',
    category: 'heat_pumps',
    priceKES: 188000,
    originalPriceKES: 215000,
    rating: 5.0,
    reviewCount: 17,
    inStock: true,
    stockCount: 8,
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80',
    badge: 'Villa Capacity',
    shortDesc: 'High-capacity 300L air-source heat pump for 4-6 bathroom luxury homes, villas, spas, and boutique hotels in Kenya.',
    description: 'Utilizes eco-friendly R134a refrigerant with high-efficiency Panasonic rotary compressor. Features intelligent microcomputer controller, anti-legionella sterilization cycle, and seamless integration with Themes solar PV systems.',
    specs: {
      'Tank Capacity': '300 Liters Food-Grade SUS304 Stainless Steel',
      'Heating Output': '3,800 Watts',
      'Power Consumption': 'Approx. 900 Watts Input (COP 4.1)',
      'Operating Ambient Temp': '-7°C to +43°C',
      'Noise': '<48 dB (Whisper Quiet Operation)'
    },
    warranty: '5-Year Tank & 3-Year Compressor Warranty',
    features: [
      'Saves over KSh 60,000 annually on electricity bills for large households',
      'High pressure tested to 10 Bar for multi-storey residential plumbings',
      'Includes magnesium anode sacrificial rod for hard-water corrosion defense'
    ]
  },
  {
    id: 'commercial-swimming-pool-heat-pump',
    name: 'Themes 18kW Commercial Swimming Pool & Spa Inverter Heat Pump',
    brand: 'Themes Professional',
    category: 'heat_pumps',
    priceKES: 285000,
    originalPriceKES: 320000,
    rating: 5.0,
    reviewCount: 9,
    inStock: true,
    stockCount: 5,
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
    badge: 'Pool & Hospitality',
    shortDesc: 'Maintains swimming pool water at an inviting 28°C-32°C year-round for hotels, schools, resorts, and private villas.',
    description: 'Equipped with titanium twisted-tube heat exchanger resistant to chlorine and salt water corrosion. Full DC inverter compressor automatically modulates speed to maintain perfect pool temperature with minimal power draw.',
    specs: {
      'Heating Capacity': '18.0 kW (For pools up to 65,000 Liters / 65 m³)',
      'Power Input': 'Only 2.8 kW (COP up to 6.4 in warm ambient air)',
      'Heat Exchanger': 'Pure Titanium Tube in PVC Shell (Chlorine & Salt Resistant)',
      'Power Supply': '220V Single Phase or 380V 3-Phase 50Hz',
      'Casing': 'Anti-Rust UV-Stabilized Composite Shell'
    },
    warranty: '3-Year Complete Warranty',
    features: [
      'Titanium heat exchanger immune to chemical corrosion from pool chlorine',
      'Extends swimming pool season to 365 days a year across Kenya',
      'Digital touch display with Wi-Fi smartphone remote temperature control'
    ]
  }
];

export const SOLAR_KITS: SolarKit[] = [
  {
    id: 'kit-1.5kva-starter',
    title: 'Essential 1.5kVA Solar Power & Blackout Backup Kit',
    powerRating: '1.5 kVA / 1.2 kW',
    idealFor: 'Bedsitters, 1-2 Bedroom Apartments, Retail Shops, Cyber Cafes',
    priceKES: 88000,
    originalPriceKES: 105000,
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    badge: 'Most Affordable',
    components: {
      inverter: 'Themes 1.5kVA / 1200W 12V Pure Sine Wave Hybrid Inverter with 50A MPPT',
      panels: '2x 450W Monocrystalline JA Solar Panels (900 Wp)',
      battery: '1x 200Ah 12V Eastman Tall Tubular Deep Cycle Battery',
      accessories: 'Pre-wired DC/AC DB box, 40A DC breaker, 20m 4mm² solar cable, roof mounting brackets'
    },
    powers: [
      'Up to 12 LED Lights (6-8 hours daily)',
      '43" Smart TV, Soundbar & Wi-Fi Router (24/7)',
      'Laptops, Phone Charging & CCTV Cameras',
      'Small single-door energy-saving fridge'
    ],
    estimatedDailyYieldKWh: 4.5,
    warranty: '2-Year Warranty with FREE Nairobi CBD Delivery'
  },
  {
    id: 'kit-3.2kva-executive',
    title: 'Executive 3.2kVA / 2.56kWh Lithium Home Solar Kit',
    powerRating: '3.2 kVA / 3.0 kW',
    idealFor: '3-4 Bedroom Family Homes, Clinics, Executive Offices, Restaurants',
    priceKES: 165000,
    originalPriceKES: 195000,
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Value for Homes',
    components: {
      inverter: 'Growatt / Themes 3.2kVA 24V Pure Sine Wave Hybrid with 80A MPPT & Wi-Fi',
      panels: '4x 550W Jinko Tiger Pro N-Type Monocrystalline Panels (2,200 Wp)',
      battery: '1x 2.56kWh 24V 100Ah LiFePO4 Lithium Battery Pack (6,000 cycles)',
      accessories: 'Dual-pole 600V DC surge arrester, AC bypass breaker, aluminum solar rails'
    },
    powers: [
      'All LED lighting throughout a 3-4 bedroom house',
      'Medium/Large Double-Door Refrigerator & Deep Chest Freezer',
      '65" 4K Smart TV, Decoders, Wi-Fi & Audio System',
      '0.5HP - 0.75HP Domestic Water Booster Pump',
      'Automatic Washing Machine (Daytime Solar Cycle)',
      'Zero blackout interruptions during Kenya Power grid cuts'
    ],
    estimatedDailyYieldKWh: 11.0,
    warranty: '5-Year Lithium Battery & Inverter | 30-Year Solar Panels'
  },
  {
    id: 'kit-5.5kw-villa',
    title: 'Diamond 5.5kW / 5.12kWh Heavy-Duty Villa & Business Solar Kit',
    powerRating: '5.5 kW / 5.12 kWh',
    idealFor: 'Mansions, Villas, Petrol Stations, Large Clinics, Supermarkets',
    priceKES: 265000,
    originalPriceKES: 310000,
    image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=800&q=80',
    badge: 'Total Independence',
    components: {
      inverter: 'Growatt SPF 5000 ES / Deye 5kW 48V Hybrid Inverter with 100A MPPT & Wi-Fi',
      panels: '6x 550W Jinko Tiger Pro Mono Panels (3,300 Wp expandable to 6,000 Wp)',
      battery: '1x 5.12kWh Felicity / BYD 48V 100Ah LiFePO4 Wall Mount Battery',
      accessories: 'Dual-string IP65 DC combiner box with 1000V Lightning Surge Arrestor, AC bypass panel, roof aluminum structure'
    },
    powers: [
      'Complete home electrical circuits with 100% blackout defense',
      'Multiple Fridges, Freezers & Commercial Displays',
      'Microwave Oven, Air Fryer, Blender & Electric Kettle',
      '1.0HP - 1.5HP Booster Pump / Submersible Borehole Pump',
      'Full Automatic Washing Machine & Ironing',
      'Security Floodlights, Electric Fence & CCTV Servers'
    ],
    estimatedDailyYieldKWh: 16.5,
    warranty: '5-Year Inverter & Lithium Battery | 30-Year Solar Performance'
  },
  {
    id: 'kit-10kw-commercial',
    title: 'Commercial 10kW 3-Phase / 10.24kWh Hybrid Micro-Grid System',
    powerRating: '10 kW / 10.24 kWh',
    idealFor: 'Factories, Schools, Hospitals, Petrol Stations, Estates, Commercial Plazas',
    priceKES: 475000,
    originalPriceKES: 550000,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    badge: 'Industrial Scale',
    components: {
      inverter: 'Deye / Growatt 10kW 3-Phase Smart Hybrid Inverter with Generator Auto-Start Contact',
      panels: '12x 550W Jinko Tiger Pro N-Type Panels (6,600 Wp Solar Generation)',
      battery: '2x 5.12kWh Felicity LiFePO4 Modular Rack Lithium Storage (10.24kWh Total Storage)',
      accessories: '3-Phase industrial combiner box, bi-directional energy meter, heavy cable trays, and circuit breakers'
    },
    powers: [
      '3-Phase motors, Cold rooms, Commercial refrigeration & Freezers',
      'Office IT servers, 25+ workstations, Printers & Photocopiers',
      'High-power borehole water pumps up to 5.5HP',
      'Drastic 80-90% reduction in commercial KPLC power bills'
    ],
    estimatedDailyYieldKWh: 33.0,
    warranty: '10-Year Performance & 5-Year Full System Guarantee'
  }
];

export const SIZING_APPLIANCES: SizingAppliance[] = [
  { id: 'lights', name: 'LED Lights (Indoor & Outdoor)', icon: 'Lightbulb', wattage: 12, defaultQty: 10, defaultHours: 6, category: 'lighting' },
  { id: 'security-lights', name: 'Security LED Floodlights (50W)', icon: 'Shield', wattage: 50, defaultQty: 2, defaultHours: 10, category: 'lighting' },
  { id: 'smart-tv', name: 'Smart TV (50"-65") + Sound System', icon: 'Tv', wattage: 120, defaultQty: 1, defaultHours: 5, category: 'entertainment' },
  { id: 'fridge', name: 'Double-Door Refrigerator', icon: 'Refrigerator', wattage: 150, defaultQty: 1, defaultHours: 12, category: 'cooling' },
  { id: 'freezer', name: 'Deep Chest Freezer', icon: 'Box', wattage: 200, defaultQty: 1, defaultHours: 10, category: 'cooling' },
  { id: 'wifi', name: 'Wi-Fi Router & CCTV DVR System', icon: 'Wifi', wattage: 35, defaultQty: 1, defaultHours: 24, category: 'work' },
  { id: 'laptop', name: 'Desktop Computer / Laptop Workstations', icon: 'Laptop', wattage: 80, defaultQty: 2, defaultHours: 8, category: 'work' },
  { id: 'microwave', name: 'Microwave Oven / Air Fryer', icon: 'Microwave', wattage: 1000, defaultQty: 1, defaultHours: 0.5, category: 'kitchen' },
  { id: 'kettle', name: 'Electric Kettle / Coffee Maker', icon: 'Coffee', wattage: 1500, defaultQty: 1, defaultHours: 0.3, category: 'kitchen' },
  { id: 'washing-machine', name: 'Automatic Washing Machine', icon: 'Disc', wattage: 600, defaultQty: 1, defaultHours: 1, category: 'water' },
  { id: 'booster-pump', name: 'Domestic Water Booster Pump (0.5HP)', icon: 'Droplets', wattage: 375, defaultQty: 1, defaultHours: 2, category: 'water' },
  { id: 'borehole-pump', name: 'Submersible Borehole Pump (1.5HP)', icon: 'Waves', wattage: 1100, defaultQty: 0, defaultHours: 3, category: 'water' },
  { id: 'heat-pump-geyser', name: 'Thermodynamic Heat Pump Geyser', icon: 'Flame', wattage: 650, defaultQty: 1, defaultHours: 3, category: 'water' },
  { id: 'fan', name: 'Ceiling / Standing Fan', icon: 'Wind', wattage: 60, defaultQty: 2, defaultHours: 6, category: 'cooling' }
];
