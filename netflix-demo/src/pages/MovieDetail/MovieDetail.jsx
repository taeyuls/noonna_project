import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";
import "./MovieDetail.style.css";

const MovieDetail = ({ id: propId, show, onHide }) => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const id = propId || params.id;
  const isMobile = useIsMobile();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    if (!id) return;

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
        setMovie(data);
      } catch (err) {
        console.error("영화 정보를 불러오는 데 실패했습니다.", err);
      }
    };
    fetchMovie();
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        setReviews(data.results || []);
      } catch (err) {
        console.error("리뷰 정보를 불러오는 데 실패했습니다.", err);
      }
    };
    fetchReviews();
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        setRecommendations(data.results || []);
      } catch (err) {
        console.error("추천 영화를 불러오는 데 실패했습니다.", err);
      }
    };
    fetchRecommendations();
  }, [id]);

  const handleClose = () => {
    if (onHide) {
      onHide(); // 모달 닫기
    } else {
      if (location.pathname.startsWith("/movies/")) {
        navigate("/movies"); // 영화 페이지로 이동
      } else {
        navigate("/"); // 홈으로 이동
      }
    }
  };

  //  예고 불러오기
  useEffect(() => {
    if (!id) return;

    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        const trailersOnly = (data.results || []).filter(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailers(trailersOnly);
      } catch (err) {
        console.error("예고편을 불러오는 데 실패했습니다.", err);
      }
    };
    fetchVideos();
  }, [id]);

  if (!movie) {
    return (
      <div className="text-white p-4">
        <div className="spinner-area">
          <Spinner
            animation="border"
            variant="danger"
            style={{ width: "5rem", height: "5rem" }}
          />
        </div>
      </div>
    );
  }

  const DetailContent = () => (
    <>
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

      {/* 영화 설명 */}
      {movie.overview ? (
        <p className="movie-description">{movie.overview}</p>
      ) : (
        <p className="movie-description text-muted">줄거리 정보가 없습니다.</p>
      )}

      {/* 영화 기본 정보 */}
      <div className="movie-info-box mt-4">
        <p>
          <strong>개봉일:</strong> {movie.release_date || "정보 없음"}
        </p>
        <p>
          <strong>평점:</strong> {movie.vote_average || "정보 없음"}
        </p>
        <p>
          <strong>장르:</strong>{" "}
          {movie.genres?.map((g) => g.name).join(", ") || "정보 없음"}
        </p>
        <p>
          <strong>인기도:</strong>{" "}
          {movie.popularity ? `${Math.round(movie.popularity)}점` : "정보 없음"}
        </p>
        <p>
          <strong>제작 예산:</strong>{" "}
          {movie.budget ? `$${movie.budget.toLocaleString()}` : "정보 없음"}
        </p>
      </div>

      {/* 예고편 보여주기 */}
      {trailers.length > 0 && (
        <div className="movie-trailer-box mt-5">
          <h3 className="text-neon mb-4">예고편</h3>
          {trailers.map((trailer) => (
            <div key={trailer.id} className="mb-4">
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      )}

      {/* 리뷰 */}
      {reviews.length > 0 && (
        <div className="movie-review-box mt-5">
          <h3 className="text-neon mb-4">리뷰</h3>
          {(showAllReviews ? reviews : reviews.slice(0, 2)).map((review) => (
            <div key={review.id} className="review-item mb-4">
              <h5 className="text-info">{review.author}</h5>
              <p className="review-content text-light">
                {review.content.length > 300 && !showAllReviews
                  ? review.content.slice(0, 300) + "..."
                  : review.content}
              </p>
            </div>
          ))}
          {reviews.length > 2 && (
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="btn btn-outline-info mt-3"
            >
              {showAllReviews ? "접기" : "더보기"}
            </button>
          )}
        </div>
      )}

      {/* 추천 영화 */}
      {recommendations.length > 0 && (
        <div className="movie-recommend-box mt-5">
          <h3 className="text-neon mb-4">추천 영화</h3>
          <div className="recommend-grid">
            {recommendations.slice(0, 6).map((rec) => (
              <div key={rec.id} className="recommend-card">
                <img
                  src={
                    rec.poster_path
                      ? `https://image.tmdb.org/t/p/w200${rec.poster_path}`
                      : "/no-image.png"
                  }
                  alt={rec.title}
                  className="img-fluid mb-2"
                />
                <p className="text-light small">{rec.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );

  const handleGoBack = () => {
    const from = location.state?.from || "/movies";
    navigate(from);
    if (onHide) onHide();
  };

  if (!movie) {
    return <Spinner animation="border" />;
  }

  if (!isMobile && show) {
    return (
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        dialogClassName="custom-neon-modal"
      >
        <Modal.Header closeButton className="bg-dark border-bottom-0">
          <Modal.Title className="text-neon neon-title-bg">
            {movie.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="neon-modal-body text-center">
          <DetailContent />
        </Modal.Body>
      </Modal>
    );
  }

  if (isMobile) {
    return (
      <div className="container neon-modal-body py-5">
        <h1 className="text-neon text-center mb-4">{movie.title}</h1>
        <DetailContent />
        <button onClick={handleClose} className="btn btn-outline-info mt-4">
          돌아가기
        </button>
      </div>
    );
  }

  return null;
};

export default MovieDetail;
