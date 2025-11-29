import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hiddenBreweryIds: [],
};

const hiddenBreweryIdsSlice = createSlice({
  name: "hiddenIds",
  initialState,
  reducers: {
    hideOne(state, action) {
      if (!state.hiddenBreweryIds.includes(action.payload)) {
        state.hiddenBreweryIds.push(action.payload);
      }
    },
    hideMany(state, action) {
      action.payload.forEach(id => {
        if (!state.hiddenBreweryIds.includes(id)) {
          state.hiddenBreweryIds.push(id);
        }
      });
    },
    unhideOne(state, action) {
      state.hiddenBreweryIds = state.hiddenBreweryIds.filter(
        (id) => id !== action.payload
      );
    },
  },
});
export const { hideOne, hideMany,unhideOne } = hiddenBreweryIdsSlice.actions;
export default hiddenBreweryIdsSlice.reducer;
