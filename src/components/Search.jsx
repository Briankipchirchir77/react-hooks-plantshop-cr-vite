function Search({ onSearch }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <label htmlFor="plant-search">
        🔍 Search Plants
      </label>

      <input
        id="plant-search"
        type="text"
        placeholder="Type a name to search..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}

export default Search;