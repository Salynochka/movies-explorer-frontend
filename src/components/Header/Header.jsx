import "./Header.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import account from "../../images/account.svg";

function Header({ loggedIn, onBurgerMenu, isSavedPage }) {
  return (
    <header className="header">
      <div className={`header__theme${loggedIn ? "-gray" : "-green"}`}>
        <div className="header__info">
          <button
            className={`header__burger header__burger${
              loggedIn ? "_visible" : ""
            }`}
            type="button"
            onClick={onBurgerMenu}
          >
            <span className="header__line" />
            <span className="header__line" />
            <span className="header__line" />
          </button>
          <Link to="/">
            <img className="header__logo" src={logo} alt="Логотип сайта" />
          </Link>
          <nav
            className={`header__navigation header__navigation${
              loggedIn ? "_visible" : ""
            }`}
          >
            <Link
              to="/movies"
              className={
                isSavedPage
                  ? `header__films`
                  : `header__films header__films_active`
              }
            >
              <p>Фильмы</p>
            </Link>
            <Link
              to="/saved-movies"
              className={
                isSavedPage
                  ? `header__saved-films header__saved-films_active`
                  : `header__films`
              }
            >
              <p>Сохраненные фильмы</p>
            </Link>
          </nav>
          <div
            className={`header__account header__account${
              loggedIn ? "_visible" : ""
            }`}
          >
            <Link to="/profile" className="header__name">
              <p> Аккаунт </p>
              <img className="header__profile" src={account} alt="Профиль" />
            </Link>
          </div>
          <div
            className={`header__entrance-buttons header__entrance-buttons${
              loggedIn ? "" : "_visible"
            }`}
          >
            <Link to="/signup" className="header__register">
              Регистрация
            </Link>
            <Link to="/signin" className="header__button-login">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
