import "./Navigation.css";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import account from "../../../images/account.svg";
import exit from "../../../images/exit.svg";

function Navigation({ isOpen, onClose, onClick }) {
  const location = useLocation();

  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      onClick();
    }
  }

  function handleMousedown(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      onClick();
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
      document.addEventListener("mousedown", handleMousedown);
    }
    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleMousedown);
    };
  }, [isOpen]);

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
            <Link
              to="/"
              className={location.pathname === '/'
              ? "navigation__link_active"
              : "navigation__link"
              }
              onClick={onClick}
            >
              <p className="navigation__text">Главная</p>
            </Link>
            <Link
              to="/movies"
              className={location.pathname === '/movies'
              ? "navigation__link_active"
              : "navigation__link"
              }
              onClick={onClick}
            >
              <p className="navigation__text">Фильмы</p>
            </Link>
            <Link
              to="/saved-movies"
              className={location.pathname === '/saved-movies'
              ? "navigation__link_active"
              : "navigation__link"
              }
              onClick={onClick}
            >
              <p className="navigation__text">Сохраненные фильмы</p>
            </Link>
          </div>
          <Link to="/profile" className="navigation__profile" onClick={onClick}>
            <p>Аккаунт</p>
            <img className="navigation__img" src={account} alt="Профиль" />
          </Link>
        </nav>
      </div>
    </section>
  );
}

export default Navigation;
