import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.kinopoisk.dev/v1.4",
    headers: {
        accept: "application/json",
        "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
    },
});

const instance2 = axios.create({
    baseURL: "https://api.kinopoisk.dev/v1",
    headers: {
        accept: "application/json",
        "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
    },
});

export async function getAllMoviesAxios(page, limit) {
    try {
        const response = await instance.get(
            `movie?page=${page}&limit=${limit}`
        );

        return [response.data.docs.map(_transformMovies), response.data.total];
    } catch (error) {
        throw error;
    }
}

export async function getMovieAxios(id) {
    try {
        const response = await instance.get(`movie/${id}`);
        return _transformMovie(response.data);
    } catch (error) {
        throw error;
    }
}

export async function getMovieByNameAxios(page, limit, name) {
    try {
        const response = await instance.get(
            `movie/search?page=${page}&limit=${limit}&query=${name}`
        );

        return [response.data.docs.map(_transformMovies), response.data.total];
    } catch (error) {
        throw error;
    }
}

export async function getReviews(id) {
    try {
        const response = await instance.get(
            `review?page=1&limit=10&selectFields=&movieId=${id}`
        );
        return response.data.docs.map(_transformReviews);
    } catch (error) {
        throw error;
    }
}

export async function getCountries() {
    try {
        const response = await instance2.get(
            `movie/possible-values-by-field?field=countries.name`
        );

        return response.data.map(_transformCountries);
    } catch (error) {
        if (error.response) {
            console.log(
                "Server responded with status code:",
                error.response.status
            );
            console.log("Response data:", error.response.data);
        } else if (error.request) {
            console.log("No response received:", error.request);
        } else {
            console.log("Error creating request:", error.message);
        }
    }
}

const _transformMovies = movies => {
    return {
        id: movies.id,
        name: movies.name,
        poster: movies.poster.previewUrl,
        year: movies.year,
        description: movies.description,
        genres: movies.genres,
        type: movies.type,
    };
};

const _transformMovie = movie => {
    return {
        name: movie.name,
        poster: movie.poster.url,
        year: movie.year,
        type: movie.type,
        description: movie.description,
        rating: movie.rating.imdb,
        actors: movie.persons,
        similarmovies: movie.similarMovies,
    };
};

const _transformReviews = rewies => {
    return {
        title: rewies.title,
        type: rewies.type,
        review: rewies.review,
        date: rewies.date,
        author: rewies.author,
    };
};

const _transformCountries = countries => {
    return {
        name: countries.name,
    };
};
