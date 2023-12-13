import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormValidation } from "../../../utils/useFormValidation";

function SearchForm({ handleSubmit, isShort, setIsShort, switchCheckbox }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const location = useLocation();

  const {onChange, errors, isValid } = useFormValidation();

  const isMoviesPage = location.pathname === "/movies";
  const isSavedMoviesPage = location.pathname === "/saved-movies";

  function searchChange(evt) {
    setValue(evt.target.value);
    if (isMoviesPage) {
      localStorage.setItem("searchString", evt.target.value);
    } 
    onChange(evt)
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
        <form className="search__form" name="search">
          <input
            type="text"
            className="search__input"
            name="search"
            id="search"
            placeholder="Фильм"
            onChange={searchChange}
            value={value || ""}
            autoComplete="on"
            minLength="1"
            required
          />
          <button className="search__button" type="submit" disabled={!isValid} onClick={handleSubmitted}/>
        </form>
        <span className="search__form-error">{errors.search}</span>
      </div>
      <FilterCheckbox isShort={isShort} switchCheckbox={switchCheckbox} disabled={!value}/>
    </div>
  );
}

export default SearchForm;
