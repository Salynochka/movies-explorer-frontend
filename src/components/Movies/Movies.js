import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import MoviesCard from "./MoviesCard/MoviesCard";

function Movies(props) {
  
    return (
      <>
        <main>
        <SearchForm 
        />
        <FilterCheckbox 
        />
        <MoviesCardList 
        />
        <MoviesCard 
        />
        </main>
      </>
    );
  }

export default Movies;