import React, { useState, useEffect } from "react";
import AppHeader from "./AppHeader";
import TopCarousel from "./TopCarousel";
import MoviesEntry from "./MoviesEntry";

import axios from "axios";

function App(props) {
  const [entries, setEntries] = useState([]);
  const API_KEY = "5d0bfc21ffb33bbfd548ebe383da65cc";
  useEffect(() => {
    async function fetchData() {
      const reqeust = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
      );
      setEntries(reqeust.data.results);
      return reqeust;
    }
    fetchData();
    // need to add sth later (the orl from variable)
  }, []);

  const IMG_URL = "https://image.tmdb.org/t/p/original/";

  return (
    <div className="app">
      <AppHeader />
      <div className="container-main">
        <TopCarousel />
        <ul className="movie-list">
          {entries.map((entry) => {
            return (
              <MoviesEntry
                movieTitle={entry.original_title}
                movieImg={`${IMG_URL}${entry.poster_path}`}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
