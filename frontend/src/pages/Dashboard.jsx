import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../logo.png";

const mockItems = [
  { id: 1, name: "Electric Drill", price: "$5/day", category: "Tools", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80" },
  { id: 2, name: "Scientific Calculator", price: "$3/day", category: "School", image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80" },
  { id: 3, name: "Mini Fridge", price: "$20/week", category: "Appliances", image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&q=80" },
  { id: 4, name: "Projector", price: "$15/day", category: "Electronics", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80" },
  { id: 5, name: "Textbook Bundle", price: "$10/week", category: "School", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80" },
  { id: 6, name: "Bicycle", price: "$8/day", category: "Transport", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80" },
];

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [activeLink, setActiveLink] = useState("Rent");
  const [favorites, setFavorites] = useState([]);

  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  })();

  useEffect(() => {
    setItems(mockItems);
  }, []);

  const filtered = items
  .filter(item => activeLink === "Favorites" ? favorites.includes(item.id) : true)
  .filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }

        .dashboard-root {
          display: flex;
          height: 100vh;
          background: #f5f4f0;
          overflow: hidden;
        }

        .sidebar {
          width: 260px;
          min-width: 260px;
          background: #0f1d2e;
          display: flex;
          flex-direction: column;
          padding: 28px 0;
          position: relative;
          overflow: hidden;
        }

        .sidebar::before {
          content: '';
          position: absolute;
          bottom: -60px;
          left: -60px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(220,80,60,0.18) 0%, transparent 70%);
          pointer-events: none;
        }

        .sidebar-logo {
          padding: 0 24px 32px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        .logo-mark {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-icon {
          width: 34px;
          height: 34px;
          background: linear-gradient(135deg, #dc503c, #e8754a);
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Sora', sans-serif;
          font-weight: 700;
          font-size: 15px;
          color: white;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(220,80,60,0.4);
        }

        .logo-text {
          font-family: 'Sora', sans-serif;
          font-weight: 600;
          font-size: 15px;
          color: white;
          letter-spacing: -0.3px;
          line-height: 1.2;
        }

        .logo-sub {
          font-size: 10px;
          color: rgba(255,255,255,0.35);
          font-weight: 400;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .sidebar-nav {
          flex: 1;
          padding: 20px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .nav-section-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          padding: 0 12px;
          margin: 8px 0 6px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          border-radius: 8px;
          color: rgba(255,255,255,0.55);
          font-size: 13.5px;
          font-weight: 400;
          cursor: pointer;
          transition: all 0.18s ease;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
        }

        .nav-link:hover {
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.85);
        }

        .nav-link.active {
          background: rgba(220,80,60,0.15);
          color: #f08070;
          font-weight: 500;
        }

        .nav-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.5;
          flex-shrink: 0;
        }

        .nav-link.active .nav-dot {
          opacity: 1;
          background: #dc503c;
          box-shadow: 0 0 6px rgba(220,80,60,0.7);
        }

        .sidebar-footer {
          padding: 16px 24px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }

        .user-pill {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .user-avatar {
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, #3a5a8c, #5a7ab0);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          color: white;
          flex-shrink: 0;
        }

        .user-name {
          font-size: 12.5px;
          color: rgba(255,255,255,0.6);
          font-weight: 400;
        }

        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 32px;
          background: #f5f4f0;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }

        .topbar-left h1 {
          font-family: 'Sora', sans-serif;
          font-size: 20px;
          font-weight: 600;
          color: #111;
          letter-spacing: -0.5px;
        }

        .topbar-left p {
          font-size: 13px;
          color: #888;
          margin-top: 1px;
        }

        .search-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 13px;
          color: #aaa;
          font-size: 14px;
          pointer-events: none;
        }

        .search-input {
          background: white;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 10px;
          padding: 9px 16px 9px 38px;
          font-size: 13.5px;
          font-family: 'DM Sans', sans-serif;
          color: #333;
          width: 260px;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s;
        }

        .search-input:focus {
          border-color: rgba(220,80,60,0.4);
          box-shadow: 0 0 0 3px rgba(220,80,60,0.08);
        }

        .search-input::placeholder { color: #bbb; }

        .content {
          flex: 1;
          overflow-y: auto;
          padding: 28px 32px;
        }

        .content::-webkit-scrollbar { width: 5px; }
        .content::-webkit-scrollbar-track { background: transparent; }
        .content::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 10px; }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .section-title {
          font-family: 'Sora', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #111;
          letter-spacing: -0.3px;
        }

        .count-badge {
          background: rgba(220,80,60,0.1);
          color: #dc503c;
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 20px;
        }

        .items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
        }

        .item-card {
          background: white;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.06);
          cursor: pointer;
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
        }

        .item-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.1);
          border-color: rgba(220,80,60,0.2);
        }

        .card-img-wrap {
          width: 100%;
          height: 160px;
          overflow: hidden;
          position: relative;
          background: #f0ede8;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .item-card:hover .card-img {
          transform: scale(1.05);
        }

        .card-category {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(15,29,46,0.75);
          backdrop-filter: blur(6px);
          color: rgba(255,255,255,0.9);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .card-body {
          padding: 14px 16px 16px;
        }

        .card-name {
          font-family: 'Sora', sans-serif;
          font-size: 14.5px;
          font-weight: 600;
          color: #111;
          letter-spacing: -0.3px;
          margin-bottom: 6px;
        }

        .card-price {
          font-size: 13px;
          color: #dc503c;
          font-weight: 600;
        }

        .card-actions {
          display: flex;
          gap: 8px;
          margin-top: 12px;
        }

        .btn-rent {
          flex: 1;
          background: #0f1d2e;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 0;
          font-size: 12.5px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.18s;
        }

        .btn-rent:hover { background: #1a2e45; }

        .btn-save {
          width: 34px;
          background: #f5f4f0;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 14px;
          transition: background 0.18s;
          flex-shrink: 0;
        }

        .btn-save:hover { background: #ede9e3; }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #aaa;
        }

        .empty-state p { font-size: 14px; margin-top: 8px; }
      `}</style>

<div className="dashboard-root">
  <aside className="sidebar">
    <div className="sidebar-logo">
    <img 
  src={logo}
  alt="CampusCart" 
  style={{ 
    width: "150px",
    height: "50px",
    objectFit: "contain"
  }} 
/>
    </div>

          <nav className="sidebar-nav">
          <div className="nav-section-label">Browse</div>
          {["Rent", "Let", "Buy", "Sell", "Favorites"].map(link => (
              <button
                key={link}
                className={`nav-link ${activeLink === link ? "active" : ""}`}
                onClick={() => setActiveLink(link)}
              >
                <span className="nav-dot" />
                {link}
              </button>
            ))}

            <div className="nav-section-label">Support</div>
            {["Messages", "Customer Support", "About Us"].map(link => (
              <button
                key={link}
                className={`nav-link ${activeLink === link ? "active" : ""}`}
                onClick={() => setActiveLink(link)}
              >
                <span className="nav-dot" />
                {link}
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="user-pill">
              <div className="user-avatar">
                {user?.name ? user.name[0].toUpperCase() : "U"}
              </div>
              <div className="user-name">{user?.name || "Student"}</div>
            </div>
          </div>
        </aside>

        <div className="main">
          <div className="topbar">
            <div className="topbar-left">
              <h1>{activeLink}</h1>
              <p>Find items from fellow students</p>
            </div>
            <div className="search-wrap">
              <span className="search-icon">🔍</span>
              <input
                className="search-input"
                placeholder="Search items..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="content">
            <div className="section-header">
              <span className="section-title">Available Items</span>
              <span className="count-badge">{filtered.length} items</span>
            </div>

            {filtered.length === 0 ? (
              <div className="empty-state">
                <div style={{ fontSize: 32 }}>🔍</div>
                <p>No items match "{search}"</p>
              </div>
            ) : (
              <div className="items-grid">
                {filtered.map(item => (
                  <div key={item.id} className="item-card">
                    <div className="card-img-wrap">
                      <img className="card-img" src={item.image} alt={item.name} />
                      <span className="card-category">{item.category}</span>
                    </div>
                    <div className="card-body">
                      <div className="card-name">{item.name}</div>
                      <div className="card-price">{item.price}</div>
                      <div className="card-actions">
                        <button className="btn-rent">Rent Now</button>
                        <button 
  className="btn-save"
  onClick={() => setFavorites(prev => 
    prev.includes(item.id) ? prev.filter(id => id !== item.id) : [...prev, item.id]
  )}
  style={{ color: favorites.includes(item.id) ? "#dc503c" : "#aaa", fontSize: "16px" }}
>
  {favorites.includes(item.id) ? "♥" : "♡"}
</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}