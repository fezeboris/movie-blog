import { Movies } from "./types";

export const basicFetch = async <ReturnType>(
  endpoint: string
): Promise<ReturnType> => {
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error("Faild to fetch data");

  const data = await response.json();
  return data;
};

// fetch function
export const fetchMovies = async (search = "", page = 1): Promise<Movies> => {
  return await basicFetch<Movies>(`/api/movie?search=${search}&page=${page}`);
};
