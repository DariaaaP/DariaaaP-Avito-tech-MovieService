import MoviesList from "../moviesList/MoviesList";
import AppHeader from "../appHeader/AppHeader";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import { Content } from "antd/es/layout/layout";
// import { MoviesListStoreProvider } from "../../store/moviesListStore";
// import { MovieStoreProvider } from "../../store/movieStore";

const MainPage = () => {
    return (
        <>
            <AppHeader />
            <Content style={{ padding: "5% 3%" }}>
                <ErrorBoundary>
                    <MoviesList />
                </ErrorBoundary>
            </Content>
        </>
    );
};

export default MainPage;
