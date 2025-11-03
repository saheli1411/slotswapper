// frontend/src/pages/SwapRequests.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SwapRequests = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ Dummy data (you’ll replace with real API later)
  const dummyRequests = [
    {
      _id: "1",
      requestedBy: { name: "John Doe" },
      mySlot: { title: "Morning Shift" },
      theirSlot: { title: "Evening Shift" },
      status: "pending",
    },
    {
      _id: "2",
      requestedBy: { name: "Alice Smith" },
      mySlot: { title: "Weekend Slot" },
      theirSlot: { title: "Weekday Slot" },
      status: "approved",
    },
    {
      _id: "3",
      requestedBy: { name: "Mark Lee" },
      mySlot: { title: "Night Shift" },
      theirSlot: { title: "Day Shift" },
      status: "rejected",
    },
  ];

  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      // ✅ Simulate backend fetch
      setTimeout(() => {
        setRequests(dummyRequests);
      }, 500);
    }
  }, []);

  const handleResponse = (id, status) => {
    const updated = requests.map((req) =>
      req._id === id ? { ...req, status } : req
    );
    setRequests(updated);
    setMessage(`Request ${status} successfully!`);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto" }}>
      <h1>My Swap Requests</h1>

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginBottom: "20px",
          padding: "6px 12px",
          backgroundColor: "#ddd",
          border: "none",
          cursor: "pointer",
        }}
      >
        ⬅ Back to Dashboard
      </button>

      {message && <p style={{ color: "green" }}>{message}</p>}

      {requests.length === 0 ? (
        <p>Loading requests...</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {requests.map((req) => (
            <li
              key={req._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <p>
                <strong>Requested By:</strong> {req.requestedBy.name}
              </p>
              <p>
                <strong>My Slot:</strong> {req.mySlot.title}
              </p>
              <p>
                <strong>Their Slot:</strong> {req.theirSlot.title}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color:
                      req.status === "pending"
                        ? "orange"
                        : req.status === "approved"
                        ? "green"
                        : "red",
                    fontWeight: "bold",
                  }}
                >
                  {req.status.toUpperCase()}
                </span>
              </p>

              {req.status === "pending" && (
                <div>
                  <button
                    onClick={() => handleResponse(req._id, "approved")}
                    style={{
                      backgroundColor: "#4caf50",
                      color: "white",
                      border: "none",
                      marginRight: "10px",
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleResponse(req._id, "rejected")}
                    style={{
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    Reject
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SwapRequests;
