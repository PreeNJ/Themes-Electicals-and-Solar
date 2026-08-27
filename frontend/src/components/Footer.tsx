function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="section" style={{ borderTop: "1px solid var(--color-border)" }}>
      <div className="container" style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        <div>
          <h3 style={{ marginBottom: "0.75rem" }}>Themes Electricals</h3>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
            Utawala, Jowin Business Arcade, Nairobi, Kenya
          </p>
        </div>
        <div>
          <h4 style={{ marginBottom: "0.75rem", fontSize: "0.95rem" }}>Contact</h4>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
            Phone / WhatsApp: 0713 317 582
          </p>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
            Email: themeselectricals@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;