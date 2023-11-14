import React from "react";
import "./SearchForm.css";
import { useFormValidation } from "../../../utils/useValidation";

function SearchForm({ submit, searchString, searchChange }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  const { errors, isValid } = useFormValidation();

  return (
    <div className="search">
      <div className="search__info">
        <form className="search__form" onSubmit={handleSubmit}>
          <input
            className="search__input"
            type="text"
            id="search"
            placeholder="Фильм"
            name="search"
            onChange={searchChange}
            value={searchString || ""}
            autoComplete="on"
            required
          />
          <span className="search__input-error">{errors.search}</span>
          <button
            className="search__button"
            type="submit"
            disabled={!isValid}
          />
        </form>
      </div>
    </div>
  );
}

export default SearchForm;
