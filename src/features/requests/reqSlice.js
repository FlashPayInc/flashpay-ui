import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assets: [],
  paymentLinks: [],
};

export const reqSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    addAssets: (state, action) => {
      state.assets = [...action.payload];
    },
    updatetLinks: (state, action) => {
      state.paymentLinks = [...action.payload];
    },
  },
});

export const { addAssets, updatetLinks } = reqSlice.actions;
export default reqSlice.reducer;
