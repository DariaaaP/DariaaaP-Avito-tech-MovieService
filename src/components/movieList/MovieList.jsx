import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Button, Pagination } from "antd";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { movieState } from "../../store/mainStore";
import { movieByNameState } from "../../store/movieByNameStore";
import { getAllMoviesAxios } from "../../api/api";

import Spinner from "../spinner/Spinner";
import MovieCardView from "../movieCardView/MovieCardView";

const MovieList = () => {
    const setMovie = useSetRecoilState(movieState);
    const movies = useRecoilValue(movieState);
    const setMovieByName = useSetRecoilState(movieByNameState);
    const moviesByName = useRecoilValue(movieByNameState);
    const [page, setPage] = useState(1);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [loading, setLoading] = useState(false);
    const [pageSize, setPageSize] = useState(10);
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
        setPage(newMovieList[2]);
        setMovie(newMovieList[0]);
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
            <Row gutter={[18, 24]} justify="start">
                {items}
            </Row>
        );
    }
    const items = renderItems(movies);
    const content =
        moviesByName.length === 0 ? (
            items
        ) : (
            <>
                {renderItems(moviesByName)}
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
            </>
        );
    const spinner = loading && !newItemLoading ? <Spinner /> : null;
    return (
        <>
            {spinner}
            {content}
            <Pagination
                total={page}
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
        </>
    );
};

export default MovieList;
