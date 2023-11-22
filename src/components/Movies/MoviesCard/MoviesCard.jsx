import "./MoviesCard.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function MoviesCard({
  movie,
  handleUnsaveMovie,
  handleSaveMovie,
  savedMovies,
}) {
  const location = useLocation();

  const isMoviesPage = location.pathname === "/movies";
  const isSavedMoviesPage = location.pathname === "/saved-movies";

  const { isAdd, id } = movie;
  const [isSaved, setIsSaved] = useState(isAdd);

  function durationHours(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
  }

  useEffect(() => {
    const savedMovie = savedMovies.length
      ? savedMovies.find((movieSave) => movieSave?.movieId === id)
      : false;
    setIsSaved(!!savedMovie);
  }, [savedMovies]);

  function handleClickSave() {
    isSaved
      ? handleUnsaveMovie(savedMovies.filter((m) => m.movieId === movie.id)[0], setIsSaved)
      : handleSaveMovie(movie, setIsSaved);
  }

  function handleClickUnsave() {
    handleUnsaveMovie(movie, setIsSaved);
  }

  return (
    <>
      <article className="card" key={movie.id}>
        <div className="card__info">
          <a href={movie.trailerLink}>
            <img
              className="card__photo"
              src={isSavedMoviesPage
                ? movie.image
                : `https://api.nomoreparties.co/${movie.image.url}`}
              alt={movie.nameRU}
            />
          </a>
          <div className="card__description">
            <div className="card__section">
              <h2 className="card__title">{`${movie.nameRU}`}</h2>
              {isMoviesPage && (
                <button
                  className={!isSaved ? `card__save-button` : `card__save-button_active`}
                  type="button"
                  onClick={handleClickSave}
                />
              )}
              {isSavedMoviesPage && (
                <button onClick={handleClickUnsave} className="card__unsave" />
              )}
            </div>
            <h2 className="card__duration">{durationHours(movie.duration)}</h2>
          </div>
        </div>
      </article>
    </>
  );
}

export default MoviesCard;
