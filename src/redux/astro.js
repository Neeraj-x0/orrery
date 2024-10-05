// astro.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  position: [0, 6, 0],
  orbitSpeed:1,
  showOrbit:true,
};

const astroSlice = createSlice({
  name: "astro",
  initialState,
  
  reducers: {
    setPosition: (state, action) => {
      state.position = [action.payload[0], action.payload[1]+2, action.payload[2]];
    },setOrbitSpeed:(state,action)=>{
      state.orbitSpeed=action.payload;
    },setShowOrbit:(state)=>{
      state.showOrbit=!state.showOrbit
    }
  },
});

// Export actions
export const { setPosition,setOrbitSpeed,setShowOrbit } = astroSlice.actions;

// Export reducer
export default astroSlice.reducer;
