import { configureStore } from "@reduxjs/toolkit";
import breweriesReduser from "./breweries/slice";
import favouritesReduser from "./favourite/favouritesSlice.js"
import hiddenBreweryIdsReduser from "./breweries/hiddenBreweries/hiddenBreweryIdsSlice.js"




export const store = configureStore({
  reducer: {
    breweries: breweriesReduser,
    favourites: favouritesReduser,
    hiddenIds: hiddenBreweryIdsReduser
  },
});
