# Bookmark App - mycoolbookmark

User journey

When you navigate at https://mycoolbookmark.web.app, you can see the page with all public bookmarks from all users. Here you just can search bookmarks and visit the web pages. You can create your own profile and add bookmarks if you sign up by clicking on the "Login" button and then, at the bottom of the page click on "Sign Up". If you are logged in, you can create public or private bookmarks by pasting your preferred web addresses in the dedicated field and pressing "preview". All private bookmarks can be seen just by the owner. All public bookmarks can be seen by everybody. By default, all bookmarks are private. The bookmarks can be deleted just by the owner.

# Tech stack

- Firebase (authetication, firestore, hosting)
- React (hooks, router, context, css.module)
- plain CSS.
- external API, https://github.com/tarcea/api-link-preview-jsdom

  deployed on firebase

  set env variables in firebase console:

  `firebase functions:config:set reactapp.linkpreview_base_url="https://valuable-cherry-shirt.glitch.me/api?url="`
