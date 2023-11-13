import "./MoviesCard.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { mainApi } from "../../../utils/MainApi";
import exitCard from "../../../images/exitImage.svg";

function MoviesCard({ movie, savedMovies, setSavedMovies, isSavedPage }) {
  const location = useLocation();
  const isMoviesPage = location.pathname === "/movies";
  const isSavedMoviesPage = location.pathname === "/saved-movies";

  const [isSaved, setIsSaved] = useState(false);

  function durationHours(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
  }

  function onCardClick(movie) {
    const savedMovie = savedMovies.find(i => i.movieId === (movie.movieId || movie.id));
    if (isSaved) {
      handleMovieUnsave(savedMovie); //savedMovies.find((m) => m.movieId === movie.id));
    } else {
      handleMovieSave(movie);
    }
  //  setIsSaved(!isSaved);
  }

  function handleMovieSave(movie) {
    if (isSaved) {
      handleMovieUnsave(movie.movieId);
    } else {
      mainApi
        .saveMovie(movie)
        .then((newMovie) => {
          setSavedMovies([...savedMovies, newMovie]);
          setIsSaved(true);
         // localStorage.setItem("savedMovie", JSON.stringify(movie));
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
          setIsSaved(false);
        });
    }
  }

  // Функция удаления из сохраненных
  function handleMovieUnsave(movie) {
    mainApi
      .unsaveMovie(movie.movieId)
      .then(() => {
        const updatedSavedMovies = savedMovies.filter((i) => i.movieId !== movie.movieId)
        //  const updatedSavedMovies = savedMovies.filter((m) => m._id !== movieId);
        setIsSaved(false);
        setSavedMovies(updatedSavedMovies
   //       movies.filter((savedMovie) => movie._id !== savedMovie._id)
        );
        //  localStorage.removeItem(movie.id);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  useEffect(() => {
    // Проверяем, сохранена ли карточка при загрузке компонента
    const saved = localStorage.getItem("savedMovie");
    if (saved) {
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
                isSavedPage
                  ? `${movie.image}`
                  : `https://api.nomoreparties.co/${movie.image.url}`
              }
              alt={`${movie.nameRU}`}
            />
          </a>
          <div className="card__description">
            <div className="card__section">
              <h2 className="card__title">{`${movie.nameRU}`}</h2>
              {isMoviesPage && (
                <form className="card__save">
                  <input
                    className="card__save-button"
                    type="checkbox"
                    name="radio"
                    checked={isSaved}
                    onChange={onCardClick}
                  />
                </form>
              )}
              {isSavedMoviesPage && (
                <img
                  onClick={() => handleMovieUnsave(movie)}
                  className="card__unsave"
                  src={exitCard}
                  alt="Удаление"
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
