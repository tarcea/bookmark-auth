import React, { useState, useEffect } from 'react';
import { VscMenu } from 'react-icons/vsc';
import Sesame from './Sesame';
import styles from './NavMobile.module.css';
import { IoAppsSharp } from 'react-icons/io5';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router';

const NavbarMobile = () => {
  const [scrollUp, setScrollUp] = useState(null);
  const [inHover, setHover] = useState(false);
  const [openSesame, setSesame] = useState(false);
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState('');
  const history = useHistory();

  const updateScroll = () => {
    setScrollUp(window.pageYOffset);
  }

  const getClient = (e) => {
    (e.clientX > 213 || (e.clientY < 18 || e.clientY > 360))
    && setSesame(false)
  }

  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
    window.addEventListener("click", getClient);
    return () => {window.removeEventListener("scroll", updateScroll);
                  window.removeEventListener("click", getClient);
                  }
  }, [])

  const handleOpen = (newSesame) => {
    setSesame(newSesame);
  }

  const handleClick = () => {
      openSesame && setSesame(false);
  };

  const style = {
    background: scrollUp > 60 ? "#F24B6A" :
    (inHover ? "#F24B6A" : "rgba(255, 255, 255, 0)"),
    color: scrollUp > 60 ? "#FFFFFF" : (inHover ? "#FFFFFF" : "#F24B6A")
  };

  const whiteStyle = {
    color: scrollUp > 60 ? "#FFFFFF" : "#7B7B7B"
  };

  const noLine = {
    borderBottom: scrollUp > 60 ? 0 : "1px solid rgba(136, 136, 136, 0.3)"
  };

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
    <div>
    {openSesame &&
    <Sesame 
      openSesame={openSesame} 
      handleOpen={handleOpen} 
    />
    }
    <div 
      className={styles.mobileContainer} 
      style={noLine} 
      onClick={handleClick}
      >
      <VscMenu 
        className={styles.burgerMenu}
        style={whiteStyle}
        onClick={() => setSesame(!openSesame)}
      />
      <div className={styles.logoGlobe}>
        <IoAppsSharp onClick={() => history.push('/bookmarks')} />
      </div>
      {currentUser && 
      <div 
        className={styles.ghostButton}
        style={style}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => history.push('/home')}
      >
            {/*is it hover needed on mobile view???*/}
        Get started
      </div>
      }
    </div>
    </div>
  );
}

export default NavbarMobile;
