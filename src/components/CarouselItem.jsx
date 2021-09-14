import React from 'react';
import { Link } from 'react-router-dom';
import playIcon from '../assets/static/play-icon.png';
import plusIcon from '../assets/static/plus-icon.png';
import removeIcon from '../assets/static/remove-icon.png';
import '../assets/styles/components/CarouselItem.scss';

const CarouselItem = ({
  id,
  cover,
  year,
  contentRating,
  duration,
  title,
  isList,
}) => {
  const handleSetFavorite = () => {};
  const handleDeleteFavorite = () => {};
  return (
    <div className="carousel-item">
      <img className="carousel-item__img" src={cover} alt={title} />
      <div className="carousel-item__details">
        <div>
          <Link to={`/player/${id}`}>
            <img
              className="carousel-item__details--img"
              src={playIcon}
              alt="Play Icon"
            />
          </Link>
          {isList ? (
            <img
              src={removeIcon}
              alt="Remove Icon"
              className="carousel-item__details--img"
              onClick={handleDeleteFavorite}
            />
          ) : (
            <img
              onClick={handleSetFavorite}
              src={plusIcon}
              alt="Remove Icon"
              className="carousel-item__details--img"
            />
          )}
        </div>
        <p className="carousel-item__details--title">{title}</p>
        <p className="carousel-item__details--subtitle">
          {`${year} ${contentRating} ${duration}`}
        </p>
      </div>
    </div>
  );
};

export default CarouselItem;
