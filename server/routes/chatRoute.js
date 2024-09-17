import { Router } from "express";
import { chats } from "../controllers/chats.js";
import {ClerkExpressRequireAuth} from "@clerk/clerk-sdk-node"
import { userChats } from "../controllers/userChats.js";
import { chat ,updateChat} from "../controllers/chat.js";
import verify from "../verifyToken.js";


const router=Router();

// router.post('/chats',ClerkExpressRequireAuth(),chats)

// router.get('/chats/:id',ClerkExpressRequireAuth(),chat)

// router.get('/userChats',ClerkExpressRequireAuth(),userChats);

// router.put('/chats/:id',ClerkExpressRequireAuth(),updateChat);
router.post('/chats',verify,chats)

router.get('/chats/:id',verify,chat)

router.get('/userChats',verify,userChats);

router.put('/chats/:id',verify,updateChat);

export default router;