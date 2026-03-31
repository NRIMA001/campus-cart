import Topbar from "../components/Topbar";
import "./StaticPage.css";

export default function Terms() {
  return (
    <>
      <Topbar title="Terms & Conditions" />
      <div className="page-content">
        <div className="static-page animate-slide-up">
          <section className="static-section">
            <h2>Terms of Use</h2>
            <p>Last updated: March 2026</p>
            <p>By using Campus Cart you agree to the following terms:</p>
            <ol>
              <li>You must be a currently enrolled college student with a valid .edu email.</li>
              <li>You agree to provide accurate and truthful information in your listings.</li>
              <li>Campus Cart is not responsible for the condition or quality of items exchanged.</li>
              <li>All transactions are between individual students; Campus Cart acts as a platform only.</li>
              <li>You may not use the platform for illegal activities or items.</li>
              <li>We reserve the right to remove listings or users that violate our policies.</li>
            </ol>
          </section>
          <section className="static-section">
            <h2>User Responsibilities</h2>
            <p>Users are responsible for the accurate description of items, timely communication, and fair pricing. Any disputes should be resolved between the parties involved.</p>
          </section>
        </div>
      </div>
    </>
  );
}
