import React from "react";

const Search = ({ setSearchTerm, onSubmitSearchClicked, searchTerm }) => {
  return (
    <form
      onSubmit={(e) => onSubmitSearchClicked(e)}
      className="flex  w-50 bg-purple110e1d rounded-md overflow-hidden"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 focus:outline-none text-sm   focus:border-transparent border border-solid border-gray-500"
        placeholder="Enter country name"
      />
      <button
        className="w-10 justify-center text-center align-middle "
        type="submit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block h-6 w-6 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
};

export default Search;
