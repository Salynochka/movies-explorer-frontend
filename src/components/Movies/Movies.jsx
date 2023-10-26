import React, { useState, useEffect } from "react";
import { moviesApi } from "../../utils/MoviesApi";
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./Movies.css";

function Movies({
  searchString,
  searchChange,
  movies,
  isShort,
  search,
  savedMovies,
  onBurgerMenu,
  isOpen,
}) {
  return (
    <div className="movies">
      <Header onBurgerMenu={onBurgerMenu} isOpen={isOpen} />
      <main>
        <SearchForm searchString={searchString} searchChange={searchChange} />
        <FilterCheckbox search={search} isShort={isShort} />
        <MoviesCardList movies={movies} savedMovies={savedMovies} />
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
