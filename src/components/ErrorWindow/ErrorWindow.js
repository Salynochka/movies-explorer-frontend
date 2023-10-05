import "./ErrorWindow.css";

function ErrorWindow(props) {
  return (
    <header className={`error${props.error ? "_visible" : ""}`}>
      <h3 className="error__text">Произошла ошибка</h3>
    </header>
  );
}

export default ErrorWindow;
