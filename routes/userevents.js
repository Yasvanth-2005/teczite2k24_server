import express from "express";
import {fetchAllEvents,fetchEventById} from '../controllers/admin/Events.js' 
import { EventRegister } from "../controllers/user/Events.js";
const router = express.Router();



router.get('/all-events', fetchAllEvents);
router.get('/event/:id', fetchEventById);
router.post('/register-event',EventRegister)


export default router;
