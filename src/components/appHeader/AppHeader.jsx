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
                    <MoviesFilters />
                    <MovieSearchForm />;
                </Header>
            </Layout>
        </>
    );
};

export default AppHeader;
