import { Link } from "react-router-dom";

import img from "./error.gif";

const ErrorMessage = () => {
    return (
        <div
            className="wrapper_error"
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "5rem",
            }}
        >
            <img
                style={{
                    display: "block",
                    width: "250px",
                    height: "250px",
                    objectFit: "contain",
                    margin: "0 auto",
                }}
                src={img}
                alt="Error"
            />
            <Link to={"/"} className="movie-page__back">
                Back to all movies
            </Link>
        </div>
    );
};

export default ErrorMessage;
