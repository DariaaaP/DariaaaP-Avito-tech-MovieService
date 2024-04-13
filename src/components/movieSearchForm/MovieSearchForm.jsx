import { Input } from "antd";

import { useMoviesListStore } from "../../store/moviesListStore";
import { observer } from "mobx-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

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

    useEffect(() => {
        setSearch(searchText);
    }, [searchText]);

    return (
        <Input.Search
            value={search}
            allowClear
            onChange={e => {
                setSearch(e.target.value);
            }}
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
    );
});

export default MovieSearchForm;
