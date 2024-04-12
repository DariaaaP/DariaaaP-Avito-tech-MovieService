import { makeAutoObservable, runInAction } from "mobx";
import { createContext, useContext, useRef } from "react";
import {
    getMovie,
    getMoviePosters,
    getMovieReviews,
    getMovieSeriesInformation,
} from "../api/api";

class MovieStore {
    movie = [];
    reviews = [];
    posters = [];
    reviewsSize = 3;
    seriesInformation = [];
    isLoading = false;
    hasError = false;

    constructor() {
        makeAutoObservable(this);
    }

    init = id => {
        this.id = id;

        this.getMovie();
        this.getReviews();
        this.getPosters();
        this.getSeriesInformation();
    };

    getMovie = async () => {
        this.isLoading = true;
        this.hasError = false;

        try {
            const fetchedMovie = await getMovie(this.id);

            runInAction(() => {
                this.movie = fetchedMovie;
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

    getReviews = async () => {
        this.isLoading = true;
        this.hasError = false;

        try {
            const fetchedReviews = await getMovieReviews(
                this.id,
                this.reviewsSize
            );

            runInAction(() => {
                this.reviews = fetchedReviews;
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

    getPosters = async () => {
        this.isLoading = true;
        this.hasError = false;

        try {
            const fetchedPosters = await getMoviePosters(this.id);

            runInAction(() => {
                this.posters = fetchedPosters;
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

    getSeriesInformation = async () => {
        this.isLoading = true;
        this.hasError = false;

        try {
            const fetchedSeries = await getMovieSeriesInformation(this.id);

            runInAction(() => {
                this.seriesInformation = fetchedSeries;
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

    setMovies = movie => {
        this.movie = movie;
    };

    setReviewsSize = reviewsSize => {
        this.reviewsSize = reviewsSize;
    };

    setReviews = reviews => {
        this.reviews = reviews;
    };
}

const MovieStoreContext = createContext(null);

export const MovieStoreProvider = ({ children }) => {
    const store = useRef(new MovieStore());

    return (
        <MovieStoreContext.Provider value={store.current}>
            {children}
        </MovieStoreContext.Provider>
    );
};

export const useMovieStore = () => {
    const storeMovie = useContext(MovieStoreContext);

    if (!storeMovie) {
        throw new Error("useStore must be used within a StoreProvider.");
    }

    return storeMovie;
};
