import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./Movies.css";

function Movies(props) {
  return (
    <div className="movies">
      <Header />
      <main>
        <SearchForm />
        <FilterCheckbox />
        <MoviesCardList />
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
