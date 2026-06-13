function Searchbar({ query, onSearch }) {
  return (
    <div className="search-box">
      <input
        type="text"
        value={query}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search movies..."
      />
    </div>
  );
}

export default Searchbar;