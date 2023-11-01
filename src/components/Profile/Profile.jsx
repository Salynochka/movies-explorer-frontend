import React, { useEffect, useContext } from "react";
import Header from "../Header/Header";
import "./Profile.css";
import { Link } from "react-router-dom";
import { useFormValidation } from "../useValidation";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Profile({ onBurgerMenu, isOpen, onExit, handleSubmit }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation();

    const currentUser = useContext(CurrentUserContext);

  function handleSubmited(e) {
    e.preventDefault();
    handleSubmit(values.password, values.email, values.name);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <div className="profile">
      <Header onBurgerMenu={onBurgerMenu} isOpen={isOpen} />
      <main>
        <section className="profile__section">
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <form onSubmit={handleSubmited}>
            <div className="profile__info">
              <div className="profile__line">
                <h2 className="profile__heading">Имя</h2>
                <input
                  type="text"
                  className="profile__name"
                  name="profile__name"
                  placeholder="Имя"
                  minLength="2"
                  required
                  onChange={handleChange}
                  value={values.name || ""}
                  autocomplete="on"
                  isValid={isValid.email}
                />
                <span className="profile__name-error">
                  {errors.profile__name}
                </span>
              </div>
              <div className="profile__line">
                <h2 className="profile__heading">E-mail</h2>
                <input
                  type="password"
                  className="profile__email"
                  name="profile__email"
                  placeholder="Пароль"
                  minLength="8"
                  required
                  onChange={handleChange}
                  value={values.profile__email || ""}
                  autocomplete="on"
                  isValid={isValid.profile__email}
                />
                <span className="profile__email-error">
                  {errors.profile__email}
                </span>
              </div>
            </div>
            <div className="profile__changing">
              <button className="profile__edit" type="button">
                Редактировать
              </button>
              <Link to="/signin" className="profile__to-login" onClick={onExit}>
                Выйти из аккаунта
              </Link>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Profile;
