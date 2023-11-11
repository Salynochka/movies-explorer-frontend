import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./SavedMovies.css";
import { shortMovie } from "../../utils/constants.js";

function SavedMovies({
  isLoading,
  savedMovies,
  setSavedMovies,
  onBurgerMenu,
  loggedIn,
}) {
  const [searchString, setSearchString] = useState(
    localStorage.getItem("searchString") || ""
  );
  const [isShortSaved, setIsShortSaved] = useState(
    JSON.parse(localStorage.getItem("isShortSaved")) || false
  );

  const [filteredSavedMovies, setFilteredSavedMovies] = useState(savedMovies);

  const isSavedPage = true;

  function searchChange(evt) {
    const value = evt.target.value;
    setSearchString(value);
    localStorage.setItem("searchString", value);
  }

  function toggleCheckbox(evt) {
    const value = evt.target.checked;
    setIsShortSaved(value);
    localStorage.setItem("isShortSaved", value);
  }

  const filter = (savedMovies) => {
    return savedMovies.filter((movie) =>
      isShortSaved
        ? (movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(searchString.toLowerCase())) &&
          movie.duration < shortMovie
        : movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(searchString.toLowerCase())
    );
  }

  useEffect(() => {
    setFilteredSavedMovies(filter(savedMovies));
  }, [searchString, isShortSaved]);
/*
  useEffect(() => {
    loggedIn &&
      localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
  }, [savedMovies, loggedIn]);*/

  useEffect(() => {
    setFilteredSavedMovies(filter(savedMovies));
  }, [searchString, isShortSaved]);

  function handleSearch(savedMovies) {
    //  getSavedMovies();
    return savedMovies;
  }

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="saved-movies">
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
        />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
