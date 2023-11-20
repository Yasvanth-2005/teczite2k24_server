import express from "express";
import { DisplayNotify,DisplaySingleNotify } from "../controllers/admin/Notify.js";

const router = express.Router();


router.get("/all",DisplayNotify);
router.get("/single",DisplaySingleNotify);




export default router;
