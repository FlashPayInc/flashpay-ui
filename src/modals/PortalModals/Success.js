import { AppIcons } from "../../svg";

import Lottie from "react-lottie";
import animationData from "../../lotties/Success.json";
import { closeModal } from "../../features/modals/paymentModalSlice";
import { useDispatch } from "react-redux";
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
    <>
      <div className="modal_content">
        <div className="modal_illustration">
          <Lottie options={defaultOptions} />
        </div>
        <div className="modal_description">
          <p className="main">Success</p>
          <p className="sub">
            Your payment was successful. A receipt has been sent to your email.
          </p>
        </div>

        <div className="action_buttons">
          <button
            className="cancel_button"
            onClick={() => {
              dispatch(closeModal());
              navigate("/", { replace: true });
            }}
          >
            Close
          </button>
          <button className="continue_button">
            <AppIcons type="download" />
            <p>Download reciept</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Success;
