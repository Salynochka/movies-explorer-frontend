import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./SavedMovies.css";

function SavedMovies({ movies, isLoading, savedMovies, onBurgerMenu, isOpen, onButtonMovie, loggedIn }) {
  const [searchString, setSearchString] = useState(
    localStorage.getItem("searchString") || ""
  );

  const [isShort, setIsShort] = useState(
    JSON.parse(localStorage.getItem("isShort")) || false
  );

  const [filteredMovies, setFilteredMovies] = useState(savedMovies); 

  function searchChange(evt) {
    const value = evt.target.value;
    setSearchString(value);
    localStorage.setItem("searchString", value);
  }

  function switchCheckbox(e) {
    const value = e.target.checked;
    setIsShort(value);
    localStorage.setItem("isShort", value);
  }

  useEffect(() => {
    const moviesList = filter (savedMovies, searchString);
    setFilteredMovies(isShort ? 
      filterDuration(moviesList) 
    : 
      moviesList);
  }, [savedMovies, isShort, searchString]);

  function filterDuration (movies) {
    return movies.filter((movie) => movie.duration < 52);
  };

  function filter(movies) {
    return movies.filter((movie) =>
      isShort
      ? (movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchString.toLowerCase())) && movie.duration<52
      : (movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchString.toLowerCase()))
    );
  }
/*
  function getSavedMovies (savedMovies, card) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === card.id);
  };*/

  return (
    <div className="saved-movies">
      <Header onBurgerMenu={onBurgerMenu} isOpen={isOpen} loggedIn={loggedIn}/>
      <main>
        <SearchForm searchString={searchString} searchChange={searchChange} />
        <FilterCheckbox switchCheckbox={switchCheckbox} isShort={isShort} />
        <MoviesCardList
          movies={movies}
          onButtonMovie={onButtonMovie}
          isLoading={isLoading}
          savedMovies={filter(savedMovies)}
        />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
