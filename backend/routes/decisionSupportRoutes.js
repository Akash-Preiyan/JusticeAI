import express from "express"
import auth from "../middleware/auth.js"
import { generateDecisionSupport } from "../controllers/decisionSupportController.js"

const router = express.Router();

router.post("/generate_Prediction", auth, generateDecisionSupport);

export default router;