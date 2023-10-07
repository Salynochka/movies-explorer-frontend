import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className="filter">
      <div className="filter__info">
        <input className="filter__checkbox"><img className="filter__checkbox_round" alt="Стрелка"/></input>
        <h3 className="filter__text">Короткометражки</h3>
      </div>
    </div>
  );
}

export default FilterCheckbox;