import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies(props) {
  return (
    <>
      <Header />
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList />
      <Footer />
    </>
  );
}

export default SavedMovies;
