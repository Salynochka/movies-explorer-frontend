import "./ErrorWindow.css";

function ErrorWindow(props) {
  return (
    <section className={`error${props.error ? "_visible" : ""}`}>
      <h3 className="error__text">Произошла ошибка</h3>
    </section>
  );
}

export default ErrorWindow;
