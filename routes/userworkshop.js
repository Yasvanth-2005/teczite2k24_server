import express from "express";
import {
  fetchAllWorkshops,
  fetchWorkshopById,
} from "../controllers/admin/Workshop.js";
const router = express.Router();

router.get('/all-workshops', fetchAllWorkshops);
router.get('/:id', fetchWorkshopById);

export default router;
