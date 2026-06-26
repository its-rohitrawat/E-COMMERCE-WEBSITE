import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/authController";

import { protect } from "../middlewares/authMiddleware";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, admin, getUser);

//protect will check if a user is properly login or not
//and admin