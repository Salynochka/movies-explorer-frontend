import "./Header.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <div className="header__info">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Логотип сайта" />
        </Link>
        <div className={`header__navigation${props.logIn ? "_visible" : ""}`}>
          <a className="header__films" href={props.films}>
            Фильмы
          </a>
          <a className="header__saved-films" href={props.savedFilms}>
            Сохраненные фильмы
          </a>
        </div>
        <div className={`header__account${props.logIn ? "_visible" : ""}`}>
          <p className="header__name">Аккаунт</p>
          <img className="header__profile" src="photo" alt="Фото профиля" />
        </div>
        <div
          className={`header__entrance-buttons${props.logIn ? "" : "_visible"}`}
        >
          <Link to="/signup" className="header__register">
            Регистрация
          </Link>
          <Link to="/signin" className="header__button-login">
            Войти
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
