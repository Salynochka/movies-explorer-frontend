import React, { useEffect } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useFormValidation } from "../../utils/useValidation";

function Register({ handleSubmit}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation();

  function handleSubmited(e) {
    e.preventDefault();
    handleSubmit(values.name, values.email, values.password);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <main>
      <section className="register">
        <div className="register__container">
          <Link to="/" className="register__logo">
            <img src={logo} alt="Логотип" />
          </Link>
          <h1 className="register__title">Добро пожаловать!</h1>
          <form
            className="register__form"
            name="register"
            onSubmit={handleSubmited}
          >
            <fieldset className="register__input">
              <h2 className="register__heading">Имя</h2>
              <input
                type="text"
                className="register__item register__item_type_name"
                name="name"
                placeholder="Имя"
                minLength="2"
                required
                onChange={handleChange}
                value={values.name || ""}
                autoComplete="on"
                isValid={isValid.name}
              />
              <span className="register__form-error register__form-error_type_name name-error">
                {errors.name}
              </span>
              <h2 className="register__heading">E-mail</h2>
              <input
                type="email"
                className="register__item register__item_type_email"
                name="email"
                placeholder="Email"
                minLength="2"
                required
                onChange={handleChange}
                value={values.email || ""}
                autoComplete="on"
                pattern="^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$"
                isValid={isValid.email}
              />
              <span className="register__form-error register__form-error_type_email email-error">
                {errors.email}
              </span>
              <h2 className="register__heading">Пароль</h2>
              <input
                type="password"
                className="register__item register__item_type_password"
                name="password"
                placeholder="Пароль"
                minLength="8"
                required
                onChange={handleChange}
                value={values.password || ""}
                autocomplete="on"
                isValid={isValid.password}
              />
              <span className="register__form-error register__form-error_type_password password-error">
                {errors.password}
              </span>
            </fieldset>
            <button
              className="register__button"
              type="submit"
              disabled={!isValid}
            >
              Зарегистрироваться
            </button>
            <div className="register__ask">
              <h3 className="register__question">Уже зарегистрированы?</h3>
              <Link to="/signin" className="register__to-login">
                Войти
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Register;
