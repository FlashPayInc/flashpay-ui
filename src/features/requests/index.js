import {
  connector,
  algodClient,
  SetupPayload,
  myAlgoConnect,
  ConnectPayload,
  createTransaction,
  peraWallet,
  peraWalletPortal,
} from "../../utils";
import _ from "lodash";
import axios from "axios";
import { InitializeTxn } from "./txnsReqs";
import { addAssets, updateNetwork } from "./reqSlice";
import algosdk, { waitForConfirmation } from "algosdk";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { setLinkedStatus, setWallet } from "../config/configSlice";
import { verifyAcct, setupAcct, closeModal } from "../modals/modalSlice";

// ACCOUNT CONNECT & SETUP
export const GetNetwork = _i => async dispatch => {
  await axios
    .get(`/accounts/network`, {
      headers: {
        Authorization: localStorage.getItem("access_token")
          ? `Bearer ${localStorage.getItem("access_token")}`
          : "",
      },
    })
    .then(res => {
      dispatch(updateNetwork(res?.data?.data?.network));
    })
    .catch(err => {
      localStorage.setItem("network", "testnet");
    });
};

export const ChangeNetwork = network => async dispatch => {
  await axios
    .post(
      `/accounts/network`,
      { network },
      {
        headers: {
          Authorization: !!localStorage.getItem("access_token")
            ? `Bearer ${localStorage.getItem("access_token")}`
            : "",
        },
      }
    )
    .then(res => {
      dispatch(updateNetwork(res?.data?.data?.network));
    })
    .catch(err => {
      console.log(err?.message);
    });
};

export const FetchAssets = _i => async dispatch => {
  if (!localStorage.getItem("walletAddress")) return;
  await axios
    .get(`/core/assets`)
    .then(res => {
      if (!!res?.data?.data) {
        dispatch(addAssets(res?.data?.data));
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
      dispatch(GetNetwork());
      dispatch(FetchAssets());
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
      network: slug?.network,
      provider: slug.provider,
      recipient: slug?.recipient,
      payment_link: slug?.payment_link,
    };
  };

  try {
    if (slug.provider === "myalgo") {
      const accounts = await myAlgoConnect.connect({
        shouldSelectOneAccount: true,
      });

      if (slug?.connectType === "payment") {
        dispatch(InitializeTxn(paymentData(accounts[0].address)));
      } else {
        dispatch(
          setWallet({
            walletAddress: accounts[0].address,
            walletProvider: slug.provider,
          })
        );
        dispatch(verifyAcct({ loading: true }));
        dispatch(VerifyWalletAsync(accounts[0].address));
      }
    } else if (slug.provider === "pera") {
      const peraWall =
        slug?.connectType === "payment" ? peraWalletPortal : peraWallet;

      peraWall
        .connect()
        .then(newAccounts => {
          peraWall.connector.on("disconnect", () => {
            peraWall.disconnect();
            localStorage.clear();
            window.location.reload();
          });

          if (slug?.connectType === "payment") {
            dispatch(InitializeTxn(paymentData(newAccounts[0])));
          } else {
            dispatch(
              setWallet({
                walletAddress: newAccounts[0],
                walletProvider: slug.provider,
              })
            );
            dispatch(verifyAcct({ loading: true }));
            dispatch(VerifyWalletAsync(newAccounts[0]));
          }
        })
        .catch(error => {
          console.log(error);
        });

      connector.on("session_update", (error, payload) => {
        if (error) throw error;
        const { accounts } = payload.params[0];
        dispatch(
          setWallet({
            walletAddress: accounts[0],
            walletProvider: "pera",
          })
        );
      });
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
      submittedTxn = await algodClient("mainnet")
        .sendRawTransaction(signedTxn.blob)
        .do();
      await waitForConfirmation(
        algodClient("mainnet"),
        submittedTxn?.txId,
        1000
      );
    } else if (provider === "pera") {
      if (!connector.connected) {
        return;
      }

      const txnsToSign = [
        {
          txn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString(
            "base64"
          ),
          message: "Sign transaction to setup your FlashPay account",
        },
      ];

      const requestParams = [txnsToSign];
      const request = formatJsonRpcRequest("algo_signTxn", requestParams);
      const result = await connector.sendCustomRequest(request);
      const decodedResult = result.map(element => {
        return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
      });

      submittedTxn = await algodClient("mainnet")
        .sendRawTransaction(decodedResult)
        .do();

      await waitForConfirmation(
        algodClient("mainnet"),
        submittedTxn?.txId,
        1000
      );
    }

    if (!!submittedTxn?.txId) {
      const payload = SetupPayload(slug?.addr, nonce, submittedTxn?.txId);

      await axios
        .post(`/accounts/init`, { payload })
        .then(res => {
          dispatch(setLinkedStatus("linked"));
          dispatch(verifyAcct({ loading: true }));
          dispatch(VerifyWalletAsync(slug?.addr));
        })
        .catch(err => {
          // console.log(err?.response.data.status_code);
          if (err?.response.data.status_code === 400) {
            dispatch(setLinkedStatus("linked"));
            dispatch(verifyAcct({ loading: true }));
            dispatch(VerifyWalletAsync(slug?.addr));
          } else {
            dispatch(
              setupAcct({
                status: "error",
                message: err?.response.data.message,
              })
            );
          }
        });
    } else {
      dispatch(setupAcct({ status: "error" }));
    }
  } catch (err) {
    console.log(err.message);
    dispatch(setupAcct({ status: "error" }));
  }
};
