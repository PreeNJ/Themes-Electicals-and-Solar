import { useState } from "react";
import { products } from "../data/products";
import type { Product } from "../types/product";
import { formatKES } from "../utils/formatters";

const MAX_COMPARE = 3;

function ProductComparison() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleProduct = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  };

  const selectedProducts: Product[] = selectedIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  const allSpecKeys = Array.from(
    new Set(selectedProducts.flatMap((p) => Object.keys(p.specs ?? {})))
  );

  // JSX goes here
}

export default ProductComparison;