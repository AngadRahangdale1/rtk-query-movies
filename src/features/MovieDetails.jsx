import React from 'react';
import { useGetMovieDetailsQuery } from '../services/OMDbApi';

const MovieDetails = ({ imdbID, onClose }) => {
    const { data: movie, isLoading, isError } = useGetMovieDetailsQuery(imdbID);

    if (!imdbID) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
                
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors bg-gray-100 dark:bg-gray-700 rounded-full p-2 z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {isLoading ? (
                     <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                     </div>
                ) : isError ? (
                    <div className="p-8 text-center">
                         <h2 className="text-xl text-red-500 font-bold mb-4">Error loading details 😢</h2>
                         <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Close</button>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 relative group">
                            <img 
                                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"} 
                                alt={movie.Title} 
                                className="w-full h-full object-cover md:rounded-l-2xl rounded-t-2xl max-h-[500px] md:max-h-full"
                            />
                        </div>
                        <div className="md:w-2/3 p-6 md:p-8 space-y-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">{movie.Title}</h1>
                                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2.5 py-0.5 rounded font-medium">{movie.Rated}</span>
                                    <span>{movie.Year}</span>
                                    <span>•</span>
                                    <span>{movie.Runtime}</span>
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                                {movie.Genre?.split(', ').map(genre => (
                                    <span key={genre} className="border border-gray-300 dark:border-gray-600 rounded-full px-3 py-1 text-sm text-gray-700 dark:text-gray-300">
                                        {genre}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4 py-3 border-y border-gray-200 dark:border-gray-700">
                                <div className="text-center">
                                    <span className="block text-xl font-bold text-yellow-500">★ {movie.imdbRating}</span>
                                    <span className="text-xs text-gray-500">IMDb Rating</span>
                                </div>
                                <div className="text-center px-4 border-l border-gray-200 dark:border-gray-700">
                                    <span className="block text-xl font-bold text-gray-900 dark:text-white">{movie.Metascore}</span>
                                    <span className="text-xs text-gray-500">Metascore</span>
                                </div>
                                <div className="text-center px-4 border-l border-gray-200 dark:border-gray-700">
                                    <span className="block text-xl font-bold text-gray-900 dark:text-white">{movie.BoxOffice && movie.BoxOffice !== "N/A" ? movie.BoxOffice : "-"}</span>
                                    <span className="text-xs text-gray-500">Box Office</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <a 
                                    href={`https://www.google.com/search?q=${encodeURIComponent("watch " + movie.Title + " full movie")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 group/btn"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover/btn:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                    Watch Movie
                                </a>
                                <a 
                                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.Title + " trailer")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white text-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                                    </svg>
                                    Trailer
                                </a>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Plot</h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{movie.Plot}</p>
                            </div>

                            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl">
                                <p><span className="font-semibold text-gray-900 dark:text-white w-20 inline-block">Director:</span> {movie.Director}</p>
                                <p><span className="font-semibold text-gray-900 dark:text-white w-20 inline-block">Writers:</span> {movie.Writer}</p>
                                <p><span className="font-semibold text-gray-900 dark:text-white w-20 inline-block">Actors:</span> {movie.Actors}</p>
                            </div>

                            {movie.Awards !== "N/A" && (
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg flex items-start gap-2 border border-yellow-200 dark:border-yellow-800/30">
                                    <span className="text-xl">🏆</span>
                                    <p className="text-sm text-yellow-800 dark:text-yellow-200 pt-0.5">{movie.Awards}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieDetails;