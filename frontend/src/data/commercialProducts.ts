import { Product } from '../types';

export const COMMERCIAL_PRODUCTS: Product[] = [
  // ==========================================
  // LIGHTING SYSTEMS (Commercial & Industrial)
  // ==========================================
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
    image: 'https://macire.co.ke/wp-content/uploads/2025/03/Legend-light-1000w-01.jpg',
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
    image: 'https://macire.co.ke/wp-content/uploads/2024/12/Untitled-2025-03-25T135312.421.png',
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
    image: 'https://solarshop.co.ke/wp-content/uploads/2024/04/Solar-Ceiling-Lights-Kenya-best-price-SolarShop-Africa.png',
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
    reviewCount: 14,
    inStock: true,
    stockCount: 25,
    image: 'https://solarshop.co.ke/wp-content/uploads/2024/04/WhatsApp_Image_2024-04-22_at_06.18.03-removebg-preview.png',
    badge: 'Luxury Interior',
    shortDesc: 'Premium 48V low-voltage magnetic track lighting kit for living rooms, kitchen islands, boutiques, and galleries.',
    description: 'Safe touch-voltage 48V DC magnetic track rail system. Lights snap seamlessly into position without tools and can be slid along the rail for custom accent lighting.',
    specs: {
      'Track Length': '2 Meters Flush/Surface Aluminum Rail',
      'Included Modules': '2x 10W Foldable Spots, 2x 12W Grille Spotlights, 1x 20W Linear Flood',
      'Driver': 'MeanWell 100W 48V Built-In Power Supply',
      'CRI': 'Ra > 90 High Color Fidelity'
    },
    warranty: '2-Year Warranty',
    features: [
      'Tool-free click and magnetic positioning',
      'High color rendering index for vivid interiors',
      'Safe 48V low-voltage operation'
    ]
  },

  // ==========================================
  // SOLAR WATER PUMPING
  // ==========================================
  {
    id: 'hober-3hp-solar-pump-inverter',
    name: 'Hober 2.2kW (3.0HP) MPPT Hybrid Solar Borehole Pump Inverter',
    brand: 'Hober Solar Pump',
    category: 'solar_water_pumps',
    priceKES: 45000,
    originalPriceKES: 52000,
    rating: 4.9,
    reviewCount: 22,
    inStock: true,
    stockCount: 18,
    image: 'https://solarshop.co.ke/wp-content/uploads/2024/03/Hober-2.2Kw-Hybrid-Solar-Water-Pumping-inverter-best-price-in-Nairobi-Kenya-East-and-Central-Africa.webp',
    badge: 'Best Borehole Inverter',
    shortDesc: 'Automated solar water pumping VFD inverter with 99% MPPT efficiency. Operates directly from solar panels without batteries.',
    description: 'The industry-standard Hober MPPT pumping inverter powers AC 220V/380V pumps directly from solar panels. Built-in dry-run protection, tank full float detection, and dual AC/DC automatic grid or generator changeover.',
    specs: {
      'Rated Power': '2.2 kW / 3.0 Horsepower (HP)',
      'Output Voltage': '3-Phase 220V or 380V AC',
      'Max DC Input Voltage': '800 VDC',
      'MPPT Voltage Range': '250V - 750V DC',
      'Protection': 'Dry-run, Overcurrent, Lightning, Tank Overflow'
    },
    warranty: '2-Year Warranty',
    features: [
      'Operates 100% battery-free directly from solar panels',
      'Automatic sunrise start and sunset stop',
      'Supports dual solar + backup generator or KPLC input'
    ]
  },
  {
    id: 'dayliff-sunflo-submersible-kit',
    name: 'Dayliff Sunflo-S 1.5HP Complete Solar Submersible Borehole Pump Kit',
    brand: 'Dayliff',
    category: 'solar_water_pumps',
    priceKES: 115000,
    originalPriceKES: 130000,
    rating: 4.9,
    reviewCount: 31,
    inStock: true,
    stockCount: 12,
    image: 'https://macire.co.ke/wp-content/uploads/2026/09/Doyin-Pumps-Kit-3-Panels.png',
    badge: 'Turnkey Solar Pumping',
    shortDesc: 'Complete solar borehole and well pumping system with 1.5HP stainless steel pump, solar panels, and digital controller.',
    description: 'Delivers reliable water discharge up to 90 meters head and flows up to 3,500 liters per hour. Includes high-efficiency brushless DC motor, 4x monocrystalline solar panels, and water level monitoring sensors.',
    specs: {
      'Pump Motor': '1.5 HP Stainless Steel Helical Submersible',
      'Max Head (Depth)': '90 Meters Depth',
      'Flow Rate': 'Up to 3,500 Liters / Hour (3.5 m³/h)',
      'Solar Array': '4x 585W Monocrystalline PV Panels Included',
      'Submersible Cable': '50 Meters Heavy-Duty Cable Included'
    },
    warranty: '2-Year Dayliff Comprehensive Warranty',
    features: [
      'Eliminates monthly diesel and KPLC pumping costs',
      'Stainless steel AISI 304 anti-sand casing',
      'Complete with safety cable, borehole cap, and control box'
    ]
  },
  {
    id: 'solar-surface-booster-pump-1hp',
    name: 'Themes 750W (1.0HP) DC Solar Surface Irrigation & Domestic Booster Pump',
    brand: 'Themes Professional',
    category: 'solar_water_pumps',
    priceKES: 285000,
    originalPriceKES: 34000,
    rating: 4.8,
    reviewCount: 16,
    inStock: true,
    stockCount: 20,
    image: 'https://solarshop.co.ke/wp-content/uploads/2024/04/WhatsApp_Image_2024-04-22_at_12.56.08-removebg-preview.png',
    badge: 'Farm & Irrigation',
    shortDesc: 'Permanent magnet DC solar booster pump for drip irrigation, farm tanks, rivers, and overhead domestic water elevation.',
    description: 'High-speed brushless DC motor powered by 2x solar panels. Self-priming capability with cast brass impeller, delivering up to 4,200 liters per hour at 45 meters max head.',
    specs: {
      'Power': '750 W / 1.0 HP Brushless DC',
      'Working Voltage': '48V - 72V DC',
      'Max Head': '45 Meters',
      'Max Flow': '4,200 L/hr',
      'Inlet / Outlet': '1.0 Inch (25mm)'
    },
    warranty: '2-Year Warranty',
    features: [
      'Ideal for zero-cost drip irrigation and homestead water towers',
      'Requires only 2x 585W solar panels to operate at full capacity',
      'Intelligent digital control box with speed adjustment'
    ]
  },
  {
    id: 'hober-7.5kw-commercial-pump-inverter',
    name: 'Hober 7.5kW (10.0HP) Heavy-Duty 3-Phase Solar Water Pump Inverter',
    brand: 'Hober Solar Pump',
    category: 'solar_water_pumps',
    priceKES: 78000,
    originalPriceKES: 92000,
    rating: 5.0,
    reviewCount: 9,
    inStock: true,
    stockCount: 8,
    image: 'https://solarshop.co.ke/wp-content/uploads/2024/03/Hober-5.5Kw-Hybrid-Solar-Water-Pumping-three-phase-inverter-best-price-in-Nairobi-Kenya-East-and-Central-Africa.webp',
    badge: 'Commercial Agribusiness',
    shortDesc: 'High-capacity 3-phase solar VFD controller for large agricultural irrigation projects, community water projects, and deep boreholes (150m+).',
    description: 'Supports high-power 3-phase 380V/415V submersible pumps up to 10HP. Features integrated GPRS remote mobile monitoring and intelligent cloud water yield logging.',
    specs: {
      'Rated Power': '7.5 kW / 10 HP',
      'Output': '3-Phase 380V AC 50Hz',
      'Max DC Input': '850 VDC',
      'Enclosure': 'IP65 Weatherproof Steel Enclosure',
      'Telemetry': 'Optional 4G/GPRS Remote Monitoring'
    },
    warranty: '2-Year Warranty',
    features: [
      'Powers 7.5HP - 10HP heavy borehole pumps effortlessly',
      'Wide MPPT range handles variable morning and evening sunlight',
      'Protects pump against phase loss and voltage surge'
    ]
  },

  // ==========================================
  // SOLAR STREET LIGHTS
  // ==========================================
  {
    id: 'all-in-one-solar-streetlight-300w',
    name: 'Themes SuperNova 300W All-In-One Integrated Solar Street Light',
    brand: 'Sunmaster Solar',
    category: 'solar_street_lights',
    priceKES: 11500,
    originalPriceKES: 14000,
    rating: 4.9,
    reviewCount: 48,
    inStock: true,
    stockCount: 95,
    image: 'https://solarshop.co.ke/wp-content/uploads/2024/03/Felicity-Solar-Street-Light-2-1.webp',
    badge: 'Estate Best Seller',
    shortDesc: 'Heavy-duty integrated solar streetlight with built-in LiFePO4 battery, monocrystalline solar panel, radar sensor, and remote.',
    description: 'Engineered for gated communities, tarmac access roads, church compounds, and farm perimeters. Illuminates automatically from dusk to dawn with 3 continuous nights of autonomy during rainy/cloudy Kenyan weather.',
    specs: {
      'LED Power': '300 W High-Lumen Bridgelux LED (18,000 Lumens)',
      'Battery': 'LiFePO4 Lithium Battery 3.2V 36Ah (2,000+ Cycles)',
      'Solar Panel': 'Mono 6V 35W High-Efficiency Monocrystalline',
      'Lighting Time': '12-14 Hours / 3 Rainy Days Reserve',
      'Sensor': 'Radar Microwave Motion Sensor + Remote Control',
      'Installation Height': '5 - 7 Meters'
    },
    warranty: '2-Year Full Replacement Warranty',
    features: [
      '100% zero electricity wiring or monthly utility bills',
      'Corrosion-resistant die-cast aluminum housing',
      'Includes heavy-duty mounting bracket and remote control'
    ]
  },
  {
    id: 'commercial-split-solar-streetlight-500w',
    name: 'Themes Commercial 500W Split Solar Street Light with Separate Heavy Panel',
    brand: 'Themes Professional',
    category: 'solar_street_lights',
    priceKES: 18500,
    originalPriceKES: 22000,
    rating: 5.0,
    reviewCount: 33,
    inStock: true,
    stockCount: 45,
    image: 'https://macire.co.ke/wp-content/uploads/2025/03/Legend-light-3000-01.jpg',
    badge: 'Highway & Commercial',
    shortDesc: 'Split solar street light with separate 80W glass solar panel and high-capacity 40Ah battery pack for commercial plazas and public roads.',
    description: 'The separate solar panel allows optimal orientation toward the equator sun irrespective of pole position. Designed for maximum brightness with Philips LED chips and wide-angle optical lenses.',
    specs: {
      'LED Output': '500 W Ultra High Lumens (30,000 Lumens)',
      'Battery': 'LiFePO4 3.2V 50Ah Deep Cycle Storage',
      'Solar Panel': 'Independent 18V 80W Heavy Glass Panel',
      'Pole Height': '6 - 9 Meters Recommended',
      'Autonomy': 'Up to 4 Nights during heavy rains'
    },
    warranty: '3-Year Warranty',
    features: [
      'Maximum solar harvest with adjustable panel angle',
      'Deep cycle LiFePO4 battery pack lasts 5 to 7 years',
      'Automated smart MPPT dusk-to-dawn controller'
    ]
  },
  {
    id: 'solar-courtyard-gate-pillar-light',
    name: 'Themes Luxury Vintage 40W Solar Gate Pillar Light (Pack of 2)',
    brand: 'Themes Professional',
    category: 'solar_street_lights',
    priceKES: 9500,
    originalPriceKES: 12000,
    rating: 4.8,
    reviewCount: 29,
    inStock: true,
    stockCount: 60,
    image: 'https://solarshop.co.ke/wp-content/uploads/2024/04/Solar-Gate-Lights-Kenya-best-price-SolarShop-Africa.png',
    badge: 'Gate & Villa Luxury',
    shortDesc: 'Architectural European style solar pillar light for residential entrance gates, perimeter walls, and villa gardens.',
    description: 'Features 4-sided monocrystalline solar panels with 3-color selectable lighting (Warm White, Natural, Daylight White). Sturdy aluminum body with frosted water-wave glass panels.',
    specs: {
      'Power': '40 W LED with 3 CCT switchable modes',
      'Dimensions': '300 × 300 × 380 mm Base Pillar Mount',
      'Material': 'Die-cast Aluminum + Tempered Frosted Glass',
      'Battery': 'LiFePO4 3.7V 6600mAh',
      'Control': 'Automatic Light Sensor + Remote Control'
    },
    warranty: '2-Year Warranty',
    features: [
      'Adds timeless aesthetic elegance to gates and perimeter pillars',
      'Charges from all 4 sides throughout the day',
      'Switch between warm cozy lighting and bright security daylight'
    ]
  },
  {
    id: 'solar-flood-security-camera-light',
    name: 'Themes 200W Solar Floodlight with Integrated 4G/Wi-Fi CCTV Security Camera',
    brand: 'Sunmaster Solar',
    category: 'solar_street_lights',
    priceKES: 16500,
    originalPriceKES: 19500,
    rating: 4.9,
    reviewCount: 25,
    inStock: true,
    stockCount: 30,
    image: 'https://macire.co.ke/wp-content/uploads/2025/03/Legend-light-2000w-01.jpg',
    badge: '2-in-1 Security',
    shortDesc: 'Solar floodlight with built-in 1080p HD security camera, motion alert, two-way audio, and live smartphone monitoring.',
    description: 'Combines powerful perimeter compound illumination with complete remote property surveillance. View live video from anywhere in the world on your smartphone without power cables or grid electricity.',
    specs: {
      'Light Output': '200 W (12,000 Lumens)',
      'Camera Resolution': '1080P Full HD with Color Night Vision',
      'Connectivity': 'Wi-Fi & 4G SIM Card Compatible',
      'Storage': 'Supports up to 128GB MicroSD + Cloud Storage',
      'App': 'V380 / Tuya Smart Life (iOS & Android)'
    },
    warranty: '2-Year Warranty',
    features: [
      'Live smartphone video feed and human motion alerts',
      'Two-way intercom to communicate with visitors or intruders',
      '100% solar powered — continuous security even during total blackouts'
    ]
  },

  // ==========================================
  // POWER BACKUP GENERATORS
  // ==========================================
  {
    id: 'perkins-silent-diesel-generator-10kva',
    name: 'Themes Silent 10kVA (8.0kW) Single/3-Phase Diesel Backup Generator with Auto-ATS',
    brand: 'Perkins Silent',
    category: 'generators',
    priceKES: 320000,
    originalPriceKES: 360000,
    rating: 4.9,
    reviewCount: 17,
    inStock: true,
    stockCount: 6,
    image: 'https://macire.co.ke/wp-content/uploads/2023/12/Untitled-June-02-2026-at-09.06.01-2026-07-24T110357.868.png',
    badge: 'Super Silent Diesel',
    shortDesc: 'Acoustically insulated diesel generator with automatic transfer switch (ATS) for clinics, commercial plazas, and large homes.',
    description: 'Heavy-duty 4-stroke direct injection diesel engine with low fuel consumption (approx. 1.8 L/hr). Fitted with digital smart controller, electric key start, soundproof canopy (under 68 dB at 7 meters), and automatic ATS.',
    specs: {
      'Rated Output': '10 kVA / 8.0 kW Prime Power',
      'Voltage': '230V Single Phase / 400V 3-Phase Available',
      'Sound Level': '68 dB(A) at 7m Super Silent Acoustic Canopy',
      'Fuel Tank Capacity': '28 Liters (Up to 14 Hours Continuous Run)',
      'Starting System': 'Key Electric Start + Automatic ATS Integration'
    },
    warranty: '2-Year or 1,500 Running Hours Warranty',
    features: [
      'Automatic transfer switch starts generator instantly when KPLC drops',
      'Copper-wound brushless alternator with digital AVR regulation',
      'Lockable weatherproof outdoor canopy'
    ]
  },
  {
    id: 'cummins-silent-diesel-generator-20kva',
    name: 'Cummins 20kVA (16kW) Heavy Commercial 3-Phase Diesel Generator',
    brand: 'Cummins Power',
    category: 'generators',
    priceKES: 680000,
    originalPriceKES: 750000,
    rating: 5.0,
    reviewCount: 11,
    inStock: true,
    stockCount: 4,
    image: 'https://macire.co.ke/wp-content/uploads/2025/07/TWS-30KF-Pulsar.jpg',
    badge: 'Industrial Commercial',
    shortDesc: 'Industrial grade 3-phase standby generator for factories, hospitals, fuel stations, schools, and high-rise apartments.',
    description: 'Equipped with original Cummins water-cooled 4-cylinder turbocharged diesel engine and Stamford brushless alternator. ComAp digital automated control panel provides total engine telemetry and remote monitoring.',
    specs: {
      'Rated Output': '20 kVA / 16 kW Standby Power',
      'Engine': 'Cummins 4BT3.9-G2 Turbocharged Water-Cooled',
      'Alternator': 'Stamford 100% Copper Class H Brushless',
      'Voltage': '415V / 240V 3-Phase 4-Wire 50Hz',
      'Fuel Consumption': 'Approx. 4.2 L/hr at 75% load'
    },
    warranty: '2-Year or 2,000 Hours International Warranty',
    features: [
      'Capable of non-stop 24/7 continuous emergency operation',
      'Deep Sea / ComAp AMF digital automated controller',
      'Full nationwide spares and Themes engineering technical support'
    ]
  },
  {
    id: 'digital-inverter-petrol-generator-3.5kva',
    name: 'Themes QuietPower 3.5kVA Pure Sine Wave Digital Inverter Generator',
    brand: 'Themes Professional',
    category: 'generators',
    priceKES: 78000,
    originalPriceKES: 92000,
    rating: 4.8,
    reviewCount: 28,
    inStock: true,
    stockCount: 15,
    image: 'https://macire.co.ke/wp-content/uploads/2025/11/Untitled-2025-11-08T144552.805-4.png',
    badge: 'Safe for Electronics',
    shortDesc: 'Ultra-quiet (58 dB), portable pure sine wave inverter generator safe for computers, TVs, medical devices, and home appliances.',
    description: 'Produces clean, ripple-free electricity (<2.5% THD) indistinguishable from grid power. Features smart economy throttle that adjusts engine RPM to the load, saving up to 40% fuel.',
    specs: {
      'Max Output': '3,500 Watts / 3.5 kVA (Rated 3.0 kW)',
      'Waveform': 'True Pure Sine Wave (< 2.5% THD)',
      'Noise Level': '58 dB at 7 Meters (Whisper Quiet)',
      'Fuel Tank': '7.5 Liters (Up to 9 Hours runtime on Eco-mode)',
      'Weight': '28 kg Compact Hand-Carry Luggage Style'
    },
    warranty: '1-Year Themes Warranty',
    features: [
      '100% safe for sensitive laptops, medical equipment, and smart TVs',
      'Lightweight suitcase chassis with telescopic pull handle and wheels',
      'Electric push-button start with wireless remote fob'
    ]
  },

  // ==========================================
  // HEAT PUMPS (Water Heating Efficiency)
  // ==========================================
  {
    id: 'domestic-air-source-heat-pump-200l',
    name: 'Midea 200L All-In-One Energy-Saving Domestic Heat Pump Water Heater',
    brand: 'Midea Commercial',
    category: 'heat_pumps',
    priceKES: 145000,
    originalPriceKES: 170000,
    rating: 4.9,
    reviewCount: 23,
    inStock: true,
    stockCount: 10,
    image: 'https://solarshop.co.ke/wp-content/uploads/2024/05/Eraslan-200-Liters-Pressurized-Flat-Plate-indirect-Solar-Water-Heater_kenya.webp',
    badge: '75% Power Saving',
    shortDesc: 'Cuts water heating electric bills by 75% compared to conventional geysers. Provides hot water 24/7 rain or shine.',
    description: 'Extracts ambient thermal energy from the air and transfers it into water using high-efficiency R134a refrigerant cycle. Unlike roof solar thermal tubes, heat pumps work flawlessly during cold, cloudy, or rainy Nairobi days.',
    specs: {
      'Tank Capacity': '200 Liters Enamel Food-Grade Stainless Steel Tank',
      'Heating Power': 'Heat Pump 2.8kW (Consumes only 680W electricity)',
      'COP Rating': '4.1 High Efficiency Coefficient of Performance',
      'Hot Water Temp': 'Up to 65°C',
      'Backup Element': 'Built-in 1.5kW Auxiliary Booster'
    },
    warranty: '5-Year Compressor Warranty | 3-Year System',
    features: [
      'Saves 75% power compared to standard electric resistance geysers',
      'Operates seamlessly with home solar systems with very low 680W draw',
      'Smart Wi-Fi smartphone app for temperature scheduling'
    ]
  },
  {
    id: 'domestic-air-source-heat-pump-300l',
    name: 'Midea 300L Premium Villa Air-Source Heat Pump Water Heater',
    brand: 'Midea Commercial',
    category: 'heat_pumps',
    priceKES: 195000,
    originalPriceKES: 230000,
    rating: 5.0,
    reviewCount: 18,
    inStock: true,
    stockCount: 8,
    image: 'https://solarshop.co.ke/wp-content/uploads/2024/05/Eraslan-300-Liters-Pressurized-Flat-Plate-indirect-Solar-Water-Heater-Kenya.webp',
    badge: 'Villa & Large Family',
    shortDesc: '300-Liter luxury hot water solution for multi-bathroom homes, hotels, and guest houses with continuous high-volume demand.',
    description: 'Dual-coil pressurized heat pump water heater with anti-legionella sterilization cycle, titanium enamel tank, and Panasonic DC inverter compressor.',
    specs: {
      'Tank Capacity': '300 Liters (Ideal for 6-8 Person Households)',
      'Heating Output': '4.2 kW Thermal Output (Consumes only 980W power)',
      'COP': '4.3 Seasonal Efficiency Rating',
      'Max Water Pressure': '0.7 MPa (High pressure shower compatible)'
    },
    warranty: '5-Year Compressor Warranty',
    features: [
      'Hot water for up to 5 simultaneous rain-showers',
      'Automatic anti-bacterial 70°C pasteurization cycle',
      'Quiet operation at under 45 dB'
    ]
  },
  {
    id: 'commercial-swimming-pool-heat-pump',
    name: 'Themes AquaTherm 18kW Commercial Swimming Pool Heat Pump',
    brand: 'Themes Professional',
    category: 'heat_pumps',
    priceKES: 285000,
    originalPriceKES: 330000,
    rating: 4.8,
    reviewCount: 12,
    inStock: true,
    stockCount: 5,
    image: 'https://macire.co.ke/wp-content/uploads/2025/10/150Ltrs-stainless-Non-Pressurised-3.jpg',
    badge: 'Pool & Spa Luxury',
    shortDesc: 'Maintains comfortable 28°C - 32°C swimming pool temperatures all year round for residential and hotel pools up to 60,000 liters.',
    description: 'Equipped with spiral titanium tube heat exchanger resistant to chlorine, salt, and water corrosion. Mitsubishi DC inverter compressor dynamically modulates output according to weather conditions.',
    specs: {
      'Heating Capacity': '18.0 kW (61,000 BTU/h)',
      'Power Input': '2.9 kW at COP 6.2',
      'Pool Volume': 'Suitable for pools up to 55 - 65 m³ (60,000 Liters)',
      'Heat Exchanger': 'Titanium Tube in PVC Shell (Chlorine & Salt Resistant)',
      'Working Range': '-7°C to 43°C Ambient Air Temperature'
    },
    warranty: '3-Year Warranty | 5-Year Titanium Exchanger',
    features: [
      'Enables year-round heated swimming even during chilly Nairobi July weather',
      'Up to 80% cheaper than LPG gas or electric resistive pool heaters',
      'Smart digital touchscreen with automatic temperature maintenance'
    ]
  }
];