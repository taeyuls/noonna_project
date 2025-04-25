import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";
import { useMovieModal } from "../../hooks/useMovieModal";
import { useSearchMovieQuery } from "../../hooks/useSearchMovieQuery";
import MovieFilter from "../Homepage/components/MovieFilter/MovieFilter";
import MovieList from "../Homepage/components/MovieList/MovieList";
import MovieDetail from "../MovieDetail/MovieDetail";
import "./MoviePage.style.css";

const MoviePage = () => {
  const isMobile = useIsMobile();
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(Number(query.get("page")) || 1);
  const keyword = query.get("q");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedAdult, setSelectedAdult] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  const { id: routeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
    genres: selectedGenres.join(","),
    adult: selectedAdult,
    sort: selectedSort,
  });

  const { selectedMovie, showModal, handleCardClick, handleCloseModal } =
    useMovieModal(data, location);

  const handleGenreChange = (e) => {
    const { value, checked } = e.target;
    setSelectedGenres((prev) =>
      checked ? [...prev, value] : prev.filter((g) => g !== value)
    );
  };

  const handleAdultChange = (e) => {
    setSelectedAdult(e.target.value);
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  useEffect(() => {
    setPage(1);
  }, [keyword]);

  useEffect(() => {
    setQuery({
      q: keyword || "",
      page,
      genres: selectedGenres.join(","),
      adult: selectedAdult,
      sort: selectedSort,
    });
  }, [selectedGenres, selectedAdult, selectedSort, keyword, page]);

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
            onReset={() => {
              setSelectedGenres([]);
              setSelectedAdult("");
              setSelectedSort("");
            }}
            selectedGenres={selectedGenres}
            selectedAdult={selectedAdult}
            selectedSort={selectedSort}
            handleGenreChange={handleGenreChange}
            handleAdultChange={handleAdultChange}
            handleSortChange={handleSortChange}
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

      {showModal && !isMobile && (
        <MovieDetail
          id={selectedMovie?.id}
          show={showModal}
          onHide={handleCloseModal}
        />
      )}
    </Container>
  );
};

export default MoviePage;
