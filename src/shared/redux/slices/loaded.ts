import { createSlice } from "@reduxjs/toolkit";

export const loadedSlice = createSlice({
    name: 'loaded',
    initialState: {
        value: false
    },
    reducers: {
        toggle: (state) => {
            state.value = !state.value;
        },
        set: (state, action) => {
            state.value = action.payload;
        }
    }
});