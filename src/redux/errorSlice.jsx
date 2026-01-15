import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
    name: "errors",
    initialState: {
        errors: {}
    },
    reducers: {
        setError: (state, action) => {
            const { field, message } = action.payload;
            state.errors[field] = message;
        },
        // clearError: (state, action) => {
        //     delete state.errors[action.payload];
        // },
        clearAllErrors: (state) => {
            state.errors = {};
        },
    },
});

export const { setError, clearError, clearAllErrors } = errorSlice.actions;
export default errorSlice.reducer;
