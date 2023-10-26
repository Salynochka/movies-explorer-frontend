import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__like ${
    isLiked && "card__like_active"
  }`;

  return (
    <article className="card">
      {isOwn && 
        <button
          className="card__delete-button"
          type="button"
          onClick={handleDeleteClick}
        />
      }
      <div className="card__info">
        <img
          className="card__photo"
          src={props.card.link}
          alt={props.card.name}
          onClick={handleClick}
        />
        <div className="card__subscribe">
          <h2 className="card__title">{props.card.name}</h2>
          <div className="card__like-section">
            <button
              className={cardLikeButtonClassName}
              type="button"
              onClick={handleLikeClick}
            />
            <span className="card__like-counter">{props.card.likes.length}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default Card;
