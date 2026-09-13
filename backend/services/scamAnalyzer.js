import { GoogleGenAI } from "@google/genai";

const RED_FLAGS = [
  { pattern: /pay|payment|deposit|registration fee|security deposit|processing fee|training fee|refundable/i, title: "Upfront payment request", category: "upfront-payment", weight: 35, description: "The offer asks for money before employment is confirmed." },
  { pattern: /within \d+ (hour|hours)|immediately|urgent|today only|act now/i, title: "Pressure or urgency", category: "urgency", weight: 18, description: "Urgent deadlines can be used to pressure candidates into acting without verification." },
  { pattern: /telegram|t\.me|whatsapp|signal/i, title: "Unusual recruitment channel", category: "links", weight: 12, description: "Recruitment conducted mainly through messaging apps deserves extra verification." },
  { pattern: /\₹?\s?[1-9]\d{4,}|\$\s?[1-9]\d{3,}/i, title: "Unusually attractive compensation", category: "salary", weight: 12, description: "Very high pay claims should be checked against the real employer and role." },
  { pattern: /no interview|without interview|guaranteed job|100% job|selected immediately/i, title: "Suspicious hiring claim", category: "urgency", weight: 15, description: "Guaranteed or instant-selection language is a common warning sign." },
  { pattern: /aadhaar|pan card|bank account|otp|password|cvv/i, title: "Sensitive information request", category: "documents", weight: 20, description: "Requests for sensitive financial or identity information should be verified carefully." }
];

function heuristicAnalysis(message) {
  const signals = RED_FLAGS.filter(rule => rule.pattern.test(message));
  const score = Math.min(100, signals.reduce((sum, item) => sum + item.weight, 0));

  let riskLevel = "LOW";
  if (score >= 60) riskLevel = "HIGH";
  else if (score >= 30) riskLevel = "MEDIUM";

  const action =
    riskLevel === "HIGH"
      ? "Do not pay or share sensitive information. Verify the employer using an official website or trusted registry."
      : riskLevel === "MEDIUM"
        ? "Pause before responding. Independently verify the employer, recruiter and job details."
        : "No major warning pattern was detected, but verify the employer before sharing sensitive information.";

  return {
    riskLevel,
    riskScore: score,
    summary: `${riskLevel} risk based on detected recruitment warning patterns.`,
    signals: signals.map((s, i) => ({
      id: String(i + 1),
      title: s.title,
      description: s.description,
      category: s.category
    })),
    recommendations: [
      action,
      "Never rely only on phone numbers, links or contact details supplied inside the suspicious message.",
      "Do not send passwords, OTPs, card details or other highly sensitive information."
    ],
    engine: "ScamShield heuristic engine"
  };
}

async function geminiAnalysis(message) {
  if (!process.env.GEMINI_API_KEY) return null;

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const prompt = `You are ScamShield, a cautious job-offer fraud screening assistant.
Analyze the following recruitment message. Do not claim certainty that a person or company is fraudulent.
Return ONLY valid JSON with:
riskLevel: HIGH, MEDIUM, or LOW
riskScore: integer 0-100
summary: short string
signals: array of objects with id,title,description,category
recommendations: array of strings
Use practical warning signs such as upfront fees, urgency, suspicious channels, unrealistic claims, impersonation, links, and sensitive-data requests.
Message:
${message}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: { responseMimeType: "application/json" }
  });

  const text = response.text?.trim();
  if (!text) return null;
  const parsed = JSON.parse(text);
  return { ...parsed, engine: "Gemini + ScamShield" };
}

export async function analyzeOffer(message) {
  try {
    const aiResult = await geminiAnalysis(message);
    if (aiResult && ["HIGH", "MEDIUM", "LOW"].includes(aiResult.riskLevel)) {
      return aiResult;
    }
  } catch (error) {
    console.error("Gemini warning:", error.message);
  }

  return heuristicAnalysis(message);
}
