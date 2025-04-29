import express from "express";
import path from "path";
import cookiePaser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import "dotenv/config";
import connection from "./config/db.js";
import { userRoutes } from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import passport from "passport";
import session from "express-session";
import User from "./models/userModel.js";
import router from "./routes/auth.js";
import payments from './routes/paymentRoutes.js'
import mongoose from "mongoose";
import orderRoutes from "./routes/orderRoutes.js"
// import { orderRouter } from "./routes/orderRoutes.js";

const app = express();
app.use(cors({
  origin:'http://localhost:3000',
  credentials:true
}));
app.use(cookiePaser());
app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders",orderRoutes);
app.use('/api/v1/payment',payments)


app.get("/", async (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  try {
    await connection;
    console.log(`server in runnit at http://localhost:${port}`);
  } catch (err) {
    console.log("err", err);
  }
});
