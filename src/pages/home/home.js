import React, { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/MovieList";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncMovies,
  getAllMovies,
} from "../../features/movies/moviesSlice";

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncMovies());
  }, [dispatch]);

  const moviesFromRedux = useSelector(getAllMovies);

  useEffect(() => {
    if (moviesFromRedux) {
      setNowPlaying(moviesFromRedux);
    }
  }, [moviesFromRedux]);

  const renderIndicator = (onClickHandler, isSelected, index, label) => {
    if (window.innerWidth <= 425) {
      return null;
    }

    return (
      <li
        className={isSelected ? "selected" : ""}
        onClick={onClickHandler}
        key={index}
        role="button"
        tabIndex={0}
        aria-label={`${label} ${index + 1}`}
      />
    );
  };

  return (
    <>
      <div className="poster">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
          renderIndicator={renderIndicator}
        >
          {nowPlaying &&
            nowPlaying.map((movie) => (
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={`/movie/${movie.id}`}
                key={movie.id}
              >
                <div className="posterImage">
                  <img
                    src={`https://image.tmdb.org/t/p/original${
                      movie && movie.backdrop_path
                    }`}
                    alt={movie ? movie.original_title : ""}
                  />
                </div>
                <div className="posterImage__overlay">
                  <div className="posterImage__title">
                    {movie ? movie.original_title : ""}
                  </div>
                  <div className="posterImage__runtime">
                    <span className="posterImage__release">
                      {movie ? movie.release_date : ""}
                    </span>
                    <span className="posterImage__rating">
                      {movie ? movie.vote_average : ""}
                      <i className="fas fa-star" />{" "}
                    </span>
                  </div>
                  <div className="posterImage__description">
                    {movie ? movie.overview : ""}
                  </div>
                </div>
              </Link>
            ))}
        </Carousel>
        <MovieList />
      </div>
    </>
  );
};

export default Home;
