import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

function Login(props) {
  return (
    <main>
      <section className="login">
        <div className="login__container" onSubmit={props.handleSubmit}>
          <Link to="/" className="login__logo">
            <img src={logo} alt="Логотип" />
          </Link>
          <h1 className="login__title">Рады видеть!</h1>
          <form className="login__form" name="login">
            <fieldset className="login__input">
              <h2 className="login__heading">E-mail</h2>
              <input
                type="text"
                className="login__item login__item_type_email"
                name="email"
                placeholder="Email"
                minLength="2"
                maxLength="40"
                required
              />
              <span className="login__form-error login__form-error_type_email email-error" />
              <h2 className="login__heading">Пароль</h2>
              <input
                type="text"
                className="login__item login__item_type_password"
                name="password"
                placeholder="Пароль"
                minLength="2"
                maxLength="200"
                required
              />
              <span className="login__form-error login__form-error_type_password password-error" />
            </fieldset>
            <button className="login__button" type="submit">
              Войти
            </button>
            <div className="login__ask">
              <h3 className="login__question">Ещё не зарегистрированы? </h3>
              <Link to="/signup" className="login__to-register">
                Регистрация
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;
