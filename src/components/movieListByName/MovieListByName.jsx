import { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Button, Pagination, Flex } from "antd";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { movieByNameState } from "../../store/movieByNameStore";
import { searchStore } from "../../store/searchStore";
import { getMovieByNameAxios } from "../../api/api";

import Spinner from "../spinner/Spinner";
import MovieCardView from "../movieCardView/MovieCardView";

const MovieListByName = () => {
    const moviesByName = useRecoilValue(movieByNameState);
    const setMovieByName = useSetRecoilState(movieByNameState);
    const searchMovie = useRecoilValue(searchStore);

    const [pageCurrent, setPageCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [loading, setLoading] = useState(false);

    const onMovieLoaded = async movie => {
        setMovieByName([movie[0], movie[1]]);
        setLoading(false);
    };

    const updateMovie = (pageCurrent, pageSize, name) => {
        setLoading(true);
        getMovieByNameAxios(pageCurrent, pageSize, name)
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
            <>
                <Row gutter={[18, 24]} justify="start">
                    {items}
                </Row>
            </>
        );
    }

    const items = moviesByName.length > 0 ? renderItems(moviesByName[0]) : null;

    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? items : null;
    console.log(moviesByName);

    return (
        <>
            {spinner}
            {content}
            <Link to="/">
                <Button
                    block
                    onClick={() => {
                        setMovieByName([]);
                    }}
                >
                    Back to all movies
                </Button>
            </Link>
            <Flex justify={"center"} style={{ marginTop: "3%" }}>
                <Pagination
                    total={moviesByName[1]}
                    pageSize={pageSize}
                    current={pageCurrent}
                    onShowSizeChange={(pageCurrent, pageSize) => {
                        setPageSize(pageSize);
                        updateMovie(pageCurrent, pageSize, searchMovie);
                    }}
                    onChange={(pageCurrent, pageSize) => {
                        setPageCurrent(pageCurrent);
                        updateMovie(pageCurrent, pageSize, searchMovie);
                    }}
                />
            </Flex>
        </>
    );
};

export default MovieListByName;
