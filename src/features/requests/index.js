import {
  connector,
  algodClient,
  SetupPayload,
  myAlgoConnect,
  ConnectPayload,
  createTransaction,
} from "../../utils";
import _ from "lodash";
import axios from "axios";
import { addAssets } from "./reqSlice";
import { waitForConfirmation } from "algosdk";
import { setLinkedStatus, setWallet } from "../config/configSlice";
import { verifyAcct, setupAcct, closeModal } from "../modals/modalSlice";
import { InitializeTxn } from "./txnsReqs";

// ACCOUNT CONNECT & SETUP
export const FetchAssets = _i => async dispatch => {
  await axios
    .get(`/core/assets`)
    .then(res => {
      if (!!res?.data?.data) {
        const filter = _.filter(res?.data?.data, i => i.network === "mainnet");
        dispatch(addAssets(filter));
      }
    })
    .catch(err => {
      console.log(err?.message);
    });
};

export const VerifyWalletAsync = address => async dispatch => {
  const payload = ConnectPayload(address);

  await axios
    .post(`/accounts/connect`, { payload })
    .then(res => {
      localStorage.setItem("access_token", res.data?.data?.access_token);
      localStorage.setItem("refresh_token", res.data?.data?.refresh_token);

      dispatch(setLinkedStatus("linked"));
      dispatch(closeModal());
    })
    .catch(err => {
      if (err?.response?.status === 401) {
        dispatch(verifyAcct({ loading: false }));
      }
    });
};

export const ConnectWalletAsync = slug => async dispatch => {
  const paymentData = addr => {
    return {
      sender: addr,
      asset: slug?.asset,
      amount: slug?.amount,
      pub_key: slug?.pub_key,
      recipient: slug?.recipient,
    };
  };

  try {
    if (slug.provider === "myalgo") {
      const accounts = await myAlgoConnect.connect({
        shouldSelectOneAccount: true,
      });

      dispatch(
        setWallet({
          walletAddress: accounts[0].address,
          walletProvider: slug.provider,
        })
      );

      if (slug?.connectType === "payment") {
        dispatch(InitializeTxn(paymentData(accounts[0].address)));
      } else {
        dispatch(verifyAcct({ loading: true }));
        dispatch(VerifyWalletAsync(accounts[0].address));
      }
    } else if (slug.provider === "pera") {
      if (!connector.connected) {
        connector.createSession();
      }

      connector.on("connect", (error, payload) => {
        if (error) throw error;
        const { accounts } = payload.params[0];
        dispatch(
          setWallet({
            walletAddress: accounts[0],
            walletProvider: slug.provider,
          })
        );
        if (slug?.connectType === "payment") {
          dispatch(InitializeTxn(paymentData(accounts[0])));
        } else {
          dispatch(verifyAcct({ loading: true }));
          dispatch(VerifyWalletAsync(accounts[0]));
        }
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
    } else if (slug.provider === "algosigner") {
      if (typeof window.AlgoSigner === "undefined") {
        window.open(
          "https://chrome.google.com/webstore/detail/algosigner/kmmolakhbgdlpkjkcjkebenjheonagdm",
          "_blank"
        );
      } else {
        // console.log(window.AlgoSigner);

        await window.AlgoSigner.connect({
          ledger: "TestNet",
        });
        const accounts = await window.AlgoSigner.accounts({
          ledger: "TestNet",
        });

        dispatch(
          setWallet({
            walletAddress: accounts[0].address,
            walletProvider: slug.provider,
          })
        );

        if (slug?.connectType === "payment") {
          dispatch(InitializeTxn(paymentData(accounts[0])));
        } else {
          dispatch(verifyAcct({ loading: true }));
          dispatch(VerifyWalletAsync(accounts[0].address));
        }
      }
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const LinkWalletAsync = slug => async dispatch => {
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
    } else if (provider === "algosigner") {
      let txn_b64 = window.AlgoSigner.encoding.msgpackToBase64(txn.toByte());
      await window.AlgoSigner.signTxn([{ txn: txn_b64 }])
        .then(signedTx => {
          submittedTxn = signedTx[0];
          submittedTxn.txId = signedTx[0].txID;
          window.AlgoSigner.send({
            ledger: "TestNet",
            tx: signedTx.blob,
          });
        })
        .catch(e => {
          console.log(e.message);
          dispatch(setupAcct({ status: "error" }));
        });
    }

    if (!!submittedTxn?.txId) {
      console.log(slug?.addr);
      console.log(submittedTxn?.txId);

      const payload = SetupPayload(slug?.addr, nonce, submittedTxn?.txId);

      await axios
        .post(`/accounts/init`, { payload })
        .then(res => {
          dispatch(setLinkedStatus("linked"));
          dispatch(verifyAcct({ loading: true }));
          dispatch(VerifyWalletAsync(slug?.addr));

          // dispatch(
          //   setupAcct({ status: "success", message: res.data?.message })
          // );
        })
        .catch(err => {
          console.log(err?.response.data.message);
          dispatch(
            setupAcct({ status: "error", message: err?.response.data.message })
          );
        });
    } else {
      dispatch(setupAcct({ status: "error" }));
    }
  } catch (err) {
    console.log(err.message);
    dispatch(setupAcct({ status: "error" }));
  }
};
