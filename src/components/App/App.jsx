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
  const [isPass, setIsPass] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Получение информации o пользователе и сохраненных фильмов
  useEffect(() => {
    isLoggedIn &&
      mainApi
        .getUserInfo()
        .then((res) => {
          setCurrentUser({ name: res.name, email: res.email });
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
  useEffect(() => {
    if (isLoggedIn) {
        moviesApi
          .getAllMoviesCards()
          .then((movies) => {
            localStorage.setItem("movies", JSON.stringify(movies));
            setMovies(movies);
          })
          .catch(console.error);
      
    }
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
        setCurrentUser(res);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsPass(false);
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
  function handleUpdateUser(user) {
    setIsLoading(true);
    mainApi
      .editUserInfo(user)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          name: user.name,
          email: user.email,
        });
        setIsPass(true)
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

 /* // Функция сохранения карточки фильма
  function handleMovieSave(
    movie
  ) {
    if (isSaved) {
      handleMovieUnsave(movie.id);
    } else {
    mainApi
      .saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies ]);
        setIsSaved(true);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
        setIsSaved(false);
      });
  }
}*/

  useEffect(() => {
    isLoggedIn &&
      localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
  }, [savedMovies, isLoggedIn]);

 /* // Функция удаления из сохраненных
  function handleMovieUnsave(movie) {
    mainApi
      .unsaveMovie(movie)
      .then(() => {
        const movieId = movie.movieId || movie.id;
        const updatedSavedMovies = savedMovies.filter(
          (m) => m._id !== movieId
        );
        setSavedMovies(updatedSavedMovies);
        setIsSaved(false);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }*/
/*
  // Добавление/удаление из сохраненных
  function changeMovieStatus(movie) {
    const movieId = movie.movieId || movie.id;
    const savedCard = savedMovies.find((m) => m.movieId === movieId);
    if (savedCard && savedCard._id) {
      handleMovieUnsave(savedCard);
    } else {
      handleMovieSave(movie);
    }
  }*/

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
    <CurrentUserContext.Provider value={ currentUser }>
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
                    savedMovies={savedMovies}
                    setSavedMovies={setSavedMovies}
                    isSaved={isSaved}
                    setIsSaved={setIsSaved}
                  />
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute
                    element={SavedMovies}
                    movies={savedMovies}
                    onBurgerMenu={handleOpenBurgerMenu}
                    loggedIn={isLoggedIn}
                    isLoggedIn={isLoggedIn}
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
