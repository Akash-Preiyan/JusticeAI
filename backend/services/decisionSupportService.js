import dotenv from "dotenv";
import { extractJsonFromText } from "../utils/jsonParser.js";
import Models from "../models/Schemas.js";

dotenv.config();

const HF_API_KEY = process.env.HF_API_KEY;

export const generateDecisionSupportService = async (
  caseData,
  userId
) => {
  try {

    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          model: "deepseek-ai/DeepSeek-V3-0324:novita",

          messages: [
            {
              role: "system",

              content: `
You are an advanced Indian legal decision-support AI.

You specialize in:
- Indian courts
- IPC
- BNS
- CrPC
- BNSS
- Indian Evidence Act
- Civil procedure
- Criminal procedure
- Appeal analysis
- Judicial reasoning analysis

Your task is NOT simple prediction.

Your task is to:
1. Analyze the legal case independently.
2. Predict what AI believes should happen.
3. Compare it with the ACTUAL court decision.
4. Analyze why the judge and AI agree or differ.
5. Evaluate appeal potential.
6. Identify legal/procedural factors influencing the court.

IMPORTANT RULES:
- Return ONLY valid JSON.
- No markdown.
- No explanation outside JSON.
- Use only provided information.
- Do not guarantee legal outcomes.
- alignmentScore must be between 0 and 100.
- title must be short.
- aiPredictedDecision must be short.
- summary must contain 5 to 7 detailed sentences.
- aiReasoning must contain 8 to 12 detailed sentences.
- differenceAnalysis must contain a detailed analytical paragraph.
- appealAnalysis must contain a detailed legal analysis paragraph.
- courtCriticalFactors must contain 4 to 6 detailed points.
- strategicInsights must contain 4 to 6 detailed points.

Focus heavily on:
- admissibility of evidence
- procedural defects
- witness credibility
- judicial reasoning
- burden of proof
- contradictions
- appeal viability
- why the court accepted/rejected evidence

Cite only legally relevant provisions applicable to the specific facts and legal issues of the case.

Do not cite:
- electronic evidence provisions unless digital evidence admissibility is disputed
- criminal provisions in purely civil matters
- unrelated procedural sections

Legal citations must be contextually accurate and directly connected to the dispute.
              `,
            },

            {
              role: "user",

              content: `
Analyze this Indian legal case and compare AI reasoning with the actual court judgment.

Case Data:
${JSON.stringify(caseData, null, 2)}

Return JSON in this EXACT structure:

{
  "title": "",

  "summary": "",

  "aiPredictedDecision": "",

  "aiReasoning": "",

  "actualCourtDecision": "",

  "judgeReasoning": "",

  "judgeObservations": "",

  "alignmentScore": 0,

  "differenceAnalysis": "",

  "appealAnalysis": "",

  "courtCriticalFactors": [],

  "strategicInsights": []
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
        "Failed to generate decision support analysis"
      );
    }

    if (!data?.choices?.[0]?.message?.content) {
      throw new Error("Invalid response from model");
    }

    const rawResponse =
      data.choices[0].message.content;

    const parsed =
      extractJsonFromText(rawResponse);

    const decisionSupportData = {
      userId,

      title:
        parsed.title ||
        caseData.caseType ||
        caseData.mainLegalIssue ||
        "Untitled Decision Support Analysis",

      caseType: caseData.caseType,

      courtLevel: caseData.courtLevel,

      jurisdiction: caseData.jurisdiction,

      caseStage: caseData.caseStage,

      caseData,

      summary: parsed.summary || "",

      aiPredictedDecision:
        parsed.aiPredictedDecision ||
        "Unable to determine AI prediction",

      aiReasoning:
        parsed.aiReasoning || "",

      actualCourtDecision:
        parsed.actualCourtDecision ||
        caseData.actualCourtDecision ||
        "",

      judgeReasoning:
        parsed.judgeReasoning ||
        caseData.judgeReasoning ||
        "",

      judgeObservations:
        parsed.judgeObservations ||
        caseData.judgeObservations ||
        "",

      alignmentScore:
        Number(parsed.alignmentScore) || 50,

      differenceAnalysis:
        parsed.differenceAnalysis || "",

      appealAnalysis:
        parsed.appealAnalysis || "",

      courtCriticalFactors:
        Array.isArray(parsed.courtCriticalFactors)
          ? parsed.courtCriticalFactors
          : [],

      strategicInsights:
        Array.isArray(parsed.strategicInsights)
          ? parsed.strategicInsights
          : [],
    };

    const decisionSupport =
      await Models.DecisionSupport.create(
        decisionSupportData
      );

    return decisionSupport;

  } catch (error) {

    console.log(
      "DECISION SUPPORT ERROR:",
      error
    );

    throw error;
  }
};