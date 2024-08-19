import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PAGE_SIZE } from "../utils/constants";
import { searchQuestions } from "../services/stackoverflowService";

export const useQuestions = (activeQuery: string, page: number, filter: boolean | null) => {

  const { data: questionsData, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["questions", activeQuery, page],
    queryFn: () => searchQuestions(activeQuery, page, PAGE_SIZE, filter),
    enabled: false,
    placeholderData: keepPreviousData,
  });

  return {
    questionsData,
    isLoading,
    isError,
    isFetching,
    refetch,
  };
};
