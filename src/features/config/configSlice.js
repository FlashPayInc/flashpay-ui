import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reload: false,
  openSidetab: false,
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
    reloadPage: (state, action) => {
      state.reload = action.payload;
    },
    openSideTab: state => {
      state.openSidetab = true;
    },
    closeSideTab: state => {
      state.openSidetab = false;
    },
    closeSideTab: state => {
      state.openSidetab = false;
    },

    setWallet: (state, action) => {
      localStorage.setItem("walletProvider", action.payload.walletProvider);
      localStorage.setItem("walletAddress", action.payload.walletAddress);
      state.walletProvider = action.payload.walletProvider;
      state.walletAddress = action.payload.walletAddress;
    },
    setLinkedStatus: (state, action) => {
      localStorage.setItem("linkedStatus", action.payload);
      state.linkedStatus = action.payload === "linked";
    },
  },
});

export const {
  setWallet,
  reloadPage,
  openSideTab,
  closeSideTab,
  setLinkedStatus,
} = configSlice.actions;
export default configSlice.reducer;
