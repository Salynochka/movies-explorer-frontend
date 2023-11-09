import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ErrorBoundary from "../../utils/ErrorBoundary";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { ProtectedRoute } from "../../utils/ProtectedRoute";

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

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});

  const [isOpenBurgerMenu, setOpenBurgerMenu] = useState(false);

  // const [isRegistration, setIsRegistration] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );

  const [isLoading, setIsLoading] = useState(false);

  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem("movies")) || []
  );
  const [savedMovies, setSavedMovies] = useState([]);

  // Получение информации o пользователе и сохраненных фильмов
  useEffect(() => {
    isLoggedIn &&
      mainApi
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((error) => {
          console.log(`${error}`);
          alert("Неудачный вход. Авторизуйтесь заново.");
        });

    isLoggedIn &&
      mainApi
        .getUserSavedMovies()
        .then((movies) => {
          setSavedMovies(movies);
          localStorage.setItem("savedMovies", JSON.stringify(movies));
        })
        .catch((error) => console.log(error));
  }, [isLoggedIn]);

  // Получение фильмов
  function handleSearch() {
    if (isLoggedIn) {
      if (localStorage.getItem('movies')) {
        setMovies(JSON.parse(localStorage.getItem('movies')));
      } else {
    moviesApi
      .getAllMoviesCards()
      .then((movies) => {
        localStorage.setItem("movies", JSON.stringify(movies));
        setMovies([...movies]);
      })
      .catch(console.error);
    }}
  }
  
  useEffect(() => {
    handleSearch()
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
        handleLogin(name, email);
        //   setIsRegistration(true);
        //   setCurrentUser(res.data);
      })
      .catch((err) => {
        //   setIsRegistration(false);
        console.log(err);
        alert("Произошла ошибка. Попробуйте ещё раз");
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
        //  getUserInfo();
        //  getSavedMovies();
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(err);
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
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  // Обновление информации о пользователе
  function handleUpdateUser(name, email) {
    setIsLoading(true);
    mainApi
      .editUserInfo(name, email)
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          name: res.name,
          email: res.email,
        });
        alert("Данные профиля успешно изменены");
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
        alert("Произошла ошибка. Попробуйте ещё раз");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Функция сохранения карточки фильма
  function handleMovieSave(movie) {
    mainApi
      .saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([...savedMovies, newMovie]);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  // Функция удаления из сохраненных
  function handleMovieUnsave(movie) {
    mainApi
      .unsaveMovie(movie)
      .then(() => {
        const updatedSavedMovies = savedMovies.filter((i) => i._id !== movie._id);
        setSavedMovies(updatedSavedMovies);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  // Добавление/удаление из сохраненных
  function changeMovieStatus(movie, isSaved) {
    if (!isSaved) {
      handleMovieSave(movie);
    } else {
      handleMovieUnsave(savedMovies.find((m) => m.movieId === movie.id));
    }
  }

  function logoutRequest() {
    mainApi.logout().then((data) => {
      if (data) {
        localStorage.clear();
        setCurrentUser({});
        setIsLoggedIn(false);
        navigate("/");
      } else {
        return;
      }
    });
  }

  function handleSignOut() {
    logoutRequest();
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate("/", { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className="root">
        <div className="root__page">
          <ErrorBoundary>
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
                    movies={movies}
                    onBurgerMenu={handleOpenBurgerMenu}
                    isLoading={isLoading}
                    onButtonMovie={changeMovieStatus}
                    search={handleSearch}
                    //    getSavedMovies={getSavedMovies}
                  />
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute
                    element={SavedMovies}
                    movies={movies}
                    savedMovies={savedMovies}
                    //  getSavedMovies={getSavedMovies}
                    onBurgerMenu={handleOpenBurgerMenu}
                    onButtonMovie={changeMovieStatus}
                    loggedIn={isLoggedIn}
                    isLoggedIn={isLoggedIn}
                    search={handleSearch}
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
