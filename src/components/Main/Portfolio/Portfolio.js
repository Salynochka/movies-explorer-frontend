import "./Portfolio.css";

function Portfolio(props) {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__theme">Портфолио</h2>
        <div className="portfolio__part">
          <a className="portfolio__title" href="https://github.com/Salynochka/how-to-learn"> Статичный сайт </a>
          <a className="portfolio__link" href="https://github.com/Salynochka/how-to-learn"/>
        </div>
        <div className="portfolio__part">
          <a className="portfolio__title" href="https://github.com/Salynochka/russian-travel"> Адаптивный сайт </a>
          <a className="portfolio__link" href="https://github.com/Salynochka/russian-travel"/>
        </div>
        <div className="portfolio__part">
          <a className="portfolio__title" href="https://github.com/Salynochka/react-mesto-api-full-gha"> Одностраничное приложение</a>
          <a className="portfolio__link" href="https://github.com/Salynochka/react-mesto-api-full-gha"/>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
