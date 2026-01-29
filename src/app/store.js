import {configureStore} from "@reduxjs/toolkit"
import {ombdApi} from "../services/OMDbApi.js"
import appReducer from "../features/appSlice.js"

export const store = configureStore({
    reducer :{
        [ombdApi.reducerPath]: ombdApi.reducer,
        app: appReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ombdApi.middleware),
});

// reducer added → stores API data
// ✔ middleware added → makes API calls
// ✔ reducerPath matched → no errors