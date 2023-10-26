import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ searchString, searchChange }) {
  return (
    <div className="search">
      <div className="search__info">
        <form className="search__form">
          <input className="search__input" placeholder="Фильм" name="search__input" onChange={searchChange} value={searchString}/>
          <button className="search__button" type="button"/>
        </form>
      </div>
    </div>
  );
}

export default SearchForm;
