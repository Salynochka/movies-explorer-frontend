import './SearchForm.css';

function SearchForm() {
  return (
    <div className="search">
      <div className="search__info">
        <input className="search__input" placeholder="Фильм"/>
        <button className="search__button" alt="Поиск"/>
      </div>
    </div>
  );
}

export default SearchForm;