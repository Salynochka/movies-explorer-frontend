import "./MoviesCard.css";
import React, { useState } from "react";
import { mainApi } from "../../../utils/MainApi";

function MoviesCard({
  movie,
  isSaved,
  setIsSaved,
  savedMovies,
  setSavedMovies,
}) {

  function durationHours(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
  }

  function onCardClick() {
    if (isSaved) {
      handleMovieUnsave(savedMovies.find((m) => m.movieId === movie.id));
    } else {
      handleMovieSave(movie);
    }
  }

  function handleMovieSave(movie) {

      mainApi
        .saveMovie(movie)
        .then((newMovie) => {
          setSavedMovies([newMovie, ...savedMovies]);
          setIsSaved(true);
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
          setIsSaved(false);
        });
  }

  // Функция удаления из сохраненных
  function handleMovieUnsave(movie) {
    mainApi
      .unsaveMovie(movie)
      .then(() => {
        const movieId = movie.movieId || movie.id;
        const updatedSavedMovies = savedMovies.filter((m) => m._id !== movieId);
        setSavedMovies(updatedSavedMovies);
        setIsSaved(false);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  return (
    <>
      <article className="card">
        <div className="card__info">
          <a href={`${movie.trailerLink}`}>
            <img
              className="card__photo"
              src={`https://api.nomoreparties.co/${movie.image.url}`}
              alt={`${movie.nameRU}`}
            />
          </a>
          <div className="card__description">
            <div className="card__section">
              <h2 className="card__title">{`${movie.nameRU}`}</h2>
              <form className="card__save">
                <input
                  className="card__save-button"
                  type="checkbox"
                  name="radio"
                //  checked={handleMovieUnsave}
                //  onChange={handleMovieSave}
                  isSaved={false}
                  onClick={onCardClick}
                />
              </form>
            </div>
            <h2 className="card__duration">{durationHours(movie.duration)}</h2>
          </div>
        </div>
      </article>
    </>
  );
}

export default MoviesCard;
