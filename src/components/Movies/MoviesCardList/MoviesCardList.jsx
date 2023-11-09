import "../MoviesCard/MoviesCard.css";
import React, { useCallback, useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";
import useWindowSize from "../../../utils/useWindowSize.js";
import {
  largeVersion,
  mediumVersion,
  minVersion,
  moreCardsWidthMax,
  moreCardsWidthMedium,
  moreCardsWidthMin,
  addedCardsMax,
  addedCardsMin
} from "../../../utils/constants.js";

function MoviesCards({ movies, savedMovies, isLoading, onButtonMovie }) {
  const [amountCard, setAmountCard] = useState(0);
  const [addedCards, setAddedCards] = useState(0);
  const [isEndedCards, setIsEndedCards] = useState(false);
  const [renderedMovie, setRenderedMovies] = useState([]);
  const [findMovies, setFindMovies] = useState([]);

  const windowWidth = useWindowSize();
  // Изменение количества отображаемых карточек
  const changeLengthOfMovies = useCallback(() => {
    if (windowWidth >= largeVersion) {
      setAmountCard(moreCardsWidthMax);
      setAddedCards(addedCardsMax);
    } else if (windowWidth >= mediumVersion && windowWidth < largeVersion) {
      setAmountCard(moreCardsWidthMedium);
      setAddedCards(addedCardsMin);
    } else if (windowWidth >= minVersion && windowWidth < mediumVersion){
      setAmountCard(moreCardsWidthMin);
      setAddedCards(addedCardsMin)
    }
  }, [windowWidth])

  useEffect(() => {
    changeLengthOfMovies();
    renderCards(amountCard);
  }, [changeLengthOfMovies, renderCards]);

  function handleMoreMovies() {
    let full = 0;
    full = +amountCard + addedCards;
    setAmountCard(full);
    renderCards(full);
  };

  const renderCards = useCallback(
    (count) => {
      if (count >= findMovies.length) {
        setIsEndedCards(true);
      } else {
        setIsEndedCards(false);
      }
      setRenderedMovies(findMovies.slice(0, count));
    },
    [findMovies]
  );
/*
  function getSavedMovie (savedMovies, card) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === card.id);
  };*/

  return (
    <section className="cards">
      {isLoading && <Preloader />}
      <div className="cards__full">
        {movies.map((movie) => (
          <MoviesCard
            nameRU={movie.nameRU}
            image={movie.image.url}
            duration={movie.duration}
            trailerLink={movie.trailerLink}
            movie={renderedMovie}
            key={movie.id}
            onButtonMovie={onButtonMovie}
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
          disabled={isEndedCards || !movies.length}
        >
          {" "}
          Ещё{" "}
        </button>
      </div>
    </section>
  );
}

export default MoviesCards;

