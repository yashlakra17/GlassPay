import React, { useEffect, useState } from "react";
import PaymentForm from "../components/PaymentForm";
import PaymentTable from "../components/PaymentTable";
import API from "../api";

const Dashboard = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    API.get("/payments")
      .then((res) => setPayments(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addPayment = (payment) => setPayments([payment, ...payments]);

  return (
    <div className="dashboard">
      <h1>💳 Payment Management Dashboard</h1>
      <PaymentForm onAdd={addPayment} />
      <PaymentTable payments={payments} setPayments={setPayments} />
    </div>
  );
};

export default Dashboard;
