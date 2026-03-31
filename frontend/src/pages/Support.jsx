import Topbar from "../components/Topbar";
import "./StaticPage.css";

export default function Support() {
  return (
    <>
      <Topbar title="Customer Support" subtitle="We're here to help" />
      <div className="page-content">
        <div className="static-page animate-slide-up">
          <section className="static-section">
            <h2>Frequently Asked Questions</h2>

            <div className="faq-list">
              <details className="faq-item">
                <summary>How do I create an account?</summary>
                <p>Click "Get Started" on the landing page and register with your .edu email address, full name, university, and a password.</p>
              </details>

              <details className="faq-item">
                <summary>How do I list an item for rent?</summary>
                <p>Go to the "Let" page from the sidebar, click "Add New Item", fill in the details, and submit your listing.</p>
              </details>

              <details className="faq-item">
                <summary>How do I sell an item?</summary>
                <p>Navigate to the "Sell" page, click "List New Item", add your item details and price, and submit.</p>
              </details>

              <details className="faq-item">
                <summary>Is my information safe?</summary>
                <p>Yes! All users are verified with .edu emails, and we use secure authentication to protect your data.</p>
              </details>

              <details className="faq-item">
                <summary>How do I contact a seller?</summary>
                <p>Click "Message Seller" on any item's detail page to start a conversation.</p>
              </details>

              <details className="faq-item">
                <summary>Can I cancel a rental?</summary>
                <p>Contact the item owner through the messaging system to arrange cancellations.</p>
              </details>
            </div>
          </section>

          <section className="static-section">
            <h2>Contact Us</h2>
            <p>Need more help? Reach out to us at <strong>support@campuscart.edu</strong></p>
          </section>
        </div>
      </div>
    </>
  );
}
