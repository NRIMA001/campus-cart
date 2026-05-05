import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Topbar from "../components/Topbar";
import Icon from "../components/Icon";
import ItemCard from "../components/ItemCard";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { getItemById, getAllItems } from "../data/mockData";
import { fetchItemById, fetchItems, createOrder, updateItem } from "../services/firestoreService";
import "./ItemDetail.css";

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart, cartCount } = useCart();
  const { user, userProfile } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [item, setItem] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadItem() {
      setLoading(true);

      // Try mock data first (numeric IDs)
      const mockItem = getItemById(id);
      if (mockItem) {
        setItem(mockItem);
        // Get related from mock
        const allMock = getAllItems();
        setRelated(allMock.filter(i => i.category === mockItem.category && i.id !== mockItem.id).slice(0, 4));
        setLoading(false);
        return;
      }

      // Try Firestore (string doc IDs)
      try {
        const fsItem = await fetchItemById(id);
        if (fsItem) {
          setItem(fsItem);
          // Get related from Firestore
          const typeItems = await fetchItems(fsItem.type || "buy");
          setRelated(typeItems.filter(i => i.category === fsItem.category && i.id !== fsItem.id).slice(0, 4));
        }
      } catch (err) {
        console.error("Error loading item:", err);
      }

      setLoading(false);
    }
    loadItem();
  }, [id]);

  if (loading) {
    return (
      <>
        <Topbar title="Product Details" />
        <div className="page-content">
          <LoadingSpinner message="Loading item details…" />
        </div>
      </>
    );
  }

  if (!item) {
    return (
      <>
        <Topbar title="Item Not Found" />
        <div className="page-content">
          <EmptyState icon="😕" title="Item not found" message="This item may have been removed" />
        </div>
      </>
    );
  }

  const isRental = item.price?.includes("/");
  const alreadyInCart = isInCart(item.id);
  const isMockItem = typeof item.id === "number";
  const isOwnItem = item.sellerId && user && item.sellerId === user.uid;
  const isSoldOrRented = item.status === "Sold" || item.status === "On Rent";

  /* ── Handle "Buy Now" / "Rent Now" click ── */
  const handleBuyOrRent = async () => {
    if (isSoldOrRented) return;

    // For mock items, just add to cart
    if (isMockItem) {
      addToCart(item, quantity);
      setAddedFeedback(true);
      setTimeout(() => setAddedFeedback(false), 2000);
      navigate("/checkout");
      return;
    }

    // For Firestore items, create an order and update item status
    setProcessing(true);
    try {
      // Create order record
      await createOrder({
        itemId: item.id,
        itemName: item.name,
        itemImage: item.image,
        itemPrice: item.price,
        numericPrice: item.numericPrice || 0,
        category: item.category,
        type: isRental ? "rental" : "purchase",
        buyerId: user.uid,
        buyerName: userProfile?.fullName || "Student",
        buyerEmail: user.email,
        sellerId: item.sellerId,
        sellerName: item.sellerName || item.seller || "Student",
        university: item.university || "Campus",
        quantity,
      });

      // Update item status
      const newStatus = isRental ? "On Rent" : "Sold";
      await updateItem(item.id, { status: newStatus });
      setItem({ ...item, status: newStatus });

      // Also add to cart for the checkout flow
      addToCart(item, quantity);
      navigate("/checkout");
    } catch (err) {
      console.error("Error processing order:", err);
      // If the Firestore order fails, still allow cart-based flow
      addToCart(item, quantity);
      navigate("/checkout");
    } finally {
      setProcessing(false);
    }
  };

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
          <button className="btn btn-ghost" onClick={() => navigate(-1)}><Icon name="arrow-left" size={14} /> Back</button>
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
                <span className={`badge detail-status ${item.status === "Available" ? "badge-success" : item.status === "Sold" ? "badge-danger" : "badge-warning"}`}>
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

            {item.description ? (
              <p className="detail-description">{item.description}</p>
            ) : (
              <p className="detail-description">
                Listed by a verified student. Message the seller for details on condition, pickup, and availability.
              </p>
            )}

            {/* Meta grid */}
            <div className="detail-meta">
              <div className="detail-meta-item">
                <Icon name="user" size={14} color="var(--color-text-muted)" />
                <div>
                  <span className="detail-meta-label">Seller</span>
                  <span className="detail-meta-value">{item.sellerName || item.seller || "Verified Student"}</span>
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

            {/* Actions */}
            <div className="detail-actions">
              {isOwnItem ? (
                <button className="btn btn-outline btn-lg" disabled>
                  <Icon name="user" size={16} /> This Is Your Listing
                </button>
              ) : isSoldOrRented ? (
                <button className="btn btn-lg" disabled style={{ opacity: 0.6 }}>
                  {item.status === "Sold" ? "Item Sold" : "Currently Rented"}
                </button>
              ) : (
                <button
                  className="btn btn-accent btn-lg"
                  onClick={handleBuyOrRent}
                  disabled={processing}
                >
                  {processing ? (
                    <>Processing…</>
                  ) : addedFeedback ? (
                    <><Icon name="check-circle" size={16} /> Added!</>
                  ) : (
                    <>{isRental ? "Rent Now" : "Buy Now"}</>
                  )}
                </button>
              )}
              {!isOwnItem && item.sellerId && (
                <button
                  className="btn btn-outline btn-lg"
                  onClick={() => navigate(
                    `/messages?to=${item.sellerId}&toName=${encodeURIComponent(item.sellerName || item.seller || "Student")}&itemId=${item.id}&itemName=${encodeURIComponent(item.name)}&itemImage=${encodeURIComponent(item.image || "")}`
                  )}
                >
                  <Icon name="message" size={16} /> Message Seller
                </button>
              )}
            </div>
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
