import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";

const genreNames = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  27: "Horror",
  10749: "Romance",
  878: "Sci-Fi",
  53: "Thriller",
  99: "Documentary",
};

const MovieCard = ({ movie }) => {
  return (
    <div
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s ease-in-out",
      }}
      className="movie-card"
    >
      <div
        className="overlay"
        style={{
          backgroundColor: "rgba(0,0,0,0.4)",
          height: "100%",
          padding: "1.5rem",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <h1
          style={{
            fontSize: "1.4rem",
            fontWeight: "700",
            marginBottom: "0.75rem",
          }}
        >
          {movie.title}
        </h1>

        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: "8px",
            padding: "0.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <p
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            ⭐ {movie.vote_average}
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {movie.genre_ids.map((id) => (
              <Badge bg="secondary" key={id}>
                {genreNames[id] || "Genre"}
              </Badge>
            ))}
          </div>
          <div style={{ alignSelf: "flex-end", marginTop: "0" }}>
            <img
              src={
                movie.adult
                  ? "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/GRAC_18_%28%EC%B2%AD%EC%86%8C%EB%85%84%EC%9D%B4%EC%9A%A9%EB%B6%88%EA%B0%80%29.png/250px-GRAC_18_%28%EC%B2%AD%EC%86%8C%EB%85%84%EC%9D%B4%EC%9A%A9%EB%B6%88%EA%B0%80%29.png"
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/GRAC_All_%28%EC%A0%84%EC%B2%B4%EC%9D%B4%EC%9A%A9%EA%B0%80%29.png/250px-GRAC_All_%28%EC%A0%84%EC%B2%B4%EC%9D%B4%EC%9A%A9%EA%B0%80%29.png"
              }
              alt={movie.adult ? "18+ Only" : "All Ages"}
              title={movie.adult ? "청소년 이용불가" : "전체 이용가"}
              style={{ height: "24px", borderRadius: "4px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
