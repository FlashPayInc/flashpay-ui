import fernet from "fernet";
import algosdk from "algosdk";
import WalletConnect from "@walletconnect/client";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { PeraWalletConnect } from "@perawallet/connect";
import WalletConnectQRCodeModal from "algorand-walletconnect-qrcode-modal";

const peraWallet = new PeraWalletConnect();
const peraWalletPortal = new PeraWalletConnect();

// FERNET ENCRYPTION SETUP
const fernetSecret = new fernet.Secret(process.env.REACT_APP_ENCRYPTION_KEY);
const fernetToken = new fernet.Token({
  secret: fernetSecret,
  ttl: 0,
});

// CONNECT WALLET
const myAlgoConnect = new MyAlgoConnect();
const algodClient = network =>
  new algosdk.Algodv2(
    "FP",
    `https://node.${network === "testnet" ? "testnet." : ""}algoexplorerapi.io`,
    { "X-API-KEY": "FP" }
  );

// const indexerClient = new algosdk.Indexer(
//   "",
//   `https://algoindexer.testnet.algoexplorerapi.io`,
//   ""
// );
const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org",
  qrcodeModal: WalletConnectQRCodeModal,
});

const DecodePayload = pub_key => {
  var token = new fernet.Token({
    secret: fernetSecret,
    token: pub_key,
    ttl: 0,
  });
  const decryptedPayload = token.decode();
  return btoa(decryptedPayload);
};

const ConnectPayload = address => {
  const nonce = Math.random().toString(36).slice(2, 7);
  const encryptedPayload = fernetToken.encode(`${nonce}, ${address}`);
  return btoa(encryptedPayload);
};

const SetupPayload = (address, nonce, txId) => {
  const encryptedPayload = fernetToken.encode(`${nonce}, ${address}, ${txId}`);
  return btoa(encryptedPayload);
};

// CREATE TRANSACTION
const createTransaction = async (
  amount,
  senderAddr,
  noteSlug,
  network,
  recipient = process.env.REACT_APP_SETUP_ADDRESS,
  asset = 1
) => {
  const enc = new TextEncoder();
  const note = enc.encode(noteSlug);

  const returnData = await algodClient(network)
    .getTransactionParams()
    .do()
    .then(suggestedParams => {
      const params = {
        note,
        suggestedParams,
        from: senderAddr,
        amount: Number(amount) * 1000000,
        to: recipient,
      }
      const transaction = asset === 0 || asset === 1 ? algosdk.makePaymentTxnWithSuggestedParamsFromObject(params) : algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        ...params,
        assetIndex: Number(asset) 
      });
      return transaction;
    })
    .catch(err => console.log(err?.message));

  return returnData;
};

export {
  connector,
  peraWallet,
  algodClient,
  SetupPayload,
  myAlgoConnect,
  DecodePayload,
  ConnectPayload,
  peraWalletPortal,
  createTransaction,
};
