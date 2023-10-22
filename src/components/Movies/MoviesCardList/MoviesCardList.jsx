import "../MoviesCard/MoviesCard.css";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";
import "./MoviesCardList.css";

function MoviesCards(props) {
  return (
    <>
      <section className="cards">
        <div className="cards__full">
          <MoviesCard />
        </div>
      </section>
      <div className={`cards__more cards__more${props.savedMovies ? "_increased" : ""}`}>
        <button className={`cards__button cards__button${props.savedMovies ? "_hidden" : ""}`} type="button"> Ещё </button>
      </div>
    </>
  );
}

export default MoviesCards;
