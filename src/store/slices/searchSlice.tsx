import { createSlice } from "@reduxjs/toolkit"

interface State {
    searchText: string
}

const initialState: State={
    searchText: ''
}

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        },
    }
})

export const { setSearchText } = searchSlice.actions;
export default searchSlice.reducer;