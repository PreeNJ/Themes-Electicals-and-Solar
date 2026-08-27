export type ProductCategory =
  | "Solar Systems"
  | "Lighting System"
  | "Solar Water Pump"
  | "Solar Street Light"
  | "Power Back Up Generators"
  | "Heat Pump";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  priceKES: number;
  imageUrl: string;
  description: string;
  specs?: Record<string, string>;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ChatMessage {
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
}

export interface QuoteRequest {
  name: string;
  phone: string;
  email: string;
  location: string;
  items: CartItem[];
  totalKES: number;
  systemType?: string;
}

export interface QuoteResponse {
  success: boolean;
  quoteRef: string;
  createdAt: string;
  customer: { name: string; phone: string; email: string; location: string };
  summary: { itemCount: number; totalKES: number; systemType: string };
  message: string;
}
