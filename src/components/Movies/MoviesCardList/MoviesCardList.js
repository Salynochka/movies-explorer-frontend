import "../MoviesCard/MoviesCard.css";
import MoviesCard from "../MoviesCard/MoviesCard.js";

function MoviesCards(props) {
  return (
    <section className="cards">
      {props.cards.map((card) => (
        <MoviesCard
          onCardLike={props.onCardLike}
          onCardDelete={props.onCardDelete}
          owner={card.owner}
          name={card.name}
          card={card}
          cardId={card._id}
          key={card._id}
        />
      ))}
    </section>
  );
}

export default MoviesCards;
