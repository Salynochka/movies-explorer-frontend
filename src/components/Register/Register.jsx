import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

function Register(props) {
  return (
    <main>
      <section className="register">
        <div className="register__container">
          <Link to="/" className="register__logo">
            <img src={logo} alt="Логотип" />
          </Link>
          <h1 className="register__title">Добро пожаловать!</h1>
          <form className="register__form" name="register">
            <fieldset className="register__input">
              <h2 className="register__heading">Имя</h2>
              <input
                type="text"
                className="register__item register__item_type_name"
                name="name"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                required
              />
              <span className="register__form-error register__form-error_type_name name-error" />
              <h2 className="register__heading">E-mail</h2>
              <input
                type="text"
                className="register__item register__item_type_email"
                name="email"
                placeholder="Email"
                minLength="2"
                maxLength="40"
                required
              />
              <span className="register__form-error register__form-error_type_email email-error" />
              <h2 className="register__heading">Пароль</h2>
              <input
                type="text"
                className="register__item register__item_type_password"
                name="password"
                placeholder="Пароль"
                minLength="2"
                maxLength="200"
                required
              />
              <span className="register__form-error register__form-error_type_password password-error" />
            </fieldset>
            <button className="register__button" type="submit">
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
