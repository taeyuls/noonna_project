import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useMovieModal = (data, location) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { id: routeId } = useParams();
  const navigate = useNavigate();

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (routeId && !isMobile && data?.results?.length) {
      const matched = data.results.find(
        (m) => String(m.id) === String(routeId)
      );
      if (matched) {
        setSelectedMovie(matched);
        setShowModal(true);
      }
    }
  }, [routeId, data]);

  const handleCardClick = (movie) => {
    if (isMobile) {
      navigate(`/movies/${movie.id}`);
    } else {
      setSelectedMovie(movie);
      setShowModal(true);
      navigate(`/movies/${movie.id}`, {
        replace: false,
        state: { backgroundLocation: location },
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/movies");
  };

  return {
    selectedMovie,
    showModal,
    handleCardClick,
    handleCloseModal,
  };
};
