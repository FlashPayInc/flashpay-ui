import React from "react";

import Lottie from "react-lottie";
import animationData from "../../lotties/Error.json";

const Failed = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <div className="modal_content">
        <div className="modal_illustration">
          <Lottie options={defaultOptions} />
        </div>
        <div className="modal_description">
          <p className="main">Transaction failed</p>
          <p className="sub">
            We could not process your transaction due to insufficient balance in
            your wallet
          </p>
        </div>

        <div className="action_buttons">
          <button className="cancel_button">Close</button>
          <button className="continue_button">Try again</button>
        </div>
      </div>
    </>
  );
};

export default Failed;
