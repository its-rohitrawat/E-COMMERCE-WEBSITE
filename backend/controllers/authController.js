import { User } from "../models/userSchema.js";
import { sendMail } from "../utils/sendMail.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register a new user

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "all inputs fields are reqsuired!!",
      });
    }

    const isExists = await User.findOne({ email });
    console.log("isExists:", isExists);

    if (isExists) {
      return res.status(422).json({
        success: false,
        message: "user already exists with this email",
      });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //tokenization

    // otp

    //send mail to the user

    const newUser = await User.create({ name, email, password: hashedPassword });

    if (newUser) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      const message = `Welcome to our website, ${name}!! Thank you for registration, we are excited to have you!! Your OTP fpr E-COMMERCE registration is: ${otp}`;

      await sendMail(
        email,
        `Welcome to our Website - Your OTP for registration`,
        message,
      );

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        token: generateToken(newUser._id),
        message:
          "User registration successfully. Please check your email for the OTP.",
      });
    } else {
      res.status(400).json({
        message: "invalid user data",
      });
    }

    // res.status(200).json({
    //   success: true,
    //   message: "user created successfully",
    // });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

//login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password)))
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    else {
      res.status(400).json({
        message: "invalid email or password",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

//get user

export const getUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};
