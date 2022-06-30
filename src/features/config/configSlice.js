import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  walletAddress: localStorage.getItem("walletAddress"),
  walletProvider: localStorage.getItem("walletProvider"),
  darkTheme: localStorage.getItem("mode") === "dark" ? true : false,
  linkedStatus:
    localStorage.getItem("linkedStatus") === "linked" ? true : false,
};

export const configSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setWallet: (state, action) => {
      localStorage.setItem("walletProvider", action.payload.walletProvider);
      localStorage.setItem("walletAddress", action.payload.walletAddress);
      state.walletProvider = action.payload.walletProvider;
      state.walletAddress = action.payload.walletAddress;
    },
    setLinkedStatus: (state, action) => {
      localStorage.setItem("linkedStatus", action.payload);
      state.linkedStatus = action.payload;
    },
  },
});

export const { setWallet, setLinkedStatus } = configSlice.actions;
export default configSlice.reducer;
