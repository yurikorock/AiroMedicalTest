import { configureStore } from "@reduxjs/toolkit";
import breweriesReduser from "./breweries/slice";




export const store = configureStore({
  reducer: {
    breweries: breweriesReduser,
  },
});
