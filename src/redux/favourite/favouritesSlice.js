import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idBrewery: [],
};

const favouritesSLice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addToFavourites(state, action) {
      if (!state.idBrewery.includes(action.payload)) {
        state.idBrewery.push(action.payload);
      }
    },
    removeFromFavourites(state, action) {
      state.idBrewery = state.idBrewery.filter((id) => id !== action.payload);
    },
  },
});

export const { addToFavourites, removeFromFavourites } =
  favouritesSLice.actions;
export default favouritesSLice.reducer;
