function MovieCard({ movie, onViewDetails }) {
  return (
    <div 
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer dark:bg-gray-800 dark:text-white border border-gray-100 dark:border-gray-700 h-full flex flex-col"
        onClick={onViewDetails}
    >
      <div className="h-96 overflow-hidden relative">
        <img 
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"} 
            alt={movie.Title} 
            className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
             <h3 className="text-white text-lg font-bold truncate">{movie.Title}</h3>
             <p className="text-gray-300 text-sm">{movie.Year}</p>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col justify-end">
         <button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors"
            onClick={(e) => {
                e.stopPropagation();
                onViewDetails();
            }}
         >
            View Details
         </button>
      </div>
    </div>
  );
}

export default MovieCard;
