import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

const app = express();

app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString(), store: "Themes Electricals (Utawala Jowin Business Arcade)" });
});
app.post("/api/chat-advisor", async (req, res) => {
  try {
    const { message, context, chatHistory } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback intelligent responder if key is not configured in local environment
      return res.json({
        reply: `Thank you for reaching out to **Themes Electricals**! With over **15 years of industry experience** in Kenya, we are here to help:
- **Solar Systems**: We design & install Tier-1 Jinko/Longi mono panels, Growatt & Deye hybrid inverters, and high-cycle LiFePO4 lithium batteries for homes and businesses.
- **Lighting System**: Industrial LED high bays, architectural magnetic track lighting, office 60x60 panels, and high-lumen security floodlights.
- **Solar Water Pump**: Borehole deep-well submersibles (Dayliff / Hober MPPT inverters) for zero-electricity water pumping.
- **Solar Street Light**: 300W - 500W all-in-one & split commercial solar streetlights with radar sensors & heavy batteries.
- **Power Back Up Generators**: Silent diesel 10kVA - 20kVA generators with Automatic Transfer Switch (ATS) & digital inverter petrol units.
- **Heat Pump**: Air-source thermodynamic heat pumps cutting water heating bills by up to 75%.

🚚 **Delivery around Nairobi CBD is 100% FREE!** Low subsidized courier rates outside Nairobi across Kenya.
📍 Visit our showroom at **Utawala, Jowin Business Arcade, Nairobi** or call/WhatsApp **0713317582** / email **themeselectricals@gmail.com**!`,
        isFallback: true
      });
    }