import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import playIcon from '../assets/static/play-icon.png';
import plusIcon from '../assets/static/plus-icon.png';
import removeIcon from '../assets/static/remove-icon.png';
import '../assets/styles/components/CarouselItem.scss';
import { setFavorite, deleteFavorite } from '../actions';

const CarouselItem = ({
  id,
  cover,
  year,
  contentRating,
  duration,
  title,
  isList,
  setFavorite,
  deleteFavorite,
}) => {
  const handleSetFavorite = (e) => {
    setFavorite({ movie: { id, cover, year, contentRating, duration, title } });
    const image = document.getElementById(id);
    image.style.display = 'none';
  };
  const handleDeleteFavorite = () => {
    deleteFavorite({ id });
    const image = document.getElementById(id);
    image.style.display = 'inline-block';
  };
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
              id={id}
              onClick={handleSetFavorite}
              src={plusIcon}
              alt=""
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

export default connect(null, {
  setFavorite,
  deleteFavorite,
})(CarouselItem);
