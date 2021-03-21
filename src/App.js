import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { API_KEY, MAIN_URL, IMG_PLACEHOLDER, IMG_URL_MEDIUM } from "./vars";
import AppHeader from "./AppHeader";
import TopCarousel from "./TopCarousel";
import Star from "./svg/star.svg";
import Modal from "./Modal";

function App(props) {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [searchStr, setSearchStr] = useState("");
  const [category, setCategory] = useState("");
  const [currentTitles, setCurrentTitles] = useState([]);
  const [modalDetails, setModalDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const top_rated = `${MAIN_URL}movie/top_rated?api_key=${API_KEY}`;
  let var_category = `${MAIN_URL}${category}?api_key=${API_KEY}`;
  const searching = `${MAIN_URL}search/movie?api_key=${API_KEY}&query=${searchStr}`;

  // const fetchVideoKey = async () => {
  //   const keyRequest = await axios
  //     .get(`${MAIN_URL}movie/123/videos?api_key=${API_KEY}`)
  //     .then((data) => {
  //       setModalDetails.video = data.data.results[0].key;
  //     })
  //     .catch((err) => console.log(err));
  //   return keyRequest;
  // };

  useEffect(() => {
    const fetchTitles = async () => {
      // if we search for something we use the searching const as string
      // if we don't search for anything there are 2 things that need to be done:
      // 1. we get the default top rated to display some items in the grid
      // 2. if we change the category then fetch that category and display it
      if (searchStr === "") {
        if (category === "") {
          const req = await axios.get(top_rated).then((data) => {
            setCurrentTitles(data.data.results);
          });
          return req;
        } else {
          const req = await axios.get(var_category).then((data) => {
            setCurrentTitles(data.data.results);
          });
          return req;
        }
      } else {
        const req = await axios.get(searching).then((data) => {
          setCurrentTitles(data.data.results);
        });
        return req;
      }
    };

    fetchTitles();
    // fetchVideoKey();
    setLoading(false);
  }, [currentTitles]);

  // useEffect(() => {
  //   console.log("changed page " + currentPage);
  // }, [currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchStr(e.target.value);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchStr("");
    setCategory(e.target.value);
  };

  const handleOpenCloseModal = (e) => {
    const cont = document.querySelector(".app");
    const modalWrap = document.querySelector(".modal-wrap");
    cont.classList.add("modal-clear");
    setOpenModal(true);
    modalDetails.id = Number(e.target.getAttribute("data-id"));
    modalDetails.header = e.target.alt;
    modalDetails.body = e.target.getAttribute("data-body");
    modalDetails.image = e.target.src;
    modalDetails.video = e.target.getAttribute("data-id");
    modalWrap.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-wrap")) {
        setOpenModal(false);
        cont.classList.remove("modal-clear");
      } else {
        return null;
      }
    });
  };

  const handlePaginate = (e) => {
    // setCurrentPage(toPage * 10);
    setCurrentPage(Number(e.target.textContent - 1) * 10);
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
          modalVideo={modalDetails.video}
        />
        <p className="heading-title">Trending this week</p>
        <TopCarousel />
        <div className="sorting-wrap">
          <input
            value={searchStr ? searchStr : ""}
            type="search"
            placeholder="Search movies"
            onChange={handleSearch}
          />
          <select
            defaultValue="movie/top_rated"
            id="currentTitles"
            onChange={handleChange}
            disabled={searchStr ? true : false}
          >
            <option value="movie/top_rated">Top rated</option>
            <option value="trending/all/day">Trending (Today)</option>
            <option value="trending/all/week">Trending (This week)</option>
          </select>
        </div>
        {/* <label htmlFor="currentTitles" className="heading-title">
          Top rated
        </label> */}
        {!isLoading ? (
          <ul className="movie-list">
            {currentTitles.slice(currentPage, currentPage + 10).map((entry) => {
              return (
                <li key={entry.id} onClick={handleOpenCloseModal}>
                  <img
                    data-body={entry.overview}
                    data-id={entry.id}
                    loading="lazy"
                    src={
                      entry.poster_path
                        ? `${IMG_URL_MEDIUM}${entry.poster_path}`
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
        ) : (
          ""
        )}
        <ul className="pagination">
          <li className="pagination-item" onClick={handlePaginate}>
            1
          </li>
          <li className="pagination-item" onClick={handlePaginate}>
            2
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
