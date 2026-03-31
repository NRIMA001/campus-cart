import { NavLink, useNavigate } from "react-router-dom";
import logo from "../logo.png";
import "./Sidebar.css";

const browseLinks = [
  { label: "Dashboard", path: "/dashboard", icon: "📊" },
  { label: "Rent",      path: "/rent",      icon: "🔑" },
  { label: "Let",       path: "/let",       icon: "📦" },
  { label: "Buy",       path: "/buy",       icon: "🛒" },
  { label: "Sell",      path: "/sell",      icon: "💰" },
  { label: "Favorites", path: "/favorites", icon: "♥" },
];

const supportLinks = [
  { label: "Messages",          path: "/messages", icon: "💬" },
  { label: "Customer Support",  path: "/support",  icon: "🎧" },
  { label: "About Us",          path: "/about",    icon: "ℹ️" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  })();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="CampusCart" className="sidebar-logo-img" />
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-label">Browse</div>
        {browseLinks.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <span className="nav-icon">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}

        <div className="nav-section-label">Support</div>
        {supportLinks.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <span className="nav-icon">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-pill">
          <div className="user-avatar">
            {user?.fullName ? user.fullName[0].toUpperCase() : "U"}
          </div>
          <div className="user-info">
            <div className="user-name">{user?.fullName || "Student"}</div>
            <div className="user-university">{user?.university || ""}</div>
          </div>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}
