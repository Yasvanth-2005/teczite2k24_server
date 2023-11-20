import express from "express";
import {
  fetchAllWorkshops,
  fetchWorkshopById,
  editWorkshop,
} from "../controllers/admin/Workshop.js";
const router = express.Router();

router.get('/all-workshops', fetchAllWorkshops);
router.get('/:id', fetchWorkshopById);
router.put('/edit-workshop/:id', editWorkshop);

export default router;
  