import "./Header.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import account from "../../images/account.svg";

function Header(props) {
  return (
    <header className={`${props.logIn ? "header-gray" : "header"}`}>
      <div className="header__info">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Логотип сайта" />
        </Link>
        <div className={`header__navigation${props.logIn ? "_visible" : ""}`}>
          <Link to="/" className="header__films">
            <p>Фильмы</p>
          </Link>
          <Link to="/" className="header__saved-films">
            <p>Сохраненные фильмы</p>
          </Link>
        </div>
        <div className={`header__account${props.logIn ? "_visible" : ""}`}>
          <Link to="/" className="header__name">
            <p>Аккаунт</p>
            <img className="header__profile" src={account} alt="Профиль" />
          </Link>
        </div>
        <div className={`header__entrance-buttons${props.logIn ? "_hidden" : ""}`}>
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
