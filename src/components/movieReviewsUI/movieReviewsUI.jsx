import "./moviereviewsui.scss";

const movieReviewsUI = ({ props }) => {
    const { title, type, review, date, author } = props;

    const standartDate = date.slice(0, 10);

    const classCard =
        type === "Негативный"
            ? "card__picture card__picture--1"
            : type === "Позитивный"
            ? "card__picture card__picture--2"
            : "card__picture card__picture--3";
    return (
        <div className="card">
            <div className="card__side">
                <div className={classCard}>
                    <h4 className="card__heading">{title}</h4>
                </div>
                <div className="card__details">{review}</div>
                <div className="card__author">
                    <div className="card__author-date">{author}</div>
                    <div className="card__author-nickname">{standartDate}</div>
                </div>
            </div>
        </div>
    );
};

export default movieReviewsUI;
