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

//https://api.kinopoisk.dev/v1.4/image?page=1&limit=10&movieId=12345

/**
 * @param {number} page
 * @param {number} limit
 * @param {string?} name
 */
export async function getMovies(page, limit, name, year, country, age) {
    try {
        let url = `movie?page=${page}&limit=${limit}`;

        if (year) {
            url += `&year=${year}`;
        }
        if (country) {
            url += `&countries.name=${country}`;
        }
        if (age) {
            url += `&ageRating=${age}`;
        }
        if (name) {
            url = `movie/search?page=${page}&limit=${limit}&query=${name}`;
        }
        console.log(url);
        const response = await instance.get(url);
        return [response.data.docs.map(_transformMovies), response.data.total];
    } catch (error) {
        throw error;
    }
}

export async function getMoviePosters(id) {
    try {
        const response = await instance.get(
            `image?page=1&limit=10&movieId=${id}`
        );

        return response.data.docs.map(_transformMoviePosters);
    } catch (error) {
        throw error;
    }
}

const _transformMoviePosters = posters => {
    return {
        link: posters.previewUrl,
    };
};

export async function getMovie(id) {
    try {
        const response = await instance.get(`movie/${id}`);
        return _transformMovie(response.data);
    } catch (error) {
        throw error;
    }
}

export async function getMovieReviews(id, size = 3) {
    try {
        const response = await instance.get(
            `review?limit=${size}&selectFields=&movieId=${id}`
        );
        return response.data.docs.map(_transformMovieReviews);
    } catch (error) {
        throw error;
    }
}

export async function getMovieSeriesInformation(id) {
    try {
        const response = await instance.get(
            `season?page=1&limit=10&selectFields=&movieId=${id}`
        );
        return response.data.docs.map(_transformMovieSeriesInformation);
    } catch (error) {
        throw error;
    }
}

const _transformMovieSeriesInformation = serias => {
    return {
        movieId: serias.movieId,
        name: serias.name,
        episodesCount: serias.episodesCount,
        episodes: serias.episodes,
        enName: serias.enName,
    };
};

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
        name: movies.name || movies.alternativeName || "Нет никакой информации",
        poster: movies.poster.previewUrl,
        year: movies.year,
        description: movies.description,
        genres: movies.genres,
        type: movies.type,
        ageRating: movies.ageRating,
        countries: movies.countries,
    };
};

const _transformMovie = movie => {
    return {
        ...movie,
        name: movie.name || movie.alternativeName,
        poster: movie.poster.url,
        description: movie.description || "Нет никакой информации",
        rating: movie.rating.imdb,
        actors: movie.persons,
    };
};

const _transformMovieReviews = rewies => {
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
