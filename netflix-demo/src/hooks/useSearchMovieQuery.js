import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page, genres, adult }) => {
  const endpoint = keyword ? "/search/movie" : "/discover/movie";

  const params = {
    query: keyword,
    page,
    with_genres: genres,
    include_adult: adult,
    language: "ko-KR",
  };

  return api.get(endpoint, { params });
};

export const useSearchMovieQuery = ({ keyword, page, genres, adult }) => {
  return useQuery({
    queryKey: ["movie-search", keyword, page, genres, adult],
    queryFn: () => fetchSearchMovie({ keyword, page, genres, adult }),
    select: (result) => result.data,
  });
};
