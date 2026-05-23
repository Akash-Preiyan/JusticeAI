import { InferenceClient } from '@huggingface/inference'
const HF_API_KEY = process.env.HF_API_KEY;
import axios from "axios"

export const generateCasePrediction = async (caseData) => {
  try {

    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          model: "deepseek-ai/DeepSeek-V3-0324:novita",

          messages: [
            {
              role: "system",

              content: `
Analyze this legal case under Indian law.
You are an expert in Indian courts, IPC, BNS, CrPC, BNSS, Indian Evidence Act, and Indian civil procedure.
Where relevant, cite specific sections (e.g. Section 302 IPC, Section 65B Evidence Act, Section 439 CrPC).
Consider the court level and jurisdiction provided when reasoning about procedure and appeal rights.

IMPORTANT RULES:
- Return ONLY valid JSON.
- No markdown.
- No explanation outside JSON.
- Do not guarantee legal outcomes.
- Use only the provided information.
- Scores must be numbers between 0 and 100.
- The title must be short.
- predictedOutcome must be short.
- summary must be 4 to 6 detailed sentences.
- reasoning must be a detailed paragraph of 8 to 12 sentences explaining why this prediction was made.
- strengths, weaknesses, risks, missingEvidence, and recommendedNextSteps must each contain 4 to 6 detailed points.

              `,
            },

            {
              role: "user",

              content: `
Analyze this legal case.

Case Data:
${JSON.stringify(caseData, null, 2)}

Return JSON in this EXACT structure:

{
  "title": "",
  "predictedOutcome": "",
  "confidenceScore": 0,
  "evidenceStrength": 0,
  "legalRisk": 0,
  "settlementProbability": 0,
  "summary": "",
  "reasoning": "",
  "strengths": [],
  "weaknesses": [],
  "risks": [],
  "missingEvidence": [],
  "recommendedNextSteps": []
}
              `,
            },
          ],

          max_tokens: 4000,
          temperature: 0.2,
        }),
      }
    );

    const data = await response.json();

    console.log("HF RESPONSE:", data);

    if (!response.ok) {
      throw new Error(
        data?.error ||
        data?.message ||
        "Failed to generate prediction"
      );
    }

    if (!data?.choices?.[0]?.message?.content) {
      throw new Error("Invalid response from model");
    }

    return data.choices[0].message.content;

  } catch (error) {

    console.log("CASE PREDICTION ERROR:", error);

    throw error;
  }
};