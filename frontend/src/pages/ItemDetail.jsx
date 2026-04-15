import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Topbar from "../components/Topbar";
import Icon from "../components/Icon";
import ItemCard from "../components/ItemCard";
import EmptyState from "../components/EmptyState";
import { useCart } from "../contexts/CartContext";
import { getItemById, getAllItems } from "../data/mockData";
import "./ItemDetail.css";

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = getItemById(id);
  const { addToCart, isInCart, cartCount } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  if (!item) {
    return (
      <>
        <Topbar title="Item Not Found" />
        <div className="page-content">
          <EmptyState icon="alert-circle" title="Item not found" message="This item may have been removed" />
        </div>
      </>
    );
  }

  const isRental = item.price?.includes("/");
  const alreadyInCart = isInCart(item.id);

  const related = getAllItems()
    .filter(i => i.category === item.category && i.id !== item.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(item, quantity);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  return (
    <>
      <Topbar
        title="Product Details"
        actions={
          <div className="detail-topbar-actions">
            <button className="btn btn-ghost" onClick={() => navigate(-1)}>
              <Icon name="arrow-left" size={14} /> Back
            </button>
            <Link to="/checkout" className="btn btn-outline detail-cart-btn">
              <Icon name="shopping-cart" size={15} />
              Cart
              {cartCount > 0 && <span className="cart-badge-sm">{cartCount}</span>}
            </Link>
          </div>
        }
      />
      <div className="page-content">
        {/* Breadcrumb */}
        <div className="detail-breadcrumb animate-fade-in">
          <Link to={isRental ? "/rent" : "/buy"}>{isRental ? "Rent" : "Buy"}</Link>
          <span className="breadcrumb-sep">/</span>
          <span>{item.category}</span>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{item.name}</span>
        </div>

        {/* Main product layout */}
        <div className="detail-layout animate-fade-in">
          {/* Image Section */}
          <div className="detail-image-section">
            <div className="detail-image-wrap">
              <img src={item.image} alt={item.name} className="detail-image" />
              <span className="badge badge-navy detail-category">{item.category}</span>
              {item.status && (
                <span className={`badge detail-status ${item.status === "Available" ? "badge-success" : "badge-warning"}`}>
                  {item.status}
                </span>
              )}
            </div>
            {/* Trust badges */}
            <div className="detail-trust-row">
              <div className="trust-badge">
                <Icon name="shield" size={14} color="var(--color-accent)" />
                <span>Verified Student</span>
              </div>
              <div className="trust-badge">
                <Icon name="check-circle" size={14} color="#16a34a" />
                <span>Campus Pickup</span>
              </div>
              <div className="trust-badge">
                <Icon name="message" size={14} color="var(--color-navy)" />
                <span>Chat Available</span>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="detail-info">
            <h1 className="detail-name">{item.name}</h1>
            <div className="detail-price-row">
              <div className="detail-price">{item.price}</div>
              {isRental && <span className="detail-price-note">per day rental</span>}
            </div>

            {item.condition && (
              <div className="detail-condition">
                <span className="condition-label">Condition:</span>
                <span className={`condition-value ${item.condition === "Like New" ? "condition-great" : "condition-good"}`}>
                  {item.condition}
                </span>
              </div>
            )}

            <div className="detail-description-section">
              <h3 className="detail-section-title">Description</h3>
              <p className="detail-description">
                {item.description || "Listed by a verified student. Message the seller for details on condition, pickup, and availability."}
              </p>
            </div>

            {/* Meta grid */}
            <div className="detail-meta">
              <div className="detail-meta-item">
                <Icon name="user" size={14} color="var(--color-text-muted)" />
                <div>
                  <span className="detail-meta-label">Seller</span>
                  <span className="detail-meta-value">{item.seller || "Verified Student"}</span>
                </div>
              </div>
              <div className="detail-meta-item">
                <Icon name="map-pin" size={14} color="var(--color-text-muted)" />
                <div>
                  <span className="detail-meta-label">University</span>
                  <span className="detail-meta-value">{item.university || "Campus"}</span>
                </div>
              </div>
              <div className="detail-meta-item">
                <Icon name="clock" size={14} color="var(--color-text-muted)" />
                <div>
                  <span className="detail-meta-label">Posted</span>
                  <span className="detail-meta-value">{item.postedDate || "Recently"}</span>
                </div>
              </div>
              <div className="detail-meta-item">
                <Icon name="package" size={14} color="var(--color-text-muted)" />
                <div>
                  <span className="detail-meta-label">Category</span>
                  <span className="detail-meta-value">{item.category}</span>
                </div>
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            {item.seller !== "You" && (
              <div className="detail-cart-section">
                <div className="quantity-selector">
                  <span className="quantity-label">{isRental ? "Days:" : "Qty:"}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    <Icon name="minus" size={14} />
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => setQuantity(q => q + 1)}
                  >
                    <Icon name="plus" size={14} />
                  </button>
                </div>

                <div className="detail-actions">
                  <button
                    className={`btn btn-accent btn-lg detail-add-btn ${addedFeedback ? "added" : ""}`}
                    onClick={handleAddToCart}
                  >
                    <Icon name={addedFeedback ? "check-circle" : "shopping-cart"} size={17} />
                    {addedFeedback
                      ? "Added to Cart!"
                      : alreadyInCart
                      ? "Add More to Cart"
                      : isRental
                      ? "Add Rental to Cart"
                      : "Add to Cart"}
                  </button>
                  <button className="btn btn-outline btn-lg">
                    <Icon name="message" size={16} /> Message Seller
                  </button>
                </div>

                {alreadyInCart && !addedFeedback && (
                  <Link to="/checkout" className="detail-go-checkout">
                    <Icon name="shopping-cart" size={14} />
                    Already in cart — Go to Checkout
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Items */}
        {related.length > 0 && (
          <div className="detail-related animate-slide-up">
            <h3 className="detail-related-title">Similar Items You Might Like</h3>
            <div className="detail-related-grid">
              {related.map(r => (
                <ItemCard key={r.id} item={r} actionLabel="View Details" />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
