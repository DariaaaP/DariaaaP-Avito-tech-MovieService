import { Button, DatePicker, Form, Select, Flex } from "antd";
import { useState } from "react";

import { useMoviesListStore } from "../../store/moviesListStore";
import { observer } from "mobx-react";
import { useLocation, useNavigate } from "react-router-dom";

import "./moviesfilters.scss";

const MoviesFilters = observer(() => {
    const {
        moviesAgeRating,
        getMovies,
        setCurrentPage,
        countriesAll,
        setSearchCountries,
        setSearchAge,
        searchYear,
        setSearchYear,
    } = useMoviesListStore();

    const location = useLocation();
    const navigate = useNavigate();
    const [toggled, setToggled] = useState(false);

    const searchParams = new URLSearchParams(location.search);

    document.addEventListener("click", e => {
        e.stopPropagation();
        setToggled(false);
    });

    const classNameToggle = toggled
        ? "filters-container filters--active"
        : "filters-container";

    const [form] = Form.useForm();

    const onFinish = values => {
        setSearchAge(values.ageForm);
        setSearchCountries(values.countryForm);

        if (values.countryForm) {
            searchParams.set("countries.name", values.countryForm);
        } else {
            searchParams.delete("countries.name");
            setSearchCountries("");
        }
        if (values.ageForm) {
            searchParams.set("ageRating", values.ageForm);
        } else {
            searchParams.delete("ageRating");
            setSearchAge(null);
        }

        if (searchYear) {
            searchParams.set("year", values.yearForm.$y);
        } else {
            searchParams.delete("year");
            setSearchYear(null);
        }
        searchParams.delete("page");

        navigate(location.pathname + "?" + searchParams.toString());
        setCurrentPage(1);
        getMovies();
    };

    return (
        <>
            <button
                onClick={e => {
                    e.stopPropagation();
                    setToggled(toggle => !toggle);
                }}
                id="filter-button"
                className="btn btn--filters"
            >
                Filter
            </button>
            <div
                id="filter-container"
                className={classNameToggle}
                onClick={e => {
                    e.stopPropagation();
                }}
            >
                <Form
                    form={form}
                    labelCol={{
                        span: 14,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="vertical"
                    style={{
                        maxWidth: 600,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item label="Страна" name="countryForm">
                        <Select allowClear>
                            {countriesAll?.map(item => (
                                <Select.Option value={item?.name}>
                                    {item?.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Возрастной рейтинг" name="ageForm">
                        <Select allowClear>
                            {moviesAgeRating.map(item => (
                                <Select.Option value={item}>
                                    {item}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Год" name="yearForm">
                        <DatePicker
                            allowClear
                            mode="year"
                            picker="year"
                            onChange={(value, dateString) => {
                                setSearchYear(dateString);

                                searchParams.delete("year");
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            span: 22,
                        }}
                    >
                        <Flex className="wrapper-btn">
                            <Button
                                className="btn btn--green"
                                type="primary"
                                htmlType="submit"
                                onClick={() => setToggled(false)}
                            >
                                Применить
                            </Button>
                            <Button
                                onClick={() => {
                                    form.setFieldValue();
                                    setToggled(false);
                                    setSearchCountries("");
                                    setSearchYear(null);
                                    setSearchAge(null);

                                    searchParams.delete("year");
                                    searchParams.delete("ageRating");
                                    searchParams.delete("countries.name");
                                    navigate(
                                        location.pathname +
                                            "?" +
                                            searchParams.toString()
                                    );
                                    searchParams.delete("page");
                                    setCurrentPage(1);
                                    getMovies();
                                }}
                                className="btn btn--grey"
                                htmlType="button"
                            >
                                Сбросить
                            </Button>
                        </Flex>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
});

export default MoviesFilters;
