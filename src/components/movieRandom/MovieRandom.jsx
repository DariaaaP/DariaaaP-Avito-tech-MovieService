import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, DatePicker, Form, Select, InputNumber } from "antd";

import {
    RandomMovieStoreProvider,
    useRandomMovieStore,
} from "../../store/randomMovieStore";
import { observer } from "mobx-react";

import ErrorMoviesListMessage from "../errorMoviesListMessage/errorMoviesListMessage";

import "./movierandom.scss";
import Spinner from "../spinner/Spinner";

const MovieRandom = observer(() => {
    const {
        init,
        isLoading,
        countriesAll,
        setCountry,
        genresOptions,
        setGenres,
        contentTypesOptions,
        setContentTypes,
        setYear,
        setRating,
        networksOptions,
        onNetworksSearchTextChange,
        setNetworks,
        getRandomMovie,
        idRandomMovie,
        isLookingForRandomMovie,
        hasNoResult,
    } = useRandomMovieStore();

    const nagivate = useNavigate();

    useEffect(() => {
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (idRandomMovie) {
            nagivate(`/${idRandomMovie}`);
        }
    }, [idRandomMovie, nagivate]);

    if (isLoading) return <Spinner />;

    return (
        <div className="wrapper-random">
            <div className="wrapper-random__link">
                <Link to={"/"} className="wrapper-random__link">
                    Back
                </Link>
            </div>
            {hasNoResult && <ErrorMoviesListMessage />}
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
                    <Select onChange={value => setCountry(value)}>
                        {countriesAll?.map(({ name }) => (
                            <Select.Option value={name} key={name}>
                                {name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Жанр" name="Genre">
                    <Select
                        mode="multiple"
                        onChange={value => setGenres(value)}
                    >
                        {genresOptions?.map(({ name }) => (
                            <Select.Option value={name} key={name}>
                                {name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Тип контента" name="Type">
                    <Select
                        mode="multiple"
                        onChange={value => setContentTypes(value)}
                    >
                        {contentTypesOptions?.map(({ name, displayName }) => (
                            <Select.Option value={name} key={name}>
                                {displayName}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Год выпуска" name="Year">
                    <DatePicker
                        allowClear
                        mode="year"
                        picker="year"
                        onChange={value => setYear(value?.$y)}
                    />
                </Form.Item>
                <Form.Item label="Рейтинг КП" name="Raiting">
                    <InputNumber
                        min={1}
                        max={9}
                        onChange={value => {
                            setRating(value);
                        }}
                    />
                </Form.Item>
                <Form.Item label="Network">
                    <Select
                        mode="multiple"
                        onChange={value => setNetworks(value)}
                        onSearch={onNetworksSearchTextChange}
                        options={networksOptions.map(({ title }) => ({
                            value: title,
                        }))}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={getRandomMovie}
                        dashed="true"
                        loading={isLookingForRandomMovie}
                    >
                        Случайный фильм
                    </Button>
                </Form.Item>
            </Form>
            {/* {hasNoResult && <ErrorMoviesListMessage />} */}
        </div>
    );
});

const MovieRandomWrapped = () => (
    <RandomMovieStoreProvider>
        <MovieRandom />
    </RandomMovieStoreProvider>
);

export default MovieRandomWrapped;
