import MovieList from "../movieList/MovieList";
import MovieItem from "../movieItem/MovieItem";
import Page404 from "../pages/Page404";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<MovieList />} />
                    <Route path="/:id" element={<MovieItem />} />
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
