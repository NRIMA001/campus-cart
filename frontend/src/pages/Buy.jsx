import { useState } from "react";
import { Link } from "react-router-dom";
import Topbar from "../components/Topbar";
import CategoryTabs from "../components/CategoryTabs";
import ItemGrid from "../components/ItemGrid";
import ItemCard from "../components/ItemCard";
import EmptyState from "../components/EmptyState";
import Icon from "../components/Icon";
import { useCart } from "../contexts/CartContext";
import { mockBuyItems } from "../data/mockData";

export default function Buy() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { addToCart, cartCount } = useCart();
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

  const handleAddToCart = (item) => {
    addToCart(item, 1);
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
        actions={
          <Link to="/checkout" className="btn btn-outline" style={{ position: "relative" }}>
            <Icon name="shopping-cart" size={15} />
            Cart
            {cartCount > 0 && (
              <span style={{
                position: "absolute", top: -4, right: -6,
                background: "var(--color-accent)", color: "white",
                fontSize: 10, fontWeight: 700, minWidth: 18, height: 18,
                borderRadius: 9, display: "flex", alignItems: "center",
                justifyContent: "center", padding: "0 4px",
              }}>
                {cartCount}
              </span>
            )}
          </Link>
        }
      />
      <div className="page-content">
        <CategoryTabs active={category} onChange={setCategory} />
        {filtered.length === 0 ? (
          <EmptyState
            icon="🛒"
            title="No items found"
            message={search ? `No items match "${search}"` : "No items in this category yet"}
          />
        ) : (
          <ItemGrid title="Available to Buy" count={filtered.length}>
            {filtered.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                actionLabel="Add to Cart"
                onAction={handleAddToCart}
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
