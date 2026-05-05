import { useState, useEffect } from "react";
import Topbar from "../components/Topbar";
import ItemGrid from "../components/ItemGrid";
import ItemCard from "../components/ItemCard";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import EditItemModal from "../components/EditItemModal";
import Icon from "../components/Icon";
import { useAuth } from "../contexts/AuthContext";
import { fetchUserItems, addItem, deleteItem, uploadItemImage } from "../services/firestoreService";
import "./Let.css";

export default function Let() {
  const { user, userProfile } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ name: "", category: "Devices", price: "", description: "", condition: "Good" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetchUserItems(user.uid, "rent")
      .then(setItems)
      .catch((err) => console.error("Error loading your rentals:", err))
      .finally(() => setLoading(false));
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      let imageUrl = "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&q=80";

      if (imageFile) {
        try {
          imageUrl = await uploadItemImage(imageFile, user.uid);
        } catch (uploadErr) {
          console.warn("Image upload failed, using default image:", uploadErr.message);
        }
      }

      const newItem = await addItem({
        name: form.name,
        price: `$${form.price}/day`,
        numericPrice: Number(form.price),
        category: form.category,
        description: form.description,
        condition: form.condition,
        image: imageUrl,
        type: "rent",
        status: "Available",
        sellerId: user.uid,
        sellerName: userProfile?.fullName || "Student",
        university: userProfile?.university || "Campus",
        postedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      });

      setItems([newItem, ...items]);
      setForm({ name: "", category: "Devices", price: "", description: "", condition: "Good" });
      setImageFile(null);
      setImagePreview(null);
      setShowForm(false);
    } catch (err) {
      console.error("Error creating listing:", err);
      setSubmitError(err.message || "Failed to create listing. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (item) => {
    if (!confirm("Are you sure you want to remove this listing?")) return;
    try {
      await deleteItem(item.id);
      setItems(items.filter(i => i.id !== item.id));
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Failed to delete item.");
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleEditSaved = (updatedItem) => {
    setItems(items.map(i => i.id === updatedItem.id ? updatedItem : i));
    setEditingItem(null);
  };

  return (
    <>
      <Topbar
        title="Let"
        subtitle="Manage your rental listings"
        actions={
          <button className="btn btn-accent" onClick={() => { setShowForm(!showForm); setSubmitError(""); }}>
            ＋ Add New Item
          </button>
        }
      />
      <div className="page-content">
        {showForm && (
          <form className="let-form card animate-scale-in" onSubmit={handleSubmit}>
            <h3>List a New Item for Rent</h3>
            {submitError && (
              <div style={{
                background: "#fef2f2", color: "#dc2626",
                padding: "0.75rem 1rem", borderRadius: 8,
                marginBottom: "1rem", fontSize: "0.875rem",
                border: "1px solid #dc2626",
              }}>
                {submitError}
              </div>
            )}
            <div className="let-form-grid">
              <div className="let-upload-area">
                <label className="upload-placeholder" style={{ cursor: "pointer" }}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
                  ) : (
                    <>
                      <span><Icon name="upload" size={24} color="var(--color-text-muted)" /></span>
                      <p>Click to upload image</p>
                    </>
                  )}
                  <input type="file" accept="image/*,.jpg,.jpeg,.png,.heic,.heif,.webp" onChange={handleImageChange} style={{ display: "none" }} />
                </label>
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
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <input className="input" name="price" type="number" placeholder="Price per day ($)" value={form.price} onChange={handleChange} required />
                  <select className="input" name="condition" value={form.condition} onChange={handleChange}>
                    <option value="Like New">Excellent / Like New</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>
                <div className="let-form-actions">
                  <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
                    {submitting ? "Submitting…" : "Submit Listing"}
                  </button>
                  <button type="button" className="btn btn-ghost btn-full" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </form>
        )}

        {loading ? (
          <LoadingSpinner message="Loading your listings…" />
        ) : items.length === 0 ? (
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
                onEdit={handleEdit}
              />
            ))}
          </ItemGrid>
        )}
      </div>

      {editingItem && (
        <EditItemModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSaved={handleEditSaved}
        />
      )}
    </>
  );
}
