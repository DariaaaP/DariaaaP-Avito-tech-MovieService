import img from "./crying.gif";
import "./errormovieslistmessage.scss";

const ErrorMoviesListMessage = () => {
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
                    width: "100%",
                    display: "block",
                    objectFit: "contain",
                    margin: "0 auto",
                }}
                src={img}
                alt="Not found movies"
            />
        </div>
    );
};

export default ErrorMoviesListMessage;
