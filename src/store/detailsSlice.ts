import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  endTimeHours: 12,
  endTimeMinutes: 0,
  diners: 4,
  cooks: 1,
};

const details = createSlice({
  name: "DetailsSlice",
  initialState,
  reducers: {
    setEndTimeHours(state, action) {
      state.endTimeHours = +action.payload;
    },
    setEndTimeMinutes(state, action) {
      state.endTimeMinutes = +action.payload;
    },
    setDiners(state, action) {
      state.diners = +action.payload;
    },
    setCooks(state, action) {
      state.cooks = +action.payload;
    },
  },
});

export const {
  setEndTimeHours,
  setEndTimeMinutes,
  setDiners,
  setCooks,
} = details.actions;

export default details.reducer;
