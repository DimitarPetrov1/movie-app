import React from "react";
import "./css/carousel.css";

function TopCarousel({
  openMore,
  carId,
  carTitle,
  carBody,
  carImg,
  carYear,
  carRating
}) {
  return (
    <li className="slide" key={carId}>
      <div className="slide-img-wrap">
        <img src={`${carImg}`} alt={`Movie: ${carTitle}`} />
      </div>
      <div className="slide-details" data-id={carId}>
        <h2 className="car-movie-title">{carTitle}</h2>
        {/* Make a function for max charakters e.g 30 then ... */}
        <div className="car-movie-description">{carBody}</div>
        <div className="car-detail car-movie-year">
          <div>Release date:</div>
          {carYear}
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
          &nbsp;{carRating}/10
        </div>
        <button onClick={openMore} className="btn btn-play btn-carousel">
          Play now
        </button>
      </div>
    </li>
  );
}

export default TopCarousel;
