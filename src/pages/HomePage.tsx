import { useEffect, useState } from "react";
import { MyPagination } from "../components/UI/MyPagination";
import { getPageCount } from "../utils/helpers/pagesCount";
import { PAGE_SIZE } from "../utils/constants";
import { MainLoader, MiniLoader } from "../components/UI/Loader";
import { useQuestions } from "../hooks/useQuestions";
import SearchForm from "../components/SearchForm";
import QuestionList from "../components/QuestionList";

const HomePage = () => {
  const [activeQuery, setActiveQuery] = useState("");
  const [page, setPage] = useState<number>(1);
  const [isAccepted, setIsAccepted] = useState<boolean | null>(null);
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [answers, setAnswers] = useState<number | null>(null);
  const [views, setViews] = useState<number | null>(null);

  const { questionsData, isLoading, isError, isFetching, refetch } =
    useQuestions(activeQuery, page, isAccepted, order, answers, views);

  const questions = questionsData?.items || [];
  const totalPages = Math.min(
    15,
    getPageCount(questionsData?.total!, PAGE_SIZE)
  );

  const handleSearch = (
    newQuery: string,
    newFilter: boolean | null,
    order: "asc" | "desc",
    answers: number | null,
    views: number | null
  ) => {
    setActiveQuery(newQuery);
    setIsAccepted(newFilter);
    setOrder(order);
    setAnswers(answers);
    setViews(views);
    setPage(1);
  };

  useEffect(() => {
    if (activeQuery) {
      refetch();
    }
  }, [activeQuery, page, refetch, isAccepted, order, answers, views]);

  return (
    <div className="container mx-auto py-16 flex flex-col min-h-screen">
      <SearchForm onSearch={handleSearch} />
      {isLoading ? (
        <MainLoader />
      ) : isError ? (
        <div className="m-auto text-3xl">Error loading questions</div>
      ) : questions.length ? (
        <>
          <div className="flex-grow mt-12">
            <QuestionList questions={questions} />
          </div>

          <div className="flex flex-col items-center gap-2">
            {isFetching && <MiniLoader />}

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
