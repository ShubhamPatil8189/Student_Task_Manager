import { useState } from 'react';
import Sidebar from './Sidebar';

function Dashboard({ username, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Render content dynamically based on the active sidebar menu option
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="view-content">
            <h2>Welcome back, {username}! 👋</h2>
            <p>Here is an overview of your task manager workspace.</p>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Tasks</h3>
                <p className="stat-number">12</p>
              </div>
              <div className="stat-card">
                <h3>Completed till now</h3>
                <p className="stat-number">8</p>
              </div>
              <div className="stat-card">
                <h3>Pending</h3>
                <p className="stat-number">4</p>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="view-content">
            <h2>Analytics</h2>
            <p>Track your productivity metrics and task completion rates here.</p>
          </div>
        );
      case 'profile':
        return (
          <div className="view-content">
            <h2>User Profile</h2>
            <p><b>Username:</b> {username}</p>
            <p><b>Role:</b> Standard User</p>
          </div>
        );
      case 'settings':
        return (
          <div className="view-content">
            <h2>Settings</h2>
            <p>Manage your account preferences and security configuration.</p>
          </div>
        );
      default:
        return <h2>Dashboard</h2>;
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={onLogout} 
      />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h3>Workspace Area</h3>
          <span className="user-badge">👤 {username}</span>
        </header>
        <section className="dashboard-body">
          {renderContent()}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;