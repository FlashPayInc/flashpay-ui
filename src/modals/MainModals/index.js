import React from "react";
import { useSelector } from "react-redux";
import ConnectModal from "./ConnectModal";
import DeleteAccountModal from "./DeleteAccountModal";
import Failed from "./Failed";
import GenerateLinkModal from "./GenerateLinkModal";
import Processing from "./Processing";
import Success from "./Success";

const AppModals = () => {
  const { status, type, data } = useSelector((state) => state.modal);

  return (
    <div
      className="modal_background"
      style={{ display: status === true ? "flex" : "none" }}
    >
      <div className="modal_container">
        {type === "connectWallect" ? (
          <ConnectModal />
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
        ) : null}
      </div>
    </div>
  );
};

export default AppModals;
