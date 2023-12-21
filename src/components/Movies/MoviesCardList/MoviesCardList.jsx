import "../MoviesCard/MoviesCard.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";
import "./MoviesCardList.css";
import {
  LARGE_VERSION,
  MEDIUM_VERSION,
  CARD_WIDTH_MAX,
  CARD_WIDTH_MEDIUM,
  CARD_WIDTH_MIN,
  ADDED_CARDS_MAX,
  ADDED_CARDS_MIN,
} from "../../../utils/constants.js";

function MoviesCards({
  movies,
  isSavedPage,
  savedMovies,
  handleSaveMovie,
  handleUnsaveMovie,
  isSaved,
}) {
  const location = useLocation();
  const [displayedMovies, setDisplayedMovies] = useState(0);

  function handleDisplayedMovies() {
    const windowInnerWidth = window.innerWidth;
    console.log("Отображение карточек в от разрешения экрана");
    console.log(windowInnerWidth);
    if (windowInnerWidth > LARGE_VERSION) {
      setDisplayedMovies(CARD_WIDTH_MAX);
    } else if (windowInnerWidth > MEDIUM_VERSION) {
      setDisplayedMovies(CARD_WIDTH_MEDIUM);
    } else {
      setDisplayedMovies(CARD_WIDTH_MIN);
    }
  }

  useEffect(() => {
    handleDisplayedMovies();
  }, [movies]);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", handleDisplayedMovies);
      console.log("слушатель resize создаю");
    }, 500);
  });

  function handleMoreMovies() {
    const windowInnerWidth = window.innerWidth;
    if (windowInnerWidth > LARGE_VERSION) {
      setDisplayedMovies(displayedMovies + ADDED_CARDS_MAX);
    } else if (windowInnerWidth > MEDIUM_VERSION) {
      setDisplayedMovies(displayedMovies + ADDED_CARDS_MIN);
    } else {
      setDisplayedMovies(displayedMovies + ADDED_CARDS_MIN);
    }
  }

  return (
    <section
      className={
        location.pathname === "/saved-movies" ? "cards cards_saved" : "cards"
      }
    >
      <>
        {location.pathname === "/saved-movies" ? (
          <div className="cards__full">
            {movies.map((movie) => (
              <MoviesCard
                movie={movie}
                key={movie.id || movie._id}
                handleUnsaveMovie={handleUnsaveMovie}
                handleSaveMovie={handleSaveMovie}
                isSaved={isSaved}
                savedMovies={savedMovies}
                isSavedPage={isSavedPage}
              />
            ))}
          </div>
        ) : (
          <>
            <div className="cards__full">
              {movies.slice(0, displayedMovies).map((movie) => (
                <MoviesCard
                  movie={movie}
                  key={movie.id || movie._id}
                  handleUnsaveMovie={handleUnsaveMovie}
                  handleSaveMovie={handleSaveMovie}
                  isSaved={isSaved}
                  savedMovies={savedMovies}
                  isSavedPage={isSavedPage}
                />
              ))}
            </div>
            <div className="cards__more">
              {movies.length > displayedMovies ? (
                <button
                  className="cards__button"
                  type="button"
                  onClick={handleMoreMovies}
                >
                  Ещё
                </button>
              ) : (
                ""
              )}
            </div>
          </>
        )}
      </>
    </section>
  );
}

export default MoviesCards;
