import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  baseMap : "osm",
};

const baseMapSlice = createSlice({
    name: "baseMap",
    initialState,
    reducers: {
        setBaseMap: (state, action) => {
        state.baseMap = action.payload;
        },
    },
});

export const { setBaseMap } = baseMapSlice.actions;
export default baseMapSlice.reducer;
