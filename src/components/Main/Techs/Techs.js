import "./Techs.css";

function Techs(props) {
  return (
    <section className="techs">
      <h2 className="techs__theme">Технологии</h2>
      <div className="techs__container">
        <h3 className="techs__header">7 технологий</h3>
        <p className="techs__text">
            На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
        <div className="techs__technologies">
          <h4 className="techs__element">HTML</h4>
          <h4 className="techs__element">CSS</h4>
          <h4 className="techs__element">JS</h4>
          <h4 className="techs__element">React</h4>
          <h4 className="techs__element">Git</h4>
          <h4 className="techs__element">Express.js</h4>
          <h4 className="techs__element">mongoDB</h4>
        </div>
      </div>
    </section>
  );
}

export default Techs;
