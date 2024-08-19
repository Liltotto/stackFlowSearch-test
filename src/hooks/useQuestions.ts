import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PAGE_SIZE } from "../utils/constants";
import { searchQuestions } from "../services/stackoverflowService";

export const useQuestions = (
  activeQuery: string,
  page: number,
  isAccepted: boolean | null,
  order: "asc" | "desc",
  answers: number | null,
  views: number | null
) => {
  const {
    data: questionsData,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["questions", activeQuery, page],
    queryFn: () =>
      searchQuestions(
        activeQuery,
        page,
        PAGE_SIZE,
        isAccepted,
        order,
        answers,
        views
      ),
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
