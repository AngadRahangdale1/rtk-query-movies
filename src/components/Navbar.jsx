import SearchBar from "../features/SearchBar";

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        🎬 <span className="hidden sm:inline">MovieApp</span>
      </h2>
      <SearchBar />
    </nav>
  );
}

export default Navbar;
