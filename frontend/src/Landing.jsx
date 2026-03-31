import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "./logo.png";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* Nav */}
      <nav className="landing-nav">
        <img src={logo} alt="Campus Cart" className="landing-logo" />
        <div className="landing-nav-links">
          <Link to="/login" className="btn btn-ghost">Login</Link>
          <Link to="/register" className="btn btn-accent">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content animate-slide-up">
          <div className="hero-badge">🎓 Built for Students</div>
          <h1 className="hero-title">
            Your Campus<br />
            <span className="hero-accent">Marketplace</span>
          </h1>
          <p className="hero-subtitle">
            Rent, buy, sell, and share items with verified students on your campus.
            Save money. Reduce waste. Build community.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-accent btn-lg">
              Join Campus Cart
            </Link>
            <Link to="/login" className="btn btn-outline btn-lg">
              Sign In
            </Link>
          </div>
        </div>
        <div className="hero-visual animate-fade-in">
          <div className="hero-card hero-card-1">
            <span>📦</span>
            <div>
              <strong>Rent</strong>
              <p>Borrow what you need</p>
            </div>
          </div>
          <div className="hero-card hero-card-2">
            <span>💰</span>
            <div>
              <strong>Sell</strong>
              <p>List items for sale</p>
            </div>
          </div>
          <div className="hero-card hero-card-3">
            <span>🔑</span>
            <div>
              <strong>Let</strong>
              <p>Earn from your stuff</p>
            </div>
          </div>
          <div className="hero-card hero-card-4">
            <span>🛒</span>
            <div>
              <strong>Buy</strong>
              <p>Find deals on campus</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2 className="features-title">Why Campus Cart?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Verified Students Only</h3>
            <p>Every user verified with a .edu email. Safe trades within your campus community.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💸</div>
            <h3>Save Money</h3>
            <p>Why buy when you can rent? Get what you need at a fraction of the cost.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌱</div>
            <h3>Sustainable</h3>
            <p>Reduce waste by sharing resources. One student's surplus is another's solution.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Quick & Easy</h3>
            <p>List an item in under a minute. Find what you need with powerful search and filters.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2026 Campus Cart. Built by students, for students.</p>
        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
        </div>
      </footer>
    </div>
  );
}