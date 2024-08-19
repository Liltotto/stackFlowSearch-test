import axios from "axios";
import { Question, Answer, SearchResultsProps } from "../types/stackoverflow.types";

const API_BASE_URL = "https://api.stackexchange.com/2.3";

export const searchQuestions = async (query: string, page = 1, pageSize = 15, is_answered: boolean | null = null): Promise<SearchResultsProps> => {
  const response = await axios.get(`${API_BASE_URL}/search/advanced`, {
    params: {
      order: "desc",
      sort: "activity",
      q: query,
      site: "stackoverflow",
      page,
      pagesize: pageSize,
      filter: "!6WPIomnMOSbdO",
      is_answered
    },
  });

  return {
    items: response.data.items,
    total: response.data.total,
  }
};

export const getQuestion = async (
  questionId: number
): Promise<Question[]> => {
  const response = await axios.get(
    `${API_BASE_URL}/questions/${questionId}`,
    {
      params: {
        site: "stackoverflow",
        filter: "withbody",
      },
    }
  );

  return response.data.items;
};

export const getQuestionAnswers = async (
  questionId: number
): Promise<Answer[]> => {
  const response = await axios.get(
    `${API_BASE_URL}/questions/${questionId}/answers`,
    {
      params: {
        order: "desc",
        sort: "activity",
        site: "stackoverflow",
        filter: "withbody",
      },
    }
  );

  return response.data.items;
};
