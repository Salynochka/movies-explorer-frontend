import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ isShort, switchCheckbox }) {
/*
  const onChange = (evt) => {
    switchCheckbox();
    localStorage.setItem("isShort", evt.target.checked);
  };*/

  return (
    <div className="filter">
      <div className="filter__info">
        <h3 className="filter__text filter__text_mobile">Короткометражки</h3>
        <form className="filter__checkbox">
          <input
            type="checkbox"
            className="filter__checkbox-round"
            name='shortFilms'
            onChange={switchCheckbox}
            checked={isShort || false}
          />
        </form>
        <h3 className="filter__text filter__text_desktop">Короткометражки</h3>
      </div>
    </div>
  );
}

export default FilterCheckbox;
