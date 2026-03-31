import { useState } from "react";
import Topbar from "../components/Topbar";
import ItemGrid from "../components/ItemGrid";
import ItemCard from "../components/ItemCard";
import EmptyState from "../components/EmptyState";
import { mockMySaleItems } from "../data/mockData";
import "./Sell.css";

export default function Sell() {
  const [items, setItems] = useState(mockMySaleItems);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", category: "Devices", price: "", description: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      name: form.name,
      price: `$${form.price}`,
      category: form.category,
      image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&q=80",
    };
    setItems([newItem, ...items]);
    setForm({ name: "", category: "Devices", price: "", description: "" });
    setShowForm(false);
  };

  const handleDelete = (item) => {
    setItems(items.filter(i => i.id !== item.id));
  };

  return (
    <>
      <Topbar
        title="Sell"
        subtitle="Manage your items for sale"
        actions={
          <button className="btn btn-accent" onClick={() => setShowForm(!showForm)}>
            ＋ List New Item
          </button>
        }
      />
      <div className="page-content">
        {showForm && (
          <form className="sell-form card animate-scale-in" onSubmit={handleSubmit}>
            <h3>List a New Item for Sale</h3>
            <div className="sell-form-grid">
              <div className="sell-upload-area">
                <div className="upload-placeholder">
                  <span>📁</span>
                  <p>Click to upload image</p>
                </div>
              </div>
              <div className="sell-form-fields">
                <input className="input" name="name" placeholder="Item name" value={form.name} onChange={handleChange} required />
                <input className="input" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
                <select className="input" name="category" value={form.category} onChange={handleChange}>
                  <option>Devices</option>
                  <option>Tools</option>
                  <option>Books</option>
                  <option>Accessories</option>
                  <option>Others</option>
                </select>
                <input className="input" name="price" type="number" placeholder="Price (USD)" value={form.price} onChange={handleChange} required />
                <div className="sell-form-actions">
                  <button type="submit" className="btn btn-primary btn-full">Submit Listing</button>
                  <button type="button" className="btn btn-ghost btn-full" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </form>
        )}

        {items.length === 0 ? (
          <EmptyState
            icon="💰"
            title="No items listed"
            message="Click 'List New Item' to sell something"
          />
        ) : (
          <ItemGrid title="Your Items for Sale" count={items.length}>
            {items.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                showOwnerActions
                onDelete={handleDelete}
                onEdit={() => alert("Edit feature coming soon!")}
              />
            ))}
          </ItemGrid>
        )}
      </div>
    </>
  );
}
