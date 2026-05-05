import "./LoadingSpinner.css";

export default function LoadingSpinner({ message = "Loading…" }) {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <span className="loading-text">{message}</span>
    </div>
  );
}
