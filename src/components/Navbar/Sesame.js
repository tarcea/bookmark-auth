import React, { useState } from 'react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import style from './Sesame.module.css';
import { IoAppsSharp } from 'react-icons/io5';
import { useHistory } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { scrollToTop } from '../../utils';

const Sesame = ({ openSesame, handleOpen, redStyle}) => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [error, setError] = useState('');

  const navigateHome = () => {
    history.push('/home');
    scrollToTop();
    handleOpen(false);
  };

  const navigateProfile = () => {
    history.push('/dashboard');
    handleOpen(false);
  };

  const handleSesame = () => {
      handleOpen(!openSesame);
  };
  const handleLogout = async () => {
    setError('')
    try {
      await logout();
      history.push('/home')
    } catch {
      setError('Failed to log out')
    }
  };
console.log(redStyle())
  return (
    <div className={style.floating}>
      <div className={style.sesameContainer}>
        <div className={style.sesameLogo}>
          <div>
            {currentUser &&
              <span
                onClick={navigateProfile}
                style={{color: redStyle()}}
              >
                {currentUser.email}
              </span>
            }
          </div>
        </div>
        <div className={style.sesameLinks}>
          <div className={style.link}>
            <GoLocation />
            <ip
              style={{cursor:"pointer"}} 
              onClick={handleSesame}
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
            </ip>
          </div>
          <div className={style.link}>
            <AiOutlineQuestionCircle />
            <ip 
              onClick={() => {handleSesame()}} 
              style={{cursor:"pointer"}}
            >
             <span
                onClick={() => history.push('/')}
              >
                About
              </span>
            </ip>
          </div>
        </div>
      </div>
      <div className={style.ghostButton} style={{color:"#FFFFFF", background: redStyle(), margin:"20px auto 0"}}>
        <p onClick={navigateHome}>Home</p>
      </div>
    </div>
  );
}

export default Sesame;
