import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const handleClick = card => {
    onCardClick(card);
  };
  const handleLikeClick = card => {
    onCardLike(card);
  };
  const handleDeleteClick = card => {
    onCardDelete(card);
  };

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `like-button ${isLiked ? 'like-button_status-active' : ''}`;

  return (
    <article className="element">
      <img
        src={card.link}
        alt={card.name}
        className="element__img"
        onClick={() => handleClick(card)}
      />
      {isOwn ? (
        <button
          className="delete-button"
          type="button"
          onClick={() => handleDeleteClick(card)}
        ></button>
      ) : null}
      <div className="element__group">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__like">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={() => handleLikeClick(card)}
          ></button>
          <p className="like-button_count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}
