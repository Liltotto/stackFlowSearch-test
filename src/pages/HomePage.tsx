import { useEffect, useState } from "react";
import SearchForm from "../components/SearchForm";
import QuestionList from "../components/QuestionList";
import { searchQuestions } from "../services/stackoverflowService";
import { MyPagination } from "../components/UI/MyPagination";
import { getPageCount } from "../utils/helpers/pagesCount";
import { PAGE_SIZE } from "../utils/constants";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const HomePage = () => {
  const [activeQuery, setActiveQuery] = useState("");
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<boolean | null>(null);
  // const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["questions", activeQuery, page],
    queryFn: () => searchQuestions(activeQuery, page, PAGE_SIZE, filter),
    enabled: false, // Запрос не будет выполняться автоматически
    placeholderData: keepPreviousData,
  });

  const questions = data?.items || [];
  // const filteredQuestions = (data?.items || []).filter((question) => {
  //   if (filter === "with-answer") {
  //     return question.answer_count > 0;
  //   }
  //   if (filter === "without-answer") {
  //     return question.answer_count === 0;
  //   }
  //   return true; // Возвращаем все вопросы, если выбран фильтр "-"
  // });
  const totalPages = Math.min(15, getPageCount(data?.total!, PAGE_SIZE));

  console.log("object");

  const handleSearch = (newQuery: string, newFilter: boolean | null) => {
    setActiveQuery(newQuery);
    setFilter(newFilter);
    setPage(1); // Сброс страницы при новом поиске
  };

  useEffect(() => {
    if (activeQuery) {
      refetch(); // Выполнение запроса при изменении страницы
    }
  }, [activeQuery, page, refetch]);

  return (
    <div className="container mx-auto py-8 flex flex-col min-h-screen">
      <h1 className="text-2xl mb-4">Search Stack Overflow</h1>
      <SearchForm onSearch={handleSearch} />

      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error loading questions</div>
      ) : questions.length ? (
        <>
          <div className="flex-grow mt-8">
            <QuestionList questions={questions} />
          </div>

          <div className="mb-16 self-center">
            <MyPagination
              currentPage={page}
              setCurrentPage={setPage}
              totalPages={totalPages}
            />
          </div>
        </>
      ) : activeQuery ? (
        <div className="m-auto text-3xl">No questions found</div>
      ) : null}
    </div>
  );
};

export default HomePage;
