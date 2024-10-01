import React, { useEffect, useState } from 'react';
import './Player.css';
import backarrowicon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const TMDBapi = import.meta.env.VITE_TMDB_API_TOKEN;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDBapi}`
    }
  };
  
  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    publishedAt: '',
    type: ''
  });


  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(response => response.json())
      .then(response => {
        console.log("repsonse is ",response)
        const trailer = response.results.find(video => video.type === 'Trailer');
        console.log(trailer)
        if (trailer) {
          setApiData({
            name: trailer.name,
            key: trailer.key,
            publishedAt: trailer.published_at,
            type: trailer.type
          });
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className='player'>
      <img src={backarrowicon}  alt="Back" className="back-arrow-icon" onClick={()=>{navigate(-1)}}/>
      {apiData.key ? (
        <iframe
          width='90%'
          height='90%'
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title={apiData.name}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Loading...</p>
      )}
      <div className="player-info">
        <p>{apiData.name || 'Unknown'}</p>
        <p>{apiData.type || 'Unknown'}</p>
        <p>{apiData.publishedAt.slice(0,10) || 'Unknown'}</p>
      </div>
    </div>
  );
}

export default Player;
