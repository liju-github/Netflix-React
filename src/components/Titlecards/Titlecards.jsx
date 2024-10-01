// Titlecards.js
import React, { useContext } from 'react';
import { TitlecardsContext, TitlecardsProvider } from '../../context/TitleCardsContext';
import './Titlecards.css';
import { Link } from 'react-router-dom';

const Titlecards = ({ title, category }) => {
  const {
    apiData,
    hoveredCard,
    handleMouseEnter,
    handleMouseLeave,
    getCardPosition,
    cardsRef
  } = useContext(TitlecardsContext);

  return (
    <div className='titlecards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list-container">
        <div className="card-list" ref={cardsRef}>
          {apiData.map((card, index) => {
            const isHovered = hoveredCard && hoveredCard.id === card.id;
            const cardPosition = getCardPosition(index);
            return (
              <Link
                to={`/player/${card.id}`}
                className={`card ${isHovered ? 'hovered' : ''} ${cardPosition}`}
                key={card.id}
                onMouseEnter={() => handleMouseEnter(card, index)}
                onMouseLeave={handleMouseLeave}
              >
                <img src={`https://image.tmdb.org/t/p/w500${card.poster_path}`} alt={card.title} />
                <div className="card-content">
                  <h3>{card.title}</h3>
                  <p className="description">{card.overview}</p>
                  <div className="metadata">
                    <span>{card.release_date.split('-')[0]}</span>
                    <span> • </span>
                    <span> Rating-{card.vote_average.toFixed(1)}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Wrap the Titlecards component with the TitlecardsProvider to inject context
const TitlecardsWrapper = (props) => (
  <TitlecardsProvider category={props.category}>
    <Titlecards {...props} />
  </TitlecardsProvider>
);

export default TitlecardsWrapper;
