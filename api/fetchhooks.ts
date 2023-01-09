import { useInfiniteQuery } from "@tanstack/react-query";

// Fetch fuction
import { fetchMovies } from "./fetchFunctions";

// types
import { Movies } from "./types";

export const useFetchMovies = (search: string) => {
  return useInfiniteQuery(
    ["movies", search],
    ({ pageParam = 1 }) => fetchMovies(search, pageParam),
    {
      getNextPageParam: (lastPage: Movies) => {
        if (lastPage.page < lastPage.total_pages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
      refetchOnWindowFocus: false,
    }
  );
};
