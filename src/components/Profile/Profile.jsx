import React, { useEffect, useContext, useState } from "react";
import Header from "../Header/Header";
import "./Profile.css";
import { Link } from "react-router-dom";
import { useFormValidation, useForm } from "../../utils/useValidation";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Profile({ onBurgerMenu, loggedIn, onExit, handleSubmit }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation({ name: currentUser.name, email: currentUser.email });
  const {setValues} = useForm();
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);
  const [isClickedEditButton, setIsClickedEditButton] = useState(false);
  //const [isUserData, setIsUserData] = useState({ name: "", email: "" });

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    resetForm(false);
    setValues(currentUser);
  }, [currentUser, resetForm, setValues]);

  useEffect(() => {
    if (currentUser.name !== values.name || currentUser.email !== values.email) {
      setIsSaveButtonDisabled(false);
    } else {
      setIsSaveButtonDisabled(true);
    }
  }, [values, currentUser]);

  function onSubmit(e) {
    e.preventDefault();
    setIsButtonDisabled(true);
    handleSubmit()
  }

  function handleEditProfile() {
    setIsInputDisabled(false);
    setIsButtonDisabled(true);
    setIsClickedEditButton(true);
  }

  return (
    <div className="profile">
      <Header onBurgerMenu={onBurgerMenu} loggedIn={loggedIn} />
      <main>
        <section className="profile__section">
          <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
          <form onSubmit={onSubmit} name="profile">
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
                    required
                    onChange={handleChange}
                    value={values.name || ""}
                    autocomplete="on"
                    isValid={isValid.name}
                    disabled={isInputDisabled}
                  />
                </div>
                <span className="profile__item-error">
                  {errors.profile__name}
                </span>
                <div className="profile__line">
                  <h2 className="profile__heading">E-mail</h2>
                  <input
                    type="email"
                    className="profile__item"
                    name="email"
                    placeholder="Email"
                    minLength="2"
                    maxLength="40"
                    required
                    onChange={handleChange}
                    value={values.email || ""}
                    autocomplete="on"
                    pattern="^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$"
                    isValid={isValid.profile__email}
                    disabled={isInputDisabled}
                  />
                </div>
                <span className="profile__item-error">
                  {errors.profile__email}
                </span>
              </fieldset>
            </div>
            <div className="profile__changing">
              <button
                className={`profile__edit${
                  isClickedEditButton ? "" : "_visible"
                }`}
                type="button"
                disabled={isButtonDisabled}
                onClick={handleEditProfile}
              >
                Редактировать
              </button>
              <Link
                to="/"
                className={`profile__to-login${
                  isClickedEditButton ? "" : "_visible"
                }`}
                onClick={onExit}
              >
                Выйти из аккаунта
              </Link>
              <button
                className={`profile__save-button${
                  isClickedEditButton ? "_visible" : ""
                }`}
                type="submit"
                disabled={!values.isValid || isSaveButtonDisabled}
              >
                Сохранить
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Profile;
