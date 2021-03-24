import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  API_KEY,
  MAIN_URL,
  IMG_PLACEHOLDER,
  IMG_URL_MEDIUM,
  IMG_URL_ORIGINAL
} from "./vars";
import AppHeader from "./AppHeader";
import TopCarousel from "./TopCarousel";
import Star from "./svg/star.svg";
import Modal from "./Modal";

function App(openMore, carId, carTitle, carBody, carImg, carYear, carRating) {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [searchStr, setSearchStr] = useState("");
  const [category, setCategory] = useState("");
  const [currentTitles, setCurrentTitles] = useState([]);
  const [trending, setTredning] = useState([]);
  const [video, setVideo] = useState();
  const [modalDetails, setModalDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageNr, setPageNr] = useState(1);

  const top_rated = `${MAIN_URL}movie/top_rated?api_key=${API_KEY}`;
  let var_category = `${MAIN_URL}${category}?api_key=${API_KEY}`;
  const searching = `${MAIN_URL}search/movie?api_key=${API_KEY}&query=${searchStr}`;

  useEffect(() => {
    async function fetchTrending() {
      const reqeust = await axios.get(
        `${MAIN_URL}/trending/all/week?api_key=${API_KEY}`
      );
      setTredning(reqeust.data.results);
      return reqeust;
    }
    fetchTrending();
  }, []);

  useEffect(() => {
    const fetchTitles = async () => {
      // if we search for something we use the searching const as string
      // if we don't search for anything there are 2 things that need to be done:
      // 1. we get the default top rated to display some items in the grid
      // 2. if we change the category then fetch that category and display it
      if (searchStr === "") {
        if (category === "") {
          const req = await axios
            .get(top_rated)
            .then((data) => {
              setCurrentTitles(data.data.results);
            })
            .catch((err) => console.log(err));
          return req;
        } else {
          const req = await axios
            .get(var_category)
            .then((data) => {
              setCurrentTitles(data.data.results);
            })
            .catch((err) => console.log(err));
          return req;
        }
      } else {
        const req = await axios
          .get(searching)
          .then((data) => {
            setCurrentTitles(data.data.results);
          })
          .catch((err) => console.log(err));
        return req;
      }
    };

    fetchTitles();
    // fetchVideoKey();
    setLoading(false);
  }, [currentTitles]);

  const fetchVideo = async (e) => {
    const id = e.target.getAttribute("data-id");

    const req = await axios
      .get(`${MAIN_URL}movie/${id}/videos?api_key=${API_KEY}`)
      .then((data) => {
        setVideo(data.data.results[0].key);
      })
      .catch((err) => console.log(err));
    return req;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchStr(e.target.value);
    setCurrentPage(0);
    setPageNr(1);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchStr("");
    setCategory(e.target.value);
    setCurrentPage(0);
    setPageNr(1);
  };

  const handleOpenCloseModal = (e) => {
    fetchVideo(e);
    setOpenModal(true);
    modalDetails.id = Number(e.target.getAttribute("data-id"));
    modalDetails.header = e.target.alt;
    modalDetails.body = e.target.getAttribute("data-body");
    modalDetails.image = e.target.src;
    modalDetails.video = e.target.getAttribute("data-id");
    closeModal(e);
  };

  const handleOpenCloseModalCar = (e) => {
    setOpenModal(true);

    // modalDetails.id = Number(e.target.getAttribute("data-id"));
    modalDetails.header = e.target.parentElement.querySelector(
      ".car-movie-title"
    ).textContent;
    closeModal(e);
    // modalDetails.video = e.target.getAttribute("data-id");
  };

  const closeModal = (e) => {
    const cont = document.querySelector(".app");
    cont.classList.add("modal-clear");

    const modalWrap = document.querySelector(".modal-wrap");
    modalWrap.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-wrap")) {
        setOpenModal(false);
        setVideo("");
        cont.classList.remove("modal-clear");
      } else {
        return null;
      }
    });
  };

  // pagination-item-active
  const handlePaginate = (e) => {
    setCurrentPage(Number(e.target.textContent - 1) * 10);
    setPageNr(Number(e.target.textContent));
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
          modalVideo={video}
        />
        <p className="heading-title">Trending this week</p>
        <div className="carrousel">
          <input type="radio" name="slides" id="radio-1" defaultChecked />
          <input type="radio" name="slides" id="radio-2" />
          <input type="radio" name="slides" id="radio-3" />
          <input type="radio" name="slides" id="radio-4" />
          <ul className="slides">
            {trending.slice(0, 4).map((item) => {
              return (
                <TopCarousel
                  key={item.id}
                  openMore={handleOpenCloseModalCar}
                  carId={item.id}
                  carTitle={item.original_title}
                  carBody={item.overview}
                  carImg={`${IMG_URL_ORIGINAL}${item.backdrop_path}`}
                  carYear={item.release_date}
                  carRating={item.vote_average}
                />
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
        <div className="sorting-wrap">
          <input
            value={searchStr ? searchStr : ""}
            type="search"
            placeholder="Search all movies"
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
          {currentTitles
            .slice(0, currentTitles.length / 10)
            .map((entry, index) => {
              return (
                <li
                  key={index}
                  className={
                    pageNr === index + 1
                      ? "pagination-item pagination-item-active"
                      : "pagination-item"
                  }
                  onClick={handlePaginate}
                >
                  {index + 1}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default App;
