import React from 'react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import style from './Sesame.module.css';
import { FaBattleNet } from 'react-icons/fa';

const Sesame = ({ openSesame, handleOpen}) => {
  const handleSesame = () => {
      handleOpen(!openSesame);
  }

  return (
    <div className={style.floating}>
          <div className={style.sesameContainer}>
            <div className={style.sesameLogo}>
              <FaBattleNet />
            </div>
            <div className={style.sesameLinks}>
              <div className={style.link}>
                <GoLocation />
                <a href="#www" onClick={handleSesame}>Login</a>
              </div>
              <div className={style.link}>
                <AiOutlineQuestionCircle />
                <a  onClick={() => {handleSesame()}} style={{cursor:"pointer"}}>Edit Profile</a>
              </div>
            </div>
          </div>
          <div className={style.ghostButton} style={{color:"#FFFFFF", background:"#F24B6A", margin:"33px auto 0"}}>
            <p onClick={handleSesame}>Get started</p>
          </div>
        </div>
  );
}

export default Sesame;
