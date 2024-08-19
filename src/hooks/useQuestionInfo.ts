import { useQuery } from "@tanstack/react-query";
import { getQuestion } from "../services/stackoverflowService";

export const useQuestionInfo = (questionId: string | undefined) => {
  const {
    data: questionData,
    isLoading: isQuestionLoading,
    isError: isQuestionError,
    error: questionError,
  } = useQuery({
    queryKey: ["question", questionId],
    queryFn: () => getQuestion(Number(questionId)),
    enabled: !!questionId,
  });

  return {
    questionData,
    isQuestionLoading,
    isQuestionError,
    questionError,
  };
};
