import React from 'react';
import styles from './auth.module.css';
import { FaGithub, FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const ThirdParty = ({ setError }) => {
  const { signInWithGoogle, signInWithFacebook, signInWithGithub } = useAuth();
  const history = useHistory();

  const handleGoogleAuth = async () => {
    try {
      await signInWithGoogle();
      history.push('/home');
    } catch (err) {
      setError('Failed sign in with google');
    }
  };
  const handleFacebookAuth = async () => {
    try {
      await signInWithFacebook();
      history.push('/home');
    } catch (err) {
      setError('Failed sign in with facebook');
    }
  };
  const handleGithubAuth = async () => {
    try {
      await signInWithGithub();
      history.push('/home');
    } catch (err) {
      setError('Failed sign in with github');
    }
  };

  return (
    <div>
      <div className={styles.thirdPartyContainer}>
        Or use...
        <div className={styles.thirdPartyIcons}>
          <div onClick={handleGoogleAuth}>
            <FcGoogle />
          </div>
          <div onClick={handleFacebookAuth}>
            <FaFacebook />
          </div>
          <div onClick={handleGithubAuth}>
            <FaGithub />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdParty;
