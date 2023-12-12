import React, { useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./SavedMovies.css";
import "../Movies/Movies.css";

function SavedMovies({
  loggedIn,
  savedMovies,
  onBurgerMenu,
  handleSubmit,
  isShort,
  setIsShort,
  handleUnsaveMovie,
  isNeedToSearchMovies,
  switchCheckbox,
}) {
  const isSavedPage = true;

  return (
    <div className="saved-movies">
      <Header
        onBurgerMenu={onBurgerMenu}
        isSavedPage={isSavedPage}
        loggedIn={loggedIn}
      />
      <main>
        <SearchForm
          handleSubmit={handleSubmit}
          isShort={isShort}
          setIsShort={setIsShort}
          switchCheckbox={switchCheckbox}
        />
        {(savedMovies.length === 0 || undefined || null) ? (
          <p className="movies_text">Ничего не найдено</p>
        ) : (
          <MoviesCardList
            movies={savedMovies}
            savedMovies={savedMovies}
            handleUnsaveMovie={handleUnsaveMovie}
            isNeedToSearchMovies={isNeedToSearchMovies}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
