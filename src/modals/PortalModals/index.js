import React from "react";
import { useSelector } from "react-redux";
import Failed from "./Failed";
import Processing from "./Processing";
import Success from "./Success";

const PortalModals = () => {
  const { status, type, data } = useSelector((state) => state.payModal);

  return (
    <div
      className="portal_modal_background"
      style={{ display: status === true ? "flex" : "none" }}
    >
      <div className="modal_container">
        {type === "txnProcessing" ? (
          <Processing />
        ) : type === "txnSuccessful" ? (
          <Success />
        ) : type === "txnFailed" ? (
          <Failed />
        ) : null}
      </div>
    </div>
  );
};

export default PortalModals;
