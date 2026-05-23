import express from 'express'
import auth from "../middleware/auth.js"
import { getMessageController } from '../controllers/chatController.js';
const router = express.Router();

router.get('/get_messages/:chatId', auth, getMessageController)

export default router