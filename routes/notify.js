import express from "express";
import { NewNotify, EditNotify, deleteNotify,DisplayNotify,DisplaySingleNotify } from "../controllers/admin/Notify.js";

const router = express.Router();



router.put("/:id", EditNotify);
router.delete("/:id", deleteNotify);
router.get("/all",DisplayNotify);
// router.get("/single",DisplaySingleNotify);




export default router;
