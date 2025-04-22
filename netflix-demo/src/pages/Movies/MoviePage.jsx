import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../../common/MovieCard/MovieCard";
import { useSearchMovieQuery } from "../../hooks/useSearchMovieQuery";
import "./MoviePage.style.css";

// 페이지네이션 설치
// page state 만들기
// 페이지네이션 클리갛ㄹ때마다 page 바꿔주기
// page rkqtdl 바뀔때 마다 useSear

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(Number(query.get("page")) || 1);
  const keyword = query.get("q");

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedAdult, setSelectedAdult] = useState("");

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
  console.log("데이타", data);

  useEffect(() => {
    setQuery({
      q: keyword || "",
      page,
      genres: selectedGenres.join(","),
      adult: selectedAdult,
    });
  }, [selectedGenres, selectedAdult, keyword]);

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
          <div className="p-3 bg-dark text-white rounded mb-3">
            <div className="filter-container">
              <div className="mb-3">
                <strong>장르</strong>
                <div className="d-flex flex-wrap gap-2">
                  <Form.Check
                    label="액션"
                    value="28"
                    onChange={handleGenreChange}
                    checked={selectedGenres.includes("28")}
                    className="text-white"
                  />
                  <Form.Check
                    label="모험"
                    value="12"
                    onChange={handleGenreChange}
                    checked={selectedGenres.includes("12")}
                    className="text-white"
                  />
                  <Form.Check
                    label="애니메이션"
                    value="16"
                    onChange={handleGenreChange}
                    checked={selectedGenres.includes("16")}
                    className="text-white"
                  />
                  <Form.Check
                    label="코미디"
                    value="35"
                    onChange={handleGenreChange}
                    checked={selectedGenres.includes("35")}
                    className="text-white"
                  />
                  <Form.Check
                    label="범죄"
                    value="80"
                    onChange={handleGenreChange}
                    checked={selectedGenres.includes("80")}
                    className="text-white"
                  />
                  <Form.Check
                    label="다큐멘터리"
                    value="99"
                    onChange={handleGenreChange}
                    checked={selectedGenres.includes("99")}
                    className="text-white"
                  />
                  <Form.Check
                    label="드라마"
                    value="18"
                    onChange={handleGenreChange}
                    checked={selectedGenres.includes("18")}
                    className="text-white"
                  />
                  <Form.Check
                    label="판타지"
                    value="14"
                    onChange={handleGenreChange}
                    checked={selectedGenres.includes("14")}
                    className="text-white"
                  />
                  <Form.Check
                    label="공포"
                    value="27"
                    onChange={handleGenreChange}
                    checked={selectedGenres.includes("27")}
                    className="text-white"
                  />
                  <Form.Check
                    label="로맨스"
                    value="10749"
                    onChange={handleGenreChange}
                    checked={selectedGenres.includes("10749")}
                    className="text-white"
                  />
                </div>
              </div>
              <div className="mb-2">
                <strong>연령</strong>
                <Form.Check
                  type="radio"
                  label="전체 이용가"
                  name="adult"
                  value="false"
                  onChange={handleAdultChange}
                  checked={selectedAdult === "true"}
                  className="text-white"
                />
                <Form.Check
                  type="radio"
                  label="19세 이상"
                  name="adult"
                  value="true"
                  onChange={handleAdultChange}
                  checked={selectedAdult === "true"}
                  className="text-white"
                />
              </div>
            </div>
          </div>
        </Col>

        <Col lg={8} xs={12}>
          <Row>
            {data?.results?.map((movie, index) => (
              <Col key={index} lg={4} md={6} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>

          <ReactPaginate
            nextLabel=">"
            previousLabel="<"
            breakLabel="..."
            onPageChange={handlePageClick}
            pageCount={(data?.total_pages, 500)}
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
    </Container>
  );
};

export default MoviePage;
