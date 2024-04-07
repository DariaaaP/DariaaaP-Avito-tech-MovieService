import { useHttp } from "../hooks/http.hook";

const useKinopoiskService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = "https://api.kinopoisk.dev/v1.4/movie";
    const _baseLimit = 10;

    const getAllMovies = async (limit = _baseLimit) => {
        const res = await request(`${_apiBase}?page=1&limit=${limit}`);
        console.log(res);
        return res.docs.map(_transformMovies);
    };

    const getMovie = async id => {
        const res = await request(`${_apiBase}/${id}`);
        return _transformMovie(res);
    };

    const getMovieByName = async name => {
        const res = await request(`${_apiBase}/search?query=${name}`);
        return res.docs.map(_transformMovies);
    };

    const _transformMovies = movies => {
        return {
            id: movies.id,
            name: movies.name,
            poster: movies.poster.url,
            year: movies.year,
            description: movies.description,
            genres: movies.genres,
            type: movies.type,
        };
    };

    const _transformMovie = movie => {
        console.log(movie);
        console.log(movie.name);
        return {
            name: movie.name,
            poster: movie.poster.url,
            year: movie.year,
            type: movie.type,
            description: movie.description,
            rating: movie.rating,
        };
    };

    return {
        loading,
        error,
        clearError,
        getAllMovies,
        getMovie,
        getMovieByName,
    };
};

export default useKinopoiskService;
