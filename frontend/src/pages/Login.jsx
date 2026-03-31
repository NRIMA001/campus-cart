import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from "../logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const apiUrl = import.meta.env.VITE_API_URL;

    // Try real backend if API URL is configured
    if (apiUrl) {
      try {
        const res = await axios.post(`${apiUrl}/api/auth/login`, {
          email,
          password,
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
        return;
      } catch (err) {
        alert(err.response?.data?.message || "Login failed");
        return;
      }
    }

    // Dev mode — no backend needed
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    const mockUser = {
      id: "dev-user-1",
      fullName: email.split("@")[0] || "Student",
      email,
      university: "SUNY Plattsburgh",
      role: "student",
    };
    localStorage.setItem("token", "dev-token");
    localStorage.setItem("user", JSON.stringify(mockUser));
    navigate("/dashboard");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <img src={logo} alt="CampusCart Logo" className="logo" />
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to your account</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}