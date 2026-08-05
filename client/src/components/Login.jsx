import { useState } from 'react';

function Login({ onLoginSuccess, switchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLoginSuccess(username);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Failed to connect to the server.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2>MERN Login System</h2>
      <p className="hint">Try: <b>admin</b> / <b>password123</b></p>
      
      {message && <div className="error-message">{message}</div>}

      <div className="input-group">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="login-btn">Log In</button>

      <p className="toggle-text">
        Don't have an account?{' '}
        <span onClick={switchToRegister} className="toggle-link">Register</span>
      </p>
    </form>
  );
}

export default Login;