import React, { useState, useEffect } from 'react';
import styles from './NavbarDesktop.module.css';
import { FaBattleNet } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const NavbarDesktop = (props) => {
  const [scrollUp, setScrollUp] = useState(null);
  const [inHover, setHover] = useState(false);
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState('');
  const history = useHistory();

  const updateScroll = () => {
    setScrollUp(window.pageYOffset);
  }

  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, [])

  const style = {
    background: scrollUp > 60 ? "#F24B6A" :
    (inHover ? "#F24B6A" : "rgba(255, 255, 255, 0)"),
    color: scrollUp > 60 ? "#FFFFFF" : (inHover ? "#FFFFFF" : "#F24B6A")
  }

  const whiteStyle = {
    color: scrollUp > 60 ? "#FFFFFF" : "#888888"
  }

  const noLine = {
    borderBottom: scrollUp > 60 ? 0 : "1px solid #FFFFFF"
  }

  const handleLogout = async () => {
    setError('')
    try {
      await logout();
      history.push('/login')
    } catch {
      setError('Failed to log out')
    }
  };



  return (
    <div className={styles.topMenu}>
      <div className={styles.desktopContainer} style={noLine}>
        <FaBattleNet 
          className={style.menuLogo}
          onClick={() => history.push('/')}
        />
        <div className={styles.desktopMenu}>
          <div style={whiteStyle}>
            {currentUser && currentUser.email}
          </div>
          <div className={styles.desktopLinks} >
            <ul>
              <li 
                style={whiteStyle}
              >
                {currentUser 
                ? <span 
                    onClick={handleLogout}
                  >
                    Logout
                  </span> 
                : <span
                    onClick={() => history.push('/login')}
                  >
                    Login
                  </span>}
              </li>

              <li 
                style={whiteStyle} 
              >
                {currentUser 
                ? <span
                    onClick={() => history.push('/dashboard')}
                  >
                    Edit Profile
                  </span>
                : <span></span>
                }
              </li>

            </ul>
          </div>
        <div 
          style={style} 
          className={styles.desktopButton}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <p>Get started</p>
        </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarDesktop;

