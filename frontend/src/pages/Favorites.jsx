import { useState, useEffect } from "react";
import Topbar from "../components/Topbar";
import ItemGrid from "../components/ItemGrid";
import ItemCard from "../components/ItemCard";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import { mockRentItems, mockBuyItems } from "../data/mockData";
import { fetchItems } from "../services/firestoreService";

export default function Favorites() {
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("favorites")) || []; } catch { return []; }
  });

  const [allItems, setAllItems] = useState([...mockRentItems, ...mockBuyItems]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchItems("rent"), fetchItems("buy")])
      .then(([rent, buy]) => {
        setAllItems([...mockRentItems, ...mockBuyItems, ...rent, ...buy]);
      })
      .catch((err) => console.error("Error loading items:", err))
      .finally(() => setLoading(false));
  }, []);

  const favoriteItems = allItems.filter(item => favorites.includes(item.id));

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const next = prev.filter(i => i !== id);
      localStorage.setItem("favorites", JSON.stringify(next));
      return next;
    });
  };

  return (
    <>
      <Topbar title="Favorites" subtitle="Items you've saved" />
      <div className="page-content">
        {loading ? (
          <LoadingSpinner message="Loading favorites…" />
        ) : favoriteItems.length === 0 ? (
          <EmptyState
            icon="heart"
            title="No favorites yet"
            message="Browse items and click the heart to save them here"
          />
        ) : (
          <ItemGrid title="Saved Items" count={favoriteItems.length}>
            {favoriteItems.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                actionLabel="View Details"
                isFavorited={true}
                onFavorite={toggleFavorite}
              />
            ))}
          </ItemGrid>
        )}
      </div>
    </>
  );
}
