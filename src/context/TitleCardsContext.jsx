// TitlecardsContext.js
import React, { createContext, useEffect, useRef, useState } from 'react';

const TitlecardsContext = createContext();

const TitlecardsProvider = ({ children, category }) => {
  const [apiData, setAPIData] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const cardsRef = useRef();
  const TMDBapi = import.meta.env.VITE_TMDB_API_TOKEN;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDBapi}`
    }
  };

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      cardsRef.current.scrollLeft += event.deltaY;
    };

    cardsRef.current.addEventListener('wheel', handleWheel, { passive: false });

    fetch(`https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => setAPIData(response.results))
      .catch(err => console.error(err));

    return () => {
      if (cardsRef.current) {
        cardsRef.current.removeEventListener('wheel', handleWheel);
      }
    };
  }, [category]);

  const handleMouseEnter = (card, index) => {
    setHoveredCard({ ...card, index });
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const getCardPosition = (index) => {
    if (index === 0) return 'first';
    if (index === apiData.length - 1) return 'last';
    return 'middle';
  };

  return (
    <TitlecardsContext.Provider
      value={{
        apiData,
        hoveredCard,
        handleMouseEnter,
        handleMouseLeave,
        getCardPosition,
        cardsRef
      }}
    >
      {children}
    </TitlecardsContext.Provider>
  );
};

export { TitlecardsContext, TitlecardsProvider };
