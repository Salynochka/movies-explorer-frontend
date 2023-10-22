import { Link, useNavigate } from "react-router-dom";
import "./ErrorWindow.css";

function ErrorWindow(props) {
  const backPath = useNavigate()

  function navigatedBack(){
    backPath(-2)
  }

  return (
    <main>
      <section className="error">
        <div className="error__info">
          <h1 className="error__type">404</h1>
          <p className="error__text">Страница не найдена</p>
          <Link className="error__back" onClick={navigatedBack}>
            Назад
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ErrorWindow;
