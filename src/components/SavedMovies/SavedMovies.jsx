import React, { useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Movies/Preloader/Preloader";
import "./SavedMovies.css";

function SavedMovies({
  loggedIn,
  isLoading,
  savedMovies,
  setSavedMovies,
  onBurgerMenu,
  handleSubmit,
  isShort,
  setIsShort,
  handleUnsaveMovie,
  isNotFoundMovies,
  switchCheckbox,
}) {
  const isSavedPage = true;

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    setSavedMovies(savedMovies);
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
          handleSubmit={handleSubmit}
          isShort={isShort}
          setIsShort={setIsShort}
          switchCheckbox={switchCheckbox}
        />
        <MoviesCardList
          movies={savedMovies}
          savedMovies={savedMovies}
          handleUnsaveMovie={handleUnsaveMovie}
          isNotFoundMovies={isNotFoundMovies}
        />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
