import "./ErrorWindow.css";

function ErrorWindow(props) {


  return (
    <main>
      <section className="error">
        <div className="error__info">
          <h1 className="error__type">404</h1>
          <p className="error__text">Страница не найдена</p>
          <a className="error__back" href={`props.previos-page`} onClick={props.navigatedBack}>
            Назад
          </a>
        </div>
      </section>
    </main>
  );
}

export default ErrorWindow;
