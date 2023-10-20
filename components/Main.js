import React from "react";
import pencil from "../images/pencil.svg";
import Card from "./Card.js";
import Footer from "./Footer.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import Header from "./Header.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header 
        text="Выйти"
        link="/signin"
        onExit={props.onExit}
        email={props.email}
        mainIsOpened={props.mainIsOpened}
      />
      <main>
        <section className="profile">
          <div className="profile__container">
            <img
              className="profile__photo"
              src={currentUser.avatar}
              alt={currentUser.name}
            />
            <button className="profile__cover" onClick={props.onEditAvatar}>
              <img className="profile__pencil" src={pencil} alt="Карандаш" />
            </button>
          </div>
          <div className="profile__info">
            <div className="profile__entry">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__changes"
                onClick={props.onEditProfile}
                type="button"
              ></button>
            </div>
            <h2 className="profile__description">{currentUser.about}</h2>
          </div>
          <button
            className="profile__button-add"
            onClick={props.onAddPlace}
            type="button"
          ></button>
        </section>
        <section className="cards">
          {props.cards.map((card) => (
            <Card
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              owner={card.owner}
              link={card.link}
              name={card.name}
              likes={card.likes}
              card={card}
              cardId={card._id}
              key={card._id}
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;
