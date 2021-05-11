import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './auth.module.css';

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }
    try {
      setError('');
      setLoading(true);
      // await signup(emailRef.current.value, passwordRef.current.value);
      // history.push('/dashboard');
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.signup}>
          <div className={styles.form}>
            <p>Profile Update</p>
            {error && <div className={styles.alert}>{error}</div>}
            <form onSubmit={handleSubmit}>
              <div id="email">
                <label>email</label>
                <input 
                  type="email" 
                  ref={emailRef}
                  required
                  defaultValue={currentUser.email}
                />
              </div>
              <div id="password">
                <label>password</label>
                <input 
                  type="password" 
                  ref={passwordRef} 
                  placeholder="Leave blank to keep the same"
                />
              </div>
              <div id="password-confirm">
                <label>confirm password</label>
                <input 
                  type="password" 
                  ref={passwordConfirmRef}
                  placeholder="Leave blank to keep the same"
                />
              </div>
              <div className={styles.submit}>
                <button disabled={loading} type="submit">Update</button>
              </div>
            </form>
          </div>
          <div>
            <Link to="/dashboard">Cancel</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;