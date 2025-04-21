import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchUpcomingMovies = async () => {
  const response = await api.get("/movie/upcoming", {
    params: {
      language: "ko-KR",
    },
  });
  return response.data.results;
};

export const useUpcomingMoviesQuery = () => {
  return useQuery({
    queryKey: ["개봉예정작"],
    queryFn: fetchUpcomingMovies,
    staleTime: 1000 * 60 * 5,
  });
};
