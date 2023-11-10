import React, { useState } from "react";
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./Movies.css";

function Movies({ movies, isLoading, onBurgerMenu, search, loggedIn, savedMovies, setSavedMovies, isSaved, setIsSaved}) {
  const [searchString, setSearchString] = useState(
    localStorage.getItem("searchString") || ""
  );

  const [isShort, setIsShort] = useState(
    JSON.parse(localStorage.getItem("isShort")) || false
  );

  function searchChange (evt) {
    const value = evt.target.value;
    setSearchString(value);
    localStorage.setItem("searchString", value);
  }

  function switchCheckbox(e) {
    const value = e.target.checked;
    setIsShort(value);
    localStorage.setItem("isShort", value);
  } 

  function filter(movies) {
    return movies.filter((movie) =>
      isShort
      ? (movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchString.toLowerCase())) && movie.duration<52
      : (movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchString.toLowerCase()))
    );
  }

  function searching(evt){
    evt.preventDefault();
    filter(movies);
  }

  return (
    <div className="movies">
      <Header onBurgerMenu={onBurgerMenu} loggedIn={loggedIn}/>
      <main>
        <SearchForm searchString={searchString} searchChange={searchChange} search={searching}/>
        <FilterCheckbox switchCheckbox={switchCheckbox} isShort={isShort} />
        <MoviesCardList
          movies={filter(movies)}
          isLoading={isLoading}
          savedMovies={savedMovies}
          setSavedMovies={setSavedMovies}
          isSaved={isSaved}
          setIsSaved={setIsSaved}
        />
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
