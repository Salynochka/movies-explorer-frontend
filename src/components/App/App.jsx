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

  const [isRegistration, setIsRegistration] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );

  const [isLoading, setIsLoading] = useState(false);

  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem("movies")) || []
  );
  const [savedMovies, setSavedMovies] = useState([]);
  
  // Получение информации и пользователе
  useEffect(() => {
    isLoggedIn &&
      mainApi
        .getUserInfo()
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res);
          localStorage.getItem("jwt")
        })
        .catch(() => {
          localStorage.clear();
          setIsLoggedIn(false);
          alert("Неудачный вход. Авторизуйтесь заново.");
        });
  }, []);

  // Получение фильмов с проверкой их наличия
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
  };

  // Получение сохраненных фильмов
  useEffect(() => {
    isLoggedIn &&
      mainApi
        .getUserSavedMovies()
        .then((movies) => {
          setSavedMovies(movies);
          localStorage.setItem('savedMovies', JSON.stringify(movies));
        })
        .catch(console.error);
  }, [isLoggedIn]);

  useEffect(() => {
    isLoggedIn &&
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies, isLoggedIn]);

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
        handleLogin(name, email)
        setIsRegistration(true);
      })
      .catch((err) => {
        setIsRegistration(false);
        console.log(err);
        alert("Произошла ошибка. Попробуйте ещё раз");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Функция залогинивания пользователя
  function handleLogin(email, password) {
    if (!password || !email) {
      return;
    }
    setIsLoading(true);
    mainApi
      .login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          navigate("/movies", { replace: true });
        } else {
          return Promise.reject(res.status);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Произошла ошибка. Попробуйте ещё раз");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Получение токена
  function checkActiveToken() {
    const token = localStorage.getItem("jwt")
    setIsLoading(true);
    if (token) {
      mainApi.getToken(token)
      .then((res)=>{
        if (res){
          setIsLoggedIn(true);
          localStorage.setItem('loggedIn', true);
        }
      })
      .catch(()=>{
        localStorage.removeItem('token');
        setIsLoading(false);
      });
  } else{
    setIsLoading(false);
  }
}

  useEffect(() => {
    checkActiveToken();
  }, []);

  // Обновление информации о пользователе
  function handleUpdateUser({ name, email }) {
    setIsLoading(true);
    mainApi
      .editUserInfo({ name, email })
      .then((res) => {
        setCurrentUser((currentUser) => ({
          ...currentUser,
          name: res.data.name,
          email: res.data.email,
        }));
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
    movie.owner = currentUser._id;
    mainApi
      .saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
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
        setSavedMovies((movies) => movies.filter((i) => i._id !== movie._id));
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

  /*

  useEffect(() => {
    if (movies.length === 0)
      moviesApi.getMovies().then((res) => {
        if (res) {
          localStorage.setItem(
            "movies",
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
      });*/

  return (
    <CurrentUserContext.Provider value={{currentUser}}>
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
                  />
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute
                    element={SavedMovies}
                    savedMovies={savedMovies}
                    onBurgerMenu={handleOpenBurgerMenu}
                    onButtonMovie={changeMovieStatus}
                    loggedIn={isLoggedIn}
                    isLoggedIn={isLoggedIn}
                    movies={movies}
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
                element={<Login handleSubmit={handleLogin} isLoggedIn={isLoggedIn}/>}
              />
              <Route
                path="signup"
                element={
                  <Register
                    handleSubmit={handleRegistration}
                    isRegistration={isRegistration} isLoggedIn={isLoggedIn}
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
