import React from 'react';

const Bookmark = ({ bookmark }) => {
  return (
    <div>
      {bookmark.name}/{bookmark.userId}
    </div>
  );
};

export default Bookmark;