import "./Promo.css";
import webWorld from "../../../images/webWorld.png"

function Promo(props) {
  return (
    <section className="promo">
      <div className="promo__container">
      <img
          className="promo__picture-before"
          src={webWorld}
          alt="Планета из слова Веб"
        />
        <div className="promo__main">
          <h1 className="promo__header">
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <p className="promo__text">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <button className="promo__button" onClick={props.handleClick} type="button">
            <a href="#project" className="promo__button-text" >Узнать больше</a>
          </button>
        </div>
        <img
          className="promo__picture-after"
          src={webWorld}
          alt="Планета из слова Веб"
        />
      </div>
    </section>
  );
}

export default Promo;
