import React from "react";
import Header from "../Header/Header";
import "./Profile.css";
import { Link } from "react-router-dom";

function Profile({onBurgerMenu, isOpen, name, email, onExit}) {
  return (
    <div className="profile">
      <Header onBurgerMenu={onBurgerMenu} isOpen={isOpen} />
      <main>
        <section className="profile__section">
          <h1 className="profile__title">Привет, {name}!</h1>
          <div className="profile__info">
            <div className="profile__line">
              <h2 className="profile__heading">Имя</h2>
              <h2 className="profile__name">{name}</h2>
            </div>
            <div className="profile__line">
              <h2 className="profile__heading">E-mail</h2>
              <h2 className="profile__email">{email}</h2>
            </div>
          </div>
          <div className="profile__changing">
            <button className="profile__edit" type="button">
              Редактировать
            </button>
            <Link to="/signin" className="profile__to-login" onClick={onExit}>
              Выйти из аккаунта
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profile;
