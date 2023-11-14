import "./MoviesCard.css";
import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { mainApi } from "../../../utils/MainApi";
import { CurrentUserContext } from "../../../context/CurrentUserContext";

function MoviesCard({ movie, savedMovies, setSavedMovies }) {

  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const isMoviesPage = location.pathname === "/movies";
  const isSavedMoviesPage = location.pathname === "/saved-movies";

  const [isSaved, setIsSaved] = useState(false);

  function durationHours(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
  }

  function onCardClick() {
    const savedMovie = savedMovies.find(
        (savedMovie) => savedMovie.movieId === Number(movie.id),
    )
    if (isSaved) {
      handleMovieUnsave(savedMovie._id);
    } else {
      handleMovieSave(movie);
    }
  }

  function handleMovieSave(movie) {
    const movieId = savedMovies.find((m) => m.movieId === movie.id)
    if (isSaved) {
      handleMovieUnsave(movieId);
    } else {
      movie.owner = currentUser._id;
      return mainApi
        .saveMovie(movie)
        .then((newMovie) => {
          movie._id = newMovie["_id"];
          setSavedMovies([...savedMovies, newMovie]);
          localStorage.setItem("savedMovie", JSON.stringify(savedMovies, ...[movie]));
          setIsSaved(true);
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
          setIsSaved(false);
        });
    }
  }

  // Функция удаления из сохраненных
  function handleMovieUnsave(movie) {
    return mainApi
      .unsaveMovie(movie)
      .then(() => {
        const updatedSavedMovies = savedMovies.filter(
          (i) => i.id !== movie.movieId
        );
        setIsSaved(false);
        setSavedMovies(updatedSavedMovies);
        localStorage.setItem(
          "filteredSavedMovies",
          JSON.stringify(updatedSavedMovies)
        );
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  useEffect(() => {
    const savedMovie = savedMovies.find(
        (savedMovie) => savedMovie.movieId === Number(movie.id),
    )
    // Проверяем, сохранена ли карточка при загрузке компонента
    if (savedMovie?.movieId === movie.id) {
      setIsSaved(true);
    }
  }, [movie.movieId]);

  return (
    <>
      <article className="card">
        <div className="card__info">
          <a href={`${movie.trailerLink}`}>
            <img
              className="card__photo"
              src={
                isSavedMoviesPage
                  ? movie.image
                  : `https://api.nomoreparties.co${movie.image.url}`
              }
              alt={`${movie.nameRU}`}
            />
          </a>
          <div className="card__description">
            <div className="card__section">
              <h2 className="card__title">{`${movie.nameRU}`}</h2>
              {isMoviesPage && (
                <button
                  className={`card__save-button ${
                    isSaved ? "card__save-button_active" : ""
                  }`}
                  type="button"
                  onClick={() => onCardClick()}
                />
              )}
              {isSavedMoviesPage && (
                <button
                  onClick={() => handleMovieUnsave(movie._id)}
                  className="card__unsave"
                />
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
