import React, { useEffect, useState } from 'react';
import LinkPreview from '../Bookmarks/LinkPreview';
import axios from 'axios';

const Home = () => {
  const [url, setUrl] = useState('');
  const [data, setData] = useState({ });
  const [loading, setLoading] = useState(false);
  const key = process.env.REACT_APP_LINKPREVIEW_KEY
  const baseUrl = process.env.REACT_APP_LINKPREVIEW_BASE_URL

  console.log(loading)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios(
  //       `https://api.linkpreview.net/?key=${KEY}&q=${url}`,
  //     );
  //     setData(result.data);
  //   };
  //   fetchData();
  // }, []);

  const fetchData = async () => {
    setLoading(true);
    const result = await axios.post(
      baseUrl,
      {
        q: url,
        key: key
      }
    );
    setData(result.data);
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
      {/*  */}
      {loading 
        ? 
          <div>loading...</div> 
        : 
        <LinkPreview data={data} />}
    </div>
  );
};

export default Home;
