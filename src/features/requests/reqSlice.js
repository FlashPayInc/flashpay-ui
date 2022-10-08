import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assets: [],
  network: localStorage.getItem("network"),
  paymentLinks: [],
};

export const reqSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    addAssets: (state, action) => {
      state.assets = [...action.payload];
    },
    updateNetwork: (state, action) => {
      localStorage.setItem("network", action.payload);
      state.network = action.payload;
    },
    updatetLinks: (state, action) => {
      state.paymentLinks = [...action.payload];
    },
  },
});

export const { addAssets, updatetLinks, updateNetwork } = reqSlice.actions;
export default reqSlice.reducer;
