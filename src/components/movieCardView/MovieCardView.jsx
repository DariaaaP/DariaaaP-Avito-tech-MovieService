import { Card } from "antd";
const { Meta } = Card;

const MovieCardView = ({ props }) => {
    const { name, poster, year, type, genres } = props;
    return (
        <Card hoverable cover={<img alt={name} src={poster} />}>
            <Meta
                title={`${name}, ${year}, ${type}`}
                description={genres.map((genre, i) => {
                    if (genres.length > i + 1) {
                        return `${genre.name}, `;
                    } else {
                        return `${genre.name} `;
                    }
                })}
            />
        </Card>
    );
};

export default MovieCardView;
