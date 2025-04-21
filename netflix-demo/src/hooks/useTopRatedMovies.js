import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTopRatedMovies = async () => {
  const response = await api.get("/movie/top_rated", {
    params: {
      language: "ko-KR",
    },
  });
  return response.data.results;
};

export const useTopRatedMoviesQuery = () => {
  return useQuery({
    queryKey: ["순위권 영화"],
    queryFn: fetchTopRatedMovies,
    staleTime: 1000 * 60 * 5,
  });
};
