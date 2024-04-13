import { Input, AutoComplete } from "antd";

import { useMoviesListStore } from "../../store/moviesListStore";
import { observer } from "mobx-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import debounce from "lodash.debounce";

const MovieSearchForm = observer(() => {
    const {
        searchText,
        setSearchText,
        setCurrentPage,
        getMoviesByName,
        resetFiltersPanel,
    } = useMoviesListStore();

    const location = useLocation();
    const navigate = useNavigate();

    const [search, setSearch] = useState(searchText);

    let data = localStorage.getItem("searchValues")
        ? [...new Set(JSON.parse(localStorage.getItem("searchValues")))]
        : [];

    const searchArr = [
        ...new Set(JSON.parse(localStorage.getItem("searchValues"))),
    ].map(item => {
        return { value: `${item}` };
    });

    const debounceSearch = debounce(value => console.log(value), 1000);

    useEffect(() => {
        setSearch(searchText);
    }, [searchText]);

    return (
        <AutoComplete
            options={searchArr}
            value={search}
            onChange={value => {
                setSearch(value);
            }}
            onSearch={debounceSearch}
            filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
            }
        >
            <Input.Search
                allowClear
                placeholder="Фильмы, сериалы"
                onSearch={(value, _1, { source }) => {
                    if (source === "clear") {
                        setSearch(null);
                    }

                    const searchParams = new URLSearchParams(location.search);
                    searchParams.delete("page");

                    if (value) {
                        searchParams.set("search", value);
                        setSearchText(value);

                        if (data.length === 5) {
                            data.shift();
                        }
                        data.push(value);
                        localStorage.setItem(
                            "searchValues",
                            JSON.stringify(data)
                        );
                        console.log(
                            JSON.parse(localStorage.getItem("searchValues"))
                        );
                    } else {
                        searchParams.delete("search");
                        setSearch(null);
                        setSearchText(null);
                    }

                    resetFiltersPanel();

                    setCurrentPage(1);
                    navigate(location.pathname + "?" + searchParams.toString());
                    getMoviesByName();
                }}
                style={{
                    width: 300,
                    margin: "0 0 0 auto",
                }}
            />
        </AutoComplete>
    );
});

export default MovieSearchForm;
