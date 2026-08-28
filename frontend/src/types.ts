export type ProductCategory = 
  | 'solar_systems' 
  | 'lighting_systems' 
  | 'solar_water_pumps' 
  | 'solar_street_lights' 
  | 'generators' 
  | 'heat_pumps'
  | 'panels' 
  | 'inverters' 
  | 'batteries' 
  | 'water_heating' 
  | 'pumps' 
  | 'kits' 
  | 'accessories';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  priceKES: number;
  originalPriceKES?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  image: string;
  badge?: string;
  shortDesc: string;
  description: string;
  specs: Record<string, string>;
  warranty: string;
  features: string[];
  datasheetSnippet?: string;
}

export interface SolarKit {
  id: string;
  title: string;
  powerRating: string;
  idealFor: string;
  priceKES: number;
  originalPriceKES: number;
  image: string;
  badge: string;
  components: {
    inverter: string;
    panels: string;
    battery: string;
    accessories: string;
  };
  powers: string[];
  estimatedDailyYieldKWh: number;
  warranty: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface SizingAppliance {
  id: string;
  name: string;
  icon: string;
  wattage: number;
  defaultQty: number;
  defaultHours: number;
  category: 'lighting' | 'cooling' | 'kitchen' | 'entertainment' | 'water' | 'work';
}

export interface SizingResult {
  dailyConsumptionKWh: number;
  peakPowerWatts: number;
  recommendedInverterKW: number;
  recommendedInverterName: string;
  recommendedPanelWatts: number;
  recommendedPanelCount: number;
  recommendedPanelModel: string;
  recommendedBatteryKWh: number;
  recommendedBatteryModel: string;
  estimatedEquipmentCostKES: number;
  estimatedInstallationCostKES: number;
  estimatedTotalKES: number;
  monthlyBillSavingsKES: number;
  paybackPeriodYears: number;
  matchedKitId?: string;
}

export interface QuoteDetails {
  quoteRef: string;
  customerName: string;
  phone: string;
  email: string;
  location: string;
  county: string;
  items: CartItem[];
  subtotalKES: number;
  deliveryOption: 'pickup' | 'nairobi' | 'countrywide';
  deliveryFeeKES: number;
  installationOption: boolean;
  installationFeeKES: number;
  totalKES: number;
  notes?: string;
  createdAt: string;
}
