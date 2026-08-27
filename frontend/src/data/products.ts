import type { Product } from "../types";

export const products: Product[] = [
  {
    id: "sol-panel-jinko-450",
    name: "Jinko 450W N-Type Mono Solar Panel",
    category: "Solar Systems",
    brand: "Jinko",
    priceKES: 14500,
    imageUrl: "/products/jinko-450w.jpg",
    description:
      "Tier-1 N-Type TOPCon monocrystalline panel with high conversion efficiency, built for Kenyan rooftop and ground-mount installations.",
    specs: { Wattage: "450W", Type: "N-Type Mono TOPCon", Warranty: "25 years" },
    inStock: true,
  },
  {
    id: "inv-growatt-5kw-hybrid",
    name: "Growatt 5kW Hybrid Inverter",
    category: "Solar Systems",
    brand: "Growatt",
    priceKES: 145000,
    imageUrl: "/products/growatt-5kw.jpg",
    description:
      "Hybrid inverter with MPPT charge controller, supports grid-tie and off-grid operation with lithium battery compatibility.",
    specs: { Capacity: "5kW", Phase: "Single Phase", Battery: "LiFePO4 compatible" },
    inStock: true,
  },
  {
    id: "batt-felicity-5kwh",
    name: "Felicity 5kWh LiFePO4 Lithium Battery",
    category: "Solar Systems",
    brand: "Felicity",
    priceKES: 210000,
    imageUrl: "/products/felicity-5kwh.jpg",
    description:
      "High-cycle lithium iron phosphate battery, stackable for larger capacity, built-in BMS for safe deep discharge cycling.",
    specs: { Capacity: "5kWh", Cycles: "6000+", Chemistry: "LiFePO4" },
    inStock: true,
  },
  {
    id: "light-led-highbay-100w",
    name: "100W Industrial LED High Bay Light",
    category: "Lighting System",
    brand: "Themes Electricals",
    priceKES: 4500,
    imageUrl: "/products/led-highbay-100w.jpg",
    description:
      "Energy-efficient high bay fixture for warehouses and workshops, wide beam angle with heavy-duty aluminum housing.",
    specs: { Wattage: "100W", Lumens: "13,000lm", Warranty: "2 years" },
    inStock: true,
  },
  {
    id: "light-floodlight-200w",
    name: "200W Solar Security Floodlight",
    category: "Lighting System",
    brand: "Themes Electricals",
    priceKES: 6800,
    imageUrl: "/products/floodlight-200w.jpg",
    description:
      "High-lumen outdoor floodlight with motion sensor and dusk-to-dawn operation, ideal for compounds and perimeters.",
    specs: { Wattage: "200W", Sensor: "PIR Motion", IP: "IP65" },
    inStock: true,
  },
  {
    id: "pump-dayliff-submersible",
    name: "Dayliff Borehole Submersible Pump",
    category: "Solar Water Pump",
    brand: "Dayliff",
    priceKES: 98000,
    imageUrl: "/products/dayliff-submersible.jpg",
    description:
      "Deep-well submersible pump paired with an MPPT solar pump inverter for zero-electricity-bill water pumping.",
    specs: { "Max Depth": "80m", "Flow Rate": "3,000 L/hr", Power: "1.5kW" },
    inStock: true,
  },
  {
    id: "street-light-allinone-300w",
    name: "300W All-In-One Solar Street Light",
    category: "Solar Street Light",
    brand: "Themes Electricals",
    priceKES: 22000,
    imageUrl: "/products/street-light-300w.jpg",
    description:
      "Integrated solar panel, battery, and LED fixture in one unit with radar motion sensing for extended battery life.",
    specs: { Wattage: "300W", Sensor: "Radar", Autonomy: "3 rainy days" },
    inStock: true,
  },
  {
    id: "gen-cummins-15kva",
    name: "Cummins 15kVA Silent Diesel Generator",
    category: "Power Back Up Generators",
    brand: "Cummins",
    priceKES: 850000,
    imageUrl: "/products/cummins-15kva.jpg",
    description:
      "Silent canopy diesel generator with Automatic Transfer Switch, suited for commercial backup power needs.",
    specs: { Capacity: "15kVA", ATS: "Included", "Noise Level": "68dB @ 7m" },
    inStock: false,
  },
  {
    id: "heatpump-domestic-200l",
    name: "200L Air-Source Heat Pump Water Heater",
    category: "Heat Pump",
    brand: "Themes Electricals",
    priceKES: 165000,
    imageUrl: "/products/heatpump-200l.jpg",
    description:
      "Thermodynamic heat pump water heater cutting water heating costs by up to 75% versus conventional electric heaters.",
    specs: { Capacity: "200L", "Energy Savings": "Up to 75%", Warranty: "3 years" },
    inStock: true,
  },
];

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}