import {generatePredictionService, getPredictionService, getSinglePredictionService, deletePredictionService} from "../services/CasePredictionServices.js"

export const generateCasePredictionController = async (req, res) => {
    try{
        const { caseData } = req.body;

        if(!caseData){
            return res.status(400).json({
                message: "CaseData is required."
            })
        }

        const prediction = await generatePredictionService(
            caseData,
            req.user._id
        )

        return res.status(201).json(prediction)
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Prediction failed.",
            error: error.message
        })
    }
}

export const getPredictionsController = async (req, res)=>{
    try{
        const predictions = await getPredictionService(req.user._id);
        return res.status(200).json(predictions)
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Failed to get Case predictions"
        })
    }
}

export const getSinglePredictionController = async (req, res) => {
    try{
        const { predictionId } = req.params;
        const prediction = await getSinglePredictionService(predictionId, req.user._id)

        if(!prediction){
            return res.status(404).json({
                message: "Prediction not found"
            })
        }

        return res.status(200).json(prediction);
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Failed to get Single Case Prediction."
        })
    }
}

export const deletePredictionController = async (req, res) => {
    try{
        const {predictionId} = req.params;
        const deletedPrediction = await deletePredictionService(
            predictionId,
            req.user._id,
        )

        return res.status(200).json({
            message: "Case Prediction deleted Successfully."
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message : "Failed to delete Case Prediction."
        })
    }
}