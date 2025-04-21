import React from "react";
import { Alert } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";
import { useUpcomingMoviesQuery } from "../../../../hooks/useUpcomingMovies";

const TopRatedMovieSlider = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <MovieSlider
        title={"개봉 예정 콘텐츠"}
        movies={data}
        responsive={responsive}
      />
    </div>
  );
};

export default TopRatedMovieSlider;
