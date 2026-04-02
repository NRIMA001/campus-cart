import { useNavigate, Link } from "react-router-dom";
import Icon from "./components/Icon";
import logo from "./logo.png";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <nav className="landing-nav">
        <img src={logo} alt="Campus Cart" className="landing-logo" />
        <div className="landing-nav-links">
          <Link to="/login" className="btn btn-ghost">Login</Link>
          <Link to="/register" className="btn btn-accent">Get Started</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content animate-slide-up">
          <div className="hero-badge"><Icon name="cap" size={14} /> For Students</div>
          <h1 className="hero-title">
            Your Campus<br />
            <span className="hero-accent">Marketplace</span>
          </h1>
          <p className="hero-subtitle">
            The easiest way for college students to rent, buy, and sell
            items on campus. Skip the overpriced stores — get what you
            need from people who get it.
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
            <span className="hero-card-icon"><Icon name="box" size={20} /></span>
            <div>
              <strong>Rent</strong>
              <p>Borrow what you need</p>
            </div>
          </div>
          <div className="hero-card hero-card-2">
            <span className="hero-card-icon"><Icon name="dollar" size={20} /></span>
            <div>
              <strong>Sell</strong>
              <p>Pass it on, get paid</p>
            </div>
          </div>
          <div className="hero-card hero-card-3">
            <span className="hero-card-icon"><Icon name="key" size={20} /></span>
            <div>
              <strong>Let</strong>
              <p>List your stuff for rent</p>
            </div>
          </div>
          <div className="hero-card hero-card-4">
            <span className="hero-card-icon"><Icon name="cart" size={20} /></span>
            <div>
              <strong>Buy</strong>
              <p>Good deals, no shipping</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <h2 className="features-title">Why Campus Cart?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><Icon name="lock" size={22} /></div>
            <h3>Students Only</h3>
            <p>Every account is tied to a .edu email. You're only ever trading with people on your campus.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Icon name="savings" size={22} /></div>
            <h3>Keep More Money</h3>
            <p>Rent a projector for the weekend instead of buying one. Sell your old textbooks instead of tossing them.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Icon name="leaf" size={22} /></div>
            <h3>Less Waste</h3>
            <p>Things get reused instead of thrown out. Fewer trips to the store, fewer boxes in the trash.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Icon name="zap" size={22} /></div>
            <h3>Takes a Minute</h3>
            <p>Post a listing in under 60 seconds. Browse what's available and message the seller directly.</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <p>&copy; 2026 Campus Cart</p>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
        </div>
      </footer>
    </div>
  );
}