import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { Card, Carousel, Flex } from "antd";
import { StarTwoTone } from "@ant-design/icons";

import img from "../../resources/img/plug.png";

import { observer } from "mobx-react";
import "./movieoneitem.scss";

import { useMovieStore } from "../../store/movieStore";

import MovieReviewsUI from "../movieReviewsUI/MovieReviewsUI";

const { Meta } = Card;
const MovieOneItem = observer(() => {
    const {
        movie,
        reviews,
        posters,
        seriesInformation,
        init,
        isLoading,
        hasError,
        setReviewsSize,
        getReviews,
        reviewsSize,
    } = useMovieStore();

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
        similarMovies,
    } = movie;

    const [sliceActors, setSliceActors] = useState([0, 10]);
    const [actorsArr, setActorsArr] = useState([]);
    useEffect(() => {
        setActorsArr(act => [
            ...actorsArr,
            ...actors?.slice(sliceActors[0], sliceActors[1]),
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [actors, sliceActors]);

    return (
        <div className="movie-page">
            <div className="movie-page__link-back">
                <Link to="/" className="movie-page__back">
                    Back to all
                </Link>
            </div>
            <div className="movie__container">
                <img
                    className="movie__img"
                    src={poster === null ? img : poster}
                    alt={name}
                />
                <div className="movie__info">
                    <h2 className="movie__name">{name}</h2>
                    <div className="movie__two-column movie__two-column_column-dir">
                        <p className="movie__descr movie__descr_year">{year}</p>
                        <p className="movie__descr movie__descr_type">{type}</p>
                    </div>
                    <p className="movie__descr">{description}</p>
                    <div className="movie__two-column">
                        <p className="movie__descr movie__descr_genres">
                            <span className="movie__sub-title movie__sub-title">
                                Жанр:
                            </span>
                            {genres?.map(genre => {
                                return ` ${genre.name}`;
                            })}
                        </p>
                        <div className="movie__rating">
                            <StarTwoTone
                                twoToneColor="#ffb900"
                                style={{ marginRight: "5px" }}
                            />
                            {rating}
                        </div>
                    </div>
                </div>
            </div>

            <div className="movie__additional-info">
                <div className="movie__similar-movies">
                    <span className="movie__sub-title">Похожие фильмы:</span>
                    <Carousel autoplay dotPosition={"top"}>
                        {similarMovies?.map(item => {
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
                <div className="movie__posters">
                    <span className="movie__sub-title">Постеры:</span>
                    <Carousel autoplay dotPosition={"top"}>
                        {posters?.map((item, i) => {
                            return (
                                <img
                                    style={{
                                        objectFit: "cover",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    alt={`Movie poster №${i}`}
                                    src={item.link}
                                />
                            );
                        })}
                    </Carousel>
                </div>
                <div className="movie__actors">
                    <span className="movie__sub-title">Актёры:</span>
                    {actorsArr.map(actor => {
                        return <Flex>{actor.name}</Flex>;
                    })}
                    {actors?.length === actorsArr?.length ? (
                        <button
                            className="btn btn_remove"
                            onClick={() => {
                                setSliceActors([0, 10]);
                                setActorsArr([]);
                            }}
                        ></button>
                    ) : (
                        <button
                            className="btn"
                            onClick={() =>
                                setSliceActors(sliceActors => [
                                    sliceActors[0] + 10,
                                    sliceActors[1] + 10,
                                ])
                            }
                        >
                            ...
                        </button>
                    )}
                </div>
            </div>
            <div className="movie__additional-info">
                <div className="movie__reviews">
                    <div className="movie__reviews-content">
                        {reviews?.map(review => {
                            return <MovieReviewsUI props={review} />;
                        })}
                    </div>
                    <button
                        className="btn-actors btn-actors_reviews"
                        onClick={() => {
                            console.log("click");
                        }}
                    >
                        ...
                    </button>
                </div>
            </div>
        </div>
    );
});

export default MovieOneItem;
