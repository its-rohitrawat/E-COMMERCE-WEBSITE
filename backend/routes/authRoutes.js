import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/authController";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", product, admin, getUser);

//protect will check if a user is properly login or not
//and admin