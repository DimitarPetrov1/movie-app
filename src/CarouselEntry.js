import React from "react";
import "./App.css";

function CarouselEntry({
  movieTitle,
  movieImg,
  movieImgSecondary,
  movieDescription,
  movieYear,
  movieRating,
  movieGenre,
  movieDuration,
}) {
  return (
    <li className="slide">
      <div className="slide-img-wrap">
        <img src={movieImgSecondary} alt={`Movie: ${movieTitle}`} />
      </div>
      <div className="slide-details">
        <h2 className="car-movie-title">{movieTitle}</h2>
        {/* Make a function for max charakters e.g 30 then ... */}
        <div className="car-movie-description">{movieDescription}</div>
        <div className="car-detail car-movie-year">
          <div>Year:</div>
          {movieYear}
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
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-star"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          &nbsp;{movieRating}/10
        </div>
        <div className="car-detail car-movie-genre">
          <div>Genre:</div>
          {movieGenre}
        </div>
        <div className="car-detail car-movie-duration">
          <div>Duration:</div>
          {movieDuration}min
        </div>
        <button className="btn btn-play btn-carousel">Play now</button>
      </div>
    </li>
  );
}

export default CarouselEntry;
