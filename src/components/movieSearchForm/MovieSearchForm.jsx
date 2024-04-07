import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Input, Col, Row, Card } from "antd";

import useKinopoiskService from "../../services/KinopoiskService";

const { Header } = Layout;
const { Meta } = Card;
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
    const [movie, setMovie] = useState([]);
    const { clearError, getMovieByName } = useKinopoiskService();
    const { Search } = Input;
    const onSearch = value => {
        console.log("movieName: ", value);
        updateMovie(value);
    };

    const onMovieLoaded = movie => {
        setMovie(movie);
    };

    const updateMovie = name => {
        clearError();

        getMovieByName(name)
            .then(onMovieLoaded)
            .catch(err => console.log(err));
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
    const results = renderItems(movie);

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
            {results}
        </>
    );
};

export default MovieSearchForm;
