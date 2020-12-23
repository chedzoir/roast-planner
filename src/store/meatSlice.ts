import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  meat: "turkeycrown",
  weight: 6.0,
};

const meatSlice = createSlice({
  name: "meat",
  initialState,
  reducers: {
    setMeat(state, action) {
      state.meat = action.payload;
    },
    setWeight(state, action) {
      state.weight = action.payload;
    },
  },
});

export const { setMeat, setWeight } = meatSlice.actions;

export default meatSlice.reducer;
