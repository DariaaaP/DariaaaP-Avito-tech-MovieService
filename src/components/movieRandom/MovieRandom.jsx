import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, DatePicker, Form, Select, Flex } from "antd";

import { useMoviesListStore } from "../../store/moviesListStore";

import "./movierandom.scss";

const MovieRandom = () => {
    const { countriesAll, getCountries } = useMoviesListStore;

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="wrapper-random">
            <Link to={"/"} className="wrapper-random__link">
                Back
            </Link>
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
                <Form.Item label="Страна">
                    <Select>
                        {countriesAll?.map(item => (
                            <Select.Option value={item.name} key={item.name}>
                                {item?.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Жанр">
                    <Select>
                        <Select.Option>что-то</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Тип контента">
                    <Select>
                        <Select.Option>что-то</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Год выпуска">
                    <Select>
                        <Select.Option>что-то</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Рейтинг Кинопоиска">
                    <Select>
                        <Select.Option>что-то</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Сеть производства">
                    <Select>
                        <Select.Option>что-то</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button>Рандом!</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default MovieRandom;
