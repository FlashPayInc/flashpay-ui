import Lottie from "react-lottie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import animationData from "../../lotties/Loading.json";
import animationDataError from "../../lotties/Error.json";
import { closeModal } from "../../features/modals/modalSlice";

const VerifyAcctModal = ({ data }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const defaultOptions = {
    loop: data?.loading,
    autoplay: true,
    animationData: data?.loading ? animationData : animationDataError,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="modal_container">
      <div className="modal_content">
        <div className="modal_illustration">
          <Lottie options={defaultOptions} speed={0.7} />
        </div>
        <div className="modal_description">
          <p className="main">
            {data?.loading ? "Verifying wallet" : "Wallet not setup yet"}
          </p>
        </div>

        {!data?.loading ? (
          <div className="action_buttons">
            <button
              className="continue_button"
              onClick={() => {
                dispatch(closeModal());
                navigate("./setup");
              }}
            >
              Setup wallet
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default VerifyAcctModal;
