import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Input, Col, Row } from "antd";

import Spinner from "../spinner/Spinner";
import MovieCardView from "../movieCardView/MovieCardView";
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
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState([]);
    const { Search } = Input;
    const onSearch = value => {
        console.log("movieName: ", value);
        updateMovie(value);
    };

    const onMovieLoaded = movie => {
        setMovie(movie);
        setLoading(false);
    };

    const updateMovie = name => {
        setLoading(true);
        getMovieByNameAxios(name)
            .then(onMovieLoaded)
            .catch(err => console.log(err));
    };

    function renderItems(arr) {
        const items = arr.map(item => {
            return (
                <Col span={6} key={item.id}>
                    <Link to={`/${item.id}`}>
                        <MovieCardView props={item} />
                    </Link>
                </Col>
            );
        });
        return (
            <Row gutter={[18, 24]} justify="start">
                {items}
            </Row>
        );
    }

    const results = renderItems(movie);
    const spinner = loading ? <Spinner /> : null;

    return (
        <>
            <Layout style={layoutStyle}>
                <Header style={headerStyle}>
                    <Search
                        placeholder="Фильмы, сериалы"
                        onSearch={onSearch}
                        style={{
                            width: 300,
                            margin: "10px 0 0 auto",
                        }}
                    />
                </Header>
            </Layout>
            {spinner}
            {results}
        </>
    );
};

export default MovieSearchForm;
