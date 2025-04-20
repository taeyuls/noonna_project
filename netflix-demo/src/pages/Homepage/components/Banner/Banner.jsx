import React from "react";
import Alert from "react-bootstrap/Alert";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import "./Banner.style.css";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  console.log("영화 리스트", data);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  if (!data || !data[0]) {
    return <h1>영화 데이터가 없어요</h1>;
  }

  return (
    <div
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/w533_and_h300_bestv2${data[0].poster_path})`,
      }}
      className="Banner"
    >
      <div
        className="text-white Banner-content"
        style={{
          maxWidth: "100%",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          wordBreak: "break-word",
        }}
      >
        <h1>{data[0].title}</h1>
        <p>{data[0].overview}</p>
      </div>
    </div>
  );
};

export default Banner;
