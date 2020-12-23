import { createSlice } from "@reduxjs/toolkit";
import { SwimlineData } from "../swimline";

type SwimlineSliceState = {
  data: SwimlineData;
};

export const initialState: SwimlineSliceState = {
  data: {
    data: [],
    minVal: 0,
    maxVal: 0,
    marker: 0,
  },
};

const swimlineSlice = createSlice({
  name: "swimline",
  initialState,
  reducers: {
    updateSwimline(state, action) {
      state.data = action.payload;
    },
    updateMarker(state, action) {
      state.data = { ...state.data, marker: action.payload };
    },
  },
});

export const { updateMarker, updateSwimline } = swimlineSlice.actions;

export default swimlineSlice.reducer;
