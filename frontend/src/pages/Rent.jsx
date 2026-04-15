import { useState } from "react";
import Topbar from "../components/Topbar";
import CategoryTabs from "../components/CategoryTabs";
import ItemGrid from "../components/ItemGrid";
import ItemCard from "../components/ItemCard";
import EmptyState from "../components/EmptyState";
import { mockRentItems } from "../data/mockData";

export default function Rent() {
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

  const filtered = mockRentItems
    .filter(item => category === "All" || item.category === category)
    .filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <Topbar
        title="Rent"
        subtitle="Find items from fellow students"
        searchValue={search}
        onSearchChange={setSearch}
      />
      <div className="page-content">
        <CategoryTabs active={category} onChange={setCategory} />
        {filtered.length === 0 ? (
          <EmptyState
            icon="🔍"
            title="No items found"
            message={search ? `No items match "${search}"` : "No items in this category yet"}
          />
        ) : (
          <ItemGrid title="Available to Rent" count={filtered.length}>
            {filtered.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                actionLabel="Rent Now"
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
