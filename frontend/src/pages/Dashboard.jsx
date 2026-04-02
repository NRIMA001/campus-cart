import Topbar from "../components/Topbar";
import ItemCard from "../components/ItemCard";
import Icon from "../components/Icon";
import { useAuth } from "../contexts/AuthContext";
import "./Dashboard.css";
import { mockRentItems, mockMyRentals, mockMySaleItems } from "../data/mockData";

export default function Dashboard() {
  const { userProfile } = useAuth();

  const renting = mockRentItems.slice(0, 2);
  const letting = mockMyRentals.filter(i => i.status === "On Rent");
  const selling = mockMySaleItems.slice(0, 2);

  return (
    <>
      <Topbar
        title="Dashboard"
        subtitle={`Welcome back, ${userProfile?.fullName || "Student"}!`}
      />
      <div className="page-content">
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
              <span className="stat-number">{renting.length}</span>
              <span className="stat-label">Currently Renting</span>
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
              <span className="stat-number">{selling.length}</span>
              <span className="stat-label">Items for Sale</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Icon name="heart" size={20} /></div>
            <div className="stat-info">
              <span className="stat-number">0</span>
              <span className="stat-label">Favorites</span>
            </div>
          </div>
        </div>

        <div className="dash-section animate-slide-up">
          <h3 className="dash-section-title">Currently Renting</h3>
          <div className="dash-mini-grid">
            {renting.map(item => (
              <ItemCard key={item.id} item={item} actionLabel="View Details" />
            ))}
          </div>
        </div>

        <div className="dash-section animate-slide-up">
          <h3 className="dash-section-title">Your Listings</h3>
          <div className="dash-mini-grid">
            {letting.map(item => (
              <ItemCard key={item.id} item={item} showOwnerActions />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}