import { useParams, useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";
import { getItemById, mockRentItems } from "../data/mockData";
import ItemCard from "../components/ItemCard";
import EmptyState from "../components/EmptyState";
import "./ItemDetail.css";

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = getItemById(id);

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

  const related = mockRentItems.filter(i => i.category === item.category && i.id !== item.id).slice(0, 3);

  return (
    <>
      <Topbar
        title={item.name}
        actions={
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>← Back</button>
        }
      />
      <div className="page-content">
        <div className="detail-layout animate-fade-in">
          <div className="detail-image-wrap">
            <img src={item.image} alt={item.name} className="detail-image" />
            <span className="badge badge-navy detail-category">{item.category}</span>
          </div>

          <div className="detail-info">
            <h1 className="detail-name">{item.name}</h1>
            <div className="detail-price">{item.price}</div>

            {item.status && (
              <span className={`badge ${item.status === "Available" ? "badge-success" : "badge-warning"}`}>
                {item.status}
              </span>
            )}

            <p className="detail-description">
              This item is listed by a verified student on Campus Cart. Contact the seller for more details about condition, pickup location, and availability.
            </p>

            <div className="detail-meta">
              <div className="detail-meta-item">
                <span className="detail-meta-label">Category</span>
                <span>{item.category}</span>
              </div>
              <div className="detail-meta-item">
                <span className="detail-meta-label">Listed by</span>
                <span>Verified Student</span>
              </div>
            </div>

            <div className="detail-actions">
              <button className="btn btn-accent btn-lg">
                {item.price?.includes("/") ? "Rent Now" : "Buy Now"}
              </button>
              <button className="btn btn-outline btn-lg">
                💬 Message Seller
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="detail-related">
            <h3>Related Items</h3>
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
