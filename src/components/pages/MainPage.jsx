import MovieList from "../movieList/MovieList";
import AppHeader from "../appHeader/AppHeader";
import { Content } from "antd/es/layout/layout";

const MainPage = () => {
    return (
        <>
            {/* <AppHeader />
            <MovieList /> */}
            <AppHeader />
            <Content style={{ padding: "5% 3%" }}>
                <MovieList />
            </Content>
        </>
    );
};

export default MainPage;
