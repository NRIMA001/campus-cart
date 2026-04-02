import { useState } from "react";
import Topbar from "../components/Topbar";
import ItemGrid from "../components/ItemGrid";
import ItemCard from "../components/ItemCard";
import EmptyState from "../components/EmptyState";
import Icon from "../components/Icon";
import { mockMyRentals } from "../data/mockData";
import "./Let.css";

export default function Let() {
  const [items, setItems] = useState(mockMyRentals);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", category: "Devices", price: "", description: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      name: form.name,
      price: `$${form.price}/day`,
      category: form.category,
      image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&q=80",
      status: "Available",
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
        title="Let"
        subtitle="Manage your rental listings"
        actions={
          <button className="btn btn-accent" onClick={() => setShowForm(!showForm)}>
            ＋ Add New Item
          </button>
        }
      />
      <div className="page-content">
        {showForm && (
          <form className="let-form card animate-scale-in" onSubmit={handleSubmit}>
            <h3>List a New Item for Rent</h3>
            <div className="let-form-grid">
              <div className="let-upload-area">
                <div className="upload-placeholder">
                  <span><Icon name="upload" size={24} color="var(--color-text-muted)" /></span>
                  <p>Click to upload image</p>
                </div>
              </div>
              <div className="let-form-fields">
                <input className="input" name="name" placeholder="Item name" value={form.name} onChange={handleChange} required />
                <input className="input" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
                <select className="input" name="category" value={form.category} onChange={handleChange}>
                  <option>Devices</option>
                  <option>Tools</option>
                  <option>Books</option>
                  <option>Accessories</option>
                  <option>Others</option>
                </select>
                <input className="input" name="price" type="number" placeholder="Price per day (USD)" value={form.price} onChange={handleChange} required />
                <div className="let-form-actions">
                  <button type="submit" className="btn btn-primary btn-full">Submit Listing</button>
                  <button type="button" className="btn btn-ghost btn-full" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </form>
        )}

        {items.length === 0 ? (
          <EmptyState
            icon="box"
            title="No listings yet"
            message="Click 'Add New Item' to list your first item for rent"
          />
        ) : (
          <ItemGrid title="Your Listed Items" count={items.length}>
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
