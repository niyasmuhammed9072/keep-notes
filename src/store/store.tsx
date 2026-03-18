import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./slices/notesSlices";
import editReducer from './slices/editSlices';
import searchReducer from './slices/searchSlice'

const store = configureStore({
    reducer: {
        notes: notesReducer,
        editSlices: editReducer,
        searchSlice: searchReducer,
    }
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch