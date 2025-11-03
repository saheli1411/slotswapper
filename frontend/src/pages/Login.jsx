// frontend/src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login Page</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          localStorage.setItem("token", "test123");
          navigate("/dashboard");
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", width: "100%", margin: "10px 0" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", width: "100%", margin: "10px 0" }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
