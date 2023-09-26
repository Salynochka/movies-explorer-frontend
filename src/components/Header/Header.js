import './Header.css';

function Header(props) {
  return (
    <header className="header">
      <div className="header__info">
        <img
          className="header__logo"
          src="logo"
          alt="Логотип сайта"
        />
        <div className={`header__navigation${props.logIn ? "_visible" : ""}`}>
          <link className="header__films" href="">Фильмы</link>
          <link className="header__saved-films" href="">Сохраненные фильмы</link>
        </div>
        <div className={`header__account${props.logIn ? "_visible" : ""}`}>
          <p className="header__name">Аккаунт</p>
          <img
              className="header__profile"
              src="photo"
              alt="Фото профиля"
          />
        </div>
        <div className={`header__entrance-buttons${props.logIn ? "" : "_visible"}`}>
          <p className="header__register">Аккаунт</p>
          <button
            className="header__button-login"
            type="button"
          ></button>
        </div>
      </div>
    </header>
  );
}

export default Header;