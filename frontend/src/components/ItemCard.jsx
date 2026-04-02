import { useNavigate } from "react-router-dom";
import Icon from "./Icon";
import "./ItemCard.css";

export default function ItemCard({
  item,
  onFavorite,
  isFavorited,
  actionLabel = "Rent Now",
  onAction,
  showOwnerActions = false,
  onEdit,
  onDelete,
}) {
  const navigate = useNavigate();

  return (
    <div className="item-card card" onClick={() => navigate(`/item/${item.id}`)}>
      <div className="card-img-wrap">
        <img className="card-img" src={item.image} alt={item.name} />
        <span className="badge badge-navy card-category">{item.category}</span>
        {item.status && (
          <span className={`badge card-status ${item.status === "Available" ? "badge-success" : "badge-warning"}`}>
            {item.status}
          </span>
        )}
      </div>
      <div className="card-body">
        <div className="card-name">{item.name}</div>
        <div className="card-price">{item.price}</div>

        {showOwnerActions ? (
          <div className="card-actions">
            <button className="btn btn-sm btn-outline" onClick={e => { e.stopPropagation(); onEdit?.(item); }}>
              <Icon name="edit" size={13} /> Edit
            </button>
            <button className="btn btn-sm btn-danger" onClick={e => { e.stopPropagation(); onDelete?.(item); }}>
              <Icon name="trash" size={13} /> Remove
            </button>
          </div>
        ) : (
          <div className="card-actions">
            <button
              className="btn btn-primary card-action-btn"
              onClick={e => { e.stopPropagation(); onAction?.(item); }}
            >
              {actionLabel}
            </button>
            {onFavorite && (
              <button
                className="btn-save"
                onClick={e => { e.stopPropagation(); onFavorite(item.id); }}
                style={{ color: isFavorited ? "var(--color-accent)" : "var(--color-text-muted)" }}
              >
                <Icon name={isFavorited ? "heart" : "heart-outline"} size={16} strokeWidth={isFavorited ? 2.5 : 1.8} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
