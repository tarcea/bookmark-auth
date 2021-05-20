import React from 'react';
import { getCurrentYear } from '../../utils';
import styles from './about.module.css';

const About = () => {
  return (
    <div className={styles.container}>
      <h1>My cool bookmark</h1>
        <div className={styles.text}>
        <h5>The app</h5>
          <p>This is a web application developed using Firebase (authetication, firestore, hosting), React (hooks, router, context, css.module) and plain CSS. </p>
          <h5>User journey</h5>
          <p>When you navigate at <a href='https://mycoolbookmark.web.app/home'>https://mycoolbookmark.web.app/home</a>, you can see the page with all public bookmarks from all users. Here you just can search bookmarks and visit the web pages.
          You can create your own profile and add bookmarks if you sign up by clicking on the "Login" button and then, at the bottom of the page click on "Sign Up".
          If you are logged in, you can create public or private bookmarks by pasting your preferred web addresses in the dedicated field and pressing "preview".
          All private bookmarks can be seen just by the owner. All public bookmarks can be seen by everybody. By default, all bookmarks are private. The bookmarks can be deleted just by the owner.
           </p>
        </div>
      <p>&copy; {getCurrentYear()} Gheorghe Tarcea. All rights reserved</p>
    </div>
  );
};

export default About;