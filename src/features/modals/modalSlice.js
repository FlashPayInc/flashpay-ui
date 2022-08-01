import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { myAlgoConnect } from "../../utils";
import { setLinkedStatus, setWallet } from "../config/configSlice";

const initialState = {
  status: false,
  type: "",
  data: null,
};

export const modalSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    connectWallet: (state, action) => {
      state.status = true;
      state.type = "connectWallect";
    },
    notifications: (state, action) => {
      state.status = true;
      state.type = "notifications";
    },
    txnProcessing: (state, action) => {
      state.status = true;
      state.type = "txnProcessing";
    },
    txnSuccessful: (state, action) => {
      state.status = true;
      state.type = "txnSuccessful";
    },
    txnFailed: (state, action) => {
      state.status = true;
      state.type = "txnFailed";
    },
    generateLink: (state, action) => {
      state.status = true;
      state.type = "generateLink";
    },
    generateLinkSuccessful: (state, action) => {
      state.status = true;
      state.data = { generated: true };
      state.type = "generateLinkSuccessful";
    },
    deleteAccount: (state, action) => {
      state.status = true;
      state.type = "deleteAccount";
    },
    closeModal: (state, action) => {
      state.type = "";
      state.data = null;
      state.status = false;
    },
  },
});

export const ConnectWalletAsync = (slug) => async (dispatch) => {
  if (slug.type !== "myalgo") return;
  try {
    const accounts = await myAlgoConnect.connect({
      shouldSelectOneAccount: true,
    });
    dispatch(
      setWallet({
        walletAddress: accounts[0].address,
        walletProvider: "myalgo",
      })
    );
    dispatch(closeModal());
  } catch (err) {
    console.log(err.message);
  }
};

export const LinkWalletAsync = (slug) => async (dispatch) => {
  try {
    dispatch(txnProcessing());

    setTimeout(() => {
      dispatch(txnSuccessful());
      dispatch(setLinkedStatus("linked"));
    }, 2000);
  } catch (err) {
    console.log(err.message);
  }
};

export const {
  connectWallet,
  closeModal,
  notifications,
  txnProcessing,
  txnSuccessful,
  txnFailed,
  generateLink,
  deleteAccount,
  generateLinkSuccessful,
} = modalSlice.actions;
export default modalSlice.reducer;
