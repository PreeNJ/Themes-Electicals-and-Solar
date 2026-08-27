import type { Product } from "../types";

export const products: Product[] = [
  
];

import type { Product } from "../types";
import { products } from "./products";

export function getProductsByCategory(
  category: Product["category"]
): Product[] {
  return products.filter((p) => p.category === category);
}
