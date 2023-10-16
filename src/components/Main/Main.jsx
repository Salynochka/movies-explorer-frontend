import React from "react";
import Header from "../Header/Header";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import Navigation from "../Main/Navigation/Navigation";
import Footer from "../Footer/Footer";
import "./Main.css";

function Main(props) {
  const [isNavigationOpen, setNavigationOpen] = React.useState(false);

  function handleOpenBurgerMenu() {
    setNavigationOpen(true);
  }

  return (
    <div className="page">
      <Header 
        handleOpenBurgerMenu={handleOpenBurgerMenu}
      />
      <main>
        <Navigation 
          isOpen={isNavigationOpen} 
        />
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
