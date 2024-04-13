import MoviesList from "../moviesList/MoviesList";
import AppHeader from "../appHeader/AppHeader";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import { Content } from "antd/es/layout/layout";
import { MoviesListStoreProvider } from "../../store/moviesListStore";

const MainPage = () => {
    return (
        <MoviesListStoreProvider>
            <AppHeader />
            <Content style={{ padding: "5% 3%" }}>
                <ErrorBoundary>
                    <MoviesList />
                </ErrorBoundary>
            </Content>
        </MoviesListStoreProvider>
    );
};

export default MainPage;
