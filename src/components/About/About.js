import React from 'react';
import { useHistory } from 'react-router';
import { getCurrentYear } from '../../utils';
import styles from './about.module.css';

const About = () => {
  const history = useHistory();

  const navigateTo = (to) => (e) => {
    history.push(`/${to}`);
    e.stopPropagation();
  };

  return (
    <div className={styles.container}>
      <h1 onClick={navigateTo("home")}>My cool bookmark</h1>
        <div className={styles.text}>
        <h3>The app</h3>
          <p>This is a web application developed using Firebase (authetication, firestore, hosting), React (hooks, router, context, css.module) and plain CSS. </p>
          <p><strong>Demo account:</strong></p>
          <small>email: test210@test210.com</small><br />
          <small>password: 123456</small><br /><br />
          <button onClick={navigateTo("login")}>Get Started</button>
          <h3>User journey</h3>
          <p>When you navigate at <span onClick={navigateTo("home")}><strong>https://mycoolbookmark.web.app/home</strong></span>, you can see the page with all public bookmarks from all users. Here you just can search bookmarks and visit the web pages.
          You can create your own profile and add bookmarks if you sign up by clicking on the "Login" button and then, at the bottom of the page click on "Sign Up".
          If you are logged in, you can create public or private bookmarks by pasting your preferred web addresses in the dedicated field and pressing "preview".
          All private bookmarks can be seen just by the owner. All public bookmarks can be seen by everybody. By default, all bookmarks are private. The bookmarks can be deleted just by the owner.
           </p>
           <button onClick={navigateTo("signup")}>Get Started</button>
        </div>
      <p>&copy; {getCurrentYear()} Gheorghe Tarcea. All rights reserved</p>
    </div>
  );
};

export default About;