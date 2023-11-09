import React from "react";
import "./SearchForm.css";

function SearchForm({ search, searchString, searchChange }) {
  return (
    <div className="search">
      <div className="search__info">
        <form className="search__form" onSubmit={search}>
          <input className="search__input" placeholder="Фильм" name="search__input" onChange={searchChange} value={searchString}/>
          <button className="search__button" type="button"/>
        </form>
      </div>
    </div>
  );
}

export default SearchForm;
