import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import loader from "./app.js";

const app = express();

dotenv.config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    loader(app);
  })
  .catch((err) => {
    console.error(`Source de l'erreur : ${err.message}`);
  });
