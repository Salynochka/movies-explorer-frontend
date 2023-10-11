import "./ErrorWindow.css";

function ErrorWindow(props) {
  return (
    <section className="error">
      <div className="error__info">
        <h3 className="error__type">404</h3>
        <p className="error__text">Произошла ошибка</p>
        <a className="error__back" href={`props.previos-page`}>
          Назад
        </a>
      </div>
    </section>
  );
}

export default ErrorWindow;
