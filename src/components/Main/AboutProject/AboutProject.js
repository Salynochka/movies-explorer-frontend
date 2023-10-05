import './AboutProject.css';

function AboutProject(props) {
  
    return (
      <section className="project">
        <h2 className="project__theme">О проекте</h2>
        <div className="project__container">
          <div className="project__steps">
            <h3 className="project__steps-header">Дипломный проект включал 5 этапов</h3>
            <p className="project__steps-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className="project__steps">
            <h3 className="project__steps-header">На выполнение диплома ушло 5 недель</h3>
            <p className="project__steps-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>   
        <div className="project__weeks">
          <p className="project__weeks-back">Back-end</p>
          <p className="project__weeks-front">Front-end</p>
        </div>
        <div className="project__parts">
          <p className="project__parts-back">Back-end</p>
          <p className="project__parts-front">Front-end</p>
        </div>
      </section>
    )
    }

export default AboutProject;