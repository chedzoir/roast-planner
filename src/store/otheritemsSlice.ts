import { createSlice } from "@reduxjs/toolkit";

type OtherItemState = {
    otherItems: string[]
}

export const initialState : OtherItemState  = {
  otherItems: [],
};

const otherItemsSlice = createSlice({
    name:'OtherItems',
    initialState,
    reducers: {
        addItem(state, action) {
            state.otherItems.push(action.payload)
        },
        removeItem(state, action) {
            state.otherItems = state.otherItems.filter(val => val !== action.payload)
        }
    }
})

export const { addItem, removeItem  } = otherItemsSlice.actions;

export default otherItemsSlice.reducer;