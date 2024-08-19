import { useEffect, useState } from "react";
import SearchForm from "../components/SearchForm";
import QuestionList from "../components/QuestionList";
import { searchQuestions } from "../services/stackoverflowService";
import { MyPagination } from "../components/UI/MyPagination";
import { getPageCount } from "../utils/helpers/pagesCount";
import { PAGE_SIZE } from "../utils/constants";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { MainLoader, MiniLoader} from "../components/UI/Loader";
import BurgerMenu from "../components/BurgerMenu";

const HomePage = () => {
  const [activeQuery, setActiveQuery] = useState("");
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<boolean | null>(null);

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["questions", activeQuery, page],
    queryFn: () => searchQuestions(activeQuery, page, PAGE_SIZE, filter),
    enabled: false, 
    placeholderData: keepPreviousData,
  });

  const questions = data?.items || [];
  const totalPages = Math.min(15, getPageCount(data?.total!, PAGE_SIZE));

  useEffect(() => {
    console.log(isFetching);
  }, [isFetching]);

  const handleSearch = (newQuery: string, newFilter: boolean | null) => {
    setActiveQuery(newQuery);
    setFilter(newFilter);
    setPage(1); 
  };

  useEffect(() => {
    if (activeQuery) {
      refetch();
    }
  }, [activeQuery, page, refetch, filter]);

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
            <div className="mb-16">
              <MyPagination
                currentPage={page}
                setCurrentPage={setPage}
                totalPages={totalPages}
              />
            </div>
          </div>
        </>
      ) : activeQuery ? (
        <div className="m-auto text-3xl">No questions found</div>
      ) : null}
    </div>
  );
};

export default HomePage;
