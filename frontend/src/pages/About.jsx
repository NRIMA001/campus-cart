import Topbar from "../components/Topbar";
import "./StaticPage.css";

export default function About() {
  return (
    <>
      <Topbar title="About Us" subtitle="Learn about Campus Cart" />
      <div className="page-content">
        <div className="static-page animate-slide-up">
          <section className="static-section">
            <h2>What is Campus Cart?</h2>
            <p>
              Campus Cart is a student-only marketplace built to help college students save money,
              reduce waste, and build stronger campus communities. Our platform lets verified students
              rent, buy, sell, and share items with each other — safely and easily.
            </p>
          </section>

          <section className="static-section">
            <h2>Our Mission</h2>
            <p>
              College students deal with financial stress from tuition, books, housing, and everyday supplies.
              Many end up buying things they only need temporarily, leading to wasted money and clutter.
              Campus Cart solves this by creating a trusted marketplace where every user is verified with
              a .edu email address.
            </p>
          </section>

          <section className="static-section">
            <h2>Why Campus Cart?</h2>
            <div className="about-features">
              <div className="about-feature">
                <span className="about-feature-icon">🔒</span>
                <h3>Safe & Verified</h3>
                <p>Every user verified with .edu email. No scams, no strangers.</p>
              </div>
              <div className="about-feature">
                <span className="about-feature-icon">💸</span>
                <h3>Student Friendly</h3>
                <p>Rent what you need instead of buying. Save money every semester.</p>
              </div>
              <div className="about-feature">
                <span className="about-feature-icon">🌱</span>
                <h3>Sustainable</h3>
                <p>Share resources, reduce waste, and promote a circular campus economy.</p>
              </div>
            </div>
          </section>

          <section className="static-section">
            <h2>Our Team</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="team-avatar">N</div>
                <h3>Nitesh</h3>
                <p>System Architecture & Backend Lead</p>
              </div>
              <div className="team-member">
                <div className="team-avatar">S</div>
                <h3>Sujal</h3>
                <p>Application Logic & UX Lead</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
