import { useLocation, useNavigate } from "react-router-dom";

import img from "./crying.gif";
import "./errormovieslistmessage.scss";

import { useMoviesListStore } from "../../store/moviesListStore";
import { observer } from "mobx-react";

const ErrorMoviesListMessage = observer(() => {
    const {
        getMovies,
        setCurrentPage,

        setSearchCountries,
        setSearchAge,

        setSearchYear,
    } = useMoviesListStore();

    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    return (
        <div className="error-message">
            <h1 className="error-message__title">
                Фильмы по данному запросу{" "}
                <span className="error-message__title error-message__title-warning">
                    не найдены
                </span>
                {" :("}
            </h1>
            <img
                style={{
                    display: "block",
                    objectFit: "contain",
                    margin: "0 auto",
                }}
                src={img}
                alt="Not found movies"
            />
            <button
                className="error-message__back"
                onClick={() => {
                    setSearchCountries("");
                    setSearchYear(null);
                    setSearchAge(null);
                    searchParams.delete("year");
                    searchParams.delete("ageRating");
                    searchParams.delete("countries.name");
                    navigate(location.pathname + "?" + searchParams.toString());
                    searchParams.delete("page");
                    setCurrentPage(1);
                    getMovies();
                }}
            >
                Back to all
            </button>
        </div>
    );
});

export default ErrorMoviesListMessage;
