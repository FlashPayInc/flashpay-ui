import algosdk from "algosdk";
import { useEffect } from "react";
import WalletConnect from "@walletconnect/client";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import WalletConnectQRCodeModal from "algorand-walletconnect-qrcode-modal";

// Functions
const constrictAddr = (address) =>
  address.substring(0, 5) + "..." + address.substring(51, 58);

const constrictAddrLong = (address) =>
  address.substring(0, 20) + "..." + address.substring(50, 58);

const NumberWithCommas = (x, dp = 6) => {
  if (x.toString().includes(".")) {
    const y = x.toString().split(".");
    return (
      y[0]?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      "." +
      y[1]?.toString().substring(0, dp)
    );
  } else {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

function useOutsideAlerter(ref, ref2, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        ref2.current &&
        !ref2.current.contains(event.target)
      ) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

// Connections
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

export {
  constrictAddr,
  NumberWithCommas,
  constrictAddrLong,
  useOutsideAlerter,
  //
  myAlgoConnect,
  algodClient,
  connector,
};
