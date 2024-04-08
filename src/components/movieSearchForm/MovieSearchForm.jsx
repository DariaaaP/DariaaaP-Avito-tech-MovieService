import { useState } from "react";
import { Layout, Input } from "antd";
import { movieByNameState } from "../../store/movieByNameStore";
import { useSetRecoilState } from "recoil";

import { getMovieByNameAxios } from "../../api/api";

const { Header } = Layout;
const layoutStyle = {
    overflow: "hidden",
    width: "100%",
    maxWidth: "100%",
};
const headerStyle = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 48,
    lineHeight: "64px",
    backgroundColor: "#4096ff",
};

const MovieSearchForm = () => {
    const setMovieByName = useSetRecoilState(movieByNameState);

    const [inputValue, setInputValue] = useState("");

    const { Search } = Input;
    const onSearch = value => {
        updateMovie(value);
        setInputValue("");
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
            <Layout style={layoutStyle}>
                <Header style={headerStyle}>
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
                </Header>
            </Layout>
        </>
    );
};

export default MovieSearchForm;
