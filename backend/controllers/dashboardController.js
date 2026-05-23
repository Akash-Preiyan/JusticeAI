import Models from "../models/Schemas.js"

export const getDashboardData = async (req, res) => {

  try {

    const userId = req.user.id;

    const predictions =
      await Models.CasePrediction
      .find({ userId: userId })
      .sort({ createdAt: -1 });

    const decisions =
      await Models.DecisionSupport
      .find({ userId: userId })
      .sort({ createdAt: -1 });

    const chats =
      await Models.Chat
      .find({ userId: userId })
      .sort({ createdAt: -1 });

    // RECENT ACTIVITY

    const recentActivity = [

      ...predictions.map((item) => ({
        type: "prediction",
        title: item.title,
        status: item.predictedOutcome,
        createdAt: item.createdAt,
      })),

      ...decisions.map((item) => ({
        type: "decision-support",
        title: item.title,
        status: item.actualCourtDecision,
        createdAt: item.createdAt,
      })),

      ...chats.map((item) => ({
        type: "research",
        title: item.title || "Legal Research",
        status: "Completed",
        createdAt: item.createdAt,
      })),
    ]
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .slice(0, 10);

    // AVERAGES

    const averageConfidence =
      predictions.length > 0
        ? Math.round(
            predictions.reduce(
              (acc, item) =>
                acc +
                (item.confidenceScore || 0),
              0
            ) / predictions.length
          )
        : 0;

    const averageAlignment =
      decisions.length > 0
        ? Math.round(
            decisions.reduce(
              (acc, item) =>
                acc +
                (item.alignmentScore || 0),
              0
            ) / decisions.length
          )
        : 0;

    // TIMELINE

    const caseTimeline = [

      ...predictions.map((item) => ({
        title:
          item.title ||
          "Case Prediction",
        subtitle:
          item.predictedOutcome,
        date:
          item.createdAt,
        status: "Active",
      })),

      ...decisions.map((item) => ({
        title:
          item.title ||
          "Decision Support",
        subtitle:
          item.aiPredictedDecision,
        date:
          item.createdAt,
        status: "Completed",
      })),
    ]
      .sort(
        (a, b) =>
          new Date(b.date) -
          new Date(a.date)
      )
      .slice(0, 8);

    // ALERTS

    const alerts = [];

    predictions.forEach((item) => {

      if (
        item.confidenceScore < 50
      ) {

        alerts.push({
          title:
            "Low Prediction Confidence",
          message:
            `${item.title} has low AI confidence.`,
          time:
            item.createdAt,
          unread: true,
          type: "warning",
        });
      }
    });

    decisions.forEach((item) => {

      if (
        item.alignmentScore < 40
      ) {

        alerts.push({
          title:
            "Judge-AI Difference Detected",
          message:
            `${item.title} has low judicial alignment.`,
          time:
            item.createdAt,
          unread: true,
          type: "danger",
        });
      }
    });

    return res.status(200).json({

      predictionHistory:
        predictions,

      decisionHistory:
        decisions,

      chatHistory:
        chats,

      recentActivity,

      caseTimeline,

      alerts,

      confidenceScores: {
        prediction:
          averageConfidence,

        alignment:
          averageAlignment,

        appeal:
          72,
      },
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message:
        "Failed to load dashboard",
    });
  }
};