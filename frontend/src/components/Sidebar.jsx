import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Icon from "./Icon";
import logo from "../logo.png";
import "./Sidebar.css";

const browseLinks = [
  { label: "Dashboard", path: "/dashboard", icon: "dashboard" },
  { label: "Rent",      path: "/rent",      icon: "key" },
  { label: "Let",       path: "/let",       icon: "box" },
  { label: "Buy",       path: "/buy",       icon: "cart" },
  { label: "Sell",      path: "/sell",      icon: "dollar" },
  { label: "Favorites", path: "/favorites", icon: "heart" },
];

const supportLinks = [
  { label: "Messages",         path: "/messages", icon: "message" },
  { label: "Customer Support", path: "/support",  icon: "headphones" },
  { label: "About Us",         path: "/about",    icon: "info" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { userProfile, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
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
            <span className="nav-icon"><Icon name={link.icon} size={16} /></span>
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
            <span className="nav-icon"><Icon name={link.icon} size={16} /></span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-pill">
          <div className="user-avatar">
            {userProfile?.fullName ? userProfile.fullName[0].toUpperCase() : "U"}
          </div>
          <div className="user-info">
            <div className="user-name">{userProfile?.fullName || "Student"}</div>
            <div className="user-university">{userProfile?.university || ""}</div>
          </div>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}
