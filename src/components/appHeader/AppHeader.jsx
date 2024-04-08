import MovieSearchForm from "../movieSearchForm/MovieSearchForm";
import MovieAllFilters from "../movieAllFilters/MovieAllFilters";
import { Layout } from "antd";

const { Header } = Layout;
const layoutStyle = {
    overflow: "hidden",
    width: "100%",
    maxWidth: "100%",
};
const headerStyle = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 48,
    lineHeight: "64px",
    backgroundColor: "#4096ff",
};
const AppHeader = () => {
    return (
        <>
            <Layout style={layoutStyle}>
                <Header style={headerStyle}>
                    <MovieAllFilters />
                    <MovieSearchForm />;
                </Header>
            </Layout>
        </>
    );
};

export default AppHeader;
