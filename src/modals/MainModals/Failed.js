import { AppIcons } from "../../svg";

import Lottie from "react-lottie";
import animationData from "../../lotties/Error.json";
import { useDispatch } from "react-redux";
import { closeModal } from "../../features/modals/modalSlice";

const Failed = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const dispatch = useDispatch();

  return (
    <div className="modal_container">
      <div className="modal_content">
        <div className="modal_illustration">
          <Lottie options={defaultOptions} />
        </div>
        <div className="modal_description">
          <p className="main">Transaction Failed</p>
        </div>

        <div className="action_buttons">
          <button
            className="cancel_button"
            onClick={() => dispatch(closeModal())}
          >
            Cancel
          </button>
          <button className="continue_button">Retry</button>
        </div>
      </div>
    </div>
  );
};

export default Failed;
