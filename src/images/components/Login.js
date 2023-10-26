import React from "react";
import Header from "./Header.js";

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
    props.handleSubmit(formValue.password, formValue.email)
  }

  return (
    <>
      <Header 
        text="Регистрация" 
        link="/signup"
      />
      <section className="login">
        <div className="login__container" onSubmit={handleSubmit}>
          <h2 className="login__heading">{props.title}</h2>
          <form className="login__form" name="login">
            <fieldset className="login__input">
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
              {props.buttonText}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
