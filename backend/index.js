import express from "express";
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js"
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
dotenv.config({});

const app = express();


// ✅ Health check route
app.get("/health", (req, res) => {
  return res.status(200).json({
    status: "ok",
    message: "Server is healthy 🚀",
  });
});

app.get("/home", (req, res) => {
  return res.status(200).json({
    message: "I am coming from backend",
    success: "true"
  })
})

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// const corsOptions = {
//   origin: true,
//   credentials: true,
// }
// app.use(cors(corsOptions));
// app.use(cors({ origin: "*" }));

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173", // ✅ This is your Vite frontend
    "http://localhost:8080"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}
app.use(cors(corsOptions));

// Add this line to handle preflight requests
app.options('*', cors(corsOptions));

const PORT = process.env.PORT || 3000;

//api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// "http://localhost:8000/api/v1/user/register"
// "http://localhost:8000/api/v1/user/login"
// "http://localhost:8000/api/v1/user/profile/update"

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running at port ${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Failed to connect to MongoDB", err);
});