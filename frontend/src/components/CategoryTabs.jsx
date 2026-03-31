import "./CategoryTabs.css";

const defaultCategories = ["All", "Accessories", "Tools", "Devices", "Books", "Others"];

export default function CategoryTabs({ categories = defaultCategories, active, onChange }) {
  return (
    <div className="category-tabs">
      {categories.map(cat => (
        <button
          key={cat}
          className={`category-tab ${active === cat ? "active" : ""}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
