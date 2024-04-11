import img from "../../resources/img/plug.png";
import "./movieCardUI.scss";

const MovieCardUI = ({ props }) => {
    const { name, poster, year } = props;

    return (
        <div className="movie-card" tabIndex={0}>
            <div className="movie-card__img">
                <img
                    alt={name}
                    src={poster === null ? img : poster}
                    className="home__img"
                />
            </div>
            <div className="movie-card__name">
                <div className="movie-card__title">{name}</div>
                <div className="movie-card__year">{year}</div>
            </div>
        </div>
    );
};

export default MovieCardUI;
