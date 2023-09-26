import React from "react";
import {Link} from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__info">
        <p className={`header__email${props.mainIsOpened ? "_visible" : ""}`}>{props.email}</p>
        <Link to={props.link} className="header__text" onClick={props.onExit}>{props.text}</Link>
      </div>
    </header>
  );
}

export default Header;
