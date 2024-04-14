import { useParams } from "react-router-dom";
import { useEffect } from "react";

import MovieOneItem from "../movieOneItem/MovieOneItem";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import { useMovieStore } from "../../store/movieStore";
import { observer } from "mobx-react";
import { MovieStoreProvider } from "../../store/movieStore";

const MovieItem = observer(() => {
    const { id } = useParams();

    const { init, isLoading, hasError } = useMovieStore();

    useEffect(() => {
        init(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (isLoading) return <Spinner />;

    if (hasError) return <ErrorMessage />;

    return <MovieOneItem />;
});

const MovieItemWrapped = () => {
    return (
        <MovieStoreProvider>
            <MovieItem />
        </MovieStoreProvider>
    );
};

export default MovieItemWrapped;
