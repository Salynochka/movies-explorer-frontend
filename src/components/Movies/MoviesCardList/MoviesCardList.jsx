import "../MoviesCard/MoviesCard.css";
import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";

function MoviesCards({
  movies,
//  moviesFilter,
  isSavedPage,
  handleMoreMovies,
  isEndedCards,
  savedMovies,
  isLoading,
  setSavedMovies,
}) {
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
            isSavedPage={isSavedPage}
          />
        ))}
      </div>
      <div className="cards__more">
        {isSavedPage ? (
          ""
        ) : (
          <button
            className="cards__button"
            type="button"
            onClick={handleMoreMovies}
            disabled={isEndedCards}
          >
            Ещё
          </button>
        )}
      </div>
    </section>
  );
}

export default MoviesCards;
