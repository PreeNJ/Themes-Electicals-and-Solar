function Hero() {
  return (
    <section className="section" style={{ textAlign: "center" }}>
      <div className="container">
        <span
          style={{
            display: "inline-block",
            padding: "0.35rem 1rem",
            borderRadius: "999px",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-muted)",
            fontSize: "0.85rem",
            marginBottom: "1.5rem",
          }}
        >
          Over 15 years serving Nairobi & Kenya
        </span>

        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 800, marginBottom: "1rem" }}>
          Solar, Lighting & Power Solutions
          <br />
          Built for Kenyan Homes & Businesses
        </h1>

        <p style={{ color: "var(--color-text-muted)", maxWidth: "620px", margin: "0 auto 2rem" }}>
          From Tier-1 solar panels and hybrid inverters to borehole pumps, backup generators
          and heat pumps — visit our showroom at Utawala, Jowin Business Arcade, or shop online
          with free delivery around Nairobi CBD.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#catalog" className="btn-primary">
            Browse Products
          </a>
          <a href="#solar-sizer" className="btn-outline">
            Size My Solar System
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;