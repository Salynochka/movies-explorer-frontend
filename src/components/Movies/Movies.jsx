import React, { useState } from "react";
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./Movies.css";

function Movies({ movies, savedMovies, isLoading, onButtonMovie, onBurgerMenu, isOpen }) {
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
    <div className="movies">
      <Header onBurgerMenu={onBurgerMenu} isOpen={isOpen} />
      <main>
        <SearchForm searchString={searchString} searchChange={searchChange} />
        <FilterCheckbox switchCheckbox={switchCheckbox} isShort={isShort} />
        <MoviesCardList
          movies={filter(movies)}
          isLoading={isLoading}
          onButtonMovie={onButtonMovie}
          savedMovie={savedMovies}
        />
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
