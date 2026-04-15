import { useState } from "react";
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
  const [justAdded, setJustAdded] = useState(false);

  const handleAction = (e) => {
    e.stopPropagation();
    if (onAction) {
      onAction(item);
      if (actionLabel.toLowerCase().includes("cart")) {
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 1200);
      }
    }
  };

  return (
    <div className="item-card card" onClick={() => navigate(`/item/${item.id}`)}>
      <div className="card-img-wrap">
        <img className="card-img" src={item.image} alt={item.name} loading="lazy" />
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
        {item.condition && (
          <div className="card-condition">{item.condition}</div>
        )}

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
              className={`btn card-action-btn ${justAdded ? "btn-added" : "btn-primary"}`}
              onClick={handleAction}
            >
              {justAdded ? (
                <><Icon name="check-circle" size={13} /> Added!</>
              ) : (
                <>{actionLabel.toLowerCase().includes("cart") && <Icon name="shopping-cart" size={13} />}{actionLabel}</>
              )}
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
