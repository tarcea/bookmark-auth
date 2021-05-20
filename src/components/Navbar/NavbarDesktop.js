import React, { useState, useEffect } from 'react';
import styles from './NavbarDesktop.module.css';
import { IoAppsSharp } from 'react-icons/io5';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { scrollToTop } from '../../utils';

const NavbarDesktop = () => {
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
    background: scrollUp > 60 ? (inHover ? "#F24B6A" : "rgba(255, 255, 255, 0)") :
    (inHover ? "#ff5722" : "rgba(255, 255, 255, 0)"),
    color: scrollUp > 60 ? (inHover ? "#FFFFFF" : "#F24B6A") : (inHover ? "#FFFFFF" : "#ff5722")
  }

  const whiteStyle = {
    color: scrollUp > 60 ? "#FFFFFF" : "#888888"
  };

  const redStyle = {
    color: scrollUp > 60 ? "#F24B6A" : "#ff5722"
  }

  const noLine = {
    borderBottom: scrollUp > 60 ? 0 : "1px solid #FFFFFF"
  }

  const handleLogout = async () => {
    setError('')
    try {
      await logout();
      history.push('/home')
    } catch {
      setError('Failed to log out')
    }
  };

  const navigateHome = () => {
    history.push('/home');
    scrollToTop();
  };

  return (
    <div className={styles.topMenu}>
      <div className={styles.desktopContainer} style={noLine}>
        <IoAppsSharp 
          className={style.menuLogo}
          style={redStyle}
          onClick={navigateHome}
        />
        <div className={styles.desktopMenu}>
          <div style={whiteStyle}>
          </div>
          <div className={styles.desktopLinks} >
            <ul>
              <li 
                style={whiteStyle}
              >
                
              </li>

              <li 
                style={whiteStyle} 
              >
                {currentUser 
                ? <span
                    onClick={() => history.push('/dashboard')}
                    className={scrollUp > 60 ? styles.nameRed : styles.nameOrange}
                  >
                    {currentUser.email}
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
              </span>
          }
        </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarDesktop;

