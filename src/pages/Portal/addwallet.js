import { useState } from "react";
import { ConnectIcon } from "../../svg";
import { useDispatch } from "react-redux";
import { ProcessTxnAsync } from "../../features/modals/paymentModalSlice";

const AddWallet = () => {
  const dispatch = useDispatch();
  const [option, setOption] = useState("");

  return (
    <div className="connect_container">
      <div className="options_header">
        <p className="main">Connect a wallet</p>
        <p className="sub">Select a platform to pay from</p>
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

      <button
        className="continue_to_pay"
        onClick={() => {
          if (!!option) {
            dispatch(ProcessTxnAsync({ type: option }));
          }
        }}
      >
        Continue
      </button>
    </div>
  );
};

export default AddWallet;
