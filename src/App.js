import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import MovieList from "./components/movieList/MovieList";
import Movie from "./pages/movieDetail/Movie";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="movie/:id" element={<Movie />}></Route>
          <Route
            path="movies/:type"
            element={
              <h1>
                <MovieList />
              </h1>
            }
          ></Route>
          <Route
            path="search/movie/:query"
            element={
              <h1>
                <MovieList />
              </h1>
            }
          ></Route>
          <Route path="/*" element={<h1>Error Page</h1>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
