// astro.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  position: [0, 6, 0],
};

const astroSlice = createSlice({
  name: "astro",
  initialState,
  
  reducers: {
    setPosition: (state, action) => {
      state.position = [action.payload[0], action.payload[1]+2, action.payload[2]];
    },
  },
});

// Export actions
export const { setPosition } = astroSlice.actions;

// Export reducer
export default astroSlice.reducer;
