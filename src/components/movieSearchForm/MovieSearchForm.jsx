import { Input } from "antd";

import { useMoviesListStore } from "../../store/moviesListStore";
import { observer } from "mobx-react";
import { useLocation, useNavigate } from "react-router-dom";

const MovieSearchForm = observer(() => {
    const { searchText, setSearchText, setCurrentPage, getMovies } =
        useMoviesListStore();
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Input.Search
            value={searchText}
            allowClear
            onChange={e => {
                setSearchText(e.target.value);
            }}
            placeholder="Фильмы, сериалы"
            onSearch={(value, _1, { source }) => {
                if (source === "clear") {
                    setSearchText("");
                }

                const searchParams = new URLSearchParams(location.search);
                searchParams.delete("page");

                if (value) {
                    searchParams.set("search", value);
                } else {
                    searchParams.delete("search");
                }

                setCurrentPage(1);
                navigate(location.pathname + "?" + searchParams.toString());
                getMovies();
            }}
            style={{
                width: 300,
                margin: "0 0 0 auto",
            }}
        />
    );
});

export default MovieSearchForm;
