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
      </div>
    </section>
  );
}
export default Hero;