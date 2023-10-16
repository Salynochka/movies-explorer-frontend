import './Footer.css';

function Footer(props) {
  return (
    <footer className="footer">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__info">
        <h4 className="footer__year">&copy; 2023</h4>
        <nav className="footer__nav">
          <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          <a className="footer__link" href="https://github.com/Salynochka" target="_blank" rel="noreferrer">Github</a>
        </nav>
        <h4 className="footer__year footer__year_mobile">&copy; 2023</h4>
      </div>
    </footer>
  );
}

export default Footer;