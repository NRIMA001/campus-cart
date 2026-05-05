import { useState } from "react";
import Icon from "./Icon";
import { updateItem, uploadItemImage } from "../services/firestoreService";
import { useAuth } from "../contexts/AuthContext";
import "./EditItemModal.css";

export default function EditItemModal({ item, onClose, onSaved }) {
  const { user } = useAuth();
  const isRental = item.type === "rent";

  const [form, setForm] = useState({
    name: item.name || "",
    description: item.description || "",
    price: item.numericPrice || "",
    category: item.category || "Devices",
    condition: item.condition || "Good",
    status: item.status || "Available",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(item.image || null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      let imageUrl = item.image;

      if (imageFile) {
        try {
          imageUrl = await uploadItemImage(imageFile, user.uid);
        } catch (uploadErr) {
          console.warn("Image upload failed, keeping current image:", uploadErr.message);
        }
      }

      const updates = {
        name: form.name,
        description: form.description,
        price: isRental ? `$${form.price}/day` : `$${form.price}`,
        numericPrice: Number(form.price),
        category: form.category,
        condition: form.condition,
        status: form.status,
        image: imageUrl,
      };

      await updateItem(item.id, updates);

      // Return the updated item to parent
      onSaved({ ...item, ...updates, image: imageUrl });
    } catch (err) {
      console.error("Error updating item:", err);
      setError(err.message || "Failed to update item.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content card animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Edit Listing</h3>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            <Icon name="x" size={16} />
          </button>
        </div>

        {error && (
          <div className="modal-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSave} className="modal-form">
          <div className="modal-form-grid">
            {/* Image */}
            <div className="modal-upload-area">
              <label className="upload-placeholder" style={{ cursor: "pointer" }}>
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
                ) : (
                  <>
                    <span><Icon name="upload" size={24} color="var(--color-text-muted)" /></span>
                    <p>Click to change image</p>
                  </>
                )}
                <input type="file" accept="image/*,.jpg,.jpeg,.png,.heic,.heif,.webp" onChange={handleImageChange} style={{ display: "none" }} />
              </label>
            </div>

            {/* Fields */}
            <div className="modal-form-fields">
              <div className="form-group">
                <label className="form-label">Item Name</label>
                <input className="input" name="name" value={form.name} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="input" name="description" value={form.description} onChange={handleChange} rows={2} />
              </div>

              <div className="form-row-grid">
                <div className="form-group">
                  <label className="form-label">{isRental ? "Price per Day ($)" : "Price ($)"}</label>
                  <input className="input" name="price" type="number" value={form.price} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Condition</label>
                  <select className="input" name="condition" value={form.condition} onChange={handleChange}>
                    <option value="Like New">Excellent / Like New</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>
              </div>

              <div className="form-row-grid">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="input" name="category" value={form.category} onChange={handleChange}>
                    <option>Devices</option>
                    <option>Tools</option>
                    <option>Books</option>
                    <option>Accessories</option>
                    <option>Others</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="input" name="status" value={form.status} onChange={handleChange}>
                    <option value="Available">Available</option>
                    <option value="On Rent">On Rent</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn btn-accent btn-lg" disabled={saving}>
              {saving ? "Saving…" : "Save Changes"}
            </button>
            <button type="button" className="btn btn-ghost btn-lg" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
