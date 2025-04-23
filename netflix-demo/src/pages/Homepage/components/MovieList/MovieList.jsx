import React from "react";
import { Col, Row } from "react-bootstrap";
import MovieCard from "../../../../common/MovieCard/MovieCard";

const MovieList = ({ data, handleCardClick }) => {
  if (!data || data.results.length === 0) {
    return (
      <div className="text-center py-5">
        <h4 className="text-white mb-3">검색 결과가 없어요</h4>
        <p className="text-secondary">다른 키워드로 검색해보세요</p>
      </div>
    );
  }

  return (
    <Row>
      {data.results.map((movie, index) => (
        <Col key={index} lg={4} md={6} xs={12}>
          <MovieCard movie={movie} onClick={() => handleCardClick(movie)} />
        </Col>
      ))}
    </Row>
  );
};

export default MovieList;
