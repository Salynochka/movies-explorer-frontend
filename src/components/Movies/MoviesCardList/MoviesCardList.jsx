import "../MoviesCard/MoviesCard.css";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";

function MoviesCards({
  isLoading,
  movies,
  isSavedPage,
  handleMoreMovies,
  savedMovies,
  handleSaveMovie,
  handleUnsaveMovie,
  isSaved,
  isNotFoundMovies,
}) {
  const location = useLocation();

  const moviesSearch = JSON.parse(localStorage.getItem("moviesSearch"));
  const moviesCheckbox = JSON.parse(
    localStorage.getItem("moviesFilterCheckbox")
  );

  const lengthMovies = JSON.parse(localStorage.getItem("checkbox"))
    ? moviesCheckbox
    : moviesSearch;

  return (
    <section
      className={
        location.pathname === "/saved-movies" ? "cards cards_saved" : "cards"
      }
    >
        <>
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
          <div className="cards__more">
            {location.pathname === "/movies" &&
            movies.length >= 3 &&
            movies.length < lengthMovies.length ? (
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
    </section>
  );
}

export default MoviesCards;
