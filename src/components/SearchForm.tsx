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
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <select
        value={filter === null ? "" : filter ? "true" : "false"}
        onChange={(e) =>
          setFilter(
            e.target.value === "true"
              ? true
              : e.target.value === "false"
              ? false
              : null
          )
        }
        className="border border-gray-300 p-2 rounded"
      >
        <option value="">-</option>
        <option value="true">With Accepted Answer</option>
        <option value="false">Without Accepted Answer</option>
      </select>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for questions..."
        className="flex-grow border border-gray-300 p-2 rounded"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Search
      </button>
    </form>

   
  );
};

export default SearchForm;
