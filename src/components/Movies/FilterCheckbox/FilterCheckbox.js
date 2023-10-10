import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <div className="filter">
      <div className="filter__info">
        <button className="filter__checkbox">
          <p className="filter__checkbox-round"/>
        </button>
        <h3 className="filter__text">Короткометражки</h3>
      </div>
    </div>
  );
}

export default FilterCheckbox;
