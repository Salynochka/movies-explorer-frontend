import "./App.css";
import React from "react";
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
  return (
    <div className="root">
      <div className="page">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/saved-movies" element={<SavedMovies />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="*" element={<ErrorWindow />} />
          </Routes>
          <Navigation />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
