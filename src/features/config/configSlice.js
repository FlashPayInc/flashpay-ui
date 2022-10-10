import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reload: false,
  openSidetab: false,
  hideKeys: !!JSON.parse(localStorage.getItem("hideKeys"))
    ? JSON.parse(localStorage.getItem("hideKeys"))
    : { secret: false, public: false },
  walletAddress: localStorage.getItem("walletAddress"),
  walletProvider: localStorage.getItem("walletProvider"),
  linkedStatus:
    localStorage.getItem("linkedStatus") === "linked" ? true : false,

  theme: localStorage?.theme,
};

export const configSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    reloadPage: (state, action) => {
      state.reload = action.payload;
    },

    setTheme: (state, action) => {
      state.theme = action.payload;
    },

    hideApiKeys: (state, action) => {
      localStorage.setItem(
        "hideKeys",
        JSON.stringify({
          ...state.hideKeys,
          ...action.payload,
        })
      );
      state.hideKeys = {
        ...state.hideKeys,
        ...action.payload,
      };
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
  setTheme,
  setWallet,
  reloadPage,
  openSideTab,
  hideApiKeys,
  closeSideTab,
  setLinkedStatus,
} = configSlice.actions;
export default configSlice.reducer;
