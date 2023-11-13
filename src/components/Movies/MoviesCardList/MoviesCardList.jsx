import "../MoviesCard/MoviesCard.css";
import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";
import "./MoviesCardList.css";

function MoviesCards({
  movies,
  isSavedPage,
  handleMoreMovies,
  isEndedCards,
  savedMovies,
  setSavedMovies,
  isNotFoundMovies,
  amountCard
}) {

  return (
    <section className="cards">
      {isNotFoundMovies ? (
        <p className="cards_not-found">Ничего не найдено</p>
      ) : (
        <>
          <div className="cards__full">
            {movies.slice(0, amountCard).map((movie) => (
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
            {(isSavedPage || isEndedCards) ? (
              ""
            ) : (
              <button
                className="cards__button"
                type="button"
                onClick={handleMoreMovies}
              >
                Ещё
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default MoviesCards;
