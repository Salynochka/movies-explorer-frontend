import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useFormValidation } from "../../utils/useValidation";

function Login({ handleSubmit, isLoggedIn }) {
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation();

  function handleSubmited(e) {
    e.preventDefault();
    handleSubmit(values.email, values.password);
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/movies');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <main>
      <section className="login">
        <div className="login__container" onSubmit={handleSubmited}>
          <Link to="/" className="login__logo">
            <img src={logo} alt="Логотип" />
          </Link>
          <h1 className="login__title">Рады видеть!</h1>
          <form className="login__form" name="login">
            <fieldset className="login__input">
              <h2 className="login__heading">E-mail</h2>
              <input
                type="email"
                className="login__item login__item_type_email"
                name="email"
                placeholder="Email"
                minLength="2"
                maxLength="40"
                required
                onChange={handleChange}
                value={values.email || ""}
                autoComplete="on"
                pattern="^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$"
              />
              <span className="login__form-error login__form-error_type_email email-error">
                {" "}
                {errors.email}
              </span>
              <h2 className="login__heading">Пароль</h2>
              <input
                type="password"
                className="login__item login__item_type_password"
                name="password"
                placeholder="Пароль"
                minLength="8"
                maxLength="200"
                required
                onChange={handleChange}
                value={values.password || ""}
                autoComplete="on"
              />
              <span className="login__form-error login__form-error_type_password password-error">
                {errors.password}
              </span>
            </fieldset>
            <button className="login__button" type="submit" disabled={!isValid}>
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
