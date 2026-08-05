function Dashboard({ username, onLogout }) {
  return (
    <div className="welcome-screen">
      <h2>Welcome, {username}! 🎉</h2>
      <p className="success-text">Login successful!</p>
      <button onClick={onLogout} className="logout-btn">Log Out</button>
    </div>
  );
}

export default Dashboard;