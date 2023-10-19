import "./Navigation.css";
import account from "../../../images/account.svg";
import exit from "../../../images/exit.svg";
import { Link } from "react-router-dom";

function Navigation(props) {
  return (
    <section className="navigation navigation_hidden" isOpen={props.isopen}>
      <nav className="navigation__menu">
        <img
          className="navigation__exit"
          src={exit}
          alt="Выход"
          onClick={props.closeNavigation}
        />
        <div className="navigation__group">
          <Link to="/" className="navigation__link navigation__link_active">
            <p className="navigation__text">Главная</p>
          </Link>
          <Link to="/movies" className="navigation__link navigation__link_active">
            <p className="navigation__text">Фильмы</p>
          </Link>
          <Link to="/saved-movies" className="navigation__link navigation__link_active">
            <p className="navigation__text">Сохраненные фильмы</p>
          </Link>
        </div>
        <div className="navigation__profile">
          <p className="navigation__account">Аккаунт</p>
          <img className="navigation__img" src={account} alt="Профиль" />
        </div>
      </nav>
    </section>
  );
}

export default Navigation;
