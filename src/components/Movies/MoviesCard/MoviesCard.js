import "./MoviesCard.css";

function MoviesCard(props) {
  return (
    <article className="card">
      <div className="card__info">
        <img
          className="card__photo"
          src={props.card.link}
          alt={props.card.name}
          onClick={props.handleClick}
        />
        <div className="card__description">
          <div className="card__section">
            <h2 className="card__title">{props.card.name}</h2>
            <button
              className="card__save-button"
              type="button"
              onClick={props.handleSaveClick}
            />
          </div>
          <h2 className="card__duration">{props.card.duration}</h2>
        </div>
      </div>
    </article>
  );
}

export default MoviesCard;
