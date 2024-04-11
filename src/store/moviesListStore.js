import { makeAutoObservable, runInAction } from "mobx";
import { createContext, useContext, useRef } from "react";
import { getMovies, getCountries } from "../api/api";

class MoviesListStore {
    movies = [];
    countriesAll = [];
    total = null;
    currentPage = 1;
    pageSize = 10;
    moviesAgeRating = [0, 6, 12, 18]; // найти оптимальный вариант
    searchYear = null;
    searchText = "";
    searchCountry = "";
    searchAge = null;
    areShownMoviesFiltered = false;
    isLoading = false;
    hasError = false;

    constructor() {
        makeAutoObservable(this);
    }

    init = (currentPage, pageSize, searchText) => {
        this.currentPage = currentPage || 1;
        this.pageSize = pageSize || 10;
        this.searchText = searchText;

        this.getMovies();
    };

    initCountries = countriesAll => {
        this.countriesAll = countriesAll;

        this.getCountries();
    };

    getMovies = async () => {
        this.isLoading = true;
        this.hasError = false;

        try {
            const [fetchedMovies, total] = await getMovies(
                this.currentPage,
                this.pageSize,
                this.searchText,
                this.searchYear,
                this.searchCountry,
                this.searchAge
            );

            runInAction(() => {
                this.movies = fetchedMovies;
                this.total = total;
                this.areShownMoviesFiltered = !!this.searchText;
                this.isLoading = false;
            });
        } catch (e) {
            runInAction(() => {
                this.hasError = true;
                this.isLoading = false;
            });
            console.error(e);
        }
    };

    getCountries = async () => {
        this.isLoading = true;
        this.hasError = false;

        try {
            const countriesAll = await getCountries();
            runInAction(() => {
                this.countriesAll = countriesAll;
            });
        } catch (e) {
            runInAction(() => {
                this.hasError = true;
                this.isLoading = false;
            });
            console.error(e);
        }
    };

    setMovies = movies => {
        this.movies = movies;
    };

    setPageSize = pageSize => {
        this.pageSize = pageSize;
    };

    setCurrentPage = currentPage => {
        this.currentPage = currentPage;
    };

    setSearchText = searchText => {
        this.searchText = searchText;
    };

    setSearchYear = searchYear => {
        this.searchYear = searchYear;
    };

    setSearchCountries = searchCountry => {
        this.searchCountry = searchCountry;
    };

    setSearchAge = searchAge => {
        this.searchAge = searchAge;
    };
}

const MoviesListStoreContext = createContext(null);

export const MoviesListStoreProvider = ({ children }) => {
    const store = useRef(new MoviesListStore());

    return (
        <MoviesListStoreContext.Provider value={store.current}>
            {children}
        </MoviesListStoreContext.Provider>
    );
};

export const useMoviesListStore = () => {
    const store = useContext(MoviesListStoreContext);

    if (!store) {
        throw new Error("useStore must be used within a StoreProvider.");
    }

    return store;
};
