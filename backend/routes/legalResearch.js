import  {generateChatTitle}  from "../services/legalResearchService.js";
import express from "express";

const router = express.Router();

router.post("/generate_title", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await generateChatTitle(prompt);

    if (response) {
      return res.status(200).json({
        title: response,
      });
    } else {
      return res.status(400).json({
        message: "No title generated",
      });
    }

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: `Error occurred in title generation`,
    });
  }
});

export default router;