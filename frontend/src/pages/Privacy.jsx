import Topbar from "../components/Topbar";
import "./StaticPage.css";

export default function Privacy() {
  return (
    <>
      <Topbar title="Privacy Policy" />
      <div className="page-content">
        <div className="static-page animate-slide-up">
          <section className="static-section">
            <h2>Privacy Policy</h2>
            <p>Last updated: March 2026</p>
            <p>Campus Cart is committed to protecting your privacy. This policy explains how we handle your personal information.</p>
          </section>
          <section className="static-section">
            <h2>Information We Collect</h2>
            <ul>
              <li>Full name and .edu email address</li>
              <li>University affiliation</li>
              <li>Item listings and transaction history</li>
              <li>Messages sent through the platform</li>
            </ul>
          </section>
          <section className="static-section">
            <h2>How We Use Your Information</h2>
            <ul>
              <li>To verify your student status</li>
              <li>To display your listings to other students</li>
              <li>To facilitate communication between buyers and sellers</li>
              <li>To improve our platform and user experience</li>
            </ul>
          </section>
          <section className="static-section">
            <h2>Data Protection</h2>
            <p>We use industry-standard security measures to protect your data. Your password is encrypted and never stored in plain text. We will never sell your personal information to third parties.</p>
          </section>
        </div>
      </div>
    </>
  );
}
