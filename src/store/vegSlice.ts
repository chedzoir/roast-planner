import { createSlice } from "@reduxjs/toolkit";

export const initialState: { selectedVeg: string[] } = {
  selectedVeg: [],
};

const vegSlice = createSlice({
  name: "veg",
  initialState,
  reducers: {
    addVeg(state, action) {
      state.selectedVeg.push(action.payload);
    },
    removeVeg(state, action) {
      const pos = state.selectedVeg.indexOf(action.payload);
      if (pos >= 0) {
        state.selectedVeg.splice(pos, 1);
      }
    },
  },
});

export const { addVeg, removeVeg } = vegSlice.actions;

export default vegSlice.reducer;
