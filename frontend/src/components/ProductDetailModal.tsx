import type { Product } from "../types";
import { formatKES } from "../utils/formatters";

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        zIndex: 50,
      }}
    >
      <div
        className="card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "640px", width: "100%", padding: "1.5rem", maxHeight: "85vh", overflowY: "auto" }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ background: "transparent", color: "var(--color-text-muted)", fontSize: "1.25rem" }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            width: "100%",
            aspectRatio: "16 / 9",
            backgroundColor: "var(--color-bg)",
            borderRadius: "8px",
            overflow: "hidden",
            marginBottom: "1rem",
          }}
        >
          <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>{product.category}</span>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, margin: "0.25rem 0 0.75rem" }}>{product.name}</h2>

        <p style={{ color: "var(--color-text-muted)", marginBottom: "1rem" }}>{product.description}</p>

        {product.specs && (
          <div style={{ marginBottom: "1.25rem" }}>
            <h4 style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>Specifications</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} style={{ fontSize: "0.85rem" }}>
                  <span style={{ color: "var(--color-text-muted)" }}>{key}: </span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <strong style={{ fontSize: "1.25rem" }}>{formatKES(product.priceKES)}</strong>
          <button className="btn-primary" disabled={!product.inStock}>
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailModal;