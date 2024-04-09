import { Card } from "antd";
const { Meta } = Card;

const MovieCardView = ({ props }) => {
    const { name, poster, year } = props;
    return (
        <Card hoverable cover={<img alt={name} src={poster} />}>
            <Meta title={name} description={year} />
        </Card>
    );
};

export default MovieCardView;
