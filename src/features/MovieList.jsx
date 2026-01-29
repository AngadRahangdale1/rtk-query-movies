import React from 'react'
import {useGetPopularMoviesQuery} from '../services/OMDbApi.js'
import MovieCard from '../components/MovieCard.jsx';
import { useDispatch } from 'react-redux';
import { setSelectedMovieId } from './appSlice.js';

function MovieList() {
    const {data, isLoading,isError} = useGetPopularMoviesQuery(1);
    const dispatch = useDispatch();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        )
    }
    
    if (isError) {
        return (
            <div className="text-center mt-20">
                <h2 className="text-2xl text-red-500 font-bold">Error loading movies 😢</h2>
                <p className="text-gray-600">Please try again later.</p>
            </div>
        )
    }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data?.Search?.map((movie) => (
          <MovieCard 
            key={movie.imdbID} 
            movie={movie} 
            onViewDetails={() => dispatch(setSelectedMovieId(movie.imdbID))}
           />
        ))}
      </div>
    </div>
  )
}

export default MovieList