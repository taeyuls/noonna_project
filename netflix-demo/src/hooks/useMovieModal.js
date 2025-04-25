import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useIsMobile from "./useIsMobile";

export const useMovieModal = (data, location) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (movie) => {
    if (isMobile) {
      navigate(`/movies/${movie.id}`);
    } else {
      setSelectedMovie(movie);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    setShowModal(false);
    navigate("/movies");
  };

  useEffect(() => {
    const pathMatch = location.pathname.match(/^\/movies\/(\d+)$/);
    const routeId = pathMatch ? Number(pathMatch[1]) : null;

    if (routeId && data?.results?.length) {
      const found = data.results.find((movie) => movie.id === routeId);
      if (found) {
        setSelectedMovie(found);
        setShowModal(true);
      }
    }
  }, [location, data]);

  return { selectedMovie, showModal, handleCardClick, handleCloseModal };
};
