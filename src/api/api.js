import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.kinopoisk.dev/v1.4",
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
        const total = response.data.total;
        const pages = response.data.pages;
        console.log([response.data.docs.map(_transformMovies), total, pages]);
        return [response.data.docs.map(_transformMovies), total, pages];
    } catch (error) {
        console.error(error);
    }
}

export async function getMovieAxios(id) {
    try {
        const response = await instance.get(`movie/${id}`);
        return _transformMovie(response.data);
    } catch (error) {
        console.error(error);
    }
}

export async function getMovieByNameAxios(name) {
    try {
        const response = await instance.get(`movie/search?query=${name}`);
        return response.data.docs.map(_transformMovies);
    } catch (error) {
        console.error(error);
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
        rating: movie.rating,
    };
};
