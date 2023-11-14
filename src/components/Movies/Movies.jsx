import React, { useState, useEffect, useCallback } from "react";
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./Movies.css";
import useWindowSize from "../../utils/useWindowSize.jsx";
import Preloader from "./Preloader/Preloader.jsx";
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

  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem("movies")) || []
  );
  // Отфильтрованные карточки
  const [filteredMovies, setFilteredMovies] = useState(movies);

  const [amountCard, setAmountCard] = useState(0);
  const [addedCards, setAddedCards] = useState(0);
  const [isEndedCards, setIsEndedCards] = useState(false);

  const [isNotFoundMovies, setIsNotFoundMovies] = useState(false);

  const isSavedPage = false;

  const searchChange = (event) => {
    setSearchString(event.target.value);
    localStorage.setItem("searchString", event.target.value);
  };

  const toggleCheckbox = (event) => {
    setIsShort(event.target.checked);
    localStorage.setItem("isShort", event.target.checked);
  };

  useEffect(() => {
    handleSearch();
  }, [searchString]);

  function getMovies() {
    loggedIn &&
      moviesApi
        .getAllMoviesCards()
        .then((movies) => {
          setMovies(movies);
          localStorage.setItem("movies", JSON.stringify(movies));
        })
        .catch(console.error);
  }

  const filter = (movies) => {
    setIsNotFoundMovies(false);
    return movies.filter((movie) =>
      isShort
        ? (movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(searchString.toLowerCase())) &&
          movie.duration < SHORT_MOVIE
        : movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(searchString.toLowerCase())
    );
  };

  useEffect(() => {
    localStorage.setItem(
      "filteredMovies",
      JSON.stringify(filter(filteredMovies))
    );
    const filtered = filter(movies);
    localStorage.setItem("filtered", JSON.stringify(filtered));
    setFilteredMovies(filtered);
    getSavedMovies();
    if (filtered.length === 0) {
      setIsEndedCards(true);
      setIsNotFoundMovies(true);
    }
  }, [searchString, isShort]);

  useEffect(() => {
    if (searchString) {
      setSearchString(searchString);
      handleSearch(filteredMovies);
    }
    localStorage.getItem("filtered");
  }, [searchString, isShort]);

  // Получение фильмов
  function handleSearch(movies) {
    getMovies();
    return movies;
  }

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
          submit={handleSearch}
        />
        <FilterCheckbox switchCheckbox={toggleCheckbox} isShort={isShort} />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            movies={filteredMovies}
            savedMovies={savedMovies}
            setSavedMovies={setSavedMovies}
            handleMoreMovies={handleMoreMovies}
            isEndedCards={isEndedCards}
            isSavedPage={isSavedPage}
            isNotFoundMovies={isNotFoundMovies}
            amountCard={amountCard}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Movies;

/*
  const handleSearch = () => {
    if (searchString.trim() !== "") {
      moviesApi
        .getAllMoviesCards()
        .then((foundedMovies) => {
          setMovies(foundedMovies);
          localStorage.setItem("movies", JSON.stringify(foundedMovies));
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    if (searchString) {
      let filtered = movies.filter((movie) =>
        isShort
          ? (movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) ||
              movie.nameEN
                .toLowerCase()
                .includes(searchString.toLowerCase())) &&
            movie.duration < SHORT_MOVIE
          : movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(searchString.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies([]);
    }
    //getSavedMovies();
    if (filteredMovies.length === 0) {
      setIsEndedCards(true);
    }
  }, [searchString, isShort]);

  */
