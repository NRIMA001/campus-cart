import { useState } from "react";
import Topbar from "../components/Topbar";
import CategoryTabs from "../components/CategoryTabs";
import ItemGrid from "../components/ItemGrid";
import ItemCard from "../components/ItemCard";
import EmptyState from "../components/EmptyState";
import { mockBuyItems } from "../data/mockData";

export default function Buy() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("favorites")) || []; } catch { return []; }
  });

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      localStorage.setItem("favorites", JSON.stringify(next));
      return next;
    });
  };

  const filtered = mockBuyItems
    .filter(item => category === "All" || item.category === category)
    .filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <Topbar
        title="Buy"
        subtitle="Find items for sale from students"
        searchValue={search}
        onSearchChange={setSearch}
      />
      <div className="page-content">
        <CategoryTabs active={category} onChange={setCategory} />
        {filtered.length === 0 ? (
          <EmptyState
            icon="cart"
            title="No items found"
            message={search ? `No items match "${search}"` : "No items in this category yet"}
          />
        ) : (
          <ItemGrid title="Available to Buy" count={filtered.length}>
            {filtered.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                actionLabel="Buy Now"
                isFavorited={favorites.includes(item.id)}
                onFavorite={toggleFavorite}
              />
            ))}
          </ItemGrid>
        )}
      </div>
    </>
  );
}
