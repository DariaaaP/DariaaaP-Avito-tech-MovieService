import MovieSearchForm from "../movieSearchForm/MovieSearchForm";
import MovieAllFilters from "../movieAllFilters/MovieAllFilters";
import { Layout } from "antd";

import "./appheader.scss";
const { Header } = Layout;

const AppHeader = () => {
    return (
        <>
            <Layout>
                <Header className="header">
                    <MovieAllFilters />
                    <MovieSearchForm />;
                </Header>
            </Layout>
        </>
    );
};

export default AppHeader;
