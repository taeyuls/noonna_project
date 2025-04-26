import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieDetail from "../MovieDetail/MovieDetail";
import Banner from "./components/Banner/Banner";
import PopularMovieSlider from "./components/PopularMovieSlider/PopularMovieSlider";
import TopRatedMovieSlider from "./components/TopRatedMovieSlider/TopRatedMovieSlider";
import UpcomingMovieSlider from "./components/UpcomingMovieSlider/UpcomingMovieSlider";

const Homepage = () => {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    setShowModal(false);
  };

  return (
    <div>
      <Banner />
      <PopularMovieSlider onClick={handleMovieClick} />
      <TopRatedMovieSlider onClick={handleMovieClick} />
      <UpcomingMovieSlider onClick={handleMovieClick} />

      {selectedMovie && (
        <MovieDetail
          id={selectedMovie.id}
          show={showModal}
          onHide={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Homepage;
