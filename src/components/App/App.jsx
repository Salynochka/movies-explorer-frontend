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

  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [isShort, setIsShort] = useState(false);
  const [isSavedShort, setIsSavedShort] = useState(false);
  const [isNotFoundMovies, setIsNotFoundMovies] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);

  const [addMovies, setAddMovies] = useState(0);
  const [searched, setSearched] = useState(false);

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
    setIsLoading(true);
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
        setIsLoading(false);
      });
  }

  function handleLogin(email, password) {
    setIsLoading(true);
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
        setIsLoading(false);
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
    setIsLoading(true);
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
        setIsLoading(false);
      });
  }

  function filterMovies(movies, textSearch, checkbox) {
    if (textSearch) {
      let resultFiltered = movies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(textSearch.toLowerCase())
      );
      resultFiltered = checkbox
        ? resultFiltered.filter((item) => item.duration <= SHORT_MOVIE)
        : resultFiltered;

      return resultFiltered;
    }
    if (!textSearch) {
      movies = checkbox
        ? movies.filter((item) => item.duration <= SHORT_MOVIE)
        : movies;
      return movies;
    }
  }

  async function handleSubmitSearchMovies(search, isShort) {
    setSearched(!searched);
    localStorage.setItem("searchString", search);
    localStorage.setItem("checkbox", isShort);
    const allMovies = JSON.parse(localStorage.getItem("movies"));
    if (!allMovies) {
      setIsLoading(true);
      moviesApi
        .getAllMoviesCards()
        .then((allMovies) => {
          localStorage.setItem("movies", JSON.stringify(allMovies));
          const moviesSearch = filterMovies(allMovies, search, isShort);
          localStorage.setItem("moviesSearch", JSON.stringify(moviesSearch));
          setIsNotFoundMovies(false);
          setMovies(moviesSearch);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    } else {
      const moviesSearch = filterMovies(allMovies, search, isShort);
      localStorage.setItem("moviesSearch", JSON.stringify(moviesSearch));
      setMovies(moviesSearch);
    }
  }

  function handleSubmitSearchSavedMovies(searchSaved, isSavedShort) {
    setSearched(!searched);
    localStorage.setItem("searchSaveString", searchSaved);
    localStorage.setItem("isSavedShort", isSavedShort);
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    if (!savedMovies) {
      setIsLoading(true);
      moviesApi
        .getAllMoviesCards()
        .then((savedMovies) => {
          localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
          const moviesSaveSearch = filterMovies(
            savedMovies,
            searchSaved,
            isSavedShort
          );
          setIsNotFoundMovies(false);
          setMovies(moviesSaveSearch);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    } else {
      const moviesSaveSearch = filterMovies(savedMovies, searchSaved, isSavedShort);
      setSavedMovies(moviesSaveSearch);
    }
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
    if (pathname === "/movies") {
      const movies = JSON.parse(localStorage.getItem("movies"));
      const moviesCheckbox = !isShort
        ? movies.filter((item) => item.duration <= SHORT_MOVIE)
        : movies;
      setMovies(moviesCheckbox);
    }
  }

  function handleCheckboxSaved() {
    setIsSavedShort(!isSavedShort);
    if (pathname === "/movies") {
      const moviesSearch = JSON.parse(localStorage.getItem("moviesSearch"));
      localStorage.setItem("checkbox", !isSavedShort);
      if (moviesSearch) {
        const moviesFilterCheckbox = !isSavedShort
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
      const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
      const savedMoviesCheckbox = !isSavedShort
        ? savedMovies.filter((item) => item.duration <= SHORT_MOVIE)
        : savedMovies;
      setSavedMovies(savedMoviesCheckbox);
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
    isSavedShort,
    isNotFoundMovies,
    searched,
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
    const movieToUnsave = savedMovies.filter((movieSave) =>
      movieSave.movieId === movie.id ? movieSave : ""
    );
    const _id = movie._id || movieToUnsave[0]._id;
    const token = localStorage.getItem("token");
    mainApi
      .unsaveMovie(_id, token)
      .then((m) => {
        const savedMoviesCards = savedMovies.filter(
          (savedMovie) => savedMovie._id !== m.movie._id
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
    setIsOpen(true);
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
                  handleSubmit={handleSubmitSearchMovies}
                  isShort={isShort}
                  setIsShort={setIsShort}
                  switchCheckbox={handleCheckbox}
                  movies={movies}
                  setMovies={setMovies}
                  handleUnsaveMovie={handleUnsaveMovie}
                  handleSaveMovie={handleSaveMovie}
                  handleMoreMovies={handleMoreMovies}
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
                  isLoading={isLoading}
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}
                  onBurgerMenu={handleOpenBurgerMenu}
                  isLoggedIn={isLoggedIn}
                  handleSubmit={handleSubmitSearchSavedMovies}
                  isSavedShort={isSavedShort}
                  setIsSavedShort={setIsSavedShort}
                  switchCheckbox={handleCheckboxSaved}
                  handleUnsaveMovie={handleUnsaveMovie}
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
