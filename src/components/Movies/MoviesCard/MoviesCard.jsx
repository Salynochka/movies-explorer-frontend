import "./MoviesCard.css";

function MoviesCard({ nameRU, image, duration, trailerLink, onButtonMovie }) {
  
  function durationHours(duration){
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return (hours > 0) ? `${hours}ч ${minutes}м`: `${minutes}м`
  }

  return (
    <>
      <article className="card">
        <div className="card__info">
          <a href={`${trailerLink}`}>
            <img
              className="card__photo"
              src={`https://api.nomoreparties.co/${image}`}
              alt={nameRU}
            />
          </a>
          <div className="card__description">
            <div className="card__section">
              <h2 className="card__title">{nameRU}</h2>
              <form className="card__save">
                <input
                  className="card__save-button"
                  type="checkbox"
                  name="radio"
                  onClick={onButtonMovie}
                />
              </form>
            </div>
            <h2 className="card__duration">{durationHours(duration)}</h2>
          </div>
        </div>
      </article>
    </>
  );
}

export default MoviesCard;
