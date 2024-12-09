import "../css/Login.css";
import { BASE_URL } from "../constant/constant";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseUrl = BASE_URL;
    const loginUrl = `${baseUrl}/auth/login`;

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user?.role);
        navigate("/");
      } else {
        setError(data.message || "Login failed, please try again.");
      }
    } catch (err) {
      setError("An error occurred, please try again.");
      console.error(err);
    }
  };
  return (
    <div>
      {" "}
      <div className="signup-container">
        {" "}
        <h2>Login to Your Account</h2>{" "}
        <img src="./Login.jpg" alt="" className="signup__img" />
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
