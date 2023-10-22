import "./Navigation.css";
import account from "../../../images/account.svg";
import exit from "../../../images/exit.svg";
import { Link } from "react-router-dom";

function Navigation({isOpen, onClose, isActive}) {
  return (
    <section className={`navigation ${isOpen && "navigation_opened"}`}>
      <div className="navigation__cover">
      <nav className="navigation__menu">
        <img
          className="navigation__exit"
          src={exit}
          alt="Выход"
          onClick={onClose}
        />
        <div className="navigation__group">
          <Link to="/" className={`navigation__link ${isActive && "navigation__link_active"}`}>
            <p className="navigation__text">Главная</p>
          </Link>
          <Link to="/movies" className={`navigation__link ${isActive && "navigation__link_active"}`}>
            <p className="navigation__text">Фильмы</p>
          </Link>
          <Link to="/saved-movies" className={`navigation__link ${isActive && "navigation__link_active"}`}>
            <p className="navigation__text">Сохраненные фильмы</p>
          </Link>
        </div>
        <div className="navigation__profile">
          <p className="navigation__account">Аккаунт</p>
          <img className="navigation__img" src={account} alt="Профиль" />
        </div>
      </nav></div>
    </section>
  );
}

export default Navigation;
