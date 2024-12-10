import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "../css/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="app-name">Blog </h1>
      </div>
      <div className="navbar-right">
        {token ? (
          <>
            <Link to="/blog" className="navbar-link">
              blog
            </Link>

            <button onClick={handleLogout} className="navbar-link--btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">
              Login
            </Link>

            <Link to="/signup" className="navbar-link">
              Signup
            </Link>
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}