import "./EmptyState.css";

export default function EmptyState({ icon = "🔍", title, message }) {
  return (
    <div className="empty-state animate-fade-in">
      <div className="empty-icon">{icon}</div>
      {title && <h3 className="empty-title">{title}</h3>}
      {message && <p className="empty-message">{message}</p>}
    </div>
  );
}
