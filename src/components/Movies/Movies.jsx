import React from "react";
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
  isNeedToSearchMovies,
}) {
  const isSavedPage = false;
  const isNotFoundMovies = movies.length === 0 || undefined || null

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
        ) : isNeedToSearchMovies ? (
          <p className="movies_text">Необходимо ввести ключевое слово в строку поиска</p>
        ) : isNotFoundMovies ? (
          <p className="movies_text">Ничего не найдено</p>
        ) : (
          <MoviesCardList
            movies={movies || ""}
            savedMovies={savedMovies}
            handleUnsaveMovie={handleUnsaveMovie}
            handleSaveMovie={handleSaveMovie}
            handleMoreMovies={handleMoreMovies}
            isNeedToSearchMovies={isNeedToSearchMovies}
            isLoading={isLoading}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
