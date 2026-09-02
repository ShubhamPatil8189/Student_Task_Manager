import { useState, useEffect } from 'react';

function ProfileView({ username }) {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [stats, setStats] = useState({ activeProjects: 0, completedTasks: 0, memberSince: '2026' });
  const [message, setMessage] = useState('');

  // Fetch profile data on component load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/profile/${username}`);
        const data = await response.json();
        if (data.success) {
          setFullName(data.profile.fullName);
          setEmail(data.profile.email);
          setBio(data.profile.bio);
          setStats({
            activeProjects: data.profile.activeProjects,
            completedTasks: data.profile.completedTasks,
            memberSince: data.profile.memberSince,
          });
        }
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };

    fetchProfile();
  }, [username]);

  // Handle profile updates sent to the backend
  const handleSave = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch(`http://localhost:5000/api/profile/${username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, bio }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsEditing(false);
        setMessage(data.message);
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to update profile.');
      }
    } catch (error) {
      setMessage('Server connection error.');
    }
  };

  return (
    <div className="view-content">
      <h2>User Profile</h2>
      <p>Manage your personal account details and preferences.</p>

      {message && <div className="success-message">{message}</div>}

      <div className="profile-container">
        {/* Profile Card Header */}
        <div className="profile-header-card">
          <div className="profile-avatar">
            <span>{username.charAt(0).toUpperCase()}</span>
          </div>
          <div className="profile-header-info">
            <h3>{fullName || username}</h3>
            <p className="profile-username">@{username}</p>
            <span className="profile-role-badge">Standard User</span>
          </div>
        </div>

        {/* Profile Stats Overview */}
        <div className="profile-stats-grid">
          <div className="stat-box">
            <h4>Active Projects</h4>
            <p>{stats.activeProjects}</p>
          </div>
          <div className="stat-box">
            <h4>Completed Tasks</h4>
            <p>{stats.completedTasks}</p>
          </div>
          <div className="stat-box">
            <h4>Member Since</h4>
            <p>{stats.memberSince}</p>
          </div>
        </div>

        {/* Profile Form Details */}
        <div className="profile-details-card">
          <div className="profile-card-title">
            <h4>Personal Information</h4>
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} className="edit-btn">
                Edit Profile
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="profile-form">
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows="3"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn">Save Changes</button>
                <button type="button" onClick={() => setIsEditing(false)} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info-list">
              <div className="info-item">
                <span className="info-label">Full Name:</span>
                <span className="info-value">{fullName}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Username:</span>
                <span className="info-value">{username}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Bio:</span>
                <span className="info-value">{bio}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileView;