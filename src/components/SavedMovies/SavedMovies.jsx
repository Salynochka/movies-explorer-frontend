import React, { useState, useEffect, useCallback } from "react";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./SavedMovies.css";

function SavedMovies({ isLoading, getSavedMovies, savedMovies, setSavedMovies, onBurgerMenu, isOpen, loggedIn }) {
  const [searchString, setSearchString] = useState(
    localStorage.getItem("searchString") || ""
  );
  const [isShortSaved, setIsShortSaved] = useState(
    JSON.parse(localStorage.getItem("isShort")) || false
  );
/*
  const [findSavedMovies, setFindSavedMovies] = useState(
    JSON.parse(localStorage.getItem("findMovies")) || []
  );*/
/*
  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem("movies")) || []
  );*/

  // const [filteredMovies, setFilteredMovies] = useState(savedMovies); 

  function searchChange(evt) {
    const value = evt.target.value;
    setSearchString(value);
    localStorage.setItem("searchString", value);
  }

  function toggleCheckbox(e) {
    const value = e.target.checked;
    setIsShortSaved(value);
    localStorage.setItem("isShort", value);
  }

  const filterSaved = useCallback(() => {
    let finded;
    if (!searchString) {
      finded = savedMovies;
      setSavedMovies(finded)
      localStorage.setItem("findSavedMovies", JSON.stringify(finded));
    } else {
    const finded = savedMovies.filter((m) =>
      m.nameRU.toLowerCase().includes(searchString.toLowerCase())
    );
    setSavedMovies(finded);
    localStorage.setItem("findSavedMovies", JSON.stringify(finded));
    }
    
    if (isShortSaved) {
      const filtered = finded.filter((m) => m.duration <= 52);
      setSavedMovies(filtered);
      localStorage.setItem("findSavedMovies", JSON.stringify(filtered));
    }
  }, [isShortSaved, savedMovies, searchString]);

  /*useEffect(() => {
    if ('isShortSaved' in localStorage) {
      setIsShortSaved(JSON.parse(localStorage.getItem('isShortSaved')));
    }
  }, [getSavedMovies]);
*/
  useEffect(() => {
  //  getSavedMovies();
    filterSaved(savedMovies);
  }, []);
  
/*  useEffect(() => {
    loggedIn &&
      localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
  }, [savedMovies, loggedIn]);*/
/*
  function filterDuration (movies) {
    return movies.filter((movie) => movie.duration < 52);
  };*/

  function filter(savedMovies) {
    return savedMovies.filter((movie) =>
    isShortSaved
      ? (movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchString.toLowerCase())) && movie.duration<52
      : (movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchString.toLowerCase()))
    );
  }

  function handleSearch (savedMovies, movie) {
  //  getSavedMovies();
    return savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
  };

  //function handleSearch() {
  //  if (loggedIn) {
  //    if (localStorage.getItem("savedMovies")) {
  //      setMovies(JSON.parse(localStorage.getItem("savedMovies")));
  //    } else {
  //      getSavedMovies()
  //    }
  //  }
  //}

  return (
    <div className="saved-movies">
      <Header onBurgerMenu={onBurgerMenu} isOpen={isOpen} loggedIn={loggedIn}/>
      <main>
        <SearchForm searchString={searchString} searchChange={searchChange} search={handleSearch}/>
        <FilterCheckbox switchCheckbox={toggleCheckbox} isShort={isShortSaved} />
        <MoviesCardList
          movies={filter(savedMovies)}
          savedMovies={savedMovies}
          setSavedMovies={setSavedMovies}
          isLoading={isLoading}
        />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
