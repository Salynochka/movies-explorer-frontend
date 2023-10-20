import React, { useEffect } from "react";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoToolTip from "./InfoToolTip.js";
import * as auth from "../utils/auth.js";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute.js";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setInfoToolTipOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [mainIsOpened, setMainIsOpened] = React.useState(false);

  const [isRegistration, setIsRegistration] = React.useState(false);
  const [isSuccessful, setIsSuccessful] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error);
  }, []);

  React.useEffect(() => {
    api
      .getCards()
      .then((card) => {
        setCards([...card]);
      })
      .catch(console.error);
  }, []);

  function handleEditAvatarClick() {
    setEditAvatarPopup(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopup(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopup(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setConfirmationPopupOpen(false);
    setSelectedCard({});
    setInfoToolTipOpen(false);
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.link;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  function handleCardLike(card) {
    // Проверка наличия лайка на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

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

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch((err) => console.error(`Ошибка: ${err}`));
  }

  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  }

  function handleUpdateAvatar(avatar) {
    api
      .editAvatarPhoto(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  }

  function handleSubmitAddPlace(data) {
    api
      .createNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  }

  function handleRegistration(password, email) {
    if (!password || !email) {
      return;
    }
    auth
      .register(password, email)
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
        setInfoToolTipOpen(true);
      });
  }

  function handleLogin(password, email) {
    if (!password || !email) {
      return;
    }
    auth
      .login(password, email)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          setMainIsOpened(true);
          setEmail(email);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
        setInfoToolTipOpen(true);
        setIsSuccessful(false);
      });
  }

  function checkActiveToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setMainIsOpened(true);
            setEmail(res.data.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          setIsLoggedIn(false);
          console.log(err);
        });
    }
  }

  
  React.useEffect(() => {
    checkActiveToken();
  }, []);

  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    setEmail("");
    setMainIsOpened(false);
    navigate("/signin", { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  isLoggedIn={isLoggedIn}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  onExit={handleSignOut}
                  email={email}
                  mainIsOpened={mainIsOpened}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login
                  title="Вход"
                  buttonText="Войти"
                  handleSubmit={handleLogin}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  title="Регистрация"
                  buttonText="Зарегистрироваться"
                  handleSubmit={handleRegistration}
                  isSuccessful={isSuccessful}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleSubmitAddPlace}
          />
          <PopupWithForm
            title="Вы уверены?"
            name="confitmation"
            onClose={closeAllPopups}
            buttonText="Да"
            isOpen={isConfirmationPopupOpen}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            isOpen={selectedCard}
          />
          <InfoToolTip
            onClose={closeAllPopups}
            isOpen={isInfoToolTipOpen}
            isSuccessful={isSuccessful}
            isRegistration={isRegistration}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
