import "./Promo.css";
import webWorld from "../../../images/webWorld.png"

function Promo(props) {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__main">
          <h1 className="promo__header">
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <p className="promo__text">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <button className="promo__button" onClick={props.handleClick}>
            Узнать больше
          </button>
        </div>
        <img
          className="promo-web-world"
          src={webWorld}
          alt="Планета из слова Веб"
        />
      </div>
    </section>
  );
}

export default Promo;
