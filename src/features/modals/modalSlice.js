import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import {
  algodClient,
  connector,
  createTransaction,
  myAlgoConnect,
  PayloadConnect,
  PayloadSetup,
} from "../../utils";
import { waitForConfirmation } from "algosdk";
import { setLinkedStatus, setWallet } from "../config/configSlice";

const initialState = {
  status: false,
  type: "",
  data: false,
};

export const modalSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    connectWallet: (state, action) => {
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

export const VerifyWalletAsync = (address) => async (dispatch) => {
  const payload = PayloadConnect(address);

  await axios
    .post(`/accounts/connect`, { payload })
    .then((res) => {
      localStorage.setItem("access_token", res.data?.data?.access_token);
      localStorage.setItem("refresh_token", res.data?.data?.refresh_token);

      dispatch(setLinkedStatus("linked"));
      dispatch(closeModal());
    })
    .catch((err) => {
      if (err?.response?.status === 401) {
        dispatch(verifyAcct({ loading: false }));
      }
    });
};

export const ConnectWalletAsync = (slug) => async (dispatch) => {
  try {
    if (slug.type === "myalgo") {
      const accounts = await myAlgoConnect.connect({
        shouldSelectOneAccount: true,
      });

      dispatch(
        setWallet({
          walletAddress: accounts[0].address,
          walletProvider: slug.type,
        })
      );
      dispatch(verifyAcct({ loading: true }));
      dispatch(VerifyWalletAsync(accounts[0].address));
    } else if (slug.type === "pera") {
      if (!connector.connected) {
        connector.createSession();
      }

      connector.on("connect", (error, payload) => {
        if (error) throw error;
        const { accounts } = payload.params[0];
        dispatch(
          setWallet({
            walletAddress: accounts[0],
            walletProvider: slug.type,
          })
        );
        dispatch(verifyAcct({ loading: true }));
        dispatch(VerifyWalletAsync(accounts[0]));
      });

      connector.on("session_update", (error, payload) => {
        if (error) throw error;
        console.log("Session updated...");
        const { accounts } = payload.params[0];

        dispatch(
          setWallet({
            walletAddress: accounts[0],
            walletProvider: "pera",
          })
        );
      });

      connector.on("disconnect", (error, payload) => {
        if (error) throw error;
        localStorage.clear();
        window.location.reload();
      });
    } else if (slug.type === "algosigner") {
      if (typeof window.AlgoSigner === "undefined") {
        window.open(
          "https://chrome.google.com/webstore/detail/algosigner/kmmolakhbgdlpkjkcjkebenjheonagdm",
          "_blank"
        );
      } else {
        await window.AlgoSigner.connect({
          ledger: "TestNet",
        });
        const accounts = await window.AlgoSigner.accounts({
          ledger: "TestNet",
        });

        dispatch(
          setWallet({
            walletAddress: accounts[0].address,
            walletProvider: slug.type,
          })
        );
        dispatch(verifyAcct({ loading: true }));
        dispatch(VerifyWalletAsync(accounts[0].address));
      }
    }
  } catch (err) {
    console.log(err.message);
  }

  return;
};

export const LinkWalletAsync = (slug) => async (dispatch) => {
  try {
    dispatch(setupAcct({ status: "loading" }));

    let submittedTxn = null;
    const provider = localStorage.getItem("walletProvider");
    const nonce = Math.random().toString(36).slice(2, 7);

    const txn = await createTransaction(0, slug?.addr, nonce);

    if (provider === "myalgo") {
      const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
      submittedTxn = await algodClient.sendRawTransaction(signedTxn.blob).do();
      await waitForConfirmation(algodClient, submittedTxn?.txId, 1000);
    }

    if (!!submittedTxn?.txId) {
      const payload = PayloadSetup(slug?.addr, nonce, submittedTxn?.txId);

      await axios
        .post(`/accounts/init`, { payload })
        .then((res) => {
          dispatch(setLinkedStatus("linked"));
          dispatch(
            setupAcct({ status: "success", message: res.data?.message })
          );
        })
        .catch((err) => {
          console.log(err?.response.data.message);
          dispatch(
            setupAcct({ status: "error", message: err?.response.data.message })
          );
        });
    }
  } catch (err) {
    console.log(err.message);
    dispatch(setupAcct({ status: "error" }));
  }
};

export const {
  connectWallet,
  verifyAcct,
  setupAcct,

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
