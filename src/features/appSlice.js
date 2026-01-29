import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedMovieId: null,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSelectedMovieId: (state, action) => {
            state.selectedMovieId = action.payload;
        },
        clearSelectedMovieId: (state) => {
            state.selectedMovieId = null;
        }
    }
});

export const { setSelectedMovieId, clearSelectedMovieId } = appSlice.actions;
export default appSlice.reducer;
