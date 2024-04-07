import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import AppHeader from "../appHeader/AppHeader";

import useKinopoiskService from "../../services/KinopoiskService";

import { Col, Row, Card, Button } from "antd";
const { Meta } = Card;

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const [limit, setLimit] = useState(10);
    const [newItemLoading, setNewItemLoading] = useState(false);

    const { loading, getAllMovies } = useKinopoiskService();

    useEffect(() => {
        onRequest(limit, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        <Card
                            hoverable
                            cover={<img alt={item.name} src={item.poster} />}
                        >
                            <Meta
                                title={`${item.name}, 
                        ${item.year}, ${item.type}`}
                                description={item.genres.map((genre, i) => {
                                    if (item.genres.length > i + 1) {
                                        return `${genre.name}, `;
                                    } else {
                                        return `${genre.name} `;
                                    }
                                })}
                            />
                        </Card>
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
            <AppHeader />
            {spinner}
            {items}
            <Button
                block
                disabled={newItemLoading}
                onClick={() => onRequest(limit)}
            >
                Показать больше...
            </Button>
        </>
    );
};

export default MovieList;
