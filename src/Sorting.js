import React from "react";
import "./App.css";

function Sorting() {
  return (
    <div className="sorting-wrap">
      <input type="search" placeholder="Search" />
      <select defaultValue="undefined" name="genre">
        <option value="undefined" selected>
          Genre
        </option>
        <option value="">Horror</option>
        <option value="">Comedy</option>
        <option value="">Action</option>
        <option value="">Fantasy</option>
      </select>

      <select defaultValue="undefined" name="year">
        <option value="undefined" selected>
          Year
        </option>
        <option value="">2020</option>
        <option value="">2019</option>
        <option value="">2018</option>
        <option value="">2017</option>
        <option value="">2016</option>
      </select>

      <select defaultValue="undefined" name="rating">
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
  );
}

export default Sorting;
