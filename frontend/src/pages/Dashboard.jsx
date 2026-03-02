function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
  
    return (
      <div style={{ padding: "40px" }}>
        <h1>Welcome, {user?.fullName} 🎉</h1>
        <p>University: {user?.university}</p>
        <p>This is your Campus Cart dashboard.</p>
      </div>
    );
  }
  
  export default Dashboard;