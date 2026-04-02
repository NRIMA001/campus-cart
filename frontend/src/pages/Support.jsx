import Topbar from "../components/Topbar";
import "./StaticPage.css";

export default function Support() {
  return (
    <>
      <Topbar title="Support" subtitle="Got a question? Check here first" />
      <div className="page-content">
        <div className="static-page animate-slide-up">
          <section className="static-section">
            <h2>Common Questions</h2>

            <div className="faq-list">
              <details className="faq-item">
                <summary>How do I sign up?</summary>
                <p>Hit "Get Started" on the home page and fill out the form with your .edu email, name, university, and a password. That's it.</p>
              </details>

              <details className="faq-item">
                <summary>How do I list something for rent?</summary>
                <p>Go to the "Let" page from the sidebar, click "Add New Item", fill in the details, and submit. Your listing shows up right away.</p>
              </details>

              <details className="faq-item">
                <summary>How do I sell something?</summary>
                <p>Head to "Sell" in the sidebar, click "List New Item", add a title, price, and category, and you're live.</p>
              </details>

              <details className="faq-item">
                <summary>Is my data safe?</summary>
                <p>Yes. Authentication is handled through Firebase, passwords are never stored on our end, and every user is verified with a .edu email.</p>
              </details>

              <details className="faq-item">
                <summary>How do I message someone about their listing?</summary>
                <p>Open any item's detail page and click "Message Seller" to start a conversation.</p>
              </details>

              <details className="faq-item">
                <summary>Can I cancel a rental?</summary>
                <p>Reach out to the item owner through the messaging system to work it out.</p>
              </details>
            </div>
          </section>

          <section className="static-section">
            <h2>Still need help?</h2>
            <p>Email us at <strong>support@campuscart.edu</strong> and we'll get back to you.</p>
          </section>
        </div>
      </div>
    </>
  );
}
