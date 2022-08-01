import { AppIcons } from "../../svg";

import Lottie from "react-lottie";
import animationData from "../../lotties/Success.json";
import { useDispatch } from "react-redux";
import { closeModal } from "../../features/modals/modalSlice";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  let navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="modal_container">
      <div className="modal_content">
        <div className="modal_illustration">
          <Lottie options={defaultOptions} />
        </div>
        <div className="modal_description">
          <p className="main">Transaction completed</p>
        </div>

        <div className="action_buttons">
          <button
            className="cancel_button"
            onClick={() => {
              dispatch(closeModal());
              navigate("./", { replace: true });
            }}
          >
            Go back home
          </button>
          <button className="continue_button">View on AlgoExplorer</button>
        </div>
      </div>
    </div>
  );
};

export default Success;
