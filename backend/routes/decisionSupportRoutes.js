import express from "express"
import auth from "../middleware/auth.js"
import { generateDecisionSupport, getPredictionsController, getSinglePredictionController, deleteSinglePredictionController } from "../controllers/decisionSupportController.js"

const router = express.Router();

router.post("/generate_Prediction", auth, generateDecisionSupport);
router.get("/get_DecisionSupport_Predictions", auth, getPredictionsController);
router.get("/get_DecisionSupport_Predictions/:predictionId", auth, getSinglePredictionController)
router.delete('/delete_Single_Decision_Prediction/:predictionId', auth, deleteSinglePredictionController)
export default router;