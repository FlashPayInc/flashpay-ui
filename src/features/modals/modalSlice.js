import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  type: "",
  data: false,
};

export const modalSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    connectWallet: state => {
      state.status = true;
      state.type = "connectWallet";
    },
    verifyAcct: (state, action) => {
      state.status = true;
      state.type = "verifyAcct";
      state.data = { loading: action.payload.loading };
    },
    setupAcct: (state, action) => {
      state.status = true;
      state.type = "setupAcct";
      state.data = action.payload;
    },

    createLink: (state, action) => {
      state.status = true;
      state.type = "createLink";
      state.data = action.payload;
    },

    notifications: state => {
      state.status = true;
      state.type = "notifications";
    },
    txnProcessing: state => {
      state.status = true;
      state.type = "txnProcessing";
    },
    txnSuccessful: state => {
      state.status = true;
      state.type = "txnSuccessful";
    },
    txnFailed: state => {
      state.status = true;
      state.type = "txnFailed";
    },
    generateLink: state => {
      state.status = true;
      state.type = "generateLink";
    },
    generateLinkSuccessful: state => {
      state.status = true;
      state.data = { generated: true };
      state.type = "generateLinkSuccessful";
    },
    deleteAccount: state => {
      state.status = true;
      state.type = "deleteAccount";
    },
    closeModal: state => {
      state.type = "";
      state.data = null;
      state.status = false;
    },
  },
});

export const {
  connectWallet,
  verifyAcct,
  setupAcct,

  createLink,

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
