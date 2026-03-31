import { useState, useEffect } from "react";
import Topbar from "../components/Topbar";
import ItemGrid from "../components/ItemGrid";
import ItemCard from "../components/ItemCard";
import EmptyState from "../components/EmptyState";
import { mockRentItems, mockBuyItems } from "../data/mockData";

export default function Favorites() {
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("favorites")) || []; } catch { return []; }
  });

  const allItems = [...mockRentItems, ...mockBuyItems];
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
        {favoriteItems.length === 0 ? (
          <EmptyState
            icon="♥"
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
