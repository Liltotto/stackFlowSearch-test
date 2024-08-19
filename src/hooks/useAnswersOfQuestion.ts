import { useQuery } from "@tanstack/react-query";
import { getQuestionAnswers } from "../services/stackoverflowService";

export const useAnswersOfQuestion = (questionId: string | undefined) => {
  const {
    data: answersData,
    isLoading: isAnswersLoading,
    isError: isAnswersError,
    error: answersError,
  } = useQuery({
    queryKey: ["answers", questionId],
    queryFn: () => getQuestionAnswers(Number(questionId)),
    enabled: !!questionId,
  });

  return {
    answersData,
    isAnswersLoading,
    isAnswersError,
    answersError,
  };
};
