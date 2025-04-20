import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTopRatedMovies = async () => {
  const response = await api.get("/movie/top_rated");
  return response.data.results;
};

export const useTopRatedMoviesQuery = () => {
  return useQuery({
    queryKey: ["top_movies"],
    queryFn: fetchTopRatedMovies,
  });
};
