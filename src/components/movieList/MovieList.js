import React, { useEffect } from "react";
import Card from "../card/Card";
import "./MovieList.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncMovies,
  getAllMovies,
} from "../../features/movies/moviesSlice";

const MovieList = () => {
  const dispatch = useDispatch();
  const { type, query } = useParams();

  useEffect(() => {
    fetchData();
  }, [type, query]);

  const movieList = useSelector(getAllMovies);

  const fetchData = () => {
    if (!query && !type) {
      dispatch(fetchAsyncMovies({ search: "now_playing" }));
    } else if (!query && type) {
      dispatch(fetchAsyncMovies({ search: type }));
    } else if (query) {
      dispatch(fetchAsyncMovies({ query }));
    }
  };

  return (
    <div className="movie__list">
      <h2 className="list__title">{(type ? type : "").toUpperCase()}</h2>
      <div className="list__cards">
        {movieList &&
          movieList.map((movie) => <Card movie={movie} key={movie.id} />)}
      </div>
    </div>
  );
};

export default MovieList;
