import React, { useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Movies/Preloader/Preloader";
import "./Movies.css";

function Movies({
  onBurgerMenu,
  loggedIn,
  handleSubmit,
  isShort,
  setIsShort,
  switchCheckbox,
  isLoading,
  movies,
  handleUnsaveMovie,
  handleSaveMovie,
  savedMovies,
  handleMoreMovies,
  isNotFoundMovies,
}) {
  const isSavedPage = false;
  /*
  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem("movies"));
    setMovies(movies);
  }, []);*/

  return (
    <div className="movies">
      <Header
        onBurgerMenu={onBurgerMenu}
        isSavedPage={isSavedPage}
        loggedIn={loggedIn}
      />
      <main>
        <SearchForm
          handleSubmit={handleSubmit}
          switchCheckbox={switchCheckbox}
          isShort={isShort}
          setIsShort={setIsShort}
        />
        {isLoading ? (
          <Preloader />
        ) : isNotFoundMovies ? (
          " "
        ) : movies.length === 0 || undefined || null ? (
          <p className="movies_not-found">Ничего не найдено</p>
        ) : (
          <MoviesCardList
            movies={movies || ""}
            savedMovies={savedMovies}
            handleUnsaveMovie={handleUnsaveMovie}
            handleSaveMovie={handleSaveMovie}
            handleMoreMovies={handleMoreMovies}
            isNotFoundMovies={isNotFoundMovies}
            isLoading={isLoading}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
