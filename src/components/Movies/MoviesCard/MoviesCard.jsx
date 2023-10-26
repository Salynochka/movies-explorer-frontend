import "./MoviesCard.css";

function MoviesCard({nameRU, image, duration, trailerLink }) {
  return (
    <>
      <article className="card">
        <div className="card__info">
          <img
            className="card__photo"
            src={`https://api.nomoreparties.co/${image}`}
            alt={nameRU}
          />
          <div className="card__description">
            <div className="card__section">
              <h2 className="card__title">{nameRU}</h2>
              <form className="card__save" >
                <input className="card__save-button" type="checkbox" name="radio"/>
              </form>
            </div>
            <h2 className="card__duration">{duration}</h2>
          </div>
        </div>
      </article>
    </>
  );
}

export default MoviesCard;
