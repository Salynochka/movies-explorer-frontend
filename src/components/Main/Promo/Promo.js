import "./Promo.css";

function Promo(props) {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__main">
          <h1 className="promo__header">
            Учебный проект студента факультета Веб-разработки.
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
          src="web-world"
          alt="Планета из слова Веб"
        />
      </div>
    </section>
  );
}

export default Promo;
