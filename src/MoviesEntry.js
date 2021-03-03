import React from "react";
import "./App.css";

function MoviesEntry({
  movieYear,
  movieRating,
  movieGenre,
  movieTitle,
  movieImg,
}) {
  return (
    <li>
      <img src={movieImg} alt={`Movie: ${movieTitle}`} />
      <div className="movie-extra">
        <p className="movie-year">{movieYear}</p>
        <p className="movie-rating">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="yellow"
            stroke="yellow"
            strokeWidth="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-star"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          &nbsp;{movieRating}
        </p>
        <p className="movie-genre">{movieGenre}</p>
      </div>
    </li>
  );
}

export default MoviesEntry;
