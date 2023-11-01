import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { ProtectedRoute } from "../ProtectedRoute";

import {
  tabletVersion,
  mobileVersion,
  maxCards,
  mediumCards,
  minCards,
} from "../../utils/constants";
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

  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isRegistration, setIsRegistration] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem("movies")) || []
  );
  const [savedMovies, setSavedMovies] = useState([]);

  const [amountCard, setAmountCard] = useState(4);

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch(console.error);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setIsLoading(true);
    if (isLoggedIn) {
      moviesApi
        .getAllMoviesCards()
        .then((movie) => {
          localStorage.setItem("movies", JSON.stringify(movie));
          setMovies([...movie]);
        })
        .catch(console.error);
    }
  }, [isLoggedIn]);

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
    mainApi
      .register(password, email, name)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsRegistration(true);
        setIsSuccessful(true);
        navigate("/signin", { replace: true });
        alert("Регистрация прошла успешно")
      })
      .catch((err) => {
        setIsRegistration(false);
        setIsSuccessful(false);
        console.log(err);
        alert("Произошла ошибка. Попробуйте ещё раз")
      });
  }

  function handleLogin(password, email) {
    if (!password || !email) {
      return;
    }
    setIsLoading(true);
    mainApi
      .login(password, email)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token);
          navigate("/movies", { replace: true });
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Произошла ошибка. Попробуйте ещё раз")
      })
      .finally(() => {
        setIsLoading(true);
      });
  }


  function checkActiveToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .getUserInfo(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res);
          navigate("/movies", { replace: true });
        })
        .catch((err) => {
          setIsLoggedIn(false);
          console.log(err);
          navigate("/signin");
        });
    } else {
      setTimeout(() => {
        //  setPreloader(false);
      }, 600);
    }
  }

  useEffect(() => {
    checkActiveToken();
  }, [isLoggedIn]);

  function handleUpdateUser(email, name) {
    mainApi
      .editUserInfo(email, name)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  useEffect(() => {
    function changeLengthOfMovies() {
      if (window.innerWidth > tabletVersion) {
        setAmountCard(maxCards);
      } else if (window.innerWidth > mobileVersion) {
        setAmountCard(mediumCards);
      } else {
        setAmountCard(minCards);
      }
    }

    changeLengthOfMovies();
    window.addEventListener("resize", changeLengthOfMovies);

    return () => window.removeEventListener("resize", changeLengthOfMovies);
  }, [amountCard]);

  function handleMovieSave(movie) {
    mainApi
      .saveMovie(movie)
      .then((movie) => {
        setSavedMovies([movie, ...savedMovies]);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  function handleMovieUnsave(movie) {
    mainApi
      .unsaveMovie(movie._id)
      .then(() => {
        setSavedMovies((movies) => movies.filter((i) => i._id !== movie._id));
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

    // Добавление/удаление из сохраненных
    function changeMovieStatus(movieId, isSaved) {
      if (!isSaved) {
        return handleMovieSave(movieId);
      } else {
        return handleMovieUnsave(movieId);
      }
    }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate("/", { replace: true });
  }

  /*

  // Добавление/удаление в/из избранного
  function handleChangeStatus(movie) {
    // Проверка наличия лайка на этой карточке
    const isLiked = movie.likes.some((i) => i === currentUser._id);
    // Получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((i) => (i._id === card._id ? newCard : i))
        );
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  }

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
    <CurrentUserContext.Provider value={currentUser}>
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
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute
                    element={Movies}
                    isLoggedIn={isLoggedIn}
                    movies={movies}
                    onBurgerMenu={handleOpenBurgerMenu}
                    isLoading={isLoading}
                    savedMovies={savedMovies}
                    onButtonMovie={changeMovieStatus}
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
                  />
                }
              />
              <Route
                path="/signin"
                element={<Login handleSubmit={handleLogin} />}
              />
              <Route
                path="signup"
                element={
                  <Register
                    handleSubmit={handleRegistration}
                    isSuccessful={isSuccessful}
                    isRegistration={isRegistration}
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
