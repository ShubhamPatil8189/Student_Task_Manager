import { useState } from 'react';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Dashboard from './components/Dashbord.jsx';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'register', 'dashboard'
  const [username, setUsername] = useState('');

  const handleLoginSuccess = (loggedInUser) => {
    setUsername(loggedInUser);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUsername('');
    setCurrentView('login');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {currentView === 'login' && (
          <Login 
            onLoginSuccess={handleLoginSuccess} 
            switchToRegister={() => setCurrentView('register')} 
          />
        )}

        {currentView === 'register' && (
          <Register 
            switchToLogin={() => setCurrentView('login')} 
          />
        )}

        {currentView === 'dashboard' && (
          <Dashboard 
            username={username} 
            onLogout={handleLogout} 
          />
        )}
      </div>
    </div>
  );
}

export default App;