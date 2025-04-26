import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieSlider.style.css";

const MovieSlider = ({ title, movies, responsive, onClick }) => {
  return (
    <div>
      <h3>{title}</h3>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass="movie-slider-p-1"
        keyBoardControl={true}
        containerClass="carousel-container"
        responsive={responsive}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {Array.isArray(movies) &&
          movies.map((movie, index) => (
            <MovieCard
              movie={movie}
              key={index}
              onClick={() => onClick(movie)}
            />
          ))}
      </Carousel>
    </div>
  );
};

export default MovieSlider;
