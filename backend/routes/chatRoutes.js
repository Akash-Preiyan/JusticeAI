import express from 'express';
import Models from "../models/Schemas.js"
import auth from "../middleware/auth.js"
import {generateChatMessageController, generateChatTitleController, DeleteChatController} from "../controllers/chatController.js"
const router = express.Router()

router.get('/get_chats',auth, async  (req,res)=> {
    try{
        const chats = await Models.Chat.find({
            userId : req.user._id
        }).sort({ createdAt : -1})

        res.json(chats)

    }catch(err){
        res.status(500).json({message : "Chat doesn't exist"})
    }
    
})

router.post('/send_chat', auth, generateChatMessageController)
router.post('/get_title', auth, generateChatTitleController)
router.delete('/deleteChat/:chatId', auth, DeleteChatController);

export default router;