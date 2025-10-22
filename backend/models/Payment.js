import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  upiId: { type: String, required: true },
  status: { type: String, default: "pending" },
  date: { type: Date, default: Date.now }
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
