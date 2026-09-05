import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

export const app = express();

app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "Themes Electricals backend is running", timestamp: new Date().toISOString() });
});

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString(), store: "Themes Electricals (Utawala Jowin Business Arcade)" });
});

// Quote Generation Reference endpoint
app.post("/api/quote-request", (req, res) => {
  const { name, phone, email, location, items, totalKES, systemType } = req.body;
  const quoteRef = `TEK-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

  res.json({
    success: true,
    quoteRef,
    createdAt: new Date().toISOString(),
    customer: { name, phone, email, location },
    summary: {
      itemCount: items?.length || 0,
      totalKES: totalKES || 0,
      systemType: systemType || "Themes Electricals Solution",
    },
    message: `Quote ${quoteRef} has been prepared. Our engineering team at Utawala Jowin Business Arcade will contact you on ${phone || '+254713317581'}!`
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`SolarShop Kenya backend API running on http://0.0.0.0:${PORT}`);
});