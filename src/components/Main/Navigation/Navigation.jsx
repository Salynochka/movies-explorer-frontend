import "./Navigation.css";
import account from "../../../images/account.svg";
import { Link } from "react-router-dom";

function Navigation(props) {
  return (
    <section className="navigation">
      <nav className="navigation__menu">
        <Link to="/" className="navigation__link">
          <p>Главная</p>
        </Link>
        <Link to="/movies" className="navigation__link">
          <p>Фильмы</p>
        </Link>
        <Link to="/saved-movies" className="navigation__link">
          <p>Сохраненные фильмы</p>
        </Link>
      </nav>
      <div className="navigation__profile">
        <p className="navigation__account">Аккаунт</p>
        <img className="navigation__profile" src={account} alt="Профиль" />
      </div>
    </section>
  );
}

export default Navigation;
