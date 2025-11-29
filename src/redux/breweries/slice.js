import { createSlice } from "@reduxjs/toolkit";
import { fetchBreweries } from "./operations.js";

const breweriesSlice = createSlice({
  name: "breweries",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreweries.pending, (state, action) => {
        state.loading = true;
        state.error = null;

        // якщо page = 1 ⇒ очищаємо список
        if (action.meta.arg === 1) {
          state.items = [];
        }
      })
      .addCase(fetchBreweries.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBreweries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default breweriesSlice.reducer;
