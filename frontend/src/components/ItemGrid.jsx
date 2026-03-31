import "./ItemGrid.css";

export default function ItemGrid({ children, title, count }) {
  return (
    <div className="item-grid-section animate-fade-in">
      {(title || count !== undefined) && (
        <div className="section-header">
          {title && <span className="section-title">{title}</span>}
          {count !== undefined && <span className="badge badge-accent">{count} items</span>}
        </div>
      )}
      <div className="items-grid">
        {children}
      </div>
    </div>
  );
}
