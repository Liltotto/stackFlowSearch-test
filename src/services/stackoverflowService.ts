import axios from "axios";
import {
  Question,
  Answer,
  SearchResultsProps,
} from "../types/stackoverflow.types";

const API_BASE_URL = "https://api.stackexchange.com/2.3";

const http = axios.create({
  baseURL: API_BASE_URL,
});

export const searchQuestions = async (
  query: string,
  page = 1,
  pageSize = 15,
  accepted: boolean | null
): Promise<SearchResultsProps> => {
  const response = await http.get(`/search/advanced`, {
    params: {
      order: "desc",
      sort: "activity",
      q: query,
      site: "stackoverflow",
      page,
      pagesize: pageSize,
      filter: "!6WPIomnMOSbdO",
      accepted,
    },
  });

  return {
    items: response.data.items,
    total: response.data.total,
  };
};

export const getQuestion = async (questionId: number): Promise<Question[]> => {
  const response = await http.get(`/questions/${questionId}`, {
    params: {
      site: "stackoverflow",
      filter: "withbody",
    },
  });

  return response.data.items;
};

export const getQuestionAnswers = async (
  questionId: number
): Promise<Answer[]> => {
  const response = await http.get(`/questions/${questionId}/answers`, {
    params: {
      order: "desc",
      sort: "activity",
      site: "stackoverflow",
      filter: "withbody",
    },
  });

  return response.data.items;
};
