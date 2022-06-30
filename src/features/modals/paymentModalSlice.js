import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { myAlgoConnect } from "../../utils";
import { setLinkedStatus, setWallet } from "../config/configSlice";

const initialState = {
  status: false,
  type: "",
  data: null,
};

export const paymentModalSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    connectWallet: (state, action) => {
      state.status = true;
      state.type = "connectWallect";
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

export const ProcessTxnAsync = (slug) => async (dispatch) => {
  try {
    dispatch(txnProcessing());

    setTimeout(() => {
      dispatch(txnSuccessful());
    }, 2000);
  } catch (err) {
    console.log(err.message);
  }
};

export const {
  connectWallet,
  closeModal,
  txnProcessing,
  txnSuccessful,
  txnFailed,
} = paymentModalSlice.actions;
export default paymentModalSlice.reducer;
