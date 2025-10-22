import React, { useState } from "react";
import API from "../api";

const PaymentForm = ({ onAdd }) => {
  const [form, setForm] = useState({ name: "", amount: "", upiId: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/payments", form);
      onAdd(res.data.payment);
      setForm({ name: "", amount: "", upiId: "" });
      alert("✅ Payment added successfully!");
    } catch (error) {
      alert("❌ Error adding payment");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h2>Add Payment</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} required />
      <input name="upiId" placeholder="UPI ID" value={form.upiId} onChange={handleChange} required />
      <button type="submit">Add</button>
    </form>
  );
};

export default PaymentForm;
