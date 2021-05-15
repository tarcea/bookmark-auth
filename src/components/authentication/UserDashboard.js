import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './auth.module.css';

const UserDashboard = () => {
  const [error, setError] = useState('');
  const { logout, currentUser } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    setError('')
    try {
      await logout();
      history.push('/home')
    } catch {
      setError('Failed to log out')
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.signup}>
        <div className={styles.form}>
        <p>Profile</p>
        {error && <div className={styles.alert}>{error}</div>}
        <strong>Email: </strong> {currentUser.email}
        <div>
          <Link to="/update-profile">Update Profile</Link>
        </div>
          <div className={styles.submit}>
            <button type="submit" onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;