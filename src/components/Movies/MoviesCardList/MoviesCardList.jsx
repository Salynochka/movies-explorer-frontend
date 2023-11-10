import "../MoviesCard/MoviesCard.css";
import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";

function MoviesCards({ movies, moviesFilter, handleMoreMovies, isEndedCards, savedMovies, isLoading, setSavedMovies }) {

  return (
    <section className="cards">
      {isLoading && <Preloader />}
      <div className="cards__full">
        {movies.map((movie) => (
          <MoviesCard
            movie={movie}
            key={movie.id || movie.movieId}
            savedMovies={savedMovies}
            setSavedMovies={setSavedMovies}
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
          onClick={handleMoreMovies}
          disabled={isEndedCards || !moviesFilter.length}
        >
          {" "}
          Ещё{" "}
        </button>
      </div>
    </section>
  );
}

export default MoviesCards;