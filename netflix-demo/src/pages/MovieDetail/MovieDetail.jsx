import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import "./MovieDetail.style.css";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
};

const MovieDetail = ({ id: propId, show, onHide }) => {
  const params = useParams();
  const id = propId || params.id;
  const isMobile = useIsMobile();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchMovie = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
                Accept: "application/json",
              },
            }
          );
          const data = await response.json();
          console.log("데이터", data);

          setMovie(data);
        } catch (err) {
          console.error("영화 정보를 불러오는 데 실패했습니다.", err);
        }
      };
      fetchMovie();
    }
  }, [id]);

  if (!movie)
    return (
      <div className="text-white p-4">
        {" "}
        <div className="spinner-area">
          <Spinner
            animation="border"
            variant="danger"
            style={{ width: "5rem", height: "5rem" }}
          />
        </div>
      </div>
    );

  const DetailContent = () => (
    <>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/no-image.png"
        }
        alt={movie.title}
        className="img-fluid mb-3"
      />
      <p>{movie.overview}</p>
      <p>
        <strong>개봉일:</strong> {movie.release_date}
      </p>
      <p>
        <strong>평점:</strong> {movie.vote_average}
      </p>
    </>
  );

  if (!isMobile && show) {
    return (
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton className="bg-dark border-bottom-0">
          <Modal.Title>
            <span className="text-neon neon-title-bg">{movie.title}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="neon-modal-body text-center">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/no-image.png"
            }
            alt={movie.title}
            className="img-fluid mb-4 neon-image"
            style={{ maxHeight: "400px", margin: "0 auto", display: "block" }}
          />
          <p className="movie-description">{movie.overview}</p>
          <p>
            <strong>개봉일:</strong> {movie.release_date}
          </p>
          <p>
            <strong>평점:</strong> {movie.vote_average}
          </p>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <div className="container text-white py-5 neon-modal-body">
      <h1 className="text-neon">{movie.title}</h1>
      <DetailContent />
    </div>
  );
};

export default MovieDetail;
