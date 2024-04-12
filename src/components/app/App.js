import MainPage from "../pages/MainPage";
import MovieItem from "../movieItem/MovieItem";
import Page404 from "../pages/Page404";
import { RecoilRoot } from "recoil";
import { MoviesListStoreProvider } from "../../store/moviesListStore";
import { MovieStoreProvider } from "../../store/movieStore";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <RecoilRoot>
            <MoviesListStoreProvider>
                <MovieStoreProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/:id" element={<MovieItem />} />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Router>
                </MovieStoreProvider>
            </MoviesListStoreProvider>
        </RecoilRoot>
    );
}

export default App;
