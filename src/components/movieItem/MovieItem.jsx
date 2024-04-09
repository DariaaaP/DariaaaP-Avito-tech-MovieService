import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieOneItem from "../movieOneItem/MovieOneItem";

import img from "../../resources/img/plug.png";

import Spinner from "../spinner/Spinner";
import { getMovieAxios, getReviews, getMoviesPosters } from "../../api/api";

import { Card, Button, Flex, Typography, Carousel } from "antd";
import { StarTwoTone } from "@ant-design/icons";
const { Meta } = Card;

const MovieItem = () => {
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [reiews, setReiews] = useState(null);
    const [posters, setPosters] = useState(null);

    useEffect(() => {
        updateData();
        setLoading(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const updateData = () => {
        getMovieAxios(id).then(onDataLoaded);
        getReviews(id).then(onReiewsLoaded);
        getMoviesPosters(id).then(onPostersLoaded);
    };
    const onDataLoaded = data => {
        setData(data);
        setLoading(false);
    };
    const onReiewsLoaded = reiews => {
        setReiews(reiews);
        setLoading(false);
    };
    const onPostersLoaded = posters => {
        setPosters(posters);
        setLoading(false);
    };

    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || !data || !reiews || !posters) ? (
        <MovieOneItem
            movie={data}
            key={data.id}
            reiews={reiews}
            posters={posters}
        />
    ) : // <View movie={data} rev={reiews} />
    null;

    return (
        <>
            {spinner}
            {content}
        </>
    );
};

// const View = ({ movie, rev }) => {
//     const {
//         id,
//         name,
//         poster,
//         year,
//         type,
//         description,
//         rating,
//         actors,
//         similarmovies,
//     } = movie;

//     const [slice1, setSlice1] = useState([0, 10]);
//     const [act, setAct] = useState([]);

//     const [slice2, setSlice2] = useState([0, 2]);
//     const [reviews2, setReviews2] = useState([]);

//     useEffect(() => {
//         setAct(act => [...act, ...actors.slice(slice1[0], slice1[1])]);
//     }, [actors, slice1]);

//     useEffect(() => {
//         setReviews2(reviews2 => [
//             ...reviews2,
//             ...rev.slice(slice2[0], slice2[1]),
//         ]);
//     }, [rev, slice2]);

//     const cardStyle = {
//         width: "90%",
//         margin: "0 auto",
//     };
//     const imgStyle = {
//         display: "block",
//         width: 273,
//         height: "auto",
//     };

//     return (
//         <>
//             <Card
//                 key={id}
//                 style={cardStyle}
//                 styles={{
//                     body: {
//                         padding: 0,
//                         overflow: "hidden",
//                     },
//                 }}
//             >
//                 <Flex justify="space-between">
//                     <Flex style={{ flexShrink: "0" }}>
//                         <img
//                             alt={name}
//                             src={poster === null ? img : poster}
//                             style={imgStyle}
//                         />
//                     </Flex>
//                     <Flex
//                         vertical
//                         align="flex-end"
//                         justify="space-between"
//                         style={{
//                             padding: 32,
//                         }}
//                     >
//                         <Typography.Title level={3}>{name}</Typography.Title>
//                         <Typography.Text>{description}</Typography.Text>
//                         <Typography.Text>{year}</Typography.Text>
//                         <Typography.Text>
//                             <StarTwoTone
//                                 twoToneColor="#eb2f96"
//                                 style={{ marginRight: "5px" }}
//                             />
//                             {rating}
//                         </Typography.Text>
//                     </Flex>
//                 </Flex>
//             </Card>

//             <Flex gap="5%" style={{ marginTop: "5%" }}>
//                 <Card title="Актёры" bordered={false} style={{ width: "30%" }}>
//                     {act.map((actor, i) => {
//                         return <Flex>{actor.name}</Flex>;
//                     })}
//                     {actors.length === act.length ? (
//                         <button
//                             onClick={() => {
//                                 setSlice1([0, 10]);
//                                 setAct([]);
//                             }}
//                         >
//                             скрыть
//                         </button>
//                     ) : (
//                         <button
//                             onClick={() =>
//                                 setSlice1(slice1 => [
//                                     slice1[0] + 10,
//                                     slice1[1] + 10,
//                                 ])
//                             }
//                         >
//                             ...
//                         </button>
//                     )}
//                 </Card>
//                 <div style={{ width: "30%" }}>
//                     <Carousel autoplay dotPosition={"top"}>
//                         {similarmovies.map(item => {
//                             return (
//                                 <Link to={`/${item.id}`}>
//                                     <Card
//                                         // hoverable
//                                         style={{
//                                             width: "100%",
//                                         }}
//                                         cover={
//                                             <img
//                                                 alt={item.name}
//                                                 src={item.poster.previewUrl}
//                                             />
//                                         }
//                                     >
//                                         <Meta
//                                             title={item.name}
//                                             description={item.year}
//                                         />
//                                     </Card>
//                                 </Link>
//                             );
//                         })}
//                     </Carousel>
//                 </div>
//             </Flex>
//             <Flex justify={"space-around"} wrap="wrap">
//                 {reviews2.map(item => {
//                     // console.log(item);
//                     return (
//                         <Card
//                             title={item.title}
//                             bordered={false}
//                             style={{
//                                 height: "300px",
//                                 overflow: "scroll",
//                                 width: "40%",
//                                 marginBottom: "50px",
//                             }}
//                         >
//                             {item.review}
//                         </Card>
//                     );
//                 })}
//             </Flex>
//             {rev.length === reviews2.length ? (
//                 <button
//                     onClick={() => {
//                         setSlice2([0, 2]);
//                         setReviews2([]);
//                     }}
//                 >
//                     скрыть
//                 </button>
//             ) : (
//                 <button
//                     onClick={() =>
//                         setSlice2(slice2 => [slice2[0] + 2, slice2[1] + 2])
//                     }
//                 >
//                     ...
//                 </button>
//             )}
//         </>
//     );
// };

export default MovieItem;
