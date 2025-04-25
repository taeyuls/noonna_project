import React from "react";
import { Form } from "react-bootstrap";
import "./MovieFilter.style.css";

const genres = [
  { label: "액션", value: "28" },
  { label: "모험", value: "12" },
  { label: "애니메이션", value: "16" },
  { label: "코미디", value: "35" },
  { label: "범죄", value: "80" },
  { label: "다큐멘터리", value: "99" },
  { label: "드라마", value: "18" },
  { label: "판타지", value: "14" },
  { label: "공포", value: "27" },
  { label: "로맨스", value: "10749" },
];

const sortOptions = [
  { label: "인기 높은순", value: "popularity.desc" },
  { label: "인기 낮은순", value: "popularity.asc" },
];

const MovieFilter = ({
  selectedGenres,
  selectedAdult,
  selectedSort,
  handleGenreChange,
  handleAdultChange,
  handleSortChange,
  onReset,
}) => {
  return (
    <div className="p-3 bg-dark text-white rounded mb-3">
      <div className="filter-container">
        <div className="mb-4">
          <strong className="d-block mb-2 text-neon">인기순 정렬</strong>
          <Form.Select
            value={selectedSort}
            onChange={handleSortChange}
            className="neon-select"
          >
            <option value="">기본</option>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="mb-4">
          <strong className="d-block mb-2 text-neon">장르 선택</strong>
          <div className="neon-multiselect">
            {genres.map((g) => (
              <label key={g.value} className="neon-option">
                <input
                  type="checkbox"
                  value={g.value}
                  checked={selectedGenres.includes(g.value)}
                  onChange={handleGenreChange}
                />
                <span>{g.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <strong className="d-block mb-2 text-neon">연령 구분</strong>
          <div className="d-flex flex-column gap-1">
            <Form.Check
              type="radio"
              label="전체 이용가"
              name="adult"
              value="false"
              onChange={handleAdultChange}
              checked={selectedAdult === "false"}
              className="text-white neon-radio"
            />
            <Form.Check
              type="radio"
              label="19세 이상"
              name="adult"
              value="true"
              onChange={handleAdultChange}
              checked={selectedAdult === "true"}
              className="text-white neon-radio"
            />
          </div>
        </div>

        <button className="neon-button" onClick={onReset}>
          필터 초기화
        </button>
      </div>
    </div>
  );
};

export default MovieFilter;
