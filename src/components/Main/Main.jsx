import React from "react";
import Header from "../Header/Header";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import Footer from "../Footer/Footer";
import "./Main.css";

function Main({onBurgerMenu, isOpen, loggedIn}) {
  return (
    <div className="page">
      <Header 
        onBurgerMenu={onBurgerMenu}
        isOpen={isOpen}
        loggedIn={loggedIn}
      />
      <main>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
}

export default Main;
