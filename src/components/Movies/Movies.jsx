import React, { useState, useEffect, useCallback } from "react";
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./Movies.css";
import useWindowSize from "../../utils/useWindowSize.jsx";
import { moviesApi } from "../../utils/MoviesApi.js";
import {
  largeVersion,
  mediumVersion,
  minVersion,
  moreCardsWidthMax,
  moreCardsWidthMedium,
  moreCardsWidthMin,
  addedCardsMax,
  addedCardsMin,
  shortMovie
} from "../../utils/constants.js";

function Movies({
  onBurgerMenu,
  loggedIn,
  savedMovies,
  isLoading,
  setSavedMovies,
}) {
  const [searchString, setSearchString] = useState(
    localStorage.getItem("searchString") || ""
  );
  const [isShort, setIsShort] = useState(
    JSON.parse(localStorage.getItem("isShort")) || false
  );
  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem("movies")) || []
  );
  const [filteredMovies, setFilteredMovies] = useState(movies);

  const [amountCard, setAmountCard] = useState(0);
  const [addedCards, setAddedCards] = useState(0);
  const [isEndedCards, setIsEndedCards] = useState(false);

  const isSavedPage = false;

  function searchChange(evt) {
    const value = evt.target.value;
    setSearchString(value);
    localStorage.setItem("searchString", value);
  }

  function toggleCheckbox(evt) {
    const value = evt.target.checked;
    setIsShort(value);
    localStorage.setItem("isShort", value);
  }

  const filter = (movies) => {
    return movies.filter((movie) =>
      isShort
        ? (movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(searchString.toLowerCase())) &&
          movie.duration < shortMovie
        : movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(searchString.toLowerCase())
    );
  };

  useEffect(() => {
    setFilteredMovies(filter(movies));
  }, [searchString, isShort]);

  // Получение фильмов
  function handleSearch() {
    if (loggedIn) {
      if (localStorage.getItem("movies")) {
        setMovies(JSON.parse(localStorage.getItem("movies")));
      } else {
        moviesApi
          .getAllMoviesCards()
          .then((movies) => {
            localStorage.setItem("movies", JSON.stringify(movies));
            setMovies(movies);
          })
          .catch(console.error);
      }
    }
  }

  const windowWidth = useWindowSize();
  // Изменение количества отображаемых и добавляемых карточек
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

  function renderMovies(count) {
    if (count >= movies.length) {
      setIsEndedCards(true);
    } else {
      setIsEndedCards(false);
    }
    setFilteredMovies(movies.slice(0, count));
  }

  useEffect(() => {
    changeLengthOfMovies();
    renderMovies(amountCard);
  }, [windowWidth, loggedIn]);

  useEffect(() => {
    handleSearch();
  }, []);

  function handleMoreMovies() {
    let full = 0;
    full = +amountCard + addedCards;
    setAmountCard(full);
    renderMovies(full);
  }

  return (
    <div className="movies">
      <Header
        onBurgerMenu={onBurgerMenu}
        isSavedPage={isSavedPage}
        loggedIn={loggedIn}
      />
      <main>
        <SearchForm
          searchString={searchString}
          searchChange={searchChange}
          search={handleSearch}
        />
        <FilterCheckbox switchCheckbox={toggleCheckbox} isShort={isShort} />
        <MoviesCardList
          movies={filteredMovies}
          isLoading={isLoading}
          savedMovies={savedMovies}
          setSavedMovies={setSavedMovies}
          handleMoreMovies={handleMoreMovies}
          isEndedCards={isEndedCards}
          moviesFilter={movies}
          isSavedPage={isSavedPage}
        />
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
