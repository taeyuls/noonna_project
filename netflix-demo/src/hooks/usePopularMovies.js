import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchPopularMovies = async () => {
  const response = await api.get("/movie/popular");
  console.log("response", response);

  return response.data.results;
};

export const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: ["popular-movies"],
    queryFn: fetchPopularMovies,
    staleTime: 1000 * 60 * 5,
  });
};
