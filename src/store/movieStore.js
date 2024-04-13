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
    reviewsLoading = false;
    reviewsPage = 0;
    reviewsSize = 3;
    actorsPage = 1;
    actorsSize = 10;
    seriesInformation = [];
    isLoading = false;
    hasError = false;

    constructor() {
        makeAutoObservable(this);
    }

    init = id => {
        this.id = id;

        this.getMovie();
        this.getReviews(1);
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

    getReviews = async page => {
        this.reviewsLoading = true;
        this.hasError = false;

        try {
            const fetchedReviews = await getMovieReviews(
                this.id,
                page,
                this.reviewsSize
            );

            runInAction(() => {
                if (page !== 1) {
                    this.reviews.push(...fetchedReviews);
                } else {
                    this.reviews = fetchedReviews;
                }
                this.reviewsPage = page;
                this.reviewsLoading = false;
            });
        } catch (e) {
            runInAction(() => {
                this.hasError = true;
                this.reviewsLoading = false;
            });
            console.error(e);
        }
    };

    getNextReviews = () => {
        if (this.reviews.length >= (this.reviewsPage + 1) * this.reviewsSize) {
            this.reviewsPage += 1;
            return;
        }

        this.getReviews(this.reviewsPage + 1);
    };

    getResetReviews = () => {
        this.reviewsPage = 1;
        this.reviewsLoading = false;

        this.getReviews(this.reviewsPage);
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

    showMoreActors = () => {
        this.actorsPage += 1;
    };

    resetActorsPagination = () => {
        this.actorsPage = 1;
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
