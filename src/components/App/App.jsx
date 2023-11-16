import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { ProtectedRoute } from "../../utils/ProtectedRoute";

import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Navigation from "../Main/Navigation/Navigation";
import ErrorWindow from "../ErrorWindow/ErrorWindow";
import Preloader from "../Movies/Preloader/Preloader";
import {
  LARGE_VERSION,
  MORE_CARD_WIDTH_MAX,
  MORE_CARD_WIDTH_MIN,
  SHORT_MOVIE,
} from "../../utils/constants.js";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPreloader, setPreloader] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);

  const [addMovies, setAddMovies] = useState(0);
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
  const [movies, setMovies] = useState([]);

  const [isShort, setIsShort] = useState(false);
  const [isNotFoundMovies, setIsNotFoundMovies] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoading(true);
      checkToken(token);
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  function checkToken(token) {
    mainApi
      .getUserInfo(token)
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isLoggedIn) {
      setIsLoading(true);
      mainApi
        .getUserInfo(token)
        .then((user) => {
          setCurrentUser(user);
          navigate(pathname, { replace: true });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isLoggedIn) {
      setIsLoading(true);
      mainApi
        .getUserSavedMovies(token)
        .then((res) => {
          localStorage.setItem("savedMovies", JSON.stringify(res));
          setSavedMovies(res);
          navigate(pathname, { replace: true });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isLoggedIn]);

  // Функция регистрации пользователя
  function handleRegistration(data) {
    setPreloader(true);
    mainApi
      .register(data)
      .then((user) => {
        if (user) {
          handleLogin(data);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Произошла ошибка. Попробуйте ещё раз");
      })
      .finally(() => {
        setPreloader(false);
      });
  }

  function handleLogin(email, password) {
    setPreloader(true);
    mainApi
      .login(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.token);
          setIsLoggedIn(true);
          setCurrentUser(res);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
        alert("Произошла ошибка. Попробуйте ещё раз");
        navigate("/signin", { replace: true });
      })
      .finally(() => {
        setPreloader(false);
      });
  }

  const handleSignOut = () => {
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
  };

  // Обновление информации о пользователе
  function handleUpdateUser(data) {
    const token = localStorage.getItem("token");
    setPreloader(true);
    mainApi
      .editUserInfo(data, token)
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
        setPreloader(false);
      });
  }

  function filterMovies(movies, textSearch, checkbox) {
    if (textSearch) {
      let resultFiltered = movies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(textSearch.toLowerCase())
      );
      resultFiltered = checkbox
        ? resultFiltered.filter((m) => m.duration <= SHORT_MOVIE)
        : resultFiltered;

      return resultFiltered;
    }
    if (!textSearch) {
      movies = checkbox
        ? movies.filter((m) => m.duration <= SHORT_MOVIE)
        : movies;
      return movies;
    }
  }

  function handleSubmitSearchMovies(search, isShort) {
    setIsRendered(!isRendered);
    localStorage.setItem("searchString", search);
    localStorage.setItem("checkbox", isShort);
    const allMovies = JSON.parse(localStorage.getItem("allMovies"));
    if (!allMovies) {
      setPreloader(true);
      moviesApi
        .getAllMoviesCards()
        .then((allMovies) => {
          localStorage.setItem("allMovies", JSON.stringify(allMovies));
          const moviesSearch = filterMovies(allMovies, search, isShort);
          localStorage.setItem("moviesSearch", JSON.stringify(moviesSearch));
          setIsNotFoundMovies(false);
          setMovies(moviesSearch);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setPreloader(false));
    } else {
      const moviesSearch = filterMovies(allMovies, search, isShort);
      localStorage.setItem("moviesSearch", JSON.stringify(moviesSearch));
      setMovies(moviesSearch);
    }
  }

  function handleSubmitSearchSavedMovies(search, isShort) {
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    const moviesSavedSearch = filterMovies(savedMovies, search, isShort);
    localStorage.setItem("moviesSavedSearch", JSON.stringify(moviesSavedSearch));
    setSavedMovies(moviesSavedSearch);
  }

  function handleCheckbox() {
    setIsShort(!isShort);
    if (pathname === "/movies") {
      const moviesSearch = JSON.parse(localStorage.getItem("moviesSearch"));
      localStorage.setItem("checkbox", !isShort);
      if (moviesSearch) {
        const moviesFilterCheckbox = !isShort
          ? moviesSearch.filter((item) => item.duration <= SHORT_MOVIE)
          : moviesSearch;

        setMovies(moviesFilterCheckbox);
        localStorage.setItem(
          "moviesFilterCheckbox",
          JSON.stringify(moviesFilterCheckbox)
        );
      }
    }
    if (pathname === "/saved-movies") {
      // const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
      const moviesSavedSearch = JSON.parse(
        localStorage.getItem("moviesSavedSearch")
      );
      localStorage.setItem("savedCheckbox", !isShort);
      if (moviesSavedSearch) {
        const moviesSavedCheckbox = !isShort
          ? moviesSavedSearch.filter((m) => m.duration <= SHORT_MOVIE)
          : moviesSavedSearch;
        setSavedMovies(moviesSavedCheckbox);
        localStorage.setItem(
          "moviesSavedCheckbox",
          JSON.stringify(moviesSavedCheckbox)
        );
      }
    }
  }

  function changeLengthOfMovies() {
    const moviesSearch = JSON.parse(localStorage.getItem("moviesSearch"));
    const moviesFilterCheckbox = JSON.parse(
      localStorage.getItem("moviesFilterCheckbox")
    );
    if (moviesSearch || moviesFilterCheckbox) {
      setIsNotFoundMovies(false);
      if (
        JSON.parse(localStorage.getItem("checkbox")) &&
        moviesFilterCheckbox
      ) {
        if (moviesFilterCheckbox === null) {
          return;
        }
        if (windowInnerWidth > LARGE_VERSION) {
          setMovies(moviesFilterCheckbox.slice(0, 7));
          setAddMovies(MORE_CARD_WIDTH_MAX);
        } else if (windowInnerWidth <= LARGE_VERSION) {
          setMovies(moviesFilterCheckbox.slice(0, 5));
          setAddMovies(MORE_CARD_WIDTH_MIN);
        }
        return;
      } else if (moviesSearch === null) {
        return;
      }
      if (windowInnerWidth > LARGE_VERSION) {
        setMovies(moviesSearch.slice(0, 7));
        setAddMovies(MORE_CARD_WIDTH_MAX);
      } else if (windowInnerWidth <= LARGE_VERSION) {
        setMovies(moviesSearch.slice(0, 5));
        setAddMovies(MORE_CARD_WIDTH_MIN);
      }
    }
  }

  function changeWidthWindow() {
    setWindowInnerWidth(window.innerWidth);
  }

  useEffect(() => {
    if (isLoggedIn) {
      window.addEventListener("resize", changeWidthWindow);
      changeLengthOfMovies();
      return () => {
        window.addEventListener("resize", changeWidthWindow);
      };
    }
  }, [
    windowInnerWidth,
    pathname,
    isLoggedIn,
    isShort,
    isRendered,
    isNotFoundMovies,
  ]);

  useEffect(() => {
    function handleResize() {
      const windowInnerWidth = window.innerWidth;
      if (windowInnerWidth > LARGE_VERSION) {
        setIsOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.addEventListener("resize", handleResize);
    };
  }, []);

  function handleMoreMovies() {
    const moviesSearch = JSON.parse(localStorage.getItem("moviesSearch"));
    const moviesFilterCheckbox = JSON.parse(
      localStorage.getItem("moviesFilterCheckbox")
    );
    if (JSON.parse(localStorage.getItem("checkbox"))) {
      setMovies(moviesFilterCheckbox.slice(0, movies.length + addMovies));
    } else setMovies(moviesSearch.slice(0, movies.length + addMovies));
  }

  function handleSaveMovie(movie, setSaved) {
    const token = localStorage.getItem("token");
    mainApi
      .saveMovie(movie, token)
      .then((movieSave) => {
        movieSave.isSave = true;
        const addToMovies = [...savedMovies, movieSave];
        setSavedMovies(addToMovies);
        localStorage.setItem("savedMovies", JSON.stringify(addToMovies));
        setSaved(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUnsaveMovie(movie, setSaved) {
    const token = localStorage.getItem("token");
    mainApi
      .unsaveMovie(movie._id, token)
      .then(() => {
        const savedMoviesCards = savedMovies.filter(
          (savedMovie) => savedMovie._id !== movie._id
        );
        setSavedMovies(savedMoviesCards);
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
        setSaved(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Функция открытия бургерного меню
  const handleOpenBurgerMenu = () => {
    setIsOpen(!isOpen);
  };

  // Функция закрытия бургерного меню
  const handleCloseBurgerMenu = () => {
    setIsOpen(false);
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="root__page">
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  onBurgerMenu={handleOpenBurgerMenu}
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
                  isPreloader={isPreloader}
                  loggedIn={isLoggedIn}
                  isLoggedIn={isLoggedIn}
                  onBurgerMenu={handleOpenBurgerMenu}
                  handleUnsaveMovie={handleUnsaveMovie}
                  handleSaveMovie={handleSaveMovie}
                  movies={movies}
                  setMovies={setMovies}
                  savedMovies={savedMovies}
                  handleSubmit={handleSubmitSearchMovies}
                  handleMoreMovies={handleMoreMovies}
                  isShort={isShort}
                  setIsShort={setIsShort}
                  switchCheckbox={handleCheckbox}
                  isNotFoundMovies={isNotFoundMovies}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  loggedIn={isLoggedIn}
                  isLoggedIn={isLoggedIn}
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}
                  onBurgerMenu={handleOpenBurgerMenu}
                  handleUnsaveMovie={handleUnsaveMovie}
                  handleSubmit={handleSubmitSearchSavedMovies}
                  isRendered={isRendered}
                  setIsRendered={setIsRendered}
                  switchCheckbox={handleCheckbox}
                  isShort={isShort}
                  setIsShort={setIsShort}
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
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route path="*" element={<ErrorWindow />} />
          </Routes>
          <Navigation
            onClick={handleOpenBurgerMenu}
            isOpen={isOpen}
            onClose={handleCloseBurgerMenu}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
