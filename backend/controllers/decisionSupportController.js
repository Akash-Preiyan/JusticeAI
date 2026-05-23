import { generateDecisionSupportService } from "../services/decisionSupportService.js";

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