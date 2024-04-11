import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import MovieOneItem from "../movieOneItem/MovieOneItem";
import Spinner from "../spinner/Spinner";

import { getMovieAxios, getReviews, getMoviesPosters } from "../../api/api";

const MovieItem = () => {
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [posters, setPosters] = useState(null);

    useEffect(() => {
        updateData();
        setLoading(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const updateData = () => {
        getMovieAxios(id).then(onDataLoaded);
        getReviews(id).then(onReviewsLoaded);
        getMoviesPosters(id).then(onPostersLoaded);
    };
    const onDataLoaded = data => {
        setMovie(data);
        setLoading(false);
    };
    const onReviewsLoaded = reviews => {
        setReviews(reviews);
        setLoading(false);
    };
    const onPostersLoaded = posters => {
        setPosters(posters);
        setLoading(false);
    };

    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || !movie || !reviews || !posters) ? (
        <MovieOneItem
            movie={movie}
            key={movie.id}
            reviews={reviews}
            posters={posters}
        />
    ) : null;

    return (
        <>
            {spinner}
            {content}
        </>
    );
};

export default MovieItem;
