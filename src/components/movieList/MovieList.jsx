import { useRecoilValue } from "recoil";
import { movieByNameState } from "../../store/movieByNameStore";

import MovieListByName from "../movieListByName/MovieListByName";
import MovieListAll from "../movieListAll/MovieListAll";

const MovieList = () => {
    const moviesByName = useRecoilValue(movieByNameState);

    return (
        <>
            {moviesByName.length === 0 ? <MovieListAll /> : <MovieListByName />}
        </>
    );
};

export default MovieList;
