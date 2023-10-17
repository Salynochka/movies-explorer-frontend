import "./Header.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import account from "../../images/account.svg";

function Header(props) {

  return (
    <header className={`${props.logIn ? "header__type header__type_gray" : "header"}`}>
      <div className="header__info">
        <div className={`header__burger header__burger_hidden`} onClick={props.handleOpenBurgerMenu}>
          <span className="header__burger-line"></span>
          <span className="header__burger-line"></span>
          <span className="header__burger-line"></span>
        </div>
        <Link to="/">
          <img className="header__logo" src={logo} alt="Логотип сайта" />
        </Link>
        <nav className={`header__navigation header__navigation${props.logIn ? "_visible" : ""}`}>
          <Link to="/movies" className="header__films header__films_active">
            <p>Фильмы</p>
          </Link>
          <Link to="/saved-movies" className="header__saved-films header__saved-films_active">
            <p>Сохраненные фильмы</p>
          </Link>
        </nav>
        <div className={`header__account header__account${props.logIn ? "_visible" : ""}`}>
          <Link to="/profile" className="header__name">
            <p> Аккаунт </p>
            <img className="header__profile" src={account} alt="Профиль" />
          </Link>
        </div>
        <div
          className={`header__entrance-buttons header__entrance-buttons${props.logIn ? "_hidden" : ""}`}
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
