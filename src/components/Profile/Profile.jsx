import React, { useContext, useState, useEffect } from "react";
import Header from "../Header/Header";
import "./Profile.css";
import { Link } from "react-router-dom";
import { useFormValidation } from "../../utils/useFormValidation";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Profile({ onBurgerMenu, loggedIn, onExit, handleSubmit }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, onChange, errors, isValid, setValues } =
    useFormValidation();
  const [isDisabled, setIsDisabled] = useState(true);

  function handleCloseByEscape(evt) {
    if (evt.key === "Escape") {
      setIsDisabled(true);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleCloseByEscape);
    return () => {
      document.removeEventListener("keydown", handleCloseByEscape);
    };
  }, []);

  useEffect(() => {
    setValues((values) => ({
      ...values,
      name: currentUser.name,
      email: currentUser.email,
    }));
  }, [currentUser]);

  const changingInfo =
    values.name === currentUser.name && values.email === currentUser.email
      ? false
      : true;

  function handleChange(e) {
    onChange(e);
  }

  function handleEditProfile() {
    setIsDisabled(false);
  }

  function handleSubmitted(evt) {
    evt.preventDefault();
    if (
      currentUser.name === values.name &&
      currentUser.email === values.email
    ) {
      setIsDisabled(true);
      return;
    } else {
      handleSubmit(values);
      setIsDisabled(true);
    }
  }

  return (
    <div className="profile">
      <Header onBurgerMenu={onBurgerMenu} loggedIn={loggedIn} />
      <main>
        <section className="profile__section">
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <form onSubmit={handleSubmitted} name="profile">
            <div className="profile__info">
              <fieldset className="profile__input">
                <div className="profile__line">
                  <h2 className="profile__heading">Имя</h2>
                  <input
                    type="text"
                    className="profile__item"
                    name="name"
                    placeholder="Имя"
                    minLength="2"
                    maxLength="30"
                    onChange={handleChange}
                    value={values.name || ""}
                    autoComplete="on"
                    disabled={isDisabled}
                  />
                </div>
                <span className="profile__item-error">{errors.name}</span>
                <div className="profile__line">
                  <h2 className="profile__heading">E-mail</h2>
                  <input
                    type="email"
                    className="profile__item"
                    name="email"
                    placeholder="E-mail"
                    minLength="2"
                    maxLength="40"
                    onChange={handleChange}
                    value={values.email || ""}
                    autoComplete="on"
                    pattern="^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$"
                    disabled={isDisabled}
                  />
                </div>
                <span className="profile__item-error">{errors.email}</span>
              </fieldset>
            </div>
            <div className="profile__changing">
              {!isDisabled ? (
                <button
                  className={
                    isValid && changingInfo
                      ? "profile__save-button"
                      : "profile__save-button profile__save-button_disabled"
                  }
                  type="submit"
                  disabled={!isValid}
                >
                  Сохранить
                </button>
              ) : (
                <>
                  <button
                    className="profile__edit"
                    type="button"
                    onClick={handleEditProfile}
                  >
                    Редактировать
                  </button>
                  <Link to="/" className="profile__to-login" onClick={onExit}>
                    Выйти из аккаунта
                  </Link>
                </>
              )}
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Profile;
