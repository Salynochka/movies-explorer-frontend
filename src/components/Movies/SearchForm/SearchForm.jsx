import React from "react";
import "./SearchForm.css";

function SearchForm({ search, searchString, searchChange }) {

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchString) {
      alert('Нужно ввести ключевое слово');
      return;
    } else {
      return search();
    }
  };

  return (
    <div className="search">
      <div className="search__info">
        <form className="search__form" onSubmit={handleSubmit}>
          <input
            className="search__input"
            type="text"
            placeholder="Фильм"
            name="search"
            onChange={searchChange}
            value={searchString}
          />
          <button className="search__button" type="submit"/>
        </form>
      </div>
    </div>
  );
}

export default SearchForm;
