import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import styles from './auth.module.css';

const UserDashboard = () => {
  const [error, setError] = useState('');
  const { logout, currentUser, deleteUser } = useAuth();
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

  const deleteItemsOfUser = async (userId) => {
    const items = await db.collection('bookmarks').where('userId', '==', userId).get();
    // Once we get the results, begin a batch
    let batch = db.batch();
    items.forEach((doc) => {
      // For each doc, add a delete operation to the batch
      batch.delete(doc.ref)
    });
    // Commit the batch
    return batch.commit();
  };

  const handleDelete = async () => {
    setError('')
    try {
      const confirmDelete = window.confirm(`Are you sure you want to delete "${currentUser.email}" profile?? All bookmarks created by this user will be deleted`);
      if (!confirmDelete) {
        return
      }
      await Promise.all(
        [deleteItemsOfUser(currentUser.uid), await currentUser.delete()]
      );
      console.log('Successfully deleted user');
      history.push('/home');
    } catch (err) {
      setError('Failed deleting user ' + err.message)
      console.log(err.message)
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.signup}>
        <div className={styles.form}>
          <p>Profile</p>
          {error && <div className={styles.alert}>{error}</div>}
          <strong>Email: </strong> {currentUser.email}<br /><br />
          <div>
            <Link to="/update-profile">Update Profile</Link>
          </div><br />
          <div onClick={handleDelete} style={{ cursor: 'pointer', color: 'red' }}>
            Delete Profile
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