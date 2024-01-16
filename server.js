import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import { verifyToken, verifyUserToken } from "./middleware/auth.js";

import authRoutes from "./routes/auth.js";
import notifyRoutes from "./routes/notify.js";
import eventsRoutes from "./routes/events.js";
import usereventsRoutes from "./routes/userevents.js";
import workshopRoutes from "./routes/workshop.js";
import userworkshopRoutes from "./routes/userworkshop.js";
import usernotifyRoutes from "./routes/usernotify.js";
import userauthRoutes from "./routes/userauth.js";

import { newEventUpload } from "./controllers/admin/Events.js";
import { newWorkshopUpload } from "./controllers/admin/Workshop.js";
import { NewNotify } from "./controllers/admin/Notify.js";
import User from "./models/User/User.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* DATABSE CONNECTION */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT} 🔥`);
      console.log("Database Connected Successfully ");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

/* ROUTE WITH FILES */
app.post(
  "/admin/events/new",
  verifyToken,
  upload.single("picture"),
  newEventUpload
);
app.post(
  "/admin/workshops/new",
  verifyToken,
  upload.single("picture"),
  newWorkshopUpload
);
app.post(
  "/admin/notifications/new",
  verifyToken,
  upload.single("picture"),
  NewNotify
);

/* ROUTES */
app.use("/admin/auth", authRoutes);
app.use("/admin/notifications", verifyToken, notifyRoutes);
app.use("/admin/events", verifyToken, eventsRoutes);
app.use("/admin/workshops", verifyToken, workshopRoutes);

/* User Routes */
app.use("/user/auth", userauthRoutes);
app.use("/user/notifications", usernotifyRoutes);
app.use("/user/events", verifyUserToken, usereventsRoutes);
app.use("/user/workshops", verifyUserToken, userworkshopRoutes);

/*Get User*/
app.get("/user", verifyUserToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate(
      "RegisteredEvents"
    );
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    user.password = undefined;
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ message: "Internal Server Error " + error.message });
  }
});
