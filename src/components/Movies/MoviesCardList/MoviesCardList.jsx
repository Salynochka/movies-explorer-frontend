import "../MoviesCard/MoviesCard.css";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";

function MoviesCards({ movies, savedMovies, isLoading, onButtonMovie }) {
  return (
    <section className="cards">
      {isLoading && <Preloader />}
      <div className="cards__full">
        {movies.map((movie) => (
          <MoviesCard
            nameRU={movie.nameRU}
            image={movie.image.url}
            duration={movie.duration}
            trailerLink={movie.trailerLink}
            movie={movie}
            key={movie.id}
            onButtonMovie={onButtonMovie}
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
