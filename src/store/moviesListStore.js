import { makeAutoObservable, runInAction } from "mobx";
import { createContext, useContext, useRef } from "react";
import { getMoviesByName, getMoviesByFilters, getCountries } from "../api/api";

class MoviesListStore {
    movies = [];
    countriesAll = [];
    total = null;
    currentPage = 1;
    pageSize = 10;
    moviesAgeRating = [0, 6, 12, 18]; // найти оптимальный вариант
    searchYear = null;
    searchText = null;
    previousSearchesMaxLength = 20;
    previousSearches = [];
    searchCountry = null;
    searchAge = null;
    areShownMoviesFiltered = false;
    isLoading = false;
    hasError = false;

    constructor() {
        makeAutoObservable(this);
    }

    init = (
        currentPage,
        pageSize,
        searchText,
        searchCountry,
        searchAge,
        searchYear
    ) => {
        this.currentPage = currentPage || 1;
        this.pageSize = pageSize || 10;
        this.searchText = searchText;
        this.searchCountry = searchCountry;
        this.searchAge = searchAge;
        this.searchYear = searchYear;

        if (this.searchCountry || this.searchAge || this.searchYear) {
            this.areShownMoviesFiltered = true;
            this.getMoviesByFilters();
        } else {
            if (this.searchText) {
                this.areShownMoviesFiltered = true;
            }
            this.getMoviesByName();
        }

        this.initPreviousSearches();
        this.getCountries();
    };

    initPreviousSearches = () => {
        const data = JSON.parse(localStorage.getItem("searchValues"));

        if (data) {
            this.previousSearches = data;
        }
    };

    getMoviesByName = async () => {
        this.isLoading = true;
        this.hasError = false;
        this.searchCountry = null;
        this.searchAge = null;
        this.searchYear = null;

        try {
            this.saveSearchText();

            const [fetchedMovies, total] = await getMoviesByName(
                this.currentPage,
                this.pageSize,
                this.searchText
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

    saveSearchText = () => {
        if (!this.searchText) return;

        this.previousSearches = [
            ...new Set([...this.previousSearches, this.searchText]),
        ];

        if (this.previousSearches.length > this.previousSearchesMaxLength) {
            this.previousSearches.shift();
        }

        localStorage.setItem(
            "searchValues",
            JSON.stringify(this.previousSearches)
        );
    };

    getMoviesByFilters = async () => {
        this.isLoading = true;
        this.hasError = false;
        this.searchText = null;

        try {
            const [fetchedMovies, total] = await getMoviesByFilters(
                this.currentPage,
                this.pageSize,
                this.searchCountry,
                this.searchAge,
                this.searchYear?.$y
            );

            runInAction(() => {
                this.movies = fetchedMovies;
                this.total = total;
                this.areShownMoviesFiltered = !!(
                    this.searchCountry ||
                    this.searchAge ||
                    this.searchYear
                );
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

    getMovies = () => {
        if (this.searchText) {
            this.getMoviesByName();
        } else {
            this.getMoviesByFilters();
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

    setSearchCountry = searchCountry => {
        this.searchCountry = searchCountry;
    };

    setSearchAge = searchAge => {
        this.searchAge = searchAge;
    };

    resetFiltersPanel = () => {
        this.searchCountry = null;
        this.searchAge = null;
        this.searchYear = null;
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
