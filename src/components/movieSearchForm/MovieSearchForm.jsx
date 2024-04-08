import { useState } from "react";
import { Input } from "antd";
import { movieByNameState } from "../../store/movieByNameStore";
import { useSetRecoilState } from "recoil";

import { getMovieByNameAxios } from "../../api/api";

const MovieSearchForm = () => {
    const setMovieByName = useSetRecoilState(movieByNameState);

    const [inputValue, setInputValue] = useState("");

    const { Search } = Input;
    const onSearch = value => {
        updateMovie(value);
        setInputValue("");
        // localStorage.setItem("search", value);
    };

    const onMovieLoaded = movie => {
        setMovieByName(movie);
    };

    const updateMovie = name => {
        getMovieByNameAxios(name)
            .then(onMovieLoaded)
            .catch(err => console.log(err));
    };

    return (
        <>
            <Search
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Фильмы, сериалы"
                onSearch={onSearch}
                style={{
                    width: 300,
                    margin: "10px 0 0 auto",
                }}
            />
        </>
    );
};

export default MovieSearchForm;
