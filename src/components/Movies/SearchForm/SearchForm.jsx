import "./SearchForm.css";

function SearchForm() {
  return (
    <div className="search">
      <div className="search__info">
        <form className="search__form">
          <input className="search__input" placeholder="Фильм" />
          <button className="search__button" />
        </form>
      </div>
    </div>
  );
}

export default SearchForm;
