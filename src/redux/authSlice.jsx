import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    rights: []
}

export const authSlice = createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },

        setRights: (state, action) => {
            state.rights = action.payload;
        },

    }
})

export const { setUser, setToken, setRights } = authSlice.actions;
export const authReducer = authSlice.reducer;