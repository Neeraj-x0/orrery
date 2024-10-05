import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    action : "",
    data : {}
}

const actionSlice = createSlice({
    name: "action",
    initialState,
    reducers: {
        setAction: (state, action) => {
            state.action = action.payload.action;
            state.data = action.payload.data;
        },
    },
});

export const { setAction } = actionSlice.actions;
export default actionSlice.reducer;

