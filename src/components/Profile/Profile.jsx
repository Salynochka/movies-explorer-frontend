import React, { useEffect, useContext, useState } from "react";
import Header from "../Header/Header";
import "./Profile.css";
import { Link } from "react-router-dom";
import { useFormValidation, useForm } from "../../utils/useValidation";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Profile({ onBurgerMenu, loggedIn, onExit, handleSubmit, isPass }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm, setIsValid } =
    useFormValidation({ name: "", email: "" });
  const { setValues } = useForm();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isShowSaveButton, setIsShowSaveButton] = useState(false);
  const [isClickedEditButton, setIsClickedEditButton] = useState(false);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
      setValues(currentUser);
      setIsValid(true);
  }, [currentUser, resetForm, setValues]);

  useEffect(() => {
    if (
      currentUser.name !== values.name ||
      currentUser.email !== values.email
    ) {
      setIsValid(false);
    }
  }, [values, currentUser, setIsValid]);

  function onSubmit(evt) {
    evt.preventDefault();
    setIsButtonDisabled(true);
    handleSubmit(values);
    if (!errors) {
      setIsShowSaveButton(false);
    } else {
      setIsShowSaveButton(true);
    }
  }

  useEffect(() => {
    if (isPass) {
      setIsShowSaveButton(false);
      alert("Данные успешно изменены");
    }
  }, [isPass]);

  function handleEditProfile(evt) {
    evt.preventDefault();
    setIsShowSaveButton(true);
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
                    disabled={!isShowSaveButton}
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
                    disabled={!isShowSaveButton}
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
                  isShowSaveButton ? "_visible" : ""
                }`}
                type="submit"
                disabled={
                  !isValid ||
                  (values.name === currentUser.name &&
                    values.email === currentUser.email)
                }
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
