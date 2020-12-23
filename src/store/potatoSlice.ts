import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  type: ["roastpotato"],
};

const potatoSlice = createSlice({
  name: "potato",
  initialState,
  reducers: {
    addPotato(state, action) {
      state.type.push(action.payload);
    },
    removePotato(state, action) {
      state.type = state.type.filter((val) => val !== action.payload);
    },
  },
});

export const { addPotato, removePotato } = potatoSlice.actions;

export default potatoSlice.reducer;
