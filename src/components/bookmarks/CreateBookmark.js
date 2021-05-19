import React, { useState } from 'react';
import styles from './bookmarks.module.css';
import LinkPreview from './LinkPreview';
import axios from 'axios';
import { db, timestamp } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';

const CreateBookmark = () => {
  const { currentUser, logout } = useAuth();
  const [url, setUrl] = useState('');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);
  const key = process.env.REACT_APP_LINKPREVIEW_KEY;
  const baseUrl = process.env.REACT_APP_LINKPREVIEW_BASE_URL;
  const [isPublic, setIsPublic] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await axios.post(
        baseUrl,
        {
          q: url,
          key: key
        }
      );
      setData(result.data);
    } catch (err) {
      setError(err.response.data.description)
    }
    setLoading(false);
    setPreview(true);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log('martor')
    // setUrl('')
  };

  const onInputChange = (e) => {
    setUrl(e.target.value)
  };
  
  const ceateItem = (data) => {
    return {
      title: data.title,
      userId: currentUser.uid,
      description: data.description,
      image: data.image,
      public: isPublic,
    }
  }

  const createNew = async () => {
    const doc = ceateItem(data)
    await db.collection("bookmarks").add({...doc, createdAt: timestamp});
    setData({});
    setUrl('')
    setPreview(false);
    setIsPublic(false);
  };

  const cancelPreview = () => {
    setPreview(false);
    setUrl('');
    setError('');
    setIsPublic(false);
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input 
          type="text" 
          name="url" 
          value={url} 
          onChange={onInputChange}
        />
        {!preview ? (
          <button 
            type="submit" 
            onClick={() => fetchData()}
            disabled={!url}
          >
            preview
          </button>
        ) : (
          <button
            onClick={createNew}
          >
            Bookmark
          </button>
        )
        }
        
      </form>
      {error && 
          <div className={styles.danger}>
            {`linkpreview.net error: ${error}`}
            <button className={styles.buttonX} onClick={cancelPreview} style={{top: "1px", right: "1px"}}>X</button>
          </div>
          }
      {loading 
        ? 
          <div>loading...</div> 
        : (
        !error && preview &&
        <LinkPreview 
          data={data} 
          setUrl={setUrl}
          setPreview={setPreview}
          createNew={createNew}
          isPublic={isPublic}
          setIsPublic={setIsPublic}
        />
        )}
    </div>
  );
};

export default CreateBookmark;