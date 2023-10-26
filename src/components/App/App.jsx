import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { ProtectedRoute } from "../ProtectedRoute";

import * as auth from "../../utils/Auth";
import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Navigation from "../Main/Navigation/Navigation";
import ErrorWindow from "../ErrorWindow/ErrorWindow";
import InfoPopup from "../InfoPopup/InfoPopup";

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});

  const [isOpenBurgerMenu, setOpenBurgerMenu] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);
  const [isRegistration, setIsRegistration] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleOpenBurgerMenu = () => {
    setOpenBurgerMenu(true);
  };

  const handleCloseBurgerMenu = () => {
    setOpenBurgerMenu(false);
  };

  function handleRegistration(password, email, name) {
    if (!password || !email || !name) {
      return;
    }
    auth
      .register(password, email, name)
      .then(() => {
        setIsRegistration(true);
        setIsSuccessful(true);
        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        setIsRegistration(false);
        setIsSuccessful(false);
        console.log(err);
      })
      .finally(() => {
        setInfoPopupOpen(true);
      });
  }

  function handleLogin(password, email, name) {
    if (!password || !email) {
      return;
    }
    auth
      .login(password, email, name)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token);
          setEmail(email);
          setName(name);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeInfoPopup() {
    setInfoPopupOpen(false);
  }

  function checkActiveToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setEmail(res.data.email);
            setName(res.data.name);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          setIsLoggedIn(false);
          console.log(err);
        });
    }
  }
  /*
  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  }*/

  const [searchString, setSearchString] = useState(
    localStorage.getItem("searchString") || ""
  );

  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem("movies")) || []
  );
  const [filteredMovies, setFilteredMovies] = useState(movies);

  const [isShort, setIsShort] = useState(
    localStorage.getItem("isShort") || false
  );

  function searchChange(evt) {
    const value = evt.target.value;
    setSearchString(value);
    localStorage.setItem("searchString", value);
  }

  useEffect(() => {
    if (movies.length === 0)
      moviesApi.getCards().then((res) => {
        if (res) {
          localStorage.setItem(
            "films",
            JSON.stringify([
              {
                duration: res.duration,
                nameRU: res.nameRU,
                trailerLink: res.trailerLink,
                image: res.image,
              },
            ])
          );
        }
        setMovies([
          {
            duration: res.duration,
            nameRU: res.nameRU,
            trailerLink: res.trailerLink,
            image: res.image,
          },
        ]);
      });
  }, []);

  useEffect(() => {
    mainApi
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const filteredMovies = movies.filter(
      (movie) => movie.includes(searchString) && movie.isShort === isShort
    );
    setFilteredMovies(filteredMovies);
    setIsShort(true);
  }, [searchString, isShort]);

  useEffect(() => {
    checkActiveToken();
  }, []);

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setEmail("");
    navigate("/signin", { replace: true });
  }

  /*
  function handleSavedCard(movie) {
    // Проверка сохранения на этой карточке
    // const isSaved = movie.saved ?  :;

    // Получаем обновлённые данные карточки
    moviesApi
      .changeCardStatus(movie._id, isSaved)
      .then((savedMovie) => {
        setMovies((state) =>
          state.map((i) => (i._id === movie._id ? savedMovie : i))
        );
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  }*/

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="root__page">
          <ErrorBoundary>
            <Routes>
              <Route
                path="/"
                element={<Main onBurgerMenu={handleOpenBurgerMenu} />}
              />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute
                    element={Movies}
                    isLoggedIn={isLoggedIn}
                    movies={filteredMovies}
                    onBurgerMenu={handleOpenBurgerMenu}
                    isShort={isShort}
                    searchString={searchString}
                    searchChange={searchChange}
                  />
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute
                    element={SavedMovies}
                    onBurgerMenu={handleOpenBurgerMenu}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    element={Profile}
                    onBurgerMenu={handleOpenBurgerMenu}
                    onExit={handleSignOut}
                    name={name}
                    email={email}
                  />
                }
              />
              <Route
                path="/signin"
                element={<Login handleSubmit={handleLogin} />}
              />
              <Route
                path="/signup"
                element={
                  <Register
                    handleSubmit={handleRegistration}
                    isSuccessful={isSuccessful}
                  />
                }
              />
              <Route path="*" element={<ErrorWindow />} />
            </Routes>
            <Navigation
              isOpen={isOpenBurgerMenu}
              onClose={handleCloseBurgerMenu}
            />
            <InfoPopup
              onClose={closeInfoPopup}
              isOpen={isInfoPopupOpen}
              isSuccessful={isSuccessful}
              isRegistration={isRegistration}
            />
          </ErrorBoundary>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
