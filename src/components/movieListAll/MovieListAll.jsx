import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Pagination, Flex } from "antd";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { movieState } from "../../store/mainStore";

import { getAllMoviesAxios } from "../../api/api";

import Spinner from "../spinner/Spinner";
import MovieCardView from "../movieCardView/MovieCardView";

const MovieListAll = () => {
    const movies = useRecoilValue(movieState);
    const setMovie = useSetRecoilState(movieState);

    const [pageCurrent, setPageCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [loading, setLoading] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);

    useEffect(() => {
        onRequest(pageCurrent, pageSize, true);
        setLoading(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onRequest = (pageCurrent, pageSize, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        setLoading(true);
        getAllMoviesAxios(pageCurrent, pageSize)
            .then(onMovieListLoad)
            .catch(e => console.log(e));
    };

    const onMovieListLoad = async newMovieList => {
        setMovie([newMovieList[0], newMovieList[1]]);
        setNewItemLoading(false);
        setLoading(false);
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

    const items = movies.length > 0 ? renderItems(movies[0]) : null;

    const spinner = loading && !newItemLoading ? <Spinner /> : null;
    const content = !loading ? items : null;

    return (
        <>
            {spinner}
            {content}
            <Flex justify={"center"} style={{ marginTop: "3%" }}>
                <Pagination
                    total={movies[1]}
                    pageSize={pageSize}
                    current={pageCurrent}
                    onShowSizeChange={(pageCurrent, pageSize) => {
                        setPageSize(pageSize);
                        onRequest(pageCurrent, pageSize, true);
                    }}
                    onChange={(pageCurrent, pageSize) => {
                        setPageCurrent(pageCurrent);
                        onRequest(pageCurrent, pageSize, true);
                    }}
                />
            </Flex>
        </>
    );
};

export default MovieListAll;
