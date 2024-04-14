import { Input, AutoComplete } from "antd";

import { useMoviesListStore } from "../../store/moviesListStore";
import { observer } from "mobx-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MovieSearchForm = observer(() => {
    const {
        searchText,
        setSearchText,
        previousSearches,
        setCurrentPage,
        getMoviesByName,
        resetFiltersPanel,
    } = useMoviesListStore();

    const location = useLocation();
    const navigate = useNavigate();

    const [search, setSearch] = useState(searchText);

    useEffect(() => {
        setSearch(searchText);
    }, [searchText]);

    return (
        <AutoComplete
            options={previousSearches.map(s => ({ value: s }))}
            value={search}
            onChange={value => {
                setSearch(value);
            }}
            onSearch={getMoviesByName}
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
