import React, { useState, useEffect } from "react";
import AppHeader from "./AppHeader";
import TopCarousel from "./TopCarousel";
import Star from "./svg/star.svg";

import axios from "axios";

function App({ movieTitle, movieImg, movieYear, movieRating }) {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [discoverMovies, setDiscoverMovies] = useState([]);
  const API_KEY = "5d0bfc21ffb33bbfd548ebe383da65cc";
  const MAIN_URL = "https://api.themoviedb.org/3/";
  const IMG_URL = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchTopRated() {
      const request = await axios.get(
        `${MAIN_URL}movie/top_rated?api_key=${API_KEY}`
      );
      setTopRatedMovies(request.data.results);
      return request;
    }
    async function fetchDiscover() {
      const request = await axios.get(
        `${MAIN_URL}discover/movie?api_key=${API_KEY}`
      );
      setDiscoverMovies(request.data.results);
      return request;
    }
    fetchTopRated();
    fetchDiscover();
    // need to add sth later (the orl from variable)
  }, []);

  console.log(discoverMovies);

  return (
    <div className="app">
      <AppHeader />
      <div className="container-main">
        <h2 className="heading-title">Trending now</h2>
        <TopCarousel />
        <div className="sorting-wrap">
          <input type="search" placeholder="Search" />
          <select defaultValue="" name="genre">
            <option value="undefined" selected>
              Genre
            </option>
            <option value="">Horror</option>
            <option value="">Comedy</option>
            <option value="">Action</option>
            <option value="">Fantasy</option>
          </select>

          <select defaultValue="" name="year">
            <option value="undefined" selected>
              Year
            </option>
            <option value="">2020</option>
            <option value="">2019</option>
            <option value="">2018</option>
            <option value="">2017</option>
            <option value="">2016</option>
          </select>

          <select defaultValue="" name="rating">
            <option value="undefined" selected>
              Rating
            </option>
            <option value="">9+</option>
            <option value="">8+</option>
            <option value="">7+</option>
            <option value="">6+</option>
            <option value="">5+</option>
            <option value="">4+</option>
            <option value="">3+</option>
            <option value="">2+</option>
            <option value="">1+</option>
          </select>
          <input className="btn btn-submit" type="submit" value="Submit" />
        </div>
        <h2 className="heading-title">Top rated</h2>

        <ul className="movie-list">
          {topRatedMovies.map((entry) => {
            return (
              <li key={entry.id}>
                <img
                  src={`${IMG_URL}${entry.poster_path}`}
                  alt={`Movie: ${entry.original_title}`}
                />
                <div className="movie-extra">
                  <p className="movie-year">{entry.release_date}</p>
                  <p className="movie-rating">
                    <img className="star" src={Star} alt="star" />
                    &nbsp;{entry.vote_average}
                  </p>
                  {/* <p className="movie-genre">{movieGenre}</p> */}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
