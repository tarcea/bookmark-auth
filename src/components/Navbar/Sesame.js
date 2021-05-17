import React, { useState } from 'react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import style from './Sesame.module.css';
import { IoAppsSharp } from 'react-icons/io5';
import { useHistory } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

const Sesame = ({ openSesame, handleOpen, redStyle}) => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [error, setError] = useState('');

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

  return (
    <div className={style.floating}>
      <div className={style.sesameContainer}>
        <div className={style.sesameLogo}>
          {/* <IoAppsSharp onClick={() => history.push('/bookmarks')} /> */}
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
              {currentUser 
            ? <span
                onClick={() => history.push('/dashboard')}
              >
                Edit Profile
              </span>
            : <span
                onClick={() => history.push('/about')}
              >
                About
              </span>
            }
            </ip>
          </div>
        </div>
      </div>
      <div className={style.ghostButton} style={{color:"#FFFFFF", background:"#F24B6A", margin:"20px auto 0", ...redStyle}}>
        <p onClick={handleSesame}>Get started</p>
      </div>
    </div>
  );
}

export default Sesame;
