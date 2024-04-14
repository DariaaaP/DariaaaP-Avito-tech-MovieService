import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button, Card, Carousel, Flex, Collapse } from "antd";

import { StarTwoTone } from "@ant-design/icons";

import img from "../../resources/img/plug.png";

import { observer } from "mobx-react";
import "./movieoneitem.scss";

import { useMovieStore } from "../../store/movieStore";

import MovieReviewsUI from "../movieReviewsUI/MovieReviewsUI";
import { localizeContentTypeName } from "../../utils/localizeContentTypeName";

const { Meta } = Card;
const MovieOneItem = observer(() => {
    const {
        movie,
        reviews,
        reviewsLoading,
        reviewsPage,
        reviewsSize,
        posters,
        actorsPage,
        actorsSize,
        showMoreActors,
        resetActorsPagination,
        seriesInformation,
        seriesPage,
        seriesSize,
        episodesPage,
        episodesSize,
        resetEpisodesPagination,
        showMoreEpisodes,
        getNextSeriesInformation,
        getResetSeriesInformation,
        getNextReviews,
        getResetReviews,
    } = useMovieStore();

    const navigate = useNavigate();

    const {
        id,
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

    return (
        <div className="movie-page">
            <div className="movie-page__link-back">
                <Link to="/" className="movie-page__back">
                    Back to all movies
                </Link>
                <Link onClick={() => navigate(-1)} className="movie-page__back">
                    Back
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
                        <p className="movie__descr movie__descr_type">
                            {localizeContentTypeName(type)}
                        </p>
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
                    {similarMovies && similarMovies.length > 0 ? (
                        <Fragment key={similarMovies}>
                            <span className="movie__sub-title">
                                Похожие фильмы:
                            </span>
                            <Carousel key={id} autoplay dotPosition={"top"}>
                                {similarMovies?.map((item, i) => {
                                    return (
                                        <Fragment key={i}>
                                            <Link to={`/${item.id}`}>
                                                <Card
                                                    key={i}
                                                    style={{
                                                        width: "100%",
                                                    }}
                                                    cover={
                                                        <img
                                                            alt={item.name}
                                                            src={
                                                                item.poster
                                                                    .previewUrl
                                                            }
                                                        />
                                                    }
                                                >
                                                    <Meta
                                                        title={item.name}
                                                        description={item.year}
                                                    />
                                                </Card>
                                            </Link>
                                        </Fragment>
                                    );
                                })}
                            </Carousel>
                        </Fragment>
                    ) : (
                        <div className="movie__sub-title">
                            Нет информации о похожих фильмах
                        </div>
                    )}
                </div>
                <div className="movie__posters">
                    {posters && posters.length > 0 ? (
                        <>
                            <span className="movie__sub-title">Постеры:</span>
                            <Carousel
                                autoplay
                                dotPosition={"top"}
                                key={posters}
                            >
                                {posters?.map((item, i) => {
                                    return (
                                        <img
                                            key={i}
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
                        </>
                    ) : (
                        <div className="movie__sub-title">
                            Нет информации о постерах
                        </div>
                    )}
                </div>
                <div className="movie__actors">
                    {actors && actors.length > 0 ? (
                        <>
                            <span className="movie__sub-title">Актёры:</span>
                            {actors
                                ?.slice(0, actorsPage * actorsSize)
                                .map((actor, i) => {
                                    if (actor.name === null) {
                                        return (
                                            <Flex key={i}>
                                                {" "}
                                                • {actor.enName}
                                            </Flex>
                                        );
                                    } else {
                                        return (
                                            <Flex key={i}> • {actor.name}</Flex>
                                        );
                                    }
                                })}
                            {actors?.length <= 10 ? null : actors?.length <=
                              actorsPage * actorsSize ? (
                                <Button
                                    style={{
                                        border: "none",
                                    }}
                                    dashed="true"
                                    onClick={resetActorsPagination}
                                >
                                    show less
                                </Button>
                            ) : actors?.length <= 10 ? null : (
                                <Button
                                    style={{ border: "none" }}
                                    dashed="true"
                                    onClick={showMoreActors}
                                >
                                    ...
                                </Button>
                            )}
                        </>
                    ) : (
                        <div className="movie__sub-title">
                            Нет информации об актёрах
                        </div>
                    )}
                </div>
            </div>
            <div className="movie__additional-info">
                {seriesInformation && seriesInformation.length > 0 ? (
                    <div className="movie__series">
                        <span className="movie__sub-title">
                            Сезоны и серии:
                        </span>
                        <div className="movie__series">
                            <Collapse
                                style={{ width: "100%" }}
                                items={seriesInformation
                                    .slice(0, seriesPage * seriesSize)
                                    .map((series, i) => {
                                        return {
                                            key: `${i}`,
                                            label: `${series.name}`,
                                            children: (
                                                <>
                                                    {series.episodes
                                                        .slice(
                                                            0,
                                                            episodesPage *
                                                                episodesSize
                                                        )
                                                        .map((ep, i) => {
                                                            return (
                                                                <Flex key={i}>
                                                                    • Серия{" "}
                                                                    {ep.number}:
                                                                    "{ep.name}"
                                                                </Flex>
                                                            );
                                                        })}
                                                    {series.episodes.length >
                                                    episodesPage *
                                                        episodesSize ? (
                                                        <Button
                                                            dashed="true"
                                                            className="btn btn-series"
                                                            onClick={
                                                                showMoreEpisodes
                                                            }
                                                        >
                                                            show more
                                                        </Button>
                                                    ) : null}

                                                    {episodesPage > 1 ? (
                                                        <Button
                                                            dashed="true"
                                                            className="btn btn-series"
                                                            onClick={
                                                                resetEpisodesPagination
                                                            }
                                                        >
                                                            show less
                                                        </Button>
                                                    ) : null}
                                                </>
                                            ),
                                        };
                                    })}
                            />
                            <div className="movie__btns">
                                {seriesInformation.length ===
                                seriesPage * seriesSize ? (
                                    <Button
                                        dashed="true"
                                        className="btn btn-series"
                                        onClick={getNextSeriesInformation}
                                    >
                                        show more
                                    </Button>
                                ) : null}

                                {seriesInformation?.length > 3 ? (
                                    <Button
                                        dashed="true"
                                        className="btn btn-series"
                                        onClick={getResetSeriesInformation}
                                    >
                                        show less
                                    </Button>
                                ) : null}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="movie__sub-title">
                        Нет информации о сезонах/сериях
                    </div>
                )}
            </div>

            <div className="movie__additional-info">
                {reviews && reviews.length > 0 ? (
                    <Fragment key={reviews}>
                        <div className="movie__reviews">
                            <div className="movie__reviews-content">
                                {reviews
                                    .slice(0, reviewsPage * reviewsSize)
                                    .map((review, i) => {
                                        return (
                                            <MovieReviewsUI
                                                key={i}
                                                props={review}
                                            />
                                        );
                                    })}
                            </div>
                            <div className="movie__btns">
                                <Button
                                    dashed="true"
                                    className="btn btn-reviews"
                                    onClick={getNextReviews}
                                    loading={reviewsLoading}
                                >
                                    more reviews
                                </Button>
                                {reviews?.length > 3 ? (
                                    <Button
                                        dashed="true"
                                        className="btn btn-reviews"
                                        onClick={getResetReviews}
                                    >
                                        show less
                                    </Button>
                                ) : null}
                            </div>
                        </div>
                    </Fragment>
                ) : (
                    <div className="movie__sub-title">
                        Нет информации об отзывах
                    </div>
                )}
            </div>
        </div>
    );
});

export default MovieOneItem;
