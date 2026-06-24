import dotenv from "dotenv";
dotenv.config({ quiet: true });

import express from "express";
import cors from "cors";

import { connectDB } from "./config/database.js";
connectDB();


const App = express();

App.use(cors())

App.get("/", (req, res) => {
  res.send("server working properly");
});

App.use("api/auth")

const port = process.env.PORT || 9000;

App.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is running on port ${port}`);
  }
});
