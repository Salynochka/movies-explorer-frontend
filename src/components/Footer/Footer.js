import './Footer.css';

function Footer(props) {
  return (
    <div className="footer">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__info">
        <h4 className="footer__year"></h4>
        <div className="footer__nav">
          <a className="footer__link">Яндекс.Практикум</a>
          <a className="footer__link">Github</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;