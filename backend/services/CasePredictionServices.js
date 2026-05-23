import Models from "../models/Schemas.js"
import { generateCasePrediction } from "../ai/hfLLM.js";
import { extractJsonFromText } from "../utils/jsonParser.js";

export const generatePredictionService = async (caseData, userId) => {

  const rawResponse = await generateCasePrediction(caseData);

  const parsed = extractJsonFromText(rawResponse);

  const predictionData = {
    userId,

    title:
      parsed.title ||
      caseData.caseType ||
      caseData.mainLegalIssue ||
      "Untitled Case Prediction",

    caseType: caseData.caseType,
    courtLevel: caseData.courtLevel,
    jurisdiction: caseData.jurisdiction,
    caseStage: caseData.caseStage,

    caseData,

    predictedOutcome:
      parsed.predictedOutcome || "Unable to determine likely outcome",

    confidenceScore: Number(parsed.confidenceScore) || 50,
    evidenceStrength: Number(parsed.evidenceStrength) || 50,
    legalRisk: Number(parsed.legalRisk) || 50,
    settlementProbability: Number(parsed.settlementProbability) || 50,

    summary: parsed.summary || "",
    reasoning: parsed.reasoning || "",

    strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
    weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : [],
    risks: Array.isArray(parsed.risks) ? parsed.risks : [],
    missingEvidence: Array.isArray(parsed.missingEvidence)
      ? parsed.missingEvidence
      : [],
    recommendedNextSteps: Array.isArray(parsed.recommendedNextSteps)
      ? parsed.recommendedNextSteps
      : [],
  };

  const prediction = await Models.CasePrediction.create(predictionData);

  return prediction;
};

export const getPredictionService = async (userId) => {
  const predictions = await Models.CasePrediction.find({
    userId,
  }).sort({ createdAt : -1});

  return predictions;
}

export const getSinglePredictionService = async (predictionId, userId) => {
  const prediction = await Models.CasePrediction.findOne({
    _id: predictionId,
    userId,
  })

  return prediction;
}

export const deletePredictionService = async (predictionId, userId) => {
  const prediction = await Models.CasePrediction.deleteOne({
    _id : predictionId,
    userId,
  })

  return prediction
}