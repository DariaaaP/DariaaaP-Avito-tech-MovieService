import { useState } from "react";
import { Input } from "antd";
import { movieByNameState } from "../../store/movieByNameStore";
import { searchStore } from "../../store/searchStore";
import { useSetRecoilState } from "recoil";

import { getMovieByNameAxios } from "../../api/api";

const MovieSearchForm = () => {
    const setMovieByName = useSetRecoilState(movieByNameState);
    const searchMovie = useSetRecoilState(searchStore);
    const [inputValue, setInputValue] = useState("");

    const { Search } = Input;
    const onSearch = value => {
        updateMovie(1, 10, value);
        searchMovie(value);
        setInputValue("");
    };

    const onMovieLoaded = async movie => {
        setMovieByName([movie[0], movie[1]]);
    };

    const updateMovie = (pageCurrent, pageSize, name) => {
        getMovieByNameAxios(pageCurrent, pageSize, name)
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
