import { Product, SolarKit, SizingAppliance } from '../types';
import { SOLAR_PRODUCTS } from './solarProducts';
import { COMMERCIAL_PRODUCTS } from './commercialProducts';

export const STORE_INFO = {
  name: 'Themes Electricals',
  legalName: 'Themes Electricals & Solar Engineering Ltd',
  tagline: '15 Years of Professional Excellence in Solar, Power & Electrical Engineering',
  location: 'Utawala, Jowin Business Arcade, Nairobi, Kenya',
  phone: '+254713317582',
  phoneDisplay: '+254 713 317 582',
  phoneInternational: '+254713317582',
  email: 'themeselectricals@gmail.com',
  experience: '15 Years Experience',
  hours: 'Mon - Sat: 7:30 AM - 6:30 PM | Sunday: 9:00 AM - 4:00 PM',
  deliveryNote: 'FREE Delivery in Nairobi CBD • Subsidized Low Rates Outside Nairobi / Countrywide',
  socialLinks: {
    tiktok: 'https://www.tiktok.com/@themeselectricals',
    instagram: 'https://www.instagram.com/themeselectricals',
    facebook: 'https://www.facebook.com/themeselectricals',
    email: 'mailto:themeselectricals@gmail.com',
    phone: 'tel:+254713317582',
    whatsapp: 'https://wa.me/254713317582?text=Hello%20Themes%20Electricals,%20I%20am%20inquiring%20about%20your%20products%20and%20installation%20services.'
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
  { id: 'all', name: 'All Products', icon: 'LayoutGrid', count: 48 },
  { id: 'solar_systems', name: 'Solar Systems', icon: 'Sun', count: 32, badge: 'Full Solar Stock' },
  { id: 'inverters', name: 'Inverters', icon: 'Zap', count: 21, badge: 'Huawei • Sosen • Deye • Must • TBB' },
  { id: 'batteries', name: 'Solar Batteries', icon: 'BatteryCharging', count: 8, badge: 'Dyness • TBB • Deye' },
  { id: 'panels', name: 'Solar Panels', icon: 'Sun', count: 5, badge: 'Jinko • JA • Trina' },
  { id: 'lighting_systems', name: 'Lighting System', icon: 'Lightbulb', count: 4, badge: 'Energy Efficient' },
  { id: 'solar_water_pumps', name: 'Solar Water Pump', icon: 'Droplets', count: 4, badge: 'Zero Fuel Cost' },
  { id: 'solar_street_lights', name: 'Solar Street Light', icon: 'LampCeiling', count: 4, badge: 'All-In-One' },
  { id: 'generators', name: 'Power Back Up Generators', icon: 'Zap', count: 3, badge: 'Heavy Duty' },
  { id: 'heat_pumps', name: 'Heat Pump', icon: 'Flame', count: 3, badge: '75% Energy Cut' },
];

export const POPULAR_BRANDS = [
  'Huawei',
  'Sosen',
  'Deye',
  'Must',
  'TBB Power',
  'Dyness',
  'Jinko Solar',
  'JA Solar',
  'Trina Solar',
  'Themes Professional',
  'Dayliff',
  'Hober Solar Pump',
  'Philips LED',
  'Perkins Silent',
  'Cummins Power',
  'Midea Commercial',
  'Sunmaster Solar'
];

// All active products aggregating solar & commercial inventories
export const PRODUCTS: Product[] = [
  ...SOLAR_PRODUCTS,
  ...COMMERCIAL_PRODUCTS
];

export const SOLAR_KITS: SolarKit[] = [
  {
    id: 'kit-1.5kva-starter',
    title: 'Essential 1.5kVA Solar Power & Blackout Backup Kit',
    powerRating: '1.5 kVA / 1.2 kW',
    idealFor: 'Bedsitters, 1-2 Bedroom Apartments, Retail Shops, Cyber Cafes',
    priceKES: 88000,
    originalPriceKES: 105000,
    image: 'https://macire.co.ke/wp-content/uploads/2025/08/AMISOL26-Lithium-Kit.png',
    badge: 'Most Affordable',
    components: {
      inverter: 'Must / Themes 1.5kVA / 1200W Pure Sine Wave Hybrid Inverter with MPPT',
      panels: '2x 585W Monocrystalline Jinko Solar Panels (1,170 Wp)',
      battery: '1x 2.5kWh Dyness DL2.5 LiFePO4 Lithium Battery (6,000 cycles)',
      accessories: 'Pre-wired DC/AC DB box, 40A DC breaker, 20m 4mm² solar cable, roof mounting brackets'
    },
    powers: [
      'Up to 12 LED Lights (6-8 hours daily)',
      '43" Smart TV, Soundbar & Wi-Fi Router (24/7)',
      'Laptops, Phone Charging & CCTV Cameras',
      'Small single-door energy-saving fridge'
    ],
    estimatedDailyYieldKWh: 5.5,
    warranty: '5-Year Lithium Warranty with FREE Nairobi CBD Delivery'
  },
  {
    id: 'kit-3.2kva-executive',
    title: 'Executive 3.2kVA / 2.56kWh Lithium Home Solar Kit',
    powerRating: '3.2 kVA / 3.0 kW',
    idealFor: '3-4 Bedroom Family Homes, Clinics, Executive Offices, Restaurants',
    priceKES: 165000,
    originalPriceKES: 195000,
    image: 'https://macire.co.ke/wp-content/uploads/2026/06/4.2kVA-Svc-Lithium-Smart-Home-Kit.jpg',
    badge: 'Best Value for Homes',
    components: {
      inverter: 'Must / Sosen 3.6kW Pure Sine Wave Hybrid with MPPT & Wi-Fi',
      panels: '4x 585W Jinko Tiger Neo N-Type Monocrystalline Panels (2,340 Wp)',
      battery: '1x 2.56kWh Dyness DL2.5 LiFePO4 Lithium Battery Pack (6,000 cycles)',
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
    estimatedDailyYieldKWh: 11.5,
    warranty: '5-Year Lithium Battery & Inverter | 30-Year Solar Panels'
  },
  {
    id: 'kit-5.5kw-villa',
    title: 'Diamond 5.5kW / 5.12kWh Heavy-Duty Villa & Business Solar Kit',
    powerRating: '5.5 kW / 5.12 kWh',
    idealFor: 'Mansions, Villas, Petrol Stations, Large Clinics, Supermarkets',
    priceKES: 265000,
    originalPriceKES: 310000,
    image: 'https://solarshop.co.ke/wp-content/uploads/2024/03/8KW-Deye-Hybrid-Solar-Inverters-5.webp',
    badge: 'Total Independence',
    components: {
      inverter: 'Deye 5kW 48V / Sosen 5.5kW Hybrid Inverter with Touchscreen & Wi-Fi',
      panels: '6x 620W Jinko / JA Solar Bifacial Panels (3,720 Wp expandable)',
      battery: '1x 5.12kWh Dyness DL5.0C / Deye 5.12kWh LiFePO4 Battery (6,000 cycles)',
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
    estimatedDailyYieldKWh: 18.0,
    warranty: '5-Year Inverter & Lithium Battery | 30-Year Solar Performance'
  },
  {
    id: 'kit-10kw-commercial',
    title: 'Commercial 10kW 3-Phase / 10.24kWh Hybrid Micro-Grid System',
    powerRating: '10 kW / 10.24 kWh',
    idealFor: 'Factories, Schools, Hospitals, Petrol Stations, Estates, Commercial Plazas',
    priceKES: 475000,
    originalPriceKES: 550000,
    image: 'https://macire.co.ke/wp-content/uploads/2026/09/1SE-20KW-SVC-3-phase-Website-Product-1.png',
    badge: 'Industrial Scale',
    components: {
      inverter: 'Deye 10kW 3-Phase / Huawei 10kW Smart Hybrid Inverter with Generator Auto-Start',
      panels: '12x 620W Jinko Tiger Neo N-Type Panels (7,440 Wp Solar Generation)',
      battery: '2x 5.12kWh Dyness / Deye LiFePO4 Modular Rack Lithium Storage (10.24kWh Total Storage)',
      accessories: '3-Phase industrial combiner box, bi-directional energy meter, heavy cable trays, and circuit breakers'
    },
//     powers: [
//       '3-Phase motors, Cold rooms, Commercial refrigeration & Freezers',
//       'Office IT servers, 25+ workstations, Printers & Photocopiers',
//       'High-power borehole water pumps up to 5.5HP',
//       'Drastic 80-90% reduction in commercial KPLC power bills'
//     ],
//     estimatedDailyYieldKWh: 37.0,
//     warranty: '10-Year Performance & 5-Year Full System Guarantee'
//   }
// ];

// export const SIZING_APPLIANCES: SizingAppliance[] = [
//   { id: 'lights', name: 'LED Lights (Indoor & Outdoor)', icon: 'Lightbulb', wattage: 12, defaultQty: 10, defaultHours: 6, category: 'lighting' },
//   { id: 'security-lights', name: 'Security LED Floodlights (50W)', icon: 'Shield', wattage: 50, defaultQty: 2, defaultHours: 10, category: 'lighting' },
//   { id: 'smart-tv', name: 'Smart TV (50"-65") + Sound System', icon: 'Tv', wattage: 120, defaultQty: 1, defaultHours: 5, category: 'entertainment' },
//   { id: 'fridge', name: 'Double-Door Refrigerator', icon: 'Refrigerator', wattage: 150, defaultQty: 1, defaultHours: 12, category: 'cooling' },
//   { id: 'freezer', name: 'Deep Chest Freezer', icon: 'Box', wattage: 200, defaultQty: 1, defaultHours: 10, category: 'cooling' },
//   { id: 'wifi', name: 'Wi-Fi Router & CCTV DVR System', icon: 'Wifi', wattage: 35, defaultQty: 1, defaultHours: 24, category: 'work' },
//   { id: 'laptop', name: 'Desktop Computer / Laptop Workstations', icon: 'Laptop', wattage: 80, defaultQty: 2, defaultHours: 8, category: 'work' },
//   { id: 'microwave', name: 'Microwave Oven / Air Fryer', icon: 'Microwave', wattage: 1000, defaultQty: 1, defaultHours: 0.5, category: 'kitchen' },
//   { id: 'kettle', name: 'Electric Kettle / Coffee Maker', icon: 'Coffee', wattage: 1500, defaultQty: 1, defaultHours: 0.3, category: 'kitchen' },
//   { id: 'washing-machine', name: 'Automatic Washing Machine', icon: 'Disc', wattage: 600, defaultQty: 1, defaultHours: 1, category: 'water' },
//   { id: 'booster-pump', name: 'Domestic Water Booster Pump (0.5HP)', icon: 'Droplets', wattage: 375, defaultQty: 1, defaultHours: 2, category: 'water' },
//   { id: 'borehole-pump', name: 'Submersible Borehole Pump (1.5HP)', icon: 'Waves', wattage: 1100, defaultQty: 0, defaultHours: 3, category: 'water' },
//   { id: 'heat-pump-geyser', name: 'Thermodynamic Heat Pump Geyser', icon: 'Flame', wattage: 650, defaultQty: 1, defaultHours: 3, category: 'water' },
//   { id: 'fan', name: 'Ceiling / Standing Fan', icon: 'Wind', wattage: 60, defaultQty: 2, defaultHours: 6, category: 'cooling' }
// ];