import {
  algodClient,
  DecodePayload,
  myAlgoConnect,
  createTransaction,
  peraWalletPortal,
} from "../../utils";
import _ from "lodash";
import axios from "axios";
import { waitForConfirmation } from "algosdk";
import { txnFailed, txnProcessing, txnSuccessful } from "../modals/modalSlice";

// TRANSACTIONS
export const InitializeTxn = data => async dispatch => {
  const formData = new FormData();
  formData.append("txn_type", "normal");
  formData.append("asset", data?.asset);
  formData.append("sender", data?.sender);
  formData.append("network", data?.network);
  formData.append("recipient", data?.recipient);
  formData.append("amount", Number(data?.amount));
  formData.append("payment_link", data?.payment_link);

  dispatch(txnProcessing());

  await axios
    .post("transactions", formData, {
      headers: {
        "X-public-key": DecodePayload(data?.pub_key),
        Authorization: !!localStorage.getItem("access_token")
          ? `Bearer ${localStorage.getItem("access_token")}`
          : "",
      },
    })
    .then(res => {
      dispatch(
        ProcessPayment({
          addr: data?.sender,
          amount: data?.amount,
          asset: data?.asset,
          pub_key: data?.pub_key,
          network: data?.network,
          provider: data?.provider,
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
    const txn = await createTransaction(
      slug?.amount,
      slug?.addr,
      slug?.txnRef,
      slug?.network,
      slug?.recipient,
      slug?.asset
    );

    if (slug?.provider === "myalgo") {
      const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
      submittedTxn = await algodClient(slug?.network)
        .sendRawTransaction(signedTxn.blob)
        .do();
      await waitForConfirmation(
        algodClient(slug?.network),
        submittedTxn?.txId,
        1000
      );
    } else if (slug?.provider === "pera") {
      const signedTxn = await peraWalletPortal.signTransaction([[{ txn }]]);

      submittedTxn = await algodClient(slug?.network)
        .sendRawTransaction(signedTxn)
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
            Authorization: !!localStorage.getItem("access_token")
              ? `Bearer ${localStorage.getItem("access_token")}`
              : "",
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
    console.log(err);
    dispatch(txnFailed());
  }
};
