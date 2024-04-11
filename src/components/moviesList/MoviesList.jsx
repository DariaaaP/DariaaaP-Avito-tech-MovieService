import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Pagination, Flex } from "antd";

import Spinner from "../spinner/Spinner";
import MovieCardUI from "../movieCardUI/movieCardUI";
import ErrorMessage from "../errorMessage/ErrorMessage";
import ErrorMoviesListMessage from "../errorMoviesListMessage/errorMoviesListMessage";

import { useMoviesListStore } from "../../store/moviesListStore";
import { observer } from "mobx-react";

import "./movieslist.scss";

const MoviesList = observer(() => {
    const {
        movies,
        setMovies,
        total,
        areShownMoviesFiltered,
        currentPage,
        setCurrentPage,
        initCountries,
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
        const searchText = searchParams.get("search");
        const page = Number(searchParams.get("page")) || undefined;
        const pageSize = Number(searchParams.get("pageSize")) || undefined;

        init(page, pageSize, searchText);
        initCountries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) return <Spinner />;

    if (hasError) return <ErrorMessage />;

    if (movies.length === 0) return <ErrorMoviesListMessage />;
    console.log("movies: ", movies);

    return (
        <>
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
            {areShownMoviesFiltered && (
                <Link to="/">
                    <Button
                        block
                        onClick={() => {
                            setMovies([]);
                        }}
                    >
                        Back to all movies
                    </Button>
                </Link>
            )}
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
