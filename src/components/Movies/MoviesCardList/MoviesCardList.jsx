import "../MoviesCard/MoviesCard.css";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";
import "./MoviesCardList.css";

function MoviesCards({ movies, savedMovies }) {
  return (
    <section className="cards">
      <div className="cards__full">
        {movies.map((movie) => (
          <MoviesCard
            nameRU={movie.nameRU}
            image={movie.image.url}
            duration={movie.duration}
            trailerLink={movie.trailerLink}
            card={movie}
            key={movie.id}
          />
        ))}
      </div>
      <div
        className={`cards__more cards__more${savedMovies ? "_increased" : ""}`}
      >
        <button
          className={`cards__button cards__button${
            savedMovies ? "_hidden" : ""
          }`}
          type="button"
        >
          {" "}
          Ещё{" "}
        </button>
      </div>
    </section>
  );
}

export default MoviesCards;
