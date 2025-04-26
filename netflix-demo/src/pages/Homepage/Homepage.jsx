import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile"; // ✅ 추가 필요
import MovieDetail from "../MovieDetail/MovieDetail";
import Banner from "./components/Banner/Banner";
import PopularMovieSlider from "./components/PopularMovieSlider/PopularMovieSlider";
import TopRatedMovieSlider from "./components/TopRatedMovieSlider/TopRatedMovieSlider";
import UpcomingMovieSlider from "./components/UpcomingMovieSlider/UpcomingMovieSlider";

const Homepage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile(); // ✅ 모바일인지 확인
  const location = useLocation();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleMovieClick = (movie) => {
    if (isMobile) {
      // 모바일이면 페이지 이동
      navigate(`/movies/${movie.id}`, {
        state: { from: location.pathname },
      });
    } else {
      // PC면 모달 열기
      setSelectedMovie(movie);
      setShowModal(true);
    }
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

      {/* ✅ PC일 때만 모달 띄움 */}
      {selectedMovie && !isMobile && (
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
