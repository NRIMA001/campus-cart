import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from "../logo.png";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    university: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, form);
      alert("Account created! Please login.");
      navigate("/login");
    } catch (err) {
      console.log("REGISTER FRONTEND ERROR:", err);
      alert(err.response?.data?.message || err.message || "Registration failed");
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <img src={logo} alt="CampusCart" className="logo" />
        <h2>Create Account</h2>
        <p className="subtitle">Join your campus marketplace</p>

        <form onSubmit={handleRegister}>
          <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Student Email (.edu)" onChange={handleChange} required />
          <input name="university" placeholder="University Name" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Create Account</button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}