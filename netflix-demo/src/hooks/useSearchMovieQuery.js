import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page, genres, adult, sort }) => {
  const endpoint = keyword ? "/search/movie" : "/discover/movie";

  const params = {
    query: keyword,
    page,
    with_genres: genres,
    include_adult: adult,
    language: "ko-KR",
    sort_by: sort,
  };

  return api.get(endpoint, { params });
};

export const useSearchMovieQuery = ({ keyword, page, genres, adult, sort }) => {
  return useQuery({
    queryKey: ["movie-search", keyword, page, genres, adult, sort],
    queryFn: () => fetchSearchMovie({ keyword, page, genres, adult, sort }),
    select: (result) => result.data,
  });
};
