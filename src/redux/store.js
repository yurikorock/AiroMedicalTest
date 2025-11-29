import { configureStore } from "@reduxjs/toolkit";
import breweriesReduser from "./breweries/slice";
import favouritesReduser from "./favourite/favouritesSlice.js"




export const store = configureStore({
  reducer: {
    breweries: breweriesReduser,
    favourites: favouritesReduser,
  },
});
