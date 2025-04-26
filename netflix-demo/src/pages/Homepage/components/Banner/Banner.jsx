import React from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import "./Banner.style.css";

const Banner = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  if (!data || !data[0]) {
    return <h1>영화 데이터가 없어요</h1>;
  }

  const movie = data[0];
  const bannerImage = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  const handleBannerClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div
      className="banner-container"
      style={{ backgroundImage: `url(${bannerImage})` }}
      onClick={handleBannerClick}
    >
      <div className="banner-overlay" />
      <div className="banner-content">
        <h1 className="banner-title">{movie.title || "제목 없음"}</h1>
        <p className="banner-overview">
          {movie.overview
            ? movie.overview.length > 120
              ? movie.overview.slice(0, 120) + "..."
              : movie.overview
            : "줄거리 없음"}
        </p>
        <button className="banner-button">자세히 보기</button>
      </div>
    </div>
  );
};

export default Banner;
