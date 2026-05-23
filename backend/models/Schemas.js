import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
});

const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  title: {
    type: String,
    default: "New Chat"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
})

const messageSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },

  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true
  },

  content: {
    type: String,
    required: true
  },

  timestamp: {
    type: Date,
    default: Date.now
  }
})

const predictionSchema = new mongoose.Schema(
   {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "Untitled Case Prediction",
    },

    caseType: String,
    courtLevel: String,
    jurisdiction: String,
    caseStage: String,

    caseData: {
      type: Object,
      required: true,
    },

    predictedOutcome: {
      type: String,
      default: "",
    },

    confidenceScore: {
      type: Number,
      default: 50,
    },

    evidenceStrength: {
      type: Number,
      default: 50,
    },

    legalRisk: {
      type: Number,
      default: 50,
    },

    settlementProbability: {
      type: Number,
      default: 50,
    },

    summary: {
      type: String,
      default: "",
    },

    reasoning: {
      type: String,
      default: "",
    },

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    risks: {
      type: [String],
      default: [],
    },

    missingEvidence: {
      type: [String],
      default: [],
    },

    recommendedNextSteps: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

const decisionSupportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "Untitled Decision Support Analysis",
    },

    caseType: String,

    courtLevel: String,

    jurisdiction: String,

    caseStage: String,

    caseData: {
      type: Object,
      required: true,
    },

    // =========================
    // AI PREDICTION
    // =========================

    aiPredictedDecision: {
      type: String,
      default: "",
    },

    aiReasoning: {
      type: String,
      default: "",
    },

    // =========================
    // ACTUAL COURT DECISION
    // =========================

    actualCourtDecision: {
      type: String,
      default: "",
    },

    judgeReasoning: {
      type: String,
      default: "",
    },

    judgeObservations: {
      type: String,
      default: "",
    },

    // =========================
    // COMPARISON OUTPUT
    // =========================

    alignmentScore: {
      type: Number,
      default: 50,
    },

    differenceAnalysis: {
      type: String,
      default: "",
    },

    appealAnalysis: {
      type: String,
      default: "",
    },

    // =========================
    // ANALYTICAL ARRAYS
    // =========================

    courtCriticalFactors: {
      type: [String],
      default: [],
    },

    strategicInsights: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const DecisionSupport = mongoose.model('DecisionSupport', decisionSupportSchema)
const CasePrediction = mongoose.model('CasePrediction', predictionSchema)
const Chat = mongoose.model("Chat", chatSchema);
const Message = mongoose.model("Message", messageSchema)
const User = mongoose.model("User", userSchema);
export default {Chat, Message, User, CasePrediction, DecisionSupport};

