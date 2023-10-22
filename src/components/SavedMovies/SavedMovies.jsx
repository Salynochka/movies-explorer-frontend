import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./SavedMovies.css";

function SavedMovies(props) {
  return (
    <div className="saved-movies">
      <Header onBurgerMenu={props.onBurgerMenu} isOpen={props.isOpen} />
      <main>
        <SearchForm />
        <FilterCheckbox />
        <MoviesCardList />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
