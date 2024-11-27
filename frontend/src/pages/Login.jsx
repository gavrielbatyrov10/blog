import "../css/Login.css";

import React, { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div>
      {" "}
      <div className="signup-container">
        {" "}
        <h2>Login to Your Account</h2>{" "}
        {error && <div className="error-message">{error}</div>}{" "}
        <form className="signup-form" onSubmit={handleSubmit}>
          {" "}
          <label htmlFor="email">Email</label>{" "}
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />{" "}
          <label htmlFor="password">Password</label>{" "}
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />{" "}
          <button type="submit">Login</button>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
}
