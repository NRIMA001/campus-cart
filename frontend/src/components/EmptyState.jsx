import Icon from "./Icon";
import "./EmptyState.css";

export default function EmptyState({ icon = "search", title, message }) {
  return (
    <div className="empty-state animate-fade-in">
      <div className="empty-icon"><Icon name={icon} size={32} color="var(--color-text-muted)" /></div>
      {title && <h3 className="empty-title">{title}</h3>}
      {message && <p className="empty-message">{message}</p>}
    </div>
  );
}
