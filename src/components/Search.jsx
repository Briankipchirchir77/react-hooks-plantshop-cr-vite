function Search({ searchQuery, onSearchChange }) {
  function handleChange(e) {
    onSearchChange(e.target.value);
  }

  function clearSearch() {
    onSearchChange("");
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <label
        htmlFor="plant-search"
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        🔍 Search Plants
      </label>
      <div className="relative">
        <input
          id="plant-search"
          type="text"
          placeholder="Type a plant name..."
          value={searchQuery}
          onChange={handleChange}
          className="w-full p-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default Search;
