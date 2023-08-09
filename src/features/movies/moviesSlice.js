import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async ({ search = "now_playing", query = "" }) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${
        query ? "search/movie" : `movie/${search}`
      }${
        query ? `?query=${query}&` : "?"
      }api_key=4e44d9029b1270a757cddc766a1bcb63&include_adult=false&language=en-US`
    );
    const data = await response.json();
    return data.results;
  }
);

export const fetchAsyncMoviesDetails = createAsyncThunk(
  "movies/fetchAsyncMoviesDetails",
  async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    );
    const data = await response.json();
    return data;
  }
);

const initialState = {
  movies: [],
  selectedMovie: {},
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovie: (state) => {
      state.selectedMovie = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        console.log("Loading...!");
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        console.log("Data Fetched...!");
        state.movies = payload;
      })
      .addCase(fetchAsyncMovies.rejected, (state) => {
        console.log("Fetching Failed...!");
      })
      .addCase(fetchAsyncMoviesDetails.fulfilled, (state, { payload }) => {
        console.log("Fetching Successful...!");
        state.selectedMovie = payload;
      });
  },
});

export const { removeSelectedMovie } = moviesSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getMovieDetail = (state) => state.movies.selectedMovie;
export default moviesSlice.reducer;
