import "./MoviesCard.css";
import React, { useState } from "react";
import { mainApi } from "../../../utils/MainApi";

function MoviesCard({ movie, savedMovies, setSavedMovies }) {
  const [isSaved, setIsSaved] = useState(false);

  function durationHours(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
  }
/*
  function onCardClick(movie, isSaved) {
    if (isSaved) {
      handleMovieUnsave(movie._id); //savedMovies.find((m) => m.movieId === movie.id));
    } else {
      handleMovieSave(movie);
    }
  }*/

  function handleMovieSave(movie) {
    if (isSaved) {
      handleMovieUnsave(movie.id);
    } else {
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
  }

  // Функция удаления из сохраненных
  function handleMovieUnsave(id) {
    mainApi
      .unsaveMovie(id)
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
                  checked={isSaved}
                  onChange={handleMovieSave}
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
