import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        value: 'dark'
    },
    reducers: {
        toggle: (state) => {
            state.value = state.value == 'dark' ? 'light' : 'dark';
        },
        set: (state, action) => {
            state.value = action.payload;
        }
    }
});