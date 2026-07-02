import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js"
import chatBoxRoutes from "./routes/legalResearch.js"
import messageRoutes from "./routes/messageRoutes.js"
import casePredictionRoutes from "./routes/casePredictionRoutes.js"
import decisionSupportRoutes from "./routes/decisionSupportRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js"
const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://justiceaifrontend.vercel.app/"
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/chatTitle", chatBoxRoutes); 
app.use("/api/Case_prediction", casePredictionRoutes);
app.use("/api/DecisionSupport", decisionSupportRoutes);
app.use("/api/Dashboard", dashboardRoutes)

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    service: "JusticeAI Backend",
    timestamp: new Date().toISOString()
  });
});


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(` Legal Research API available at: http://localhost:${PORT}/api/legal-research`);
});