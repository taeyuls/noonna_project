import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchPopularMovies = async () => {
  const response = await api.get("/movie/popular", {
    params: {
      language: "ko-KR",
    },
  });

  return response.data.results;
};

export const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: ["인기 영화"],
    queryFn: fetchPopularMovies,
    staleTime: 1000 * 60 * 5,
  });
};
