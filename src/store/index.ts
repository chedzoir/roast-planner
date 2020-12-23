import { combineReducers, configureStore } from "@reduxjs/toolkit";
import meatSlice from "./meatSlice";
import timingSlice from "./detailsSlice";
import potatoSlice from "./potatoSlice";
import vegSlice from "./vegSlice";
import otherItemsSlice from "./otheritemsSlice";
import swimlineSlice from "./swimlineSlice"

const rootReducer = combineReducers({
  meat: meatSlice,
  timing: timingSlice,
  potato: potatoSlice,
  veg: vegSlice,
  otherItems: otherItemsSlice,
  swimline : swimlineSlice
});

const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default store;
