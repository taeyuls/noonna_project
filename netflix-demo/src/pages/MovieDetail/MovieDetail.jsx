import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";

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
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=API_KEY&language=ko-KR`
        );
        const data = await response.json();
        setMovie(data);
      };
      fetchMovie();
    }
  }, [id]);

  if (!movie) return <div className="text-white p-4">로딩 중...</div>;

  const DetailContent = () => (
    <>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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

  if (show && !isMobile) {
    return (
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DetailContent />
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <div className="container text-white py-5">
      <h1>{movie.title}</h1>
      <DetailContent />
    </div>
  );
};

export default MovieDetail;
