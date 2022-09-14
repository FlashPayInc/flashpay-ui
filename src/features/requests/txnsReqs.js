import {
  algodClient,
  DecodePayload,
  myAlgoConnect,
  createTransaction,
} from "../../utils";
import _ from "lodash";
import axios from "axios";
import { waitForConfirmation } from "algosdk";
import { txnFailed, txnProcessing, txnSuccessful } from "../modals/modalSlice";

// TRANSACTIONS
export const InitializeTxn = data => async dispatch => {
  const formData = new FormData();
  formData.append("txn_type", "normal");
  formData.append("network", "testnet");
  formData.append("asset", data?.asset);
  formData.append("amount", data?.amount);
  formData.append("sender", data?.sender);
  formData.append("recipient", data?.recipient);

  dispatch(txnProcessing());

  await axios
    .post("transactions", formData, {
      headers: {
        "X-public-key": DecodePayload(data?.pub_key),
      },
    })
    .then(res => {
      dispatch(
        ProcessPayment({
          addr: data?.sender,
          amount: data?.amount,
          pub_key: data?.pub_key,
          recipient: data?.recipient,
          txnRef: res?.data?.data?.txn_reference,
        })
      );
    })
    .catch(err => {
      console.log(err?.message);
      dispatch(txnFailed());
    });
};

export const ProcessPayment = slug => async dispatch => {
  try {
    let submittedTxn = null;
    const provider = localStorage.getItem("walletProvider");
    const txn = await createTransaction(
      slug?.amount,
      slug?.addr,
      slug?.txnRef,
      slug?.recipient
    );

    if (provider === "myalgo") {
      const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
      submittedTxn = await algodClient.sendRawTransaction(signedTxn.blob).do();
      await waitForConfirmation(algodClient, submittedTxn?.txId, 1000);
    } else if (provider === "algosigner") {
      let txn_b64 = window.AlgoSigner.encoding.msgpackToBase64(txn.toByte());
      await window.AlgoSigner.signTxn([{ txn: txn_b64 }])
        .then(async signedTx => {
          submittedTxn = signedTx[0];
          submittedTxn.txId = signedTx[0].txID;

          const loko = await window.AlgoSigner.send({
            ledger: "TestNet",
            tx: signedTx.blob,
          });
          console.log(loko);
        })
        .catch(e => {
          console.log(e?.message);
          dispatch(txnFailed());
        });

      console.log(submittedTxn);
    }

    if (!!submittedTxn?.txId) {
      await axios
        .post(`/transactions/verify/${slug?.txnRef}`, null, {
          headers: {
            "X-public-key": DecodePayload(slug?.pub_key),
          },
        })
        .then(res => {
          dispatch(txnSuccessful());
        })
        .catch(err => {
          console.log(err?.message);
          dispatch(txnFailed());
        });
    }
  } catch (err) {
    console.log(err?.message);
    dispatch(txnFailed());
  }
};
