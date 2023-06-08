import React, { useEffect, useState } from 'react';
import style from './Navbar.module.css';
import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';

const Navbar = ({ width, setAddBookmark, addBookmark }) => {
  const [navColor, setNavColor] = useState('transparent');
  const setColor = () => {
    const currentScroll = window.pageYOffset;
    currentScroll > 60
      ? setNavColor('rgba(128,128,128,0.6)')
      : setNavColor('rgba(255, 255, 255, 0)');
  };

  useEffect(() => {
    window.addEventListener('scroll', setColor);
    return () => window.removeEventListener('scroll', setColor);
  }, []);

  return (
    <div
      className={style.navbarContainer}
      style={{ background: `${navColor}`, zIndex: '999' }}
    >
      {width >= 900 ? <NavbarDesktop /> : <NavbarMobile />}
    </div>
  );
};

export default Navbar;
