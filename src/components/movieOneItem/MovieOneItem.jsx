import { Link } from "react-router-dom";

import { Card, Carousel } from "antd";
import { StarTwoTone } from "@ant-design/icons";
import ReviewsView from "../reviewsView/ReviewsView";
import img from "../../resources/img/plug.png";

import "./movieoneitem.scss";
const { Meta } = Card;
const MovieOneItem = ({ movie, reiews, posters }) => {
    const {
        id,
        name,
        poster,
        year,
        type,
        description,
        rating,
        genres,
        // actors,
        similarmovies,
    } = movie;
    console.log(movie);
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
            {/* <div className="single-movie__reviews">
                {reiews.map(review => {
                    return <ReviewsView props={review} />;
                })}
            </div> */}
        </div>
    );
};

export default MovieOneItem;
