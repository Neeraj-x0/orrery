// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import astroReducer from "./astro"; // Adjust the path as needed
import baseMapReducer from "./baseMap";
import actionReducer from "./Action";


const store = configureStore({
  reducer: {
    astro: astroReducer, // Register the astro slice
    baseMap: baseMapReducer,
    action: actionReducer,
  },
});

export default store;