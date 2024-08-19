import { FormEvent, useState } from "react";

interface SearchFormProps {
  onSearch: (query: string, filter: boolean | null) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<boolean | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query, filter);
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 justify-center">
      <select
        value={
          filter === null ? "" : filter ? "with-accepted" : "without-accepted"
        }
        onChange={(e) =>
          setFilter(
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
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for questions..."
        className="border border-gray-300 p-2 px-4 rounded-full w-2/5"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-full">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
