import React, { useState, useEffect } from "react";
import AppHeader from "./AppHeader";
import TopCarousel from "./TopCarousel";
import Star from "./svg/star.svg";

import axios from "axios";

function App({ movieTitle, movieImg, movieYear, movieRating }) {
  const [curentTitles, setCurentTitles] = useState([]);
  const [defaultTitles, setDefaultTitles] = useState("movie/top_rated");
  const [searchStr, setSearchStr] = useState("");
  const API_KEY = "5d0bfc21ffb33bbfd548ebe383da65cc";
  const MAIN_URL = "https://api.themoviedb.org/3/";
  const IMG_URL = "https://image.tmdb.org/t/p/original/";
  const IMG_PLACEHOLDER =
    "https://www.c-capture.co.uk/wp/wp-content/uploads/portrait-placeholder.jpg";

  useEffect(() => {
    async function fetchCurentTitles() {
      // Start the request when loading > If nothing is searched fetch the default
      // If there is a search fetch the search only
      const request = await axios
        .get(
          searchStr === ""
            ? `${MAIN_URL}${defaultTitles}?api_key=${API_KEY}`
            : `${MAIN_URL}search/movie?api_key=${API_KEY}&query=${searchStr}`
        )
        .catch((err) => console.log(err));
      setCurentTitles(request.data.results);
      return request;
    }
    fetchCurentTitles();
    // need to add sth later (the orl from variable)
  }, [defaultTitles, searchStr]);

  const handleChange = (e) => {
    setDefaultTitles(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchStr(e.target.value);
  };
  return (
    <div className="app">
      <AppHeader />
      <div className="container-main">
        <p className="heading-title">Trending this week</p>
        <TopCarousel />
        <div className="sorting-wrap">
          <input type="search" placeholder="Search" onChange={handleSearch} />
          <select
            defaultValue="movie/top_rated"
            id="currentTitles"
            name="fdf"
            onChange={handleChange}
          >
            <option value="movie/top_rated">Top rated</option>
            <option value="trending/all/day">Trending (Today)</option>
            <option value="trending/all/week">Trending (This week)</option>
          </select>
        </div>
        {/* <label htmlFor="currentTitles" className="heading-title">
          Top rated
        </label> */}

        <ul className="movie-list">
          {curentTitles.map((entry) => {
            return (
              <li key={entry.id}>
                <img
                  loading="lazy"
                  src={
                    entry.poster_path
                      ? `${IMG_URL}${entry.poster_path}`
                      : // : `${IMG_URL}${entry.backdrop_path}`
                        IMG_PLACEHOLDER
                  }
                  alt={`Movie: ${entry.original_title}`}
                />
                <div className="movie-extra">
                  <p className="movie-year">
                    {entry.release_date
                      ? entry.release_date.substr(0, 4)
                      : entry.release_date}
                  </p>
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
