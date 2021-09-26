import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import playIcon from '../assets/static/play-icon.png';
import plusIcon from '../assets/static/plus-icon.png';
import removeIcon from '../assets/static/remove-icon.png';
import '../assets/styles/components/CarouselItem.scss';
import { setFavoritePreviusly, deleteFavoritePreviusly } from '../actions/index';

const CarouselItem = ({
  _id,
  cover,
  year,
  contentRating,
  duration,
  title,
  isList,
  setFavoritePreviusly,
  deleteFavoritePreviusly,
  userId,
  userMovie,
  myList
}) => {
  const handleSetFavorite = (e) => {
    const image = document.getElementById(_id);
    image.style.display = 'none';
    const v = myList.some(({_id:idMovie})=>idMovie===_id)
    if(v){
      setFavoritePreviusly({ movie: { _id, cover, year, contentRating, duration, title }, userId, isExist:true});
      return true
    }      
    setFavoritePreviusly({ movie: { _id, cover, year, contentRating, duration, title }, userId, isExist: false});
  };
  const handleDeleteFavorite = () => {
    const image = document.getElementById(_id);
    deleteFavoritePreviusly({ _id, userMovieId: userMovie });
    image.style.display = 'inline-block';
  };
  return (
    <div className="carousel-item">
      <img className="carousel-item__img" src={cover} alt={title} />
      <div className="carousel-item__details">
        <div>
          <Link to={`/player/`}>
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
              id={_id}
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

export default connect(({user, myList})=>({userId:user.id, myList}), {
  setFavoritePreviusly,
  deleteFavoritePreviusly,
})(CarouselItem);
