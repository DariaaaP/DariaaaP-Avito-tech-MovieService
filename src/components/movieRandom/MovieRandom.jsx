import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, DatePicker, Form, Select, InputNumber } from "antd";

import { useMoviesListStore } from "../../store/moviesListStore";
import { observer } from "mobx-react";

import "./movierandom.scss";

const MovieRandom = observer(() => {
    const {
        countriesAll,
        genres,
        types,
        initRandom,
        setRandomGenre,
        setRandomCountry,
        setRandomType,
        setRandomYear,
        setRandomRating,
        setRandomID,
        getRandomMovie,
        idRandomMovie,
        isRandomLoading,
    } = useMoviesListStore();

    useEffect(() => {
        initRandom();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="wrapper-random">
            <div className="wrapper-random__link">
                <Link to={"/"} className="wrapper-random__link">
                    Back
                </Link>
            </div>
            {idRandomMovie ? (
                <div className="wrapper-results">
                    <Link
                        to={`/${idRandomMovie}`}
                        onClick={() => {
                            setRandomID(null);
                        }}
                    >
                        <Button>Случайный фильм</Button>
                    </Link>
                </div>
            ) : (
                <Form
                    className="wrapper-random__form"
                    labelCol={{
                        span: 14,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="vertical"
                >
                    <Form.Item label="Страна производства" name="Country">
                        <Select onChange={value => setRandomCountry(value)}>
                            {countriesAll?.map(item => (
                                <Select.Option
                                    value={item.name}
                                    key={item.name}
                                >
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Жанр" name="Genre">
                        <Select onChange={value => setRandomGenre(value)}>
                            {genres?.map(item => (
                                <Select.Option
                                    value={item.name}
                                    key={item.name}
                                >
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Тип контента" name="Type">
                        <Select onChange={value => setRandomType(value)}>
                            {types?.map(item => (
                                <Select.Option
                                    value={item.name}
                                    key={item.name}
                                >
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Год выпуска" name="Year">
                        <DatePicker
                            allowClear
                            mode="year"
                            picker="year"
                            onChange={value => setRandomYear(value?.$y)}
                        />
                    </Form.Item>
                    <Form.Item label="Рейтинг КП" name="Raiting">
                        <InputNumber
                            min={1}
                            max={9}
                            onChange={value => {
                                setRandomRating(value);
                                console.log(value);
                            }}
                        />
                    </Form.Item>
                    {/* <Form.Item label="Network">
                    <Select>
                        <Select.Option>что-то</Select.Option>
                    </Select>
                </Form.Item> */}
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={() => {
                                getRandomMovie();
                            }}
                            dashed="true"
                            loading={isRandomLoading}
                        >
                            Применить фильтры
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
});

export default MovieRandom;
