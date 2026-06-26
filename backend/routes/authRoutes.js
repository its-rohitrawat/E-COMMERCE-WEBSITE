import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/authController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { admin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, getUser);

//protect will check if a user is properly login or not
//and admin

export default router;
