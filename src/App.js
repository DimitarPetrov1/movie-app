import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, MAIN_URL, IMG_URL, IMG_PLACEHOLDER } from "./vars";
import AppHeader from "./AppHeader";
import TopCarousel from "./TopCarousel";
import Star from "./svg/star.svg";
import Modal from "./Modal";

function App(props) {
  const [initialTitles, setInitialTitles] = useState("movie/top_rated");
  const [currentTitles, setCurrentTitles] = useState([]);
  const [movieId, getMovieId] = useState(123);
  const [videoKey, setVideoKey] = useState();
  const [searchStr, setSearchStr] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalDetails, setModalDetails] = useState({});

  useEffect(() => {
    async function fetchTitles() {
      // Start the request when loading > If nothing is searched fetch the default
      // If there is a search fetch the search only
      const request = await axios
        .get(
          searchStr === ""
            ? `${MAIN_URL}${initialTitles}?api_key=${API_KEY}`
            : `${MAIN_URL}search/movie?api_key=${API_KEY}&query=${searchStr}`
        )
        .catch((err) => console.log(err));
      setCurrentTitles(request.data.results);
      return request;
    }
    async function fetchVideoKey() {
      const keyRequest = await axios
        .get(`${MAIN_URL}movie/${movieId}/videos?api_key=${API_KEY}`)
        .catch((err) => console.log(err));
      setVideoKey(keyRequest.data.results[0].key);
      return keyRequest;
    }
    fetchTitles();
    fetchVideoKey();

    // need to add sth later (the orl from variable)
  }, [initialTitles, searchStr, movieId]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchStr(e.target.value);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInitialTitles(e.target.value);
  };

  const handleOpenCloseModal = (e) => {
    getMovieId(parseInt(e.target.getAttribute("data-id")));
    const cont = document.querySelector(".app");
    const modalWrap = document.querySelector(".modal-wrap");
    cont.classList.add("modal-clear");
    setOpenModal(true);
    modalDetails.header = e.target.alt;
    modalDetails.body = e.target.getAttribute("data-body");
    modalDetails.image = e.target.src;
    modalWrap.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-wrap")) {
        setOpenModal(false);
        cont.classList.remove("modal-clear");
      } else {
        return null;
      }
    });
  };
  return (
    <div className="app">
      <AppHeader />
      <div className="container-main">
        <Modal
          openModalConponent={openModal}
          modalHeader={modalDetails.header}
          modalBody={modalDetails.body}
          modalImage={modalDetails.image}
          modalVideo={videoKey}
        />
        <p className="heading-title">Trending this week</p>
        {/* <TopCarousel /> */}
        <div className="sorting-wrap">
          <input type="search" placeholder="Search" onChange={handleSearch} />
          <select
            defaultValue="movie/top_rated"
            id="currentTitles"
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
          {currentTitles.slice(0, 20).map((entry) => {
            return (
              <li key={entry.id} onClick={handleOpenCloseModal}>
                <img
                  data-body={entry.overview}
                  data-id={entry.id}
                  loading="lazy"
                  src={
                    entry.poster_path
                      ? `${IMG_URL}${entry.poster_path}`
                      : // : `${IMG_URL}${entry.backdrop_path}`
                        IMG_PLACEHOLDER
                  }
                  className="movie-list__img"
                  alt={`Movie: ${entry.original_title}`}
                />
                <div className="movie-extra">
                  <p className="movie-year">
                    {entry.release_date
                      ? entry.release_date.substr(0, 4)
                      : "n/a"}
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
