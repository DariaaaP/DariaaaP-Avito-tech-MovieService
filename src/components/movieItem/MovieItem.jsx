import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Spinner from "../spinner/Spinner";
import { getMovieAxios } from "../../api/api";

import { Card, Button, Flex, Typography } from "antd";

const MovieItem = () => {
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        updateData();
        setLoading(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const updateData = () => {
        getMovieAxios(id).then(onDataLoaded);
    };
    const onDataLoaded = data => {
        setData(data);
        setLoading(false);
    };

    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || !data) ? <View movie={data} /> : null;

    return (
        <>
            {spinner}
            {content}
            <Link to="/">
                <Button block>Back to all</Button>
            </Link>
        </>
    );
};

const View = ({ movie }) => {
    const { name, poster, year, type, description } = movie;
    const cardStyle = {
        width: "90%",
        margin: "0 auto",
    };
    const imgStyle = {
        display: "block",
        width: 273,
    };
    return (
        <Card
            style={cardStyle}
            styles={{
                body: {
                    padding: 0,
                    overflow: "hidden",
                },
            }}
        >
            <Flex justify="space-between">
                <img alt={name} src={poster} style={imgStyle} />
                <Flex
                    vertical
                    align="flex-end"
                    justify="space-between"
                    style={{
                        padding: 32,
                    }}
                >
                    <Typography.Title level={3}>{name}</Typography.Title>
                    <Typography.Text>{description}</Typography.Text>
                    <Typography.Text>{year}</Typography.Text>
                    <Typography.Text>{type}</Typography.Text>
                </Flex>
            </Flex>
        </Card>
    );
};

export default MovieItem;
