import { useState } from "react";

const NAV_LINKS = [
  { label: "Solar Systems", href: "#catalog" },
  { label: "Solar Kits", href: "#solar-kits" },
  { label: "Sizing Tools", href: "#solar-sizer" },
  { label: "Contact", href: "#contact" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="card" style={{ borderRadius: 0, borderTop: "none", borderLeft: "none", borderRight: "none" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem" }}>
        <a href="/" style={{ fontWeight: 800, fontSize: "1.25rem" }}>
          Themes Electricals
        </a>

        <nav style={{ display: "flex", gap: "1.5rem" }} className="desktop-nav">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} style={{ color: "var(--color-text-muted)" }}>
              {link.label}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <a href="tel:0713317582" style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
            0713 317 582
          </a>
          <button className="btn-primary" onClick={() => setMenuOpen(!menuOpen)}>
            Get a Quote
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;