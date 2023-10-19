import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <div className="filter">
      <div className="filter__info">
        <h3 className="filter__text_mobile">Короткометражки</h3>
        <form className="filter__checkbox">
          <input type="radio" className="filter__checkbox-round"/>
        </form>
        <h3 className="filter__text">Короткометражки</h3>
      </div>
    </div>
  );
}

export default FilterCheckbox;