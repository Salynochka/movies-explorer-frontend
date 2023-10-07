import "./Portfolio.css";

function Portfolio(props) {
  return (
    <section className="portfolio">
      <h2 className="portfolio__theme">Портфолио</h2>
      <a className="portfolio__title" href="https://github.com/Salynochka/how-to-learn">Статичный сайт</a>
      <a className="portfolio__title" href="https://github.com/Salynochka/russian-travel">Адаптивный сайт</a>
      <a className="portfolio__title" href="https://github.com/Salynochka/react-mesto-api-full-gha">Одностраничное приложение</a>
    </section>
  );
}

export default Portfolio;
