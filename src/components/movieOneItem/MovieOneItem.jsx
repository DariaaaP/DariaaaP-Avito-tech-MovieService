import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { Card, Carousel, Flex } from "antd";
import { StarTwoTone } from "@ant-design/icons";

import ReviewsView from "../reviewsView/ReviewsView";
import img from "../../resources/img/plug.png";

import "./movieoneitem.scss";

const { Meta } = Card;

const MovieOneItem = ({ movie, reviews, posters }) => {
    const {
        // id,
        name,
        poster,
        year,
        type,
        description,
        rating,
        genres,
        actors,
        similarmovies,
    } = movie;

    const [slice1, setSlice1] = useState([0, 10]);
    const [act, setAct] = useState([]);
    useEffect(() => {
        setAct(act => [...act, ...actors.slice(slice1[0], slice1[1])]);
    }, [actors, slice1]);

    const [slice2, setSlice2] = useState([0, 3]);
    const [reviewsPag, setReviewsPag] = useState([]);
    useEffect(() => {
        setReviewsPag(reviewsPag => [
            ...reviewsPag,
            ...reviews.slice(slice2[0], slice2[1]),
        ]);
    }, [reviews, slice2]);

    return (
        <div className="single-movie">
            <img
                className="single-movie__img"
                src={poster === null ? img : poster}
                alt={name}
            />
            <div className="single-movie__info">
                <h2 className="single-movie__name">{name}</h2>
                <p className="single-movie__descr">{description}</p>
                <p className="single-movie__descr">{year}</p>
                <p className="single-movie__descr">
                    <span className="single-movie__title">Жанр:</span>
                    {genres.map(genre => {
                        return ` ${genre.name}`;
                    })}
                </p>
                <p className="single-movie__descr">{type}</p>
                <div className="single-movie__rating">
                    <StarTwoTone
                        twoToneColor="#ffb900"
                        style={{ marginRight: "5px" }}
                    />
                    {rating}
                </div>
            </div>
            <Link to="/" className="single-movie__back">
                Back to all
            </Link>
            <div className="single-movie__title">
                <span className="single-movie__title-center">
                    Похожие фильмы:
                </span>
                <Carousel autoplay dotPosition={"top"}>
                    {similarmovies.map(item => {
                        return (
                            <Link to={`/${item.id}`}>
                                <Card
                                    key={item.id}
                                    style={{
                                        width: "100%",
                                    }}
                                    cover={
                                        <img
                                            alt={item.name}
                                            src={item.poster.previewUrl}
                                        />
                                    }
                                >
                                    <Meta
                                        title={item.name}
                                        description={item.year}
                                    />
                                </Card>
                            </Link>
                        );
                    })}
                </Carousel>
            </div>
            <div className="single-movie__title">
                <span className="single-movie__title-center">Постеры:</span>
                <Carousel dotPosition={"top"}>
                    {posters.map((poster, i) => {
                        return (
                            <Card
                                style={{
                                    width: "100%",
                                }}
                                cover={
                                    <img
                                        style={{
                                            objectFit: "cover",
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        alt={`Movie poster №${i}`}
                                        src={poster.link}
                                    />
                                }
                            ></Card>
                        );
                    })}
                </Carousel>
            </div>
            <div className="single-movie__title">
                <span className="single-movie__title-center">Актёры:</span>
                {act.map((actor, i) => {
                    return <Flex>{actor.name}</Flex>;
                })}
                {actors.length === act.length ? (
                    <button
                        onClick={() => {
                            setSlice1([0, 10]);
                            setAct([]);
                        }}
                    >
                        скрыть
                    </button>
                ) : (
                    <button
                        onClick={() =>
                            setSlice1(slice1 => [
                                slice1[0] + 10,
                                slice1[1] + 10,
                            ])
                        }
                    >
                        ...
                    </button>
                )}
            </div>
            <div className="single-movie__reviews">
                <div className="single-movie__reviews-content">
                    {reviewsPag.map(reviewPag => {
                        return <ReviewsView props={reviewPag} />;
                    })}
                </div>
                {reviews.length === reviewsPag.length ? (
                    <button
                        onClick={() => {
                            setSlice2([0, 3]);
                            setReviewsPag([]);
                        }}
                    >
                        скрыть
                    </button>
                ) : (
                    <button
                        onClick={() =>
                            setSlice2(slice2 => [slice2[0] + 3, slice2[1] + 3])
                        }
                    >
                        ...
                    </button>
                )}
            </div>
        </div>
    );
};

export default MovieOneItem;
