import React, { useState, useEffect, useCallback } from "react";
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./Movies.css";
import useWindowSize from "../../utils/useWindowSize.jsx";
import { moviesApi } from "../../utils/MoviesApi.js";
import { mainApi } from "../../utils/MainApi";
import {
  LARGE_VERSION,
  MEDIUM_VERSION,
  MIN_VERSION,
  MORE_CARD_WIDTH_MAX,
  MORE_CARD_WIDTH_MEDIUM,
  MORE_CARD_WIDTH_MIN,
  ADDED_CARDS_MAX,
  ADDED_CARDS_MIN,
  SHORT_MOVIE,
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

  const [movies, setMovies] = useState(localStorage.getItem("movies") || []);
  // Отфильтрованные карточки
  const [filteredMovies, setFilteredMovies] = useState(movies);

  const [amountCard, setAmountCard] = useState(0);
  const [addedCards, setAddedCards] = useState(0);
  const [isEndedCards, setIsEndedCards] = useState(false);

  const [isNotFoundMovies, setIsNotFoundMovies] = useState(false);

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

  useEffect(() => {
    loggedIn && localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies, loggedIn]);

  const filter = (movies) => {
    setIsNotFoundMovies(false);
    const filteredMoviesList = movies.filter((movie) =>
      isShort
        ? (movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(searchString.toLowerCase())) &&
          movie.duration < SHORT_MOVIE
        : movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(searchString.toLowerCase())
    );
      localStorage.setItem("filteredMovies", filteredMoviesList);
      setFilteredMovies(filteredMoviesList);
      return filteredMoviesList
  };

  useEffect(() => {
    setFilteredMovies(filter(movies));
    getSavedMovies();
    if (filteredMovies.length === 0) {
      setIsEndedCards(true);
    }
  }, [searchString, isShort]);

  // Получение фильмов
  function handleSearch(movies) {
    getMovies()
    return movies;
  }

  function getMovies(){
    if (localStorage.getItem("movies")) {
      setMovies(localStorage.getItem("movies"));
    } else {
      loggedIn &&
        moviesApi
          .getAllMoviesCards()
          .then((movies) => {
            if (movies.length === 0) {
              setIsNotFoundMovies(true);
            }
            setFilteredMovies(
              localStorage.setItem("movies", movies)
            );
          })
          .catch(console.error);
    }
  }

  useEffect(() => {
    getMovies();
  }, [searchString]);

  useEffect(() => {
    if (searchString) {
      setFilteredMovies(searchString);
    }
  }, [searchString, isShort]);

  function getSavedMovies() {
    // if ("savedMovies" in localStorage) {
    //   localStorage.getItem("savedMovies");
    // } else {
    loggedIn &&
      mainApi
        .getUserSavedMovies()
        .then((movies) => {
          setSavedMovies(movies);
          localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
        })
        .catch((error) => console.log(error));
    //  }
  }

  const windowWidth = useWindowSize();
  // Изменение количества отображаемых и добавляемых карточек
  const changeLengthOfMovies = useCallback(() => {
    if (windowWidth >= LARGE_VERSION) {
      setAmountCard(MORE_CARD_WIDTH_MAX);
      setAddedCards(ADDED_CARDS_MAX);
    } else if (windowWidth >= MEDIUM_VERSION && windowWidth < LARGE_VERSION) {
      setAmountCard(MORE_CARD_WIDTH_MEDIUM);
      setAddedCards(ADDED_CARDS_MIN);
    } else if (windowWidth >= MIN_VERSION && windowWidth < MEDIUM_VERSION) {
      setAmountCard(MORE_CARD_WIDTH_MIN);
      setAddedCards(ADDED_CARDS_MIN);
    }
  }, [windowWidth]);

  function renderMovies(count) {
    if (count >= filteredMovies.length) {
      setIsEndedCards(true);
    } else {
      setIsEndedCards(false);
    }
  }

  useEffect(() => {
    changeLengthOfMovies();
    renderMovies(amountCard);
  }, [windowWidth, loggedIn]);

  function handleMoreMovies() {
    setAmountCard(amountCard + addedCards);
    // let full = 0;
    // full = +amountCard + addedCards;
    // setAmountCard(full);
    // renderMovies(full);
  }

  /*
  useEffect(() => {
    handleSearch();
  }, [searchString]);*/

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
          isSavedPage={isSavedPage}
          isNotFoundMovies={isNotFoundMovies}
          amountCard={amountCard}
        />
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
