import { Card } from "antd";
import img from "../../resources/img/plug.png";
const { Meta } = Card;

const MovieCardView = ({ props }) => {
    const { name, poster, year } = props;

    return (
        <Card
            hoverable
            cover={<img alt={name} src={poster === null ? img : poster} />}
        >
            <Meta title={name} description={year} />
        </Card>
    );
};

export default MovieCardView;
