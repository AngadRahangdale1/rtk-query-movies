import { useState, useRef, useEffect } from "react";
import { useGetMovieBySearchQuery } from "../services/OMDbApi";
import { useDispatch } from "react-redux";
import { setSelectedMovieId } from "./appSlice";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const dispatch = useDispatch();

  const { data, isLoading } = useGetMovieBySearchQuery(search, {
    skip: !search || search.length < 3,
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMovieClick = (imdbID) => {
      dispatch(setSelectedMovieId(imdbID));
      setShowResults(false);
      setSearch(""); // Optional: clear search after selection
  };
  
// ...

  return (
    <div className="relative w-full max-w-sm sm:max-w-md" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full px-5 py-2 pl-10 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
          onChange={(e) => {
              setSearch(e.target.value);
              setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          value={search}
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {showResults && search.length >= 3 && (
        <div className="absolute top-full mt-2 left-0 w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden border border-gray-200 dark:border-gray-700">
           {isLoading && <div className="p-4 text-center text-gray-500 dark:text-gray-400">Searching...</div>}

           {data?.Search ? (
             <div className="max-h-80 overflow-y-auto">
               {data.Search.map((movie) => (
                 <div 
                    key={movie.imdbID} 
                    className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-700 last:border-none"
                    onClick={() => handleMovieClick(movie.imdbID)}
                 >
                    <img 
                        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/40x60"} 
                        alt={movie.Title} 
                        className="w-10 h-14 object-cover rounded shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white truncate">{movie.Title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{movie.Year}</p>
                    </div>
                 </div>
               ))}
             </div>
           ) : (
                !isLoading && data?.Error && <div className="p-4 text-center text-gray-500 dark:text-gray-400">{data.Error}</div>
           )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
