import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";
import Icon from "../components/Icon";
import EmptyState from "../components/EmptyState";
import { useCart } from "../contexts/CartContext";
import "./Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [step, setStep] = useState("cart"); // cart | details | confirmation
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    pickupLocation: "",
    notes: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setStep("confirmation");
    clearCart();
  };

  // Tax is 0 for student-to-student, just a service fee
  const serviceFee = cartItems.length > 0 ? 1.50 : 0;
  const grandTotal = cartTotal + serviceFee;

  if (step === "confirmation") {
    return (
      <>
        <Topbar title="Order Confirmed" />
        <div className="page-content">
          <div className="checkout-confirmation animate-scale-in">
            <div className="confirm-icon-wrap">
              <Icon name="check-circle" size={56} color="#16a34a" strokeWidth={1.5} />
            </div>
            <h2>Order Placed Successfully!</h2>
            <p className="confirm-subtitle">
              Your order has been submitted. The seller(s) will be notified and you'll receive a message to coordinate pickup.
            </p>
            <div className="confirm-details card">
              <div className="confirm-row">
                <span>Pickup Location</span>
                <span>{form.pickupLocation || "To be arranged"}</span>
              </div>
              <div className="confirm-row">
                <span>Contact</span>
                <span>{form.email}</span>
              </div>
              {form.notes && (
                <div className="confirm-row">
                  <span>Notes</span>
                  <span>{form.notes}</span>
                </div>
              )}
            </div>
            <div className="confirm-actions">
              <button className="btn btn-primary btn-lg" onClick={() => navigate("/dashboard")}>
                <Icon name="dashboard" size={16} /> Back to Dashboard
              </button>
              <button className="btn btn-outline btn-lg" onClick={() => navigate("/buy")}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Topbar
        title="Checkout"
        subtitle={`${cartItems.length} item${cartItems.length !== 1 ? "s" : ""} in your cart`}
        actions={
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>
            <Icon name="arrow-left" size={14} /> Continue Shopping
          </button>
        }
      />
      <div className="page-content">
        {cartItems.length === 0 && step === "cart" ? (
          <EmptyState
            icon="shopping-cart"
            title="Your cart is empty"
            message="Browse items and add them to your cart to get started"
          />
        ) : (
          <div className="checkout-layout animate-fade-in">
            {/* Left: Cart / Form */}
            <div className="checkout-main">
              {step === "cart" && (
                <>
                  <div className="checkout-section-header">
                    <h3><Icon name="shopping-cart" size={18} /> Cart Items</h3>
                    <button className="btn btn-sm btn-danger" onClick={clearCart}>
                      Clear All
                    </button>
                  </div>

                  <div className="cart-items-list">
                    {cartItems.map(ci => (
                      <div key={ci.id} className="cart-item card">
                        <img src={ci.image} alt={ci.name} className="cart-item-img" />
                        <div className="cart-item-info">
                          <Link to={`/item/${ci.id}`} className="cart-item-name">{ci.name}</Link>
                          <div className="cart-item-meta">
                            <span className="badge badge-navy">{ci.category}</span>
                            {ci.condition && <span className="cart-item-condition">{ci.condition}</span>}
                          </div>
                          <div className="cart-item-price">{ci.price}</div>
                        </div>
                        <div className="cart-item-controls">
                          <div className="cart-qty-selector">
                            <button
                              className="quantity-btn"
                              onClick={() => updateQuantity(ci.id, ci.quantity - 1)}
                            >
                              <Icon name="minus" size={12} />
                            </button>
                            <span className="cart-qty-val">{ci.quantity}</span>
                            <button
                              className="quantity-btn"
                              onClick={() => updateQuantity(ci.id, ci.quantity + 1)}
                            >
                              <Icon name="plus" size={12} />
                            </button>
                          </div>
                          <button
                            className="btn btn-sm btn-ghost cart-remove-btn"
                            onClick={() => removeFromCart(ci.id)}
                          >
                            <Icon name="x" size={13} /> Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    className="btn btn-accent btn-lg btn-full checkout-proceed-btn"
                    onClick={() => setStep("details")}
                  >
                    Proceed to Details <Icon name="arrow-left" size={14} className="icon-flip" />
                  </button>
                </>
              )}

              {step === "details" && (
                <>
                  <div className="checkout-section-header">
                    <h3><Icon name="user" size={18} /> Pickup & Contact Details</h3>
                    <button className="btn btn-sm btn-ghost" onClick={() => setStep("cart")}>
                      <Icon name="arrow-left" size={13} /> Back to Cart
                    </button>
                  </div>

                  <form className="checkout-form card" onSubmit={handlePlaceOrder}>
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        className="input"
                        name="fullName"
                        placeholder="Your full name"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Email *</label>
                        <input
                          className="input"
                          type="email"
                          name="email"
                          placeholder="you@university.edu"
                          value={form.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone</label>
                        <input
                          className="input"
                          type="tel"
                          name="phone"
                          placeholder="(555) 123-4567"
                          value={form.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Preferred Pickup Location *</label>
                      <input
                        className="input"
                        name="pickupLocation"
                        placeholder="e.g. Student Union, Library entrance"
                        value={form.pickupLocation}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Notes for Seller</label>
                      <textarea
                        className="input"
                        name="notes"
                        placeholder="Any special requests or preferred pickup time..."
                        value={form.notes}
                        onChange={handleChange}
                        rows={3}
                      />
                    </div>

                    <button type="submit" className="btn btn-accent btn-lg btn-full checkout-place-btn">
                      <Icon name="check-circle" size={17} /> Place Order — ${grandTotal.toFixed(2)}
                    </button>
                    <p className="checkout-disclaimer">
                      <Icon name="shield" size={12} /> Payment is handled directly between students at pickup. Campus Cart does not process payments.
                    </p>
                  </form>
                </>
              )}
            </div>

            {/* Right: Order Summary */}
            <div className="checkout-sidebar">
              <div className="order-summary card">
                <h3 className="summary-title">Order Summary</h3>
                <div className="summary-items">
                  {cartItems.map(ci => (
                    <div key={ci.id} className="summary-item">
                      <div className="summary-item-left">
                        <span className="summary-item-name">{ci.name}</span>
                        <span className="summary-item-qty">× {ci.quantity}</span>
                      </div>
                      <span className="summary-item-price">
                        ${((ci.numericPrice || 0) * ci.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="summary-divider" />
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Service Fee</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>
                <div className="summary-divider" />
                <div className="summary-row summary-total">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="checkout-guarantees">
                <div className="guarantee-item">
                  <Icon name="shield" size={15} color="var(--color-accent)" />
                  <div>
                    <strong>Student Verified</strong>
                    <span>All sellers are verified university students</span>
                  </div>
                </div>
                <div className="guarantee-item">
                  <Icon name="message" size={15} color="var(--color-accent)" />
                  <div>
                    <strong>Direct Communication</strong>
                    <span>Chat with sellers before and after purchase</span>
                  </div>
                </div>
                <div className="guarantee-item">
                  <Icon name="map-pin" size={15} color="var(--color-accent)" />
                  <div>
                    <strong>Campus Pickup</strong>
                    <span>Meet on campus for safe, convenient exchange</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
