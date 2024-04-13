import MainPage from "../pages/MainPage";
import MovieItem from "../movieItem/MovieItem";
import Page404 from "../pages/Page404";
import LoginPage from "../pages/LoginPage";
import MovieRandom from "../movieRandom/MovieRandom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/random" element={<MovieRandom />} />
                <Route path="/:id" element={<MovieItem />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </Router>
    );
}

export default App;
