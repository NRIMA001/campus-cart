import { useState } from "react";

function Landing() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const [content, setContent] = useState(
    "Welcome to Campus Cart – Your campus marketplace."
  );

  const [editing, setEditing] = useState(false);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Campus Cart</h1>

      {editing ? (
        <>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            style={{ width: "100%" }}
          />
          <button onClick={() => setEditing(false)}>Save</button>
        </>
      ) : (
        <p>{content}</p>
      )}

      {isAdmin && !editing && (
        <button onClick={() => setEditing(true)}>
          Edit Landing Page
        </button>
      )}
    </div>
  );
}

export default Landing;