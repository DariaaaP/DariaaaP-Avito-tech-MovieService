import { Link } from "react-router-dom";
import MovieSearchForm from "../movieSearchForm/MovieSearchForm";
import MoviesFilters from "../moviesFilters/MoviesFilters";
import { Layout } from "antd";

import "./appheader.scss";
const { Header } = Layout;

const AppHeader = () => {
    return (
        <>
            <Layout>
                <Header className="header">
                    <div className="header__filters">
                        <MoviesFilters />
                    </div>
                    <div className="header__random">
                        {localStorage.getItem("login") ? (
                            <Link to={"/random"}>Random Movie</Link>
                        ) : null}
                    </div>
                    <div className="header__search">
                        <MovieSearchForm />
                    </div>
                    {/* <MovieSearchForm /> */}
                    {localStorage.getItem("login") ? (
                        <Link
                            to={"/login"}
                            onClick={() => localStorage.removeItem("login")}
                        >
                            log out
                        </Link>
                    ) : (
                        <Link to={"/login"}>log in</Link>
                    )}
                </Header>
            </Layout>
        </>
    );
};

export default AppHeader;
