import React, { useState, useEffect } from "react";
import "./css/app.css";

import axios from "axios";

function TopCarousel(props) {
  const [entries, setEntries] = useState([]);
  const API_KEY = "5d0bfc21ffb33bbfd548ebe383da65cc";
  useEffect(() => {
    async function fetchData() {
      const reqeust = await axios.get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`
      );
      setEntries(reqeust.data.results);
      return reqeust;
    }
    fetchData();
    // need to add sth later (the orl from variable)
  }, []);

  const IMG_URL = "https://image.tmdb.org/t/p/original/";

  return (
    <div className="carrousel">
      <input type="radio" name="slides" id="radio-1" defaultChecked />
      <input type="radio" name="slides" id="radio-2" />
      <input type="radio" name="slides" id="radio-3" />
      <input type="radio" name="slides" id="radio-4" />
      <ul className="slides">
        {entries.map((entry) => {
          return (
            <li className="slide" key={entry.id}>
              <div className="slide-img-wrap">
                <img
                  src={`${IMG_URL}${entry.backdrop_path}`}
                  alt={`Movie: ${entry.original_title}`}
                />
              </div>
              <div className="slide-details">
                <h2 className="car-movie-title">{entry.original_title}</h2>
                {/* Make a function for max charakters e.g 30 then ... */}
                <div className="car-movie-description">{entry.overview}</div>
                <div className="car-detail car-movie-year">
                  <div>Release date:</div>
                  {entry.release_date}
                </div>
                <div className="car-detail car-movie-rating">
                  <div>Rating:</div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="#54426b"
                    stroke="#54426b"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-star"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  &nbsp;{entry.vote_average}/10
                </div>
                {/* <div className="car-detail car-movie-genre">
                <div>Genre:</div>
                {movieGenre}
              </div> */}
                {/* <div className="car-detail car-movie-duration">
                  <div>Duration:</div>
                  {movieDuration}min
                </div> */}
                <button className="btn btn-play btn-carousel">Play now</button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="slidesNavigation">
        <label htmlFor="radio-1" id="dotForRadio-1" />
        <label htmlFor="radio-2" id="dotForRadio-2" />
        <label htmlFor="radio-3" id="dotForRadio-3" />
        <label htmlFor="radio-4" id="dotForRadio-4" />
      </div>
    </div>
  );
}

export default TopCarousel;
