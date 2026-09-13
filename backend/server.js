import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { analyzeOffer } from "./services/scamAnalyzer.js";
import { initFirebase, saveScan, saveReport } from "./services/firebase.js";

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDist = path.resolve(__dirname, "../frontend/dist");

app.use(cors({
  origin: true,
  methods: ["GET", "POST", "OPTIONS"]
}));
app.use(express.json({ limit: "2mb" }));
app.use(express.static(frontendDist));

let firebaseReady = false;
try {
  firebaseReady = initFirebase();
  console.log(firebaseReady ? "Firebase Admin connected." : "Firebase not configured; using local processing only.");
} catch (error) {
  console.error("Firebase initialization warning:", error.message);
}

app.get("/", (_req, res) => {
  res.json({
    name: "ScamShield Backend",
    status: "running",
    firebase: firebaseReady,
    endpoints: ["/health", "/api/analyze", "/api/reports"]
  });
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, firebase: firebaseReady, timestamp: new Date().toISOString() });
});

app.post("/api/analyze", async (req, res) => {
  try {
    const { message, source = "text" } = req.body || {};
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "message is required" });
    }

    const result = await analyzeOffer(message.trim());

    if (firebaseReady) {
      try {
        await saveScan({
          message: message.trim(),
          source,
          result,
          createdAt: new Date().toISOString()
        });
      } catch (error) {
        console.error("Firestore save warning:", error.message);
      }
    }

    res.json(result);
  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({ error: "Unable to analyze this offer right now." });
  }
});

app.post("/api/reports", async (req, res) => {
  try {
    const { platform, companyName, recruiterContact, feeRequested, messageBody } = req.body || {};

    if (!companyName || !recruiterContact || !messageBody) {
      return res.status(400).json({
        error: "companyName, recruiterContact and messageBody are required"
      });
    }

    const report = {
      platform: platform || "other",
      companyName: String(companyName).trim(),
      recruiterContact: String(recruiterContact).trim(),
      feeRequested: String(feeRequested || "").trim(),
      messageBody: String(messageBody).trim(),
      createdAt: new Date().toISOString()
    };

    let id = null;
    if (firebaseReady) {
      id = await saveReport(report);
    }

    res.status(201).json({
      success: true,
      id,
      message: "Report received."
    });
  } catch (error) {
    console.error("Report error:", error);
    res.status(500).json({ error: "Unable to submit report right now." });
  }
});

// SPA fallback for production hosting.
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/") || req.path === "/health") return next();
  res.sendFile(path.join(frontendDist, "index.html"), (error) => {
    if (error) next();
  });
});

app.listen(PORT, () => {
  console.log(`ScamShield backend running on port ${PORT}`);
});
