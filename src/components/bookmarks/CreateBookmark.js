import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db, timestamp } from '../../firebase';
import LinkPreview from './LinkPreview';
import styles from './bookmarks.module.css';
const placeholder = 'https://picsum.photos/300/200?grayscale&random';

const CreateBookmark = () => {
  const { currentUser, logout } = useAuth();
  const [url, setUrl] = useState('');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);
  const baseUrl = process.env.REACT_APP_LINKPREVIEW_BASE_URL;
  const [isPublic, setIsPublic] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await axios.get(baseUrl + url);
      if (result) setData(result.data);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.description);
      } else {
        setError(`Error accessing '${url}', please try another one`);
      }
    }
    setLoading(false);
    setPreview(true);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
  };

  const onInputChange = (e) => {
    setUrl(e.target.value);
  };

  const ceateItem = (data) => {
    return {
      title: data.title || 'No title',
      userId: currentUser.uid,
      description: data.description || 'No description',
      image: data.image || '',
      public: isPublic,
      url: data.url,
    };
  };

  const createNew = async () => {
    const doc = ceateItem(data);
    console.log({ doc });
    await db.collection('bookmarks').add({ ...doc, createdAt: timestamp });
    setData({});
    setUrl('');
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
    <div className={styles.inputPreview}>
      {!preview ? (
        <form onSubmit={onFormSubmit}>
          <input
            type='text'
            name='url'
            value={url}
            placeholder='paste here the web address '
            onChange={onInputChange}
            style={{ width: '200px' }}
          />

          <button type='submit' onClick={() => fetchData()} disabled={!url}>
            preview
          </button>
        </form>
      ) : (
        ''
      )}
      {error && (
        <div className={styles.danger} onClick={cancelPreview}>
          {`linkpreview.net error: ${error}`}
        </div>
      )}
      {loading ? (
        <div>loading...</div>
      ) : (
        !error &&
        preview && (
          <LinkPreview
            data={data}
            setUrl={setUrl}
            setPreview={setPreview}
            createNew={createNew}
            isPublic={isPublic}
            setIsPublic={setIsPublic}
          />
        )
      )}
    </div>
  );
};

export default CreateBookmark;
