import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchUpcomingMovies = async () => {
  const response = await api.get("/movie/upcoming");
  return response.data.results;
};

export const useUpcomingMoviesQuery = () => {
  return useQuery({
    queryKey: ["upcoming_movies"],
    queryFn: fetchUpcomingMovies,
  });
};
