import { useState } from 'react';

function Register({ switchToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessageType('success');
        setMessage(data.message);
        setTimeout(() => {
          switchToLogin();
        }, 1500);
      } else {
        setMessageType('error');
        setMessage(data.message);
      }
    } catch (error) {
      setMessageType('error');
      setMessage('Failed to connect to the server.');
    }
  };

  return (
    <form onSubmit={handleRegister} className="login-form">
      <h2>Create Account</h2>
      
      {message && (
        <div className={messageType === 'success' ? 'success-message' : 'error-message'}>
          {message}
        </div>
      )}

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

      <button type="submit" className="login-btn">Register</button>

      <p className="toggle-text">
        Already have an account?{' '}
        <span onClick={switchToLogin} className="toggle-link">Log In</span>
      </p>
    </form>
  );
}

export default Register;