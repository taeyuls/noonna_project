import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";

const genreNames = {
  28: "액션",
  12: "모험",
  16: "애니메이션",
  35: "코미디",
  80: "범죄",
  18: "드라마",
  10751: "가족",
  14: "판타지",
  27: "공포",
  10749: "로맨스",
  878: "SF",
  53: "스릴러",
  99: "다큐멘터리",
  10752: "전쟁",
  36: "역사",
  10402: "음악",
  9648: "미스터리",
  37: "서부",
};

const MovieCard = ({ movie }) => {
  return (
    <div
      className="movie-card"
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path})`,
      }}
    >
      <div className="overlay">
        <h1 className="movie-title">{movie.title}</h1>

        <div className="movie-footer">
          <div className="movie-genres">
            {movie.genre_ids.map((id) => (
              <Badge bg="danger" key={id}>
                {genreNames[id] || "Genre"}
              </Badge>
            ))}
          </div>
          <p className="movie-rating">⭐ {movie.vote_average.toFixed(1)}</p>

          <div className="movie-age-badge">
            <img
              src={
                movie.adult
                  ? "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/GRAC_18_%28%EC%B2%AD%EC%86%8C%EB%85%84%EC%9D%B4%EC%9A%A9%EB%B6%88%EA%B0%80%29.png/250px-GRAC_18_%28%EC%B2%AD%EC%86%8C%EB%85%84%EC%9D%B4%EC%9A%A9%EB%B6%88%EA%B0%80%29.png"
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/GRAC_All_%28%EC%A0%84%EC%B2%B4%EC%9D%B4%EC%9A%A9%EA%B0%80%29.png/250px-GRAC_All_%28%EC%A0%84%EC%B2%B4%EC%9D%B4%EC%9A%A9%EA%B0%80%29.png"
              }
              alt={movie.adult ? "18+ Only" : "All Ages"}
              title={movie.adult ? "청소년 이용불가" : "전체 이용가"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
