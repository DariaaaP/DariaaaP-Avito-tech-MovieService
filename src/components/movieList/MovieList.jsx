import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Button, Radio } from "antd";

import Spinner from "../spinner/Spinner";
import MovieCardView from "../movieCardView/MovieCardView";

import useKinopoiskService from "../../services/KinopoiskService";

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const [limit, setLimit] = useState(10);
    const [newItemLoading, setNewItemLoading] = useState(false);

    const { loading, getAllMovies } = useKinopoiskService();

    useEffect(() => {
        onRequest(limit, true);
        // eslint-disable-next-line no-use-before-define, react-hooks/exhaustive-deps
    }, []);

    const onRequest = (limit, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllMovies(limit)
            .then(onMovieListLoad)
            .catch(e => console.log(e));
    };

    const onMovieListLoad = async newMovieList => {
        setMovieList(newMovieList);
        setNewItemLoading(false);
        setLimit(limit => limit + 10);
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
    const items = renderItems(movieList);
    const spinner = loading && !newItemLoading ? <Spinner /> : null;
    return (
        <>
            <Radio.Group
                defaultValue={limit}
                onChange={e => {
                    onRequest(+e.target.value);
                }}
            >
                <Radio.Button value="10">10</Radio.Button>
                <Radio.Button value="25">25</Radio.Button>
                <Radio.Button value="50">50</Radio.Button>
            </Radio.Group>
            {spinner}
            {items}
            <Button
                block
                disabled={newItemLoading}
                onClick={() => {
                    onRequest(limit, true);
                }}
            >
                Показать больше...
            </Button>
        </>
    );
};

export default MovieList;