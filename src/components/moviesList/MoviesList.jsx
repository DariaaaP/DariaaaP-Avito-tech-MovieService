import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Pagination, Flex } from "antd";

import Spinner from "../spinner/Spinner";
import MovieCardUI from "../movieCardUI/movieCardUI";
import ErrorMessage from "../errorMessage/ErrorMessage";
import ErrorMoviesListMessage from "../errorMoviesListMessage/errorMoviesListMessage";

import { useMoviesListStore } from "../../store/moviesListStore";
import { observer } from "mobx-react";

import "./movieslist.scss";
import * as dayjs from "dayjs";

const MoviesList = observer(() => {
    const {
        movies,
        setMovies,
        total,
        areShownMoviesFiltered,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        init,
        isLoading,
        hasError,
        getMovies,
    } = useMoviesListStore();

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchText = searchParams.get("search") || null;
        const page = Number(searchParams.get("page")) || null;
        const pageSize = Number(searchParams.get("pageSize")) || null;
        const country = searchParams.get("country") || null;
        const ageRating = searchParams.get("ageRating") || null;
        const year = searchParams.get("year")
            ? dayjs(searchParams.get("year"))
            : null;

        init(page, pageSize, searchText, country, ageRating, year);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) return <Spinner />;

    if (hasError) return <ErrorMessage />;

    if (movies.length === 0) return <ErrorMoviesListMessage />;

    return (
        <>
            {areShownMoviesFiltered && (
                <Link
                    to="/"
                    className="movie-page__back"
                    onClick={() => {
                        setMovies([]);
                    }}
                >
                    Back to all movies
                </Link>
            )}
            <div className="movies-container">
                {movies.map(item => (
                    <Link
                        to={`/${item.id}`}
                        className="link-to-movie"
                        key={item.id}
                    >
                        <MovieCardUI props={item} />
                    </Link>
                ))}
            </div>
            <Flex justify={"center"} style={{ marginTop: "3%" }}>
                <Pagination
                    total={total}
                    pageSize={pageSize}
                    current={currentPage}
                    onChange={(page, size) => {
                        if (page !== currentPage) {
                            const searchParams = new URLSearchParams(
                                location.search
                            );
                            searchParams.set("page", page);

                            navigate(
                                location.pathname +
                                    "?" +
                                    searchParams.toString()
                            );
                            setCurrentPage(page);
                        }

                        if (size !== pageSize) {
                            const searchParams = new URLSearchParams(
                                location.search
                            );
                            searchParams.set("limit", size);

                            navigate(
                                location.pathname +
                                    "?" +
                                    searchParams.toString()
                            );
                            setPageSize(size);
                        }

                        getMovies();
                    }}
                />
            </Flex>
        </>
    );
});

export default MoviesList;
