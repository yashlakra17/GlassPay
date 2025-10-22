import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import paymentRoutes from "./routes/payment.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/payments", paymentRoutes);

// MongoDB connection
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/paymentDB";

mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.error("MongoDB connection error ❌:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
