import Navbar from "./components/Navbar";
import MovieList from "./features/MovieList";
import MovieDetails from "./features/MovieDetails";
import { useSelector, useDispatch } from "react-redux";
import { clearSelectedMovieId } from "./features/appSlice";

function App() {
  const selectedMovieId = useSelector((state) => state.app.selectedMovieId);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      <MovieList />
      {selectedMovieId && (
        <MovieDetails 
            imdbID={selectedMovieId} 
            onClose={() => dispatch(clearSelectedMovieId())}
        />
      )}
    </>
  );
}

export default App;

// MovieList.jsx
//  ↓ useGetPopularMoviesQuery
// OMDbApi.js
//  ↓ fetchBaseQuery
// OMDb Server
//  ↓ response
// Redux Store (cache)
//  ↓
// UI updates automatically

// No reducers
// ✔ No actions
// ✔ No extra boilerplate