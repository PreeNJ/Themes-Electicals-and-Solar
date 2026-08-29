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

// AI Solar & Electrical Advisor Endpoint
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
📍 Visit our showroom at **Utawala, Jowin Business Arcade, Nairobi** or call/WhatsApp **+254713317581** / email **themeselectricals@gmail.com**!`,
        isFallback: true
      });
    }

    const systemPrompt = `You are the Senior Technical Engineer at Themes Electricals (located physically in Utawala, Jowin Business Arcade, Nairobi, Kenya).
Contact: Phone +254713317581, Email: themeselectricals@gmail.com.
Themes Electricals has over 15 years of professional experience in Kenya.
Delivery terms: Delivery around Nairobi CBD is completely FREE! Outside Nairobi and upcountry, a small affordable courier fee applies.

Major business divisions and product categories:
1. Solar Systems: Solar Panels (N-Type Mono TOPCon), Hybrid Inverters (Growatt, Deye, MUST), LiFePO4 Lithium Batteries (Felicity, BYD), Turnkey Solar Kits.
2. Lighting System: Industrial LED High Bay, Commercial Architectural Lighting, Floodlights, Magnetic Tracks, Downlights.
3. Solar Water Pump: Deep-well Borehole Submersible Pumps, Solar Surface Booster & Irrigation Pumps, Hober/Dayliff MPPT Solar Pump Inverters.
4. Solar Street Light: All-In-One & Split Commercial Solar Streetlights, Perimeter Security Floodlights with CCTV.
5. Power Back Up Generators: Silent Diesel Backup Generators with ATS (Automatic Transfer Switch), Cummins/Perkins Commercial Units, Portable Pure Sine Wave Inverter Generators.
6. Heat Pump: Air-Source Domestic & Commercial Thermodynamic Heat Pumps (saves up to 75% power compared to conventional water heaters).

Always quote in Kenyan Shillings (KSh / KES). Be authoritative, technically precise, welcoming with Kenyan hospitality, and invite customers to call +254713317581 or visit Utawala Jowin Business Arcade.`;

    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(chatHistory)) {
      for (const msg of chatHistory.slice(-6)) {
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      }
    }

    const promptWithContext = context
      ? `[User system context: ${JSON.stringify(context)}]\n\nUser Question: ${message}`
      : message;

    contents.push({
      role: 'user',
      parts: [{ text: promptWithContext }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "I'd be glad to help you size your solar or electrical system. Please let me know your appliances or load requirements.";
    return res.json({ reply: replyText, isFallback: false });
  } catch (error: any) {
    console.error("Gemini Advisor API error:", error);
    return res.status(500).json({
      error: "Failed to generate recommendation",
      details: error?.message || "Internal server error"
    });
  }
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