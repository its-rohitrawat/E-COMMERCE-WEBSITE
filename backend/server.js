import dotenv from "dotenv";
dotenv.config({ quiet: true });

import express from "express";
import cors from "cors";

import { connectDB } from "./config/database.js";
import authRouter from "./routes/authRoutes.js";
import products from "./routes/productsRoutes.js";
import orders from "./routes/orderRoutes.js";
import payment from "./routes/paymentRoutes.js";
import analytics from "./routes/analyticsRoutes.js";
connectDB();

const App = express();

App.use(cors());
App.use(express.json());
App.use(express.urlencoded({ extended: true }));

App.get("/", (req, res) => {
  res.send("server working properly");
});

App.use("/api/auth", authRouter);
App.use("/api/products", products);
App.use("/api/orders", orders);
App.use("/api/payment", payment);
App.use("/api/analytics", analytics);

const port = process.env.PORT || 9000;

App.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is running on port ${port}`);
  }
});
