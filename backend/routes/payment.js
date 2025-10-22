import express from "express";
import Payment from "../models/Payment.js";

const router = express.Router();

// ✅ CREATE payment
router.post("/", async (req, res) => {
  try {
    const { name, amount, upiId } = req.body;
    const payment = new Payment({ name, amount, upiId });
    await payment.save();
    res.json({ message: "Payment saved", payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ READ all payments
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ UPDATE payment status
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json({ message: "Status updated", payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ DELETE payment
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Payment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Payment not found" });
    res.json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
