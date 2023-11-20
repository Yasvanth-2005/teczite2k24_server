import express from "express";
import {fetchAllEvents,fetchEventById,editEvent} from '../controllers/admin/Events.js' 
const router = express.Router();

// Your existing routes

router.get('/all-events', fetchAllEvents);
router.get('/event/:id', fetchEventById);
router.put('/edit-event/:id', editEvent);


export default router;
