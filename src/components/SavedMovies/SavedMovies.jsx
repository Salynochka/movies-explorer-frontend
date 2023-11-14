import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./SavedMovies.css";
import { SHORT_MOVIE } from "../../utils/constants.js";
import { mainApi } from "../../utils/MainApi";

function SavedMovies({
  isLoading,
  savedMovies,
  setSavedMovies,
  onBurgerMenu,
  loggedIn,
}) {
  const [searchSavedString, setSearchSavedString] = useState("");
  const [isShortSaved, setIsShortSaved] = useState(false);

  const [filteredSavedMovies, setFilteredSavedMovies] = useState(savedMovies);

  const [isNotFoundSavedMovies, setIsNotFoundSavedMovies] = useState(false);
  const isSavedPage = true;

  function searchChange(evt) {
    const value = evt.target.value;
    setSearchSavedString(value);
  }

  function toggleCheckbox(evt) {
    const value = evt.target.checked;
    setIsShortSaved(value);
  }

  function getSavedMovies() {
    loggedIn &&
      mainApi
        .getUserSavedMovies()
        .then((movies) => {
          setSavedMovies(movies);
          localStorage.setItem("savedMovies", JSON.stringify(movies));
        })
        .catch((error) => console.log(error));
  }

  useEffect(() => {
    getSavedMovies();
  }, [loggedIn]);

  const filter = (savedMovies) => {
    setIsNotFoundSavedMovies(false);
    return savedMovies.filter((movie) =>
      isShortSaved
        ? (movie.nameRU
            .toLowerCase()
            .includes(searchSavedString.toLowerCase()) ||
            movie.nameEN
              .toLowerCase()
              .includes(searchSavedString.toLowerCase())) &&
          movie.duration < SHORT_MOVIE
        : movie.nameRU
            .toLowerCase()
            .includes(searchSavedString.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(searchSavedString.toLowerCase())
    );
  };

  useEffect(() => {
    setFilteredSavedMovies(filter(savedMovies));
    getSavedMovies();
    if (filteredSavedMovies.length === 0) {
      setIsNotFoundSavedMovies(true);
    }
  }, [loggedIn, searchSavedString, isShortSaved]);
/*
  useEffect(() => {
    loggedIn &&
      localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
  }, [savedMovies, loggedIn]);*/
  
  useEffect(() => {
    getSavedMovies();
  }, [loggedIn]);

  return (
    <div className="saved-movies">
      <Header
        onBurgerMenu={onBurgerMenu}
        isSavedPage={isSavedPage}
        loggedIn={loggedIn}
      />
      <main>
        <SearchForm
          searchString={searchSavedString}
          searchChange={searchChange}
          submit={getSavedMovies}
        />
        <FilterCheckbox
          switchCheckbox={toggleCheckbox}
          isShort={isShortSaved}
        />
        <MoviesCardList
          movies={filteredSavedMovies}
          savedMovies={savedMovies}
          setSavedMovies={setSavedMovies}
          isLoading={isLoading}
          isSavedPage={isSavedPage}
          isNotFoundMovies={isNotFoundSavedMovies}
        />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
