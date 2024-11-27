import React from "react";

import { Link } from "react-router-dom";
import "../css/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="app-name">myDailyBlah</h1>
      </div>
      <div className="navbar-right">
        <Link to="/login" className="navbar-link">
          Login
        </Link>
        <Link to="/signup" className="navbar-link">
          Signup
        </Link>
      </div>
    </nav>
  );
}
