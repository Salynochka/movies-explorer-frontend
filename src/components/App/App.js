import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import ErrorWindow from "../ErrorWindow/ErrorWindow";

import { CurrentUserContext } from "../../context/CurrentUserContext.js";
// import { ProtectedRoute } from "./ProtectedRoute.js";

function App() {
  return (
    <CurrentUserContext.Provider>
      <div className="root">
        <div className="page">
          <Routes>
            <Route
              path="/"
              element={
                <Main
                />
              }
            />
            <Route
              path="/movies"
              element={
                <Movies
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <SavedMovies
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ErrorWindow
            // isOpen={}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;