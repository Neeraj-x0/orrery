// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import astroReducer from "./astro"; // Adjust the path as needed

const store = configureStore({
  reducer: {
    astro: astroReducer, // Register the astro slice
  },
});

export default store;