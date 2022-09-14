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
      state.type = "connectWallet";
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

export const ProcessTxnAsync = slug => async dispatch => {
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
