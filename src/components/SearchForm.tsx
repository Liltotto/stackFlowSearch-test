import { useEffect, useState } from "react";
import { debounce } from "../utils/helpers/debounce";
import { useSearchParams } from "react-router-dom";
import { DEBOUNCE_DELAY } from "../utils/constants";
import { getParamValue } from "../utils/helpers/getParamValue";

interface SearchFormProps {
  onSearch: (
    query: string,
    isAccepted: boolean | null,
    order: "asc" | "desc",
    answers: number | null,
    views: number | null
  ) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(() =>
    getParamValue("query", "", searchParams)
  );
  const [isAccepted, setIsAccepted] = useState<boolean | null>(() =>
    getParamValue("filter", null, searchParams)
  );
  const [order, setOrder] = useState<"asc" | "desc">(() =>
    getParamValue("order", "desc", searchParams)
  );
  const [answers, setAnswers] = useState<number | null>(() =>
    getParamValue("answers", null, searchParams)
  );
  const [views, setViews] = useState<number | null>(() =>
    getParamValue("views", null, searchParams)
  );

  const debouncedSearch = debounce(() => {
    onSearch(query, isAccepted, order, answers, views);
  }, DEBOUNCE_DELAY);

  useEffect(() => {
    debouncedSearch();

    const params: Record<string, string> = {};
    if (query) params.query = query;
    if (isAccepted !== null) params.filter = String(isAccepted);
    if (order) params.order = order;
    if (answers !== null) params.answers = String(answers);
    if (views !== null) params.views = String(views);
    setSearchParams(params);
  }, [query, isAccepted, order, answers, views]);

  return (
    <form className="flex flex-col space-y-4 justify-center">
      {/* Поисковая строка */}
      <div className="flex flex-col items-center space-y-2">
        <label htmlFor="search" className="font-semibold">
          Search
        </label>
        <input
          id="search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for questions..."
          className="border border-gray-300 p-2 px-4 rounded w-2/5"
          required
        />
      </div>

      <hr className="border-gray-300 w-full" />

      <div className="flex flex-wrap justify-center space-x-4">
        <div className="flex flex-col items-center">
          <label htmlFor="filter" className="font-semibold">
            Accepted Answer
          </label>
          <select
            id="filter"
            value={
              isAccepted === null
                ? ""
                : isAccepted
                ? "with-accepted"
                : "without-accepted"
            }
            onChange={(e) =>
              setIsAccepted(
                e.target.value === "with-accepted"
                  ? true
                  : e.target.value === "without-accepted"
                  ? false
                  : null
              )
            }
            className="border border-gray-300 p-2 rounded-full"
          >
            <option value="">-</option>
            <option value="with-accepted">With Accepted Answer</option>
            <option value="without-accepted">Without Accepted Answer</option>
          </select>
        </div>

        <div className="flex flex-col items-center">
          <label htmlFor="order" className="font-semibold">
            Order
          </label>
          <select
            id="order"
            value={order || ""}
            onChange={(e) =>
              setOrder(e.target.value === "asc" ? "asc" : "desc")
            }
            className="border border-gray-300 p-2 rounded-full"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div className="flex flex-col items-center">
          <label htmlFor="answers" className="font-semibold">
            Min Answers
          </label>
          <input
            id="answers"
            type="number"
            value={answers || ""}
            onChange={(e) =>
              setAnswers(e.target.value ? Number(e.target.value) : null)
            }
            placeholder="Min Answers"
            className="border border-gray-300 p-2 px-4 rounded-full w-40"
          />
        </div>

        <div className="flex flex-col items-center">
          <label htmlFor="views" className="font-semibold">
            Min Views
          </label>
          <input
            id="views"
            type="number"
            value={views || ""}
            onChange={(e) =>
              setViews(e.target.value ? Number(e.target.value) : null)
            }
            placeholder="Min Views"
            className="border border-gray-300 p-2 px-4 rounded-full w-40"
          />
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
