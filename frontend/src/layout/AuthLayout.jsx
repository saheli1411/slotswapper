import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

function AuthLayout() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #8360c3, #2ebf91)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          SlotSwapper
        </h1>

        <Outlet />

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <Link to="/signup" style={{ color: "#2ebf91", fontWeight: "bold" }}>
                Sign Up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#2ebf91", fontWeight: "bold" }}>
                Login
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default AuthLayout;