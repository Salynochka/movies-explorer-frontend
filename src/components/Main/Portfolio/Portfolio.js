import "./Portfolio.css";

function Portfolio(props) {
  return (
    <section className="portfolio">
      <h2 className="portfolio__theme">Портфолио</h2>
      <a className="portfolio__title">Статичный сайт</a>
      <a className="portfolio__title">Адаптивный сайт</a>
      <a className="portfolio__title">Одностраничное приложение</a>
    </section>
  );
}

export default Portfolio;
