import "../MoviesCard/MoviesCard.css";
import React, { useCallback, useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";
import useWindowSize from "../../../utils/useWindowSize.jsx";
import {
  largeVersion,
  mediumVersion,
  minVersion,
  moreCardsWidthMax,
  moreCardsWidthMedium,
  moreCardsWidthMin,
  addedCardsMax,
  addedCardsMin,
} from "../../../utils/constants.js";

function MoviesCards({ movies, savedMovies, isLoading, isSaved, setIsSaved, setSavedMovies }) {
  const [amountCard, setAmountCard] = useState(0);
  const [addedCards, setAddedCards] = useState(0);
  const [isEndedCards, setIsEndedCards] = useState(false);
  const [renderedMovies, setRenderedMovies] = useState([]);
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
    } else if (windowWidth >= minVersion && windowWidth < mediumVersion) {
      setAmountCard(moreCardsWidthMin);
      setAddedCards(addedCardsMin);
    }
  }, [windowWidth]);

  const renderCards = useCallback(
    (count) => {
      if (count >= findMovies.length) {
        setIsEndedCards(true);
      } else {
        setIsEndedCards(false);
      }
      setFindMovies(findMovies.slice(0, count));
    },
    [renderedMovies]
  );

  useEffect(() => {
    changeLengthOfMovies();
    renderCards(amountCard);
  }, [changeLengthOfMovies, renderCards, amountCard]);

  function handleMoreMovies() {
    let full = 0;
    full = +amountCard + addedCards;
    setAmountCard(full);
    renderCards(full);
  }

  return (
    <section className="cards">
      {isLoading && <Preloader />}
      <div className="cards__full">
        {renderedMovies.map((movie) => (
          <MoviesCard
            isSaved={isSaved}
            setIsSaved={setIsSaved}
            movie={movie}
            key={movie.id}
            savedMovies={savedMovies}
            setSavedMovies={setSavedMovies}
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
