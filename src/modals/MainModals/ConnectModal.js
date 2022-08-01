import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  closeModal,
  ConnectWalletAsync,
} from "../../features/modals/modalSlice";
import { useWindowSize } from "@react-hook/window-size/throttled";
import { ConnectIcon } from "../../svg";
import Icon from "../../svg/Icon";

const ConnectModal = () => {
  const [width] = useWindowSize();

  const dispatch = useDispatch();
  const [option, setOption] = useState("");

  return (
    <div className={`modal_container ${width < 570 ? "fill-screen" : ""}`}>
      <div className="modal_header">
        <div className="main">
          <div className="back-btn" onClick={() => dispatch(closeModal())}>
            <Icon.ArrowLeft />
          </div>

          <p>Connect wallet</p>
        </div>
        <div className="sub">
          Select a platform to pay from
          {/* <span className="note"> - My Algo wallet active</span> */}
        </div>
      </div>

      <div className="modal_content">
        {[
          { type: "pera", name: "Pera wallet" },
          { type: "myalgo", name: "My Algo wallet" },
          { type: "algosigner", name: "Install Algo Signer" },
        ].map((opt, index) => {
          return (
            <div
              key={index}
              className="connect_option"
              onClick={() => setOption(opt?.type)}
            >
              <div className="option_info">
                <ConnectIcon type={opt.type} />
                <p>{opt.name}</p>
              </div>
              <div className="option_ticked">
                {opt.type === option ? <ConnectIcon type="tickcircle" /> : null}
              </div>
            </div>
          );
        })}
      </div>
      <div className="action_buttons wallet-connect">
        <button
          className="cancel_button"
          onClick={() => dispatch(closeModal())}
        >
          Cancel
        </button>
        <button
          className="continue_button"
          onClick={() => {
            if (!!option) {
              dispatch(ConnectWalletAsync({ type: option }));
            }
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ConnectModal;
