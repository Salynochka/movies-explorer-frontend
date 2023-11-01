import React, { useState } from "react";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./SavedMovies.css";

function SavedMovies({ movies, onBurgerMenu, isOpen, onButtonMovie }) {
  const [searchString, setSearchString] = useState(
    localStorage.getItem("searchString") || ""
  );

  const [isShort, setIsShort] = useState(
    JSON.parse(localStorage.getItem("isShort")) || false
  );

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

  function filter(movies) {
    return movies.filter((movie) =>
      isShort
        ? movie.name.includes(searchString) && movie.isShort
        : movies.name.includes(searchString)
    );
  }

  return (
    <div className="saved-movies">
      <Header onBurgerMenu={onBurgerMenu} isOpen={isOpen} />
      <main>
        <SearchForm searchString={searchString} searchChange={searchChange} />
        <FilterCheckbox switchCheckbox={switchCheckbox} isShort={isShort} />
        <MoviesCardList
          movies={filter(movies)}
          onButtonMovie={onButtonMovie}
        />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
