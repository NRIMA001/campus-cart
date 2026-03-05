import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [items, setItems] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // temporary fake data until backend item API exists
    setItems([
      {
        id: 1,
        name: "Electric Drill",
        price: "$5/day",
        image: "https://via.placeholder.com/200"
      },
      {
        id: 2,
        name: "Calculator",
        price: "$3/day",
        image: "https://via.placeholder.com/200"
      },
      {
        id: 3,
        name: "Mini Fridge",
        price: "$20/week",
        image: "https://via.placeholder.com/200"
      }
    ]);
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* Sidebar */}
      <div style={{
        width: "220px",
        background: "#1e293b",
        color: "white",
        padding: "20px"
      }}>
        <h2>Campus Cart</h2>

        <p>Rent</p>
        <p>Let</p>
        <p>Buy</p>
        <p>Sell</p>
        <p>Messages</p>
        <p>Customer Support</p>
        <p>About Us</p>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "20px" }}>

        {/* Top bar */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px"
        }}>
          <input
            type="text"
            placeholder="Search items..."
            style={{
              width: "300px",
              padding: "8px"
            }}
          />

          <div>
            {user?.fullName} — {user?.university}
          </div>
        </div>

        {/* Items grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px"
        }}>

          {items.map(item => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px"
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100%" }}
              />

              <h3>{item.name}</h3>

              <p>{item.price}</p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Dashboard;