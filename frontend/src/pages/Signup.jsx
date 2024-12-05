import React, { useState } from "react";
import "../css/Signup.css";
import { BASE_URL } from '../constant/constant';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseUrl = BASE_URL;
    const signupUrl = `${baseUrl}/auth/signup`;
    try {
      const response = await fetch(signupUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Signup successful!");
        setFormData({ name: "", email: "", password: "" });
      } else {
        setError(data.message || "Signup failed, please try again.");
      }
    } catch (err) {
      setError("An error occurred, please try again.");
      console.error(err);
    }
  };

  return (
    <div>
      <div className="signup-container">
        <h2>Create an Account</h2>
        <img src="./Signup.jpg" alt="" className="signup__img" />
        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
}
