import { createSlice } from "@reduxjs/toolkit";

export const selectedFigureSlice = createSlice({
    name: 'selectedFigure',
    initialState: {
        value: 0
    },
    reducers: {
        set: (state, action) => {
            state.value = action.payload;
        }
    }
});