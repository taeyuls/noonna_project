// src/pages/Movies/MoviePage.jsx
import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useSearchMovieQuery } from "../../hooks/useSearchMovieQuery";
import MovieFilter from "../Homepage/components/MovieFilter/MovieFilter";
import MovieList from "../Homepage/components/MovieList/MovieList";
import MovieDetail from "../MovieDetail/MovieDetail";
import "./MoviePage.style.css";

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(Number(query.get("page")) || 1);
  const keyword = query.get("q");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedAdult, setSelectedAdult] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const handleReset = () => {
    setSelectedGenres([]);
    setSelectedAdult("");
  };

  const { id: routeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (routeId && !isMobile) {
      setSelectedMovie({ id: routeId });
      setShowModal(true);
    }
  }, [routeId]);

  const handleCardClick = (movie) => {
    const isMobile = window.innerWidth < 768;
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

  const handleGenreChange = (e) => {
    const { value, checked } = e.target;
    setSelectedGenres((prev) =>
      checked ? [...prev, value] : prev.filter((g) => g !== value)
    );
  };

  const handleAdultChange = (e) => {
    setSelectedAdult(e.target.value);
  };

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
    genres: selectedGenres.join(","),
    adult: selectedAdult,
  });

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  useEffect(() => {
    setPage(1); // Reset page
  }, [keyword]);

  useEffect(() => {
    setQuery({
      q: keyword || "",
      page,
      genres: selectedGenres.join(","),
      adult: selectedAdult,
    });
  }, [selectedGenres, selectedAdult, keyword, page]);

  if (isLoading) {
    return (
      <div className="spinner-area">
        <Spinner
          animation="border"
          variant="danger"
          style={{ width: "5rem", height: "5rem" }}
        />
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <Container>
      <Row>
        <Col lg={2} xs={12}>
          <MovieFilter
            onReset={handleReset}
            selectedGenres={selectedGenres}
            selectedAdult={selectedAdult}
            handleGenreChange={handleGenreChange}
            handleAdultChange={handleAdultChange}
          />
        </Col>

        <Col lg={8} xs={12}>
          <MovieList data={data} handleCardClick={handleCardClick} />

          <ReactPaginate
            pageCount={Math.min(data?.total_pages ?? 0, 500)}
            nextLabel=">"
            previousLabel="<"
            breakLabel="..."
            onPageChange={handlePageClick}
            forcePage={page - 1}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            containerClassName="pagination justify-content-center my-4 gap-2 flex-wrap"
            pageClassName="page-item"
            pageLinkClassName="page-link custom-page responsive-page"
            previousClassName="page-item"
            previousLinkClassName="page-link custom-page responsive-page"
            nextClassName="page-item"
            nextLinkClassName="page-link custom-page responsive-page"
            breakClassName="page-item"
            breakLinkClassName="page-link custom-page responsive-page"
            activeClassName="active-page"
            renderOnZeroPageCount={null}
          />
        </Col>
      </Row>

      {selectedMovie && window.innerWidth >= 768 && (
        <MovieDetail
          id={selectedMovie.id}
          show={showModal}
          onHide={handleCloseModal}
        />
      )}
    </Container>
  );
};

export default MoviePage;
