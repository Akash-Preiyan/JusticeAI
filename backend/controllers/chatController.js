import {generateChatTitle, generateChatMessage, DeleteChatService, getMessageService, saveChatMessage} from "../services/legalResearchService.js"

export const generateChatTitleController = async (req, res) => {
    try{
        const {message} = req.body

        const newChat = await generateChatTitle(message, req.user._id)

        res.json(newChat)
    } catch(error){
        res.status(500).json({ error: "Failed to generate title"})
    }
}

export const generateChatMessageController = async(req, res) => {
    try{
        const { chatId, messages } = req.body
        const recentMessages = messages.slice(-10);
        const userPrompt = messages.slice(-1)[0];
        const userMessage = await saveChatMessage(chatId,userPrompt.content, "user");
        const response = await generateChatMessage(recentMessages)
        const aiResponseMessage = await saveChatMessage(chatId,response, "assistant")
        res.json({
            aiMessage: {
                role: "assistant",
                content: response
            }
        })
    }catch(error){
        console.log(error)
        res.status(500).json({ error : error.message})
    }
}

export const DeleteChatController = async (req, res) => {
    try{
        const {chatId} = req.params

        const response = await DeleteChatService(chatId);

        return res.status(204).json({
            message: "Chat Deleted Successfully"
        })
        
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Chat Deletion Failed"
        })
    }
}


export const getMessageController = async (req, res) => {
    try{
        const { chatId } = req.params;
        const response = await getMessageService(chatId);
        return res.status(200).json(response)
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Failed to get Messages"
        })
    }
}