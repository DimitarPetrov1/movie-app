import React from "react";
import "./App.css";
import CarouselEntry from "./CarouselEntry";

function TopCarousel(props) {
  return (
    <div className="carrousel">
      <input type="radio" name="slides" id="radio-1" defaultChecked />
      <input type="radio" name="slides" id="radio-2" />
      <input type="radio" name="slides" id="radio-3" />
      <input type="radio" name="slides" id="radio-4" />
      <ul className="slides">
        {/* {data.splice(0, 4).map((entry) => {
          return (
            <CarouselEntry
              key={entry.movieTitle}
              movieImgSecondary={entry.movieImgSecondary}
              movieTitle={entry.movieTitle}
              movieDescription={entry.movieDesc}
              movieYear={entry.movieYear}
              movieRating={entry.movieRating}
              movieGenre={entry.movieGenre}
              movieDuration={entry.movieDuration}
            />
          );
        })} */}
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
