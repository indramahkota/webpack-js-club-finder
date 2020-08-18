import "./components/movie-item/MovieItem.js";
import "./components/movie-list/MovieList.js";
import "./components/search-bar/SearchBar.js";
import DataSource from "./data/data-source.js";

const App = () => {
    const main = document.querySelector("main");
    main.innerHTML = "";
    
    const searchBar = document.createElement("search-bar");
    main.appendChild(searchBar);

    const movieList = document.createElement("movie-list");
    main.appendChild(movieList);

    const checkQuery = (value) => {
        if (value === null || value === "") {
            fallbackResult("Please type query");
        } else {
            searchMovieWithQuery(value)
        }
    }

    const searchMovieWithQuery = async (value) => {
        try {
            const result = await DataSource.searchMovie(value);
            renderResult(result);
        } catch (message) {
            fallbackResult(message);
        }
    }

    const onButtonSearchClicked = () => checkQuery(searchBar.searchQuery);

    const onButtonSearchEntered = event => {
        if (event.keyCode === 13) {
            event.preventDefault();
            checkQuery(searchBar.searchQuery);
        }
    };

    const renderResult = results => {
        movieList.movies = results;
    };

    const fallbackResult = message => {
        movieList.renderError(message);
    };

    searchBar.clickEvent = onButtonSearchClicked;
    searchBar.keyUpEvent = onButtonSearchEntered;

    const getMovieData = async () => {
        try {
            const result = await DataSource.discoverMovie();
            renderResult(result);
        } catch (message) {
            fallbackResult(message);
        }
    }

    getMovieData();
}

export default App;