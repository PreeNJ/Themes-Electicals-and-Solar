import { useMemo, useState } from "react";
import { products } from "../data/products";
import type { Product, ProductCategory } from "../types";
import { formatKES, truncate } from "../utils/formatters";
import ProductDetailModal from "./ProductDetailModal";

const CATEGORIES: ProductCategory[] = [
  "Solar Systems",
  "Lighting System",
  "Solar Water Pump",
  "Solar Street Light",
  "Power Back Up Generators",
  "Heat Pump",
];

function Catalog() {
  const [activeCategory, setActiveCategory] =
    useState<ProductCategory | "All">("All");
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // JSX goes here
}

export default Catalog;