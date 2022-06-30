import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  closeModal,
  ConnectWalletAsync,
} from "../../features/modals/modalSlice";
import { AppIcons2 } from "../../svg";

const ConnectModal = () => {
  const dispatch = useDispatch();
  const [option, setOption] = useState("");

  return (
    <>
      <div className="modal_header">
        <p className="main">Connect a wallet</p>
        <p className="sub">
          Select a platform to pay from
          <span className="note"> - My Algo wallet active</span>
        </p>
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
                <AppIcons2 type={opt.type} />
                <p>{opt.name}</p>
              </div>
              <div className="option_ticked">
                {opt.type === option ? <AppIcons2 type="tickcircle" /> : null}
              </div>
            </div>
          );
        })}
      </div>
      <div className="action_buttons">
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
    </>
  );
};

export default ConnectModal;
