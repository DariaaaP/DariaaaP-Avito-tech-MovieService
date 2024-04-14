import { makeAutoObservable, runInAction } from "mobx";
import { createContext, useContext, useRef } from "react";
import {
    getCountries,
    getGenres,
    getTypesMovie,
    getRandomMovie,
    getNetworks,
} from "../api/api";
import { localizeContentTypeName } from "../utils/localizeContentTypeName";
import debounce from "lodash.debounce";

class RandomMovieStore {
    searchCountry = null;
    countriesAll = [];

    genres = [];
    genresOptions = [];

    contentTypes = [];
    contentTypesOptions = [];

    searchYear = null;

    rating = null;

    networks = [];
    networksSearchText = "";
    networksOptions = [];

    isLoading = false;
    hasError = false;
    isLookingForRandomMovie = false;
    hasNoResult = false;

    constructor() {
        makeAutoObservable(this);

        this.getNetworksDebounced = debounce(this.getNetworks, 500);
    }

    init = async () => {
        this.isLoading = true;

        await Promise.all([
            this.getCountries(),
            this.getGenres(),
            this.getTypes(),
            this.getNetworks(),
        ]);

        runInAction(() => {
            this.isLoading = false;
        });
    };

    getCountries = async () => {
        try {
            const countriesAll = await getCountries();

            runInAction(() => {
                this.countriesAll = countriesAll;
            });
        } catch (e) {
            runInAction(() => {
                this.hasError = true;
            });
            console.error(e);
        }
    };

    getGenres = async () => {
        try {
            const genres = await getGenres();
            runInAction(() => {
                this.genresOptions = genres;
            });
        } catch (e) {
            runInAction(() => {
                this.hasError = true;
            });
            console.error(e);
        }
    };

    getTypes = async () => {
        try {
            const types = await getTypesMovie();
            runInAction(() => {
                this.contentTypesOptions = types.map(type => ({
                    ...type,
                    displayName: localizeContentTypeName(type.name),
                }));
            });
        } catch (e) {
            runInAction(() => {
                this.hasError = true;
            });
            console.error(e);
        }
    };

    getNetworks = async () => {
        try {
            const networks = await getNetworks(this.networksSearchText);

            const networksMap = this.networksOptions
                .concat(networks)
                .reduce((acc, network) => {
                    acc[network.id] = network;
                    return acc;
                }, {});

            runInAction(() => {
                this.networksOptions = Object.values(networksMap);
            });
        } catch (e) {
            runInAction(() => {
                this.hasError = true;
            });
            console.error(e);
        }
    };

    setCountry = value => {
        this.searchCountry = value;
    };

    setGenres = value => {
        this.genres = value;
    };

    setContentTypes = value => {
        this.contentTypes = value;
    };

    setYear = value => {
        this.searchYear = value;
    };

    setRating = value => {
        this.rating = value;
    };

    setNetworks = value => {
        this.networks = value;
    };

    onNetworksSearchTextChange = value => {
        this.networksSearchText = value;

        this.getNetworksDebounced();
    };

    getRandomMovie = async () => {
        this.isLookingForRandomMovie = true;
        this.hasNoResult = false;
        this.hasError = false;

        try {
            const idRandomMovie = await getRandomMovie(
                this.contentTypes,
                this.searchYear,
                this.rating,
                this.genres,
                this.searchCountry,
                this.networks
            );

            if (idRandomMovie) {
                runInAction(() => {
                    this.idRandomMovie = idRandomMovie;
                    this.isLookingForRandomMovie = false;
                });
            } else {
                runInAction(() => {
                    this.hasNoResult = true;
                    this.isLookingForRandomMovie = false;
                });
            }
        } catch (e) {
            runInAction(() => {
                this.hasError = true;
                this.isLookingForRandomMovie = false;
            });
            console.error(e);
        }
    };
}

const RandomMovieStoreContext = createContext(null);

export const RandomMovieStoreProvider = ({ children }) => {
    const store = useRef(new RandomMovieStore());

    return (
        <RandomMovieStoreContext.Provider value={store.current}>
            {children}
        </RandomMovieStoreContext.Provider>
    );
};

export const useRandomMovieStore = () => {
    const store = useContext(RandomMovieStoreContext);

    if (!store) {
        throw new Error("useStore must be used within a StoreProvider.");
    }

    return store;
};
