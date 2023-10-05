import "./AboutMe.css";

function AboutMe(props) {
  return (
    <section className="student">
      <h2 className="student__theme">Студент</h2>
      <div className="student__container">
        <div className="student__info">
          <h3 className="student__name">Алена</h3>
          <h4 className="student__major">Фронтенд-разработчик, 27 лет</h4>
          <p className="student__description">
            Живу в Санкт-Петербурге, закончила горный факультет СПбГГУ. Я люблю
            слушать музыку, а ещё увлекаюсь танцами. С 2021 года работала в
            компании «Тойота Мотор СПб». В 2022 году попала под сокращение, и с
            2022 году работаю репетитором по математике. Недавно закончила курс
            по веб-разработке. На текущий момент нахожусь в поиске стажировки.{" "}
          </p>
          <a className="student__link">GitHub</a>
        </div>
        <img
          className="student__photo"
          src="Photo of Alena"
          alt="Photo of Alena"
        ></img>
      </div>
    </section>
  );
}

export default AboutMe;
