import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "../ErrorBoudaries/ErrorBoundary";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Navigation from "../Main/Navigation/Navigation";
import ErrorWindow from "../ErrorWindow/ErrorWindow";

function App() {
  const [isOpenBurgerMenu, setOpenBurgerMenu] = useState(false);

  const handleOpenBurgerMenu = () => {
    setOpenBurgerMenu(true);
  };

  const handleCloseBurgerMenu = () => {
    setOpenBurgerMenu(false);
  };

  return (
    <div className="root">
      <div className="root__page">
        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={<Main onBurgerMenu={handleOpenBurgerMenu} />}
            />
            <Route path="/movies" element={<Movies onBurgerMenu={handleOpenBurgerMenu} />} />
            <Route path="/saved-movies" element={<SavedMovies onBurgerMenu={handleOpenBurgerMenu} />} />
            <Route path="/profile" element={<Profile onBurgerMenu={handleOpenBurgerMenu} />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="*" element={<ErrorWindow />} />
          </Routes>
          {
            <Navigation
              isOpen={isOpenBurgerMenu}
              onClose={handleCloseBurgerMenu}
            />
          }
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
