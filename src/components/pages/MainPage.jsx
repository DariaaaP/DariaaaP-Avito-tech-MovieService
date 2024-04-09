import MovieList from "../movieList/MovieList";
import AppHeader from "../appHeader/AppHeader";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import { Content } from "antd/es/layout/layout";

const MainPage = () => {
    return (
        <>
            <AppHeader />
            <Content style={{ padding: "5% 3%" }}>
                <ErrorBoundary>
                    <MovieList />
                </ErrorBoundary>
            </Content>
        </>
    );
};

export default MainPage;
