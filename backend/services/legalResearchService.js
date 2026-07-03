import dotenv from "dotenv";
import Models from "../models/Schemas.js"

dotenv.config();
export const generateChatTitle = async (firstMessage, userId) => {
  try {
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-ai/DeepSeek-V4-Flash:fastest",
          messages: [
            {
              role: "system",
              content:
                `You are a title generator

                Rules:
                - Return ONLY the title.
                - Maximum 5 words.
                - No quotes.
                - No punctuation.
                - No explanations.
                - Do not repeat these instructions.`,
            },
            {
              role: "user",
              content: firstMessage,
            },
          ],
          max_tokens: 10,
          temperature: 0.3,
  
        }),
      }
    );

    const data = await response.json();
    const title = data.choices[0].message.content.replace(/["']/g, "").trim();
    console.log(title)
    const newChat = await Models.Chat.create({
      userId: userId,
      title : title
    })
    
    return newChat;

  } catch (error) {
    console.log(error);
  }
};

export const generateChatMessage = async (messages) => {
  const response = await fetch(
    "https://router.huggingface.co/v1/chat/completions",
    {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-ai/DeepSeek-V4-Flash:fastest",
          messages: [
            {
              role: "system",
              content:
                `
                  You are a smart Indian Legal AI assistant.

                  Rules:
                  - Sound natural and conversational.
                  - Avoid textbook-style answers.
                  - Keep answers short unless user asks for detail.
                  - Use simple English.
                  - Use markdown minimally.
                  - Avoid too many headings.
                  - Avoid repeating information.
                  - Explain like ChatGPT.
                  - Prefer short paragraphs over long structured notes.
                  - Maximum 120 words unless necessary.
                  `,
            },
            ...messages
          ],
  
        }),
      }
  )

  const data = await response.json()

  return data.choices[0].message.content;
}

export const DeleteChatService = async (chatId) => {
  await Models.Chat.findByIdAndDelete(chatId)

  await Models.Message.deleteMany({
    chatId: chatId
  })

  return {
    message: "Chat Deleted Successfully"
  }
}

export const getMessageService = async (chatId) => {
  const data = await Models.Message.find({
    chatId: chatId
  }).sort({ createdAt : 1})

  return data;
}

export const saveChatMessage = async (chatId, content, role) => {
  const message = await Models.Message.create({
    content: content,
    role: role,
    chatId: chatId,
  })

  return message;
}