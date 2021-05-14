import React, { useEffect, useState } from 'react';
import LinkPreview from '../Bookmarks/LinkPreview';
import axios from 'axios';

const Home = () => {
  const [url, setUrl] = useState('');
  const [data, setData] = useState({ });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const key = process.env.REACT_APP_LINKPREVIEW_KEY;
  const baseUrl = process.env.REACT_APP_LINKPREVIEW_BASE_URL;


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
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log('martor')
    setUrl('')
  };

  const onInputChange = (e) => {
    setUrl(e.target.value)
  };

  console.log(data)

  return (
    <div style={{marginTop: '200px'}}>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="url" value={url} onChange={onInputChange}/>
        <button type="submit" onClick={() => fetchData()}>bookmark</button>
      </form>
      {error && <div>{error}</div>}
      {loading 
        ? 
          <div>loading...</div> 
        : 
        <LinkPreview 
          data={data} 
          setUrl={setUrl} 
        />
        }
    </div>
  );
};

export default Home;
