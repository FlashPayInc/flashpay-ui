import React from "react";
import { useSelector } from "react-redux";
import ConnectModal from "./ConnectModal";
import DeleteAccountModal from "./DeleteAccountModal";
import Failed from "./Failed";
import GenerateLinkModal from "./GenerateLinkModal";
import NotificationModal from "./NotificationModal";
import Processing from "./Processing";
import SetupAcctModal from "./SetupAcctModal";
import Success from "./Success";
import VerifyAcctModal from "./VerifyAcctModal";

const AppModals = () => {
  const { status, type, data } = useSelector((state) => state.modal);

  return (
    <div
      className="modal_background"
      style={{ display: status === true ? "flex" : "none" }}
    >
      {type === "connectWallet" ? (
        <ConnectModal />
      ) : type === "verifyAcct" ? (
        <VerifyAcctModal data={data} />
      ) : type === "setupAcct" ? (
        <SetupAcctModal data={data} />
      ) : type === "txnProcessing" ? (
        <Processing />
      ) : type === "txnSuccessful" ? (
        <Success />
      ) : type === "txnFailed" ? (
        <Failed />
      ) : (type === "generateLink") | (type === "generateLinkSuccessful") ? (
        <GenerateLinkModal data={data} />
      ) : type === "deleteAccount" ? (
        <DeleteAccountModal />
      ) : type === "notifications" ? (
        <NotificationModal />
      ) : null}
    </div>
  );
};

export default AppModals;
