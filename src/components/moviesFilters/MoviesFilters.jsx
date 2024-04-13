import { Button, DatePicker, Form, Select, Flex } from "antd";
import { useCallback, useEffect, useState } from "react";

import { useMoviesListStore } from "../../store/moviesListStore";
import { observer } from "mobx-react";
import { useLocation, useNavigate } from "react-router-dom";

import "./moviesfilters.scss";

const MoviesFilters = observer(() => {
    const {
        moviesAgeRating,
        getMoviesByFilters,
        setCurrentPage,
        countriesAll,
        searchCountry,
        setSearchCountry,
        searchAge,
        setSearchAge,
        searchYear,
        setSearchYear,
    } = useMoviesListStore();

    const location = useLocation();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const searchParams = new URLSearchParams(location.search);

    const [country, setCountry] = useState(searchCountry);
    const [age, setAge] = useState(searchAge);
    const [year, setYear] = useState(searchYear);

    const onOutsideClick = useCallback(e => {
        e.stopPropagation();
        setOpen(false);
    }, []);

    useEffect(() => {
        document.addEventListener("click", onOutsideClick);

        return () => {
            document.removeEventListener("click", onOutsideClick);
        };
    }, [onOutsideClick]);

    const onFinish = () => {
        if (country) {
            searchParams.set("country", country);
            setSearchCountry(country);
        } else {
            searchParams.delete("country");
            setSearchCountry(null);
        }

        if (age) {
            searchParams.set("ageRating", age);
            setSearchAge(age);
        } else {
            searchParams.delete("ageRating");
            setSearchAge(null);
        }

        if (year) {
            searchParams.set("year", year?.$y);
            setSearchYear(year);
        } else {
            searchParams.delete("year");
            setSearchYear(null);
        }

        searchParams.delete("page");
        searchParams.delete("search");

        navigate(location.pathname + "?" + searchParams.toString());
        setCurrentPage(1);
        getMoviesByFilters();
    };

    useEffect(() => {
        if (open) {
            setCountry(searchCountry);
            setAge(searchAge);
            setYear(searchYear);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    return (
        <>
            <button
                onClick={e => {
                    e.stopPropagation();
                    setOpen(toggle => !toggle);
                }}
                id="filter-button"
                className="btn btn--filters"
            >
                Filter
            </button>
            <div
                id="filter-container"
                className={
                    open
                        ? "filters-container filters--active"
                        : "filters-container"
                }
                onClick={e => {
                    e.stopPropagation();
                }}
            >
                <Form
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
                    <Form.Item label="Страна">
                        <Select
                            value={country}
                            onChange={setCountry}
                            allowClear
                        >
                            {countriesAll?.map(item => (
                                <Select.Option
                                    value={item.name}
                                    key={item.name}
                                >
                                    {item?.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Возрастной рейтинг">
                        <Select value={age} onChange={setAge} allowClear>
                            {moviesAgeRating.map(item => (
                                <Select.Option value={item} key={item}>
                                    {item}+
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Год">
                        <DatePicker
                            allowClear
                            mode="year"
                            value={year}
                            picker="year"
                            onChange={setYear}
                        />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            span: 22,
                        }}
                    >
                        <Flex className="wrapper-btn">
                            <Button
                                onClick={() => {
                                    setCountry(null);
                                    setAge(null);
                                    setYear(null);
                                }}
                                className="btn btn--grey"
                                htmlType="button"
                            >
                                Сбросить
                            </Button>
                            <Button
                                className="btn btn--green"
                                type="primary"
                                htmlType="submit"
                                onClick={() => setOpen(false)}
                            >
                                Применить
                            </Button>
                        </Flex>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
});

export default MoviesFilters;
