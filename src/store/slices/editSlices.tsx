import { createSlice } from "@reduxjs/toolkit"

type Note = {
    id: string,
    title: string,
    content: string,
    category: string,
    date: Date,
}
interface InitialState {
    editNote: Note,
    isVisible: boolean,
}

const initialState: InitialState = {
    editNote: {
        id: '',
        title: '',
        content: '',
        category: '',
        date: new Date(),
    },
    isVisible: false,
}

const editSlice = createSlice({
    name: 'editSlice',
    initialState,
    reducers: {
        setEditNote: (state, action) => {
            state.editNote = action.payload;
        },
        setIsVisible: (state, action) => {
            state.isVisible = action.payload
        }
    }
})

export const { setEditNote, setIsVisible } = editSlice.actions;
export default editSlice.reducer;