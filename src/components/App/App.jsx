import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ErrorBoundary from "../../utils/ErrorBoundary";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { ProtectedRoute } from "../../utils/ProtectedRoute";

import { mainApi } from "../../utils/MainApi";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Navigation from "../Main/Navigation/Navigation";
import ErrorWindow from "../ErrorWindow/ErrorWindow";

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});

  const [isOpenBurgerMenu, setOpenBurgerMenu] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );

  const [isLoading, setIsLoading] = useState(false);
  const [savedMovies, setSavedMovies] = useState(
    JSON.parse(localStorage.getItem("savedMovies")) || []
  );
  const [isPass, setIsPass] = useState(false);

  // Получение информации o пользователе и сохраненных фильмов
  useEffect(() => {
    isLoggedIn &&
      mainApi
        .getUserInfo()
        .then((res) => {
          setCurrentUser({ name: res.name, email: res.email });
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.log(`${error}`);
          localStorage.clear();
          setIsLoggedIn(false);
          alert("Неудачный вход. Авторизуйтесь заново.");
        });
  }, [isLoggedIn]);

  // Функция открытия бургерного меню
  const handleOpenBurgerMenu = () => {
    setOpenBurgerMenu(true);
  };

  // Функция закрытия бургерного меню
  const handleCloseBurgerMenu = () => {
    setOpenBurgerMenu(false);
  };

  // Функция регистрации пользователя
  function handleRegistration(name, email, password) {
    if (!password || !email || !name) {
      return;
    }
    setIsLoading(true);
    mainApi
      .register(name, email, password)
      .then((res) => {
        handleLogin(email, password);
        //   setIsRegistration(true);
        setCurrentUser(res.data);
      })
      .catch((err) => {
        //   setIsRegistration(false);
        console.log(err);
        alert("Произошла ошибка. Попробуйте ещё раз");
        setIsPass(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Функция залогинивания пользователя
  function handleLogin(email, password) {
    setIsLoading(true);
    mainApi
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        localStorage.setItem("loggedIn", true);
        setCurrentUser(res);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsPass(false);
        setIsLoggedIn(false);
        localStorage.removeItem("loggedIn");
        alert("Произошла ошибка. Попробуйте ещё раз");
        navigate("/signin", { replace: true });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Получение токена
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    setIsLoading(true);
    if (jwt) {
      mainApi
        .getToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            localStorage.setItem("loggedIn", true);
            setIsLoading(false);
          }
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setIsLoading(false);
          setIsLoggedIn(false);
          localStorage.removeItem("loggedIn");
        });
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  // Обновление информации о пользователе
  function handleUpdateUser({ name, email }) {
    setIsLoading(true);
    mainApi
      .editUserInfo({name, email})
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          name: res.name,
          email: res.email,
        });
        setIsPass(true);
        alert("Данные профиля успешно изменены");
      })
      .catch((err) => {
        setIsPass(false);
        console.error(`Ошибка: ${err}`);
        alert("Произошла ошибка. Попробуйте ещё раз");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSignOut() {
    mainApi
      .logout()
      .then(() => {
        localStorage.clear();
        setCurrentUser({});
        setIsLoggedIn(false);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
        alert("Произошла ошибка. Попробуйте ещё раз");
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="root__page">
          <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    onBurgerMenu={handleOpenBurgerMenu}
                    isLoading={isLoading}
                    loggedIn={isLoggedIn}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute
                    element={Movies}
                    loggedIn={isLoggedIn}
                    isLoggedIn={isLoggedIn}
                    onBurgerMenu={handleOpenBurgerMenu}
                    isLoading={isLoading}
                    savedMovies={savedMovies}
                    setSavedMovies={setSavedMovies}
                    //    getSavedMovies={getSavedMovies}
                  />
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute
                    element={SavedMovies}
                    onBurgerMenu={handleOpenBurgerMenu}
                    loggedIn={isLoggedIn}
                    isLoggedIn={isLoggedIn}
                    //    getSavedMovies={getSavedMovies}
                    isLoading={isLoading}
                    savedMovies={savedMovies}
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
                    handleSubmit={handleUpdateUser}
                    isOpen={isOpenBurgerMenu}
                    isLoggedIn={isLoggedIn}
                    loggedIn={isLoggedIn}
                    isPass={isPass}
                  />
                }
              />
              <Route
                path="/signin"
                element={
                  <Login handleSubmit={handleLogin} isLoggedIn={isLoggedIn} />
                }
              />
              <Route
                path="signup"
                element={
                  <Register
                    handleSubmit={handleRegistration}
                    //  isRegistration={isRegistration}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route path="*" element={<ErrorWindow />} />
            </Routes>
            <Navigation
              isOpen={isOpenBurgerMenu}
              onClose={handleCloseBurgerMenu}
            />
          </ErrorBoundary>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
