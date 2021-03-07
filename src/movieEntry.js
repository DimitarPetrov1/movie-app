import React from "react";
import Star from "./svg/star.svg";

function movieEntry(movieTitle, movieImg, movieYear, movieRating) {
  return (
    <li>
      <img src={movieImg} alt={`Movie: ${movieTitle}`} />
      <div className="movie-extra">
        <p className="movie-year">{movieYear}</p>
        <p className="movie-rating">
          <img className="star" src={Star} alt="star" />
          &nbsp;{movieRating}
        </p>
        {/* <p className="movie-genre">{movieGenre}</p> */}
      </div>
    </li>
  );
}

export default movieEntry;
