import React from "react";
import API from "../api";

const PaymentTable = ({ payments, setPayments }) => {
  const updateStatus = async (id, status) => {
    try {
      const res = await API.put(`/payments/${id}/status`, { status });
      alert(res.data.message);
      setPayments((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status } : p))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deletePayment = async (id) => {
    if (!confirm("Delete this payment?")) return;
    try {
      await API.delete(`/payments/${id}`);
      setPayments((prev) => prev.filter((p) => p._id !== id));
      alert("🗑️ Payment deleted");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <table className="payment-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>UPI ID</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((p) => (
          <tr key={p._id}>
            <td>{p.name}</td>
            <td>₹{p.amount}</td>
            <td>{p.upiId}</td>
            <td>
              <select value={p.status} onChange={(e) => updateStatus(p._id, e.target.value)}>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </td>
            <td>
              <button onClick={() => deletePayment(p._id)}>🗑️ Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PaymentTable;
