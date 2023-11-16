import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ handleSubmit, isShort, setIsShort, switchCheckbox }) {
  const [value, setValue] = useState({});
  const [error, setError] = useState(false);
  const location = useLocation();

  const isMoviesPage = location.pathname === "/movies";
  const isSavedMoviesPage = location.pathname === "/saved-movies";

  function searchChange(evt) {
    setValue(evt.target.value);
    if (isMoviesPage) {
      localStorage.setItem("searchString", evt.target.value);
    } 
  }

  useEffect(() => {
    if (isMoviesPage) {
      setIsShort(JSON.parse(localStorage.getItem("checkbox")) || false);
      setValue(localStorage.getItem("searchString"));
      return;
    } else if (isSavedMoviesPage) {
      setIsShort(false);
      setValue("");
    }
  }, []);

  function handleSubmitted(evt) {
    evt.preventDefault();
    if (isMoviesPage && !value) {
      setError(!error);
      return;
    }
    handleSubmit(value, isShort, setValue, setIsShort);
    setError(false);
  }

  return (
    <div className="search">
      <div className="search__info">
        <form className="search__form" onClick={handleSubmitted} name="search">
          <input
            className="search__input"
            type="text"
            id="search"
            placeholder="Фильм"
            name="search"
            onChange={searchChange}
            value={value || ""}
            autoComplete="on"
            required
          />
          <span className="search__input-error">{error.search}</span>
          <button className="search__button" type="submit" />
        </form>
      </div>
      <FilterCheckbox isShort={isShort} switchCheckbox={switchCheckbox} />
    </div>
  );
}

export default SearchForm;
