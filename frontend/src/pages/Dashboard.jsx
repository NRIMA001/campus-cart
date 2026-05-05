import { useState, useEffect } from "react";
import Topbar from "../components/Topbar";
import ItemCard from "../components/ItemCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Icon from "../components/Icon";
import { useAuth } from "../contexts/AuthContext";
import { fetchUserItems } from "../services/firestoreService";
import "./Dashboard.css";

export default function Dashboard() {
  const { user, userProfile } = useAuth();
  const [myRentals, setMyRentals] = useState([]);
  const [mySales, setMySales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      fetchUserItems(user.uid, "rent"),
      fetchUserItems(user.uid, "buy"),
    ])
      .then(([rentals, sales]) => {
        setMyRentals(rentals);
        setMySales(sales);
      })
      .catch((err) => console.error("Error loading dashboard:", err))
      .finally(() => setLoading(false));
  }, [user]);

  const letting = myRentals.filter(i => i.status === "On Rent");
  const favCount = (() => {
    try { return JSON.parse(localStorage.getItem("favorites"))?.length || 0; } catch { return 0; }
  })();

  return (
    <>
      <Topbar
        title="Dashboard"
        subtitle={`Welcome back, ${userProfile?.fullName || "Student"}!`}
      />
      <div className="page-content">
        {loading ? (
          <LoadingSpinner message="Loading dashboard…" />
        ) : (
          <>
            <div className="dash-greeting animate-slide-up">
              <div className="dash-greeting-text">
                <h2>Your Activity</h2>
                <p>Here's what's going on with your listings and rentals.</p>
              </div>
            </div>

            <div className="dash-stats animate-slide-up">
              <div className="stat-card">
                <div className="stat-icon"><Icon name="key" size={20} /></div>
                <div className="stat-info">
                  <span className="stat-number">{myRentals.length}</span>
                  <span className="stat-label">Rental Listings</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><Icon name="box" size={20} /></div>
                <div className="stat-info">
                  <span className="stat-number">{letting.length}</span>
                  <span className="stat-label">Items on Rent</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><Icon name="dollar" size={20} /></div>
                <div className="stat-info">
                  <span className="stat-number">{mySales.length}</span>
                  <span className="stat-label">Items for Sale</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><Icon name="heart" size={20} /></div>
                <div className="stat-info">
                  <span className="stat-number">{favCount}</span>
                  <span className="stat-label">Favorites</span>
                </div>
              </div>
            </div>

            {myRentals.length > 0 && (
              <div className="dash-section animate-slide-up">
                <h3 className="dash-section-title">Your Rental Listings</h3>
                <div className="dash-mini-grid">
                  {myRentals.slice(0, 4).map(item => (
                    <ItemCard key={item.id} item={item} actionLabel="View Details" />
                  ))}
                </div>
              </div>
            )}

            {mySales.length > 0 && (
              <div className="dash-section animate-slide-up">
                <h3 className="dash-section-title">Your Sale Listings</h3>
                <div className="dash-mini-grid">
                  {mySales.slice(0, 4).map(item => (
                    <ItemCard key={item.id} item={item} actionLabel="View Details" />
                  ))}
                </div>
              </div>
            )}

            {myRentals.length === 0 && mySales.length === 0 && (
              <div className="dash-section animate-slide-up" style={{ textAlign: "center", padding: "2rem" }}>
                <p style={{ color: "var(--color-text-muted)" }}>
                  You haven't listed any items yet. Go to <strong>Let</strong> or <strong>Sell</strong> to create your first listing!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}