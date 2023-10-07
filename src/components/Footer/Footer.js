import './Footer.css';

function Footer(props) {
  return (
    <div className="footer">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__info">
        <h4 className="footer__year">2022</h4>
        <div className="footer__nav">
          <a className="footer__link" href="https://practicum.yandex.ru/">Яндекс.Практикум</a>
          <a className="footer__link" href="https://github.com/Salynochka">Github</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;