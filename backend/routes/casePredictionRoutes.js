import express from 'express';
import auth from '../middleware/auth.js';
import {generateCasePredictionController, getPredictionsController, getSinglePredictionController, deletePredictionController} from "../controllers/casePredictionController.js"
const router = express.Router()

router.post("/generate_prediction", auth, generateCasePredictionController);
router.get("/get_Case_Predictions", auth, getPredictionsController);
router.get("/get_Case_Predictions/:predictionId", auth, getSinglePredictionController);
router.delete('/delete_single_Case_Prediction/:predictionId', auth, deletePredictionController);
export default router;