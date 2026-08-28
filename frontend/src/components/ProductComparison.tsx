import { useState } from "react";
import { products } from "../data/products";
import type { Product } from "../types";
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

  return (
    <section className="section">
      <div className="container">
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          Compare Products
        </h2>
        <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
          Select up to {MAX_COMPARE} products to compare side by side.
        </p>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => toggleProduct(product.id)}
              className={selectedIds.includes(product.id) ? "btn-primary" : "btn-outline"}
              style={{ fontSize: "0.8rem", padding: "0.5rem 0.9rem" }}
            >
              {product.name}
            </button>
          ))}
        </div>

        {selectedProducts.length === 0 ? (
          <p style={{ color: "var(--color-text-muted)" }}>No products selected yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>
                    Spec
                  </th>
                  {selectedProducts.map((p) => (
                    <th
                      key={p.id}
                      style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}
                    >
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "0.75rem", color: "var(--color-text-muted)" }}>Price</td>
                  {selectedProducts.map((p) => (
                    <td key={p.id} style={{ padding: "0.75rem", fontWeight: 700 }}>
                      {formatKES(p.priceKES)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: "0.75rem", color: "var(--color-text-muted)" }}>Brand</td>
                  {selectedProducts.map((p) => (
                    <td key={p.id} style={{ padding: "0.75rem" }}>
                      {p.brand}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: "0.75rem", color: "var(--color-text-muted)" }}>Availability</td>
                  {selectedProducts.map((p) => (
                    <td key={p.id} style={{ padding: "0.75rem", color: p.inStock ? "#4ade80" : "#f87171" }}>
                      {p.inStock ? "In Stock" : "Out of Stock"}
                    </td>
                  ))}
                </tr>
                {allSpecKeys.map((key) => (
                  <tr key={key}>
                    <td style={{ padding: "0.75rem", color: "var(--color-text-muted)" }}>{key}</td>
                    {selectedProducts.map((p) => (
                      <td key={p.id} style={{ padding: "0.75rem" }}>
                        {p.specs?.[key] ?? "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductComparison;