import fernet from "fernet";
import algosdk from "algosdk";
import { useEffect } from "react";
import WalletConnect from "@walletconnect/client";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import WalletConnectQRCodeModal from "algorand-walletconnect-qrcode-modal";

// FERNET ENCRYPTION SETUP
const fernetSecret = new fernet.Secret(process.env.REACT_APP_ENCRYPTION_KEY);
const fernetToken = new fernet.Token({
  secret: fernetSecret,
  ttl: 0,
});

// CONNECT WALLET
const myAlgoConnect = new MyAlgoConnect();
const algodClient = new algosdk.Algodv2(
  "",
  "https://node.testnet.algoexplorerapi.io",
  ""
);
const indexerClient = new algosdk.Indexer(
  "",
  "https://algoindexer.testnet.algoexplorerapi.io",
  ""
);
const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org",
  qrcodeModal: WalletConnectQRCodeModal,
});

const PayloadConnect = (address) => {
  const nonce = Math.random().toString(36).slice(2, 7);
  const encryptedPayload = fernetToken.encode(`${nonce}, ${address}`);
  return btoa(encryptedPayload);
};

const PayloadSetup = (address, nonce, txId) => {
  const encryptedPayload = fernetToken.encode(`${nonce}, ${address}, ${txId}`);
  return btoa(encryptedPayload);
};

// CREATE TRANSACTION
const createTransaction = async (amount, senderAddr, noteSlug) => {
  const enc = new TextEncoder();
  const note = enc.encode(noteSlug);

  const returnData = await algodClient
    .getTransactionParams()
    .do()
    .then((suggestedParams) => {
      const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        note,
        suggestedParams,
        from: senderAddr,
        amount: amount * 1000000,
        to: process.env.REACT_APP_SETUP_ADDRESS,
      });

      return transaction;
    })
    .catch((err) => console.log(err?.message));

  return returnData;
};

export {
  myAlgoConnect,
  algodClient,
  connector,
  PayloadConnect,
  PayloadSetup,
  //
  createTransaction,
};
