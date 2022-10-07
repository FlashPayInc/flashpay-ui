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
  formData.append("payment_link", data?.payment_link);

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
          network: data?.network,
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
      slug?.network,
      slug?.recipient
    );

    if (provider === "myalgo") {
      const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
      submittedTxn = await algodClient(slug?.network)
        .sendRawTransaction(signedTxn.blob)
        .do();
      await waitForConfirmation(
        algodClient(slug?.network),
        submittedTxn?.txId,
        1000
      );
    } else if (provider === "pera") {
      if (!connector.connected) {
        console.log("Not connected");
        return;
      }

      const txnsToSign = [
        {
          txn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString(
            "base64"
          ),
          message: `Sign transaction to complete payment on FlashPay`,
        },
      ];

      const requestParams = [txnsToSign];
      const request = formatJsonRpcRequest("algo_signTxn", requestParams);
      const result = await connector.sendCustomRequest(request);
      const decodedResult = result.map(element => {
        return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
      });

      submittedTxn = await algodClient(slug?.network)
        .sendRawTransaction(decodedResult)
        .do();

      await waitForConfirmation(
        algodClient(slug?.network),
        submittedTxn?.txId,
        1000
      );
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