import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import "./MovieList.css";
import { useParams } from "react-router-dom";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const { type, query } = useParams();
  console.log(query, type);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [type]);

  const fetchData = async () => {
    if (!query && type) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${type}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
        );
        const data = await response.json();
        setMovieList(data.results);
      } catch (error) {
        console.log("Error fetching movie data:", error);
      }
    } else if (!type && !query) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
        );
        const data = await response.json();
        setMovieList(data.results);
      } catch (error) {
        console.log("Error fetching movie data:", error);
      }
    } else if (query) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&api_key=4e44d9029b1270a757cddc766a1bcb63`
        );

        const data = await response.json();
        setMovieList(data.results);
      } catch (error) {
        console.log("Error fetching movie data:", error);
      }
    }
  };

  return (
    <div className="movie__list">
      <h2 className="list__title">{(type ? type : "").toUpperCase()}</h2>
      <div className="list__cards">
        {movieList.map((movie) => (
          <Card movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
