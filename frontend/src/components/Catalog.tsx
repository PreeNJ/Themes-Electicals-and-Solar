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
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "All">("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="catalog" className="section">
      <div className="container">
        <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          Product Catalog
        </h2>
        <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
          Free delivery around Nairobi CBD. All prices in Kenyan Shillings (KES).
        </p>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          <button
            onClick={() => setActiveCategory("All")}
            className={activeCategory === "All" ? "btn-primary" : "btn-outline"}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={activeCategory === cat ? "btn-primary" : "btn-outline"}
            >
              {cat}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="card"
              style={{ padding: "1rem", cursor: "pointer" }}
              onClick={() => setSelectedProduct(product)}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4 / 3",
                  backgroundColor: "var(--color-bg)",
                  borderRadius: "6px",
                  marginBottom: "0.75rem",
                  overflow: "hidden",
                }}
              >
                <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>

              <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{product.brand}</span>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: "0.25rem 0" }}>{product.name}</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: "0.75rem" }}>
                {truncate(product.description, 80)}
              </p>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <strong>{formatKES(product.priceKES)}</strong>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: product.inStock ? "#4ade80" : "#f87171",
                  }}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p style={{ color: "var(--color-text-muted)", textAlign: "center", padding: "2rem 0" }}>
            No products found in this category yet.
          </p>
        )}
      </div>

      {selectedProduct && (
        <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </section>
  );
}

export default Catalog;