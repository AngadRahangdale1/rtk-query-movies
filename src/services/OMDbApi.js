import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const OMDbApi = 'ecbcca4d';

export const ombdApi = createApi({
    reducerPath: 'ombdApi',
    baseQuery: fetchBaseQuery({baseUrl:'https://www.omdbapi.com/'}),
    endpoints: (builder) => ({

        getPopularMovies : builder.query({
            query: (page=1) => `?s=movie&apikey=${OMDbApi}&page=${page}`,
        }),
        getMovieBySearch: builder.query({
            query: (searchTerm) => `?s=${searchTerm}&apikey=${OMDbApi}`,
        }),
        getMovieDetails: builder.query({
            query: (id) => `?i=${id}&apikey=${OMDbApi}`,    
        }),
    }),
});

// Auto generated hooks for use in components

export const {useGetPopularMoviesQuery,useGetMovieBySearchQuery,useGetMovieDetailsQuery} = ombdApi; 