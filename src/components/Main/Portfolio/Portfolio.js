import "./Portfolio.css";

function Portfolio(props) {
  return (
    <section className="portfolio">
      <h2 className="portfolio__theme">Портфолио</h2>
      <ul className="portfolio__container">
        <li className="portfolio__part">
          <a
            className="portfolio__title"
            href="https://github.com/Salynochka/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
          </a>
          <a
            className="portfolio__link"
            href="https://github.com/Salynochka/how-to-learn"
            target="_blank"
            rel="noreferrer"
          />
        </li>
        <li className="portfolio__part">
          <a
            className="portfolio__title"
            href="https://github.com/Salynochka/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
          </a>
          <a
            className="portfolio__link"
            href="https://github.com/Salynochka/russian-travel"
            target="_blank"
            rel="noreferrer"
          />
        </li>
        <li className="portfolio__part">
          <a
            className="portfolio__title"
            href="https://github.com/Salynochka/react-mesto-api-full-gha"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
          </a>
          <a
            className="portfolio__link"
            href="https://github.com/Salynochka/react-mesto-api-full-gha"
            target="_blank"
            rel="noreferrer"
          />
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
