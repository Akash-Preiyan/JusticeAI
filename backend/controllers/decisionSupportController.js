import { generateDecisionSupportService, getDecisionSupportChats, getSingleDecisionSupportPrediction, deleteSinglePrediction } from "../services/decisionSupportService.js";

export const generateDecisionSupport = async (req, res) => {
    try{
        const { caseData } = req.body;

        if(!caseData){
            return res.status(400).json({
                message: "CaseData is required"
            })
        }
        const response = await generateDecisionSupportService(caseData, req.user._id);
  
        return res.status(200).json(response)
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Failed to generate Decision Support.",
            error : error.message
        })
    }
}

export const getPredictionsController = async (req, res) => {
    try{
        const predictions = await getDecisionSupportChats(req.user._id)
        return res.status(200).json(predictions)
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Failed to get Decision Support Chats"
        })
    }
}

export const getSinglePredictionController = async (req, res) => {
    try{
        const {predictionId} = req.params
        const prediction = await getSingleDecisionSupportPrediction(predictionId, req.user._id)

        if(!prediction){
            return res.status(404).json({
                message: "Prediction not found"
            })
        }

        return res.status(200).json(prediction)
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message : "Failed to get Decision Support Prediction"
        })
    }
}

export const deleteSinglePredictionController = async (req, res) => {
    try{
        const {predictionId} = req.params
        const prediction = await deleteSinglePrediction(predictionId, req.user._id)

        return res.status(200).json({
                message: "Decision Support Prediction deleted Successfully."
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message : "Failed to delete Decision Support Prediction."
        })
    }
}