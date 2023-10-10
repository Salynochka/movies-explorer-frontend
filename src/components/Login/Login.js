import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

function Login(props) {
  const [formValue, setFormValue] = React.useState({
    password: "",
    email: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleSubmit(formValue.password, formValue.email);
  }

  return (
    <>
      <section className="login">
        <div className="login__container" onSubmit={handleSubmit}>
          <img className="login__logo" src={logo} alt="Логотип" />
          <h2 className="login__title">Рады видеть!</h2>
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
                onChange={handleChange}
                value={formValue.email || ""}
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
                onChange={handleChange}
                value={formValue.password || ""}
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
    </>
  );
}

export default Login;
