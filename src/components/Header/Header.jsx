import "./Header.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import account from "../../images/account.svg";

function Header(props) {

  return (
    <header className={`header_type_gray`}>
      <div className="header__info">
        <div className={`header__burger header__burger_hidden`} onClick={props.handleOpenBurgerMenu}>
          <span className="header__burger-line"></span>
          <span className="header__burger-line"></span>
          <span className="header__burger-line"></span>
        </div>
        <Link to="/">
          <img className="header__logo" src={logo} alt="Логотип сайта" />
        </Link>
        <nav className={`header__navigation`}>
          <Link to="/movies" className="header__films">
            <p>Фильмы</p>
          </Link>
          <Link to="/saved-movies" className="header__saved-films">
            <p>Сохраненные фильмы</p>
          </Link>
        </nav>
        <div className={`header__account`}>
          <Link to="/profile" className="header__name">
            <p> Аккаунт </p>
            <img className="header__profile" src={account} alt="Профиль" />
          </Link>
        </div>
        <div
          className={`header__entrance-buttons_hidden`}
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
