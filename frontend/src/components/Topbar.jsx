import Icon from "./Icon";
import "./Topbar.css";

export default function Topbar({ title, subtitle, searchValue, onSearchChange, actions }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">{title}</h1>
        {subtitle && <p className="topbar-subtitle">{subtitle}</p>}
      </div>
      <div className="topbar-right">
        {onSearchChange && (
          <div className="search-wrap">
            <span className="search-icon"><Icon name="search" size={15} color="var(--color-text-muted)" /></span>
            <input
              className="search-input"
              placeholder="Search items..."
              value={searchValue || ""}
              onChange={e => onSearchChange(e.target.value)}
            />
          </div>
        )}
        {actions && <div className="topbar-actions">{actions}</div>}
      </div>
    </div>
  );
}
