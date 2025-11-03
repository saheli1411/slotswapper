// frontend/src/pages/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}>
      <h1>Dashboard is working 🎉</h1>
      <button onClick={() => navigate("/swap-requests")} style={{ marginRight: "10px" }}>My Swap Requests</button>
      <button
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}
        style={{ marginLeft: "10px" }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
